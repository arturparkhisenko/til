/**
 * Player
 *
 * @see https://www.w3.org/TR/media-source/
 * @see https://www.w3.org/TR/mse-byte-stream-format-isobmff/
 * @see https://www.w3.org/TR/mse-byte-stream-format-mp2t/
 * Debug using chrome://media-internals/ or @see https://developers.google.com/web/updates/2020/08/devtools
 */
export class Player {
  /**
   * @param {HTMLVideoElement} elVideo if we want to support HTMLAudioElement it could be generalized to HTMLMediaElement
   */
  constructor(elVideo) {
    this.log = createLogger('[mse.js]');
    this.elVideo = elVideo;

    // TODO: implement those two
    // this.elVideo.addEventListener('seeking', onSeeking);
    // this.elVideo.addEventListener('progress', onProgress);
  }

  destroy() {
    this.log('destroying');

    // Allow the platform to handle garbage collection
    URL.revokeObjectURL(this.elVideo.src);
    // TODO: do the rest here
  }

  load(url) {
    this.log('loading ' + url);

    let extensionRegex = /\.(mpd|m3u8?)$/i;

    return new Promise((resolve, reject) => {
      if (extensionRegex.test(url) === true) {
        // TODO: load url, pass to the parser
        fetch(url)
          .then((response) => response.text())
          .then((dataString) => mpdParser(dataString))
          .then((manifestDom) => {
            console.warn('manifestDom', manifestDom);
            // console.warn('manifest', getMpdAttributes(manifestDom));
            // TODO: think of mpd manifest entity
          })
          .catch(reject);
      } else {
        const mediaSource = new MediaSource();

        mediaSource.addEventListener('sourceopen', (event) =>
          onSourceOpen(event, url)
        );

        this.elVideo.src = window.URL.createObjectURL(mediaSource);

        resolve();
      }
    });
  }
}

export function createLogger(prefix) {
  return (...args) => {
    console.log(prefix, ...args);
  };
}

/**
 * Decodes string values to number of seconds
 * @see https://dashif-documents.azurewebsites.net/Guidelines-TimingModel/master/Guidelines-TimingModel.html#xml-duration-constraints
 *
 * @param {string} value string representation of the time, example: "PT14.9S"
 * @returns {number} time in seconds
 */
export function convertTime(value) {
  let regex = new RegExp(/\d+\.\d+/);
  let time = regex.exec(value);

  return parseFloat(Number(time), 10);
}

/**
 * Extract MPD attributes
 *
 * @param {XMLDocument} manifestDom
 * @returns {Object} MPD attributes
 */
export function getMpdAttributes(manifestDom) {
  let node = manifestDom.firstChild;

  return {
    duration: convertTime(node.getAttribute('mediaPresentationDuration')),
    segmentDuration: convertTime(node.getAttribute('maxSegmentDuration')),
  };
}

/**
 * Converts byte array of positives to the number
 * Another approach, bytes [29, 35]: (bytes[0]).toString(16) + (bytes[1]).toString(16) === '1d23', parseInt('1d23', 16) === 7459
 *
 * @param {Array} data
 * @returns {number}
 */
export function byteToNumber(data) {
  let i = 0;
  let length = data.length;
  let result = 0;

  for (i; i < length; i++) {
    result = result * 256 + data[i];
  }

  return result;
}

// @see https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function toBytesInt32v1(num) {
  let arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
  let view = new DataView(arr);
  view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
  return arr;
}

function toBytesInt32v2(num) {
  let arr = new Uint8Array([
    (num & 0xff000000) >> 24,
    (num & 0x00ff0000) >> 16,
    (num & 0x0000ff00) >> 8,
    num & 0x000000ff,
  ]);
  return arr.buffer;
}

function toBytesInt32toString(num) {
  let ascii = '';
  for (let i = 3; i >= 0; i--) {
    // Bit-wise AND
    ascii += String.fromCharCode((num >> (8 * i)) & 255);
  }
  return ascii;
}

function fromBytesInt32(numString) {
  var result = 0;
  for (let i = 3; i >= 0; i--) {
    result += numString.charCodeAt(3 - i) << (8 * i);
  }
  return result;
}

// @see https://stackoverflow.com/questions/7869752/javascript-typed-arrays-and-endianness
export function getEndian() {
  let result = null;
  let arrayBuffer = new ArrayBuffer(2);
  let uint8Array = new Uint8Array(arrayBuffer);
  let uint16array = new Uint16Array(arrayBuffer);
  uint8Array[0] = 0xaa; // set first byte
  uint8Array[1] = 0xbb; // set second byte

  if (uint16array[0] === 0xbbaa) {
    result = 'littleEndian';
  } else if (uint16array[0] === 0xaabb) {
    result = 'bigEndian';
  }

  return result;
}

/**
 * Parses MP4 to find the duration and timescale.
 * The duration in `mvhd` on page 16 of ISO/IEC 14496-12 aka BMFF
 *
 * @param {Uint8Array} bytes
 * @returns {{duration: number, timescale: number}}
 */
export function getMp4Mvhd(bytes) {
  let timescale, version;
  let data = String.fromCharCode(...bytes);
  let duration = 0;
  var dataStart = data.indexOf('mvhd') + 4;

  // Typed array views are in the native byte-order (see Endianness) of your platform. @see https://developer.mozilla.org/en-US/docs/Glossary/Endianness
  // Examples with the number 0x12345678 (i.e. 305 419 896 in decimal):
  // little-endian: 0x78 0x56 0x34 0x12, big-endian: 0x12 0x34 0x56 0x78
  // 'A' char code: dec 65, hex 41 (0x41), @see https://www.rapidtables.com/convert/number/hex-to-binary.html
  // 2+2 bytes 29_35 -> hex 1D_23 -> dec 7459
  // 11101_00100011 -> 1 + 2 + 32 + 256 + 1024 + 2048 + 4096 -> 7459

  // 8 first bits specify the version and next 24 bits specify the flags @see https://app.box.com/s/5nliqsqltj8ym18bvlqtigpwzaey9duq
  version = byteToNumber(bytes.slice(dataStart, 4));
  // timescale is in 12 indexes (3 values) from mvhd start
  timescale = byteToNumber(bytes.slice(dataStart + 12, dataStart + 12 + 4));
  // duration is in 16 indexes (4 values) from mvhd start
  duration = byteToNumber(bytes.slice(dataStart + 16, dataStart + 16 + 4));

  return { duration, timescale };
}

/**
 * Checking if data is a mp4
 * @see https://www.garykessler.net/library/file_sigs.html
 * @see https://en.wikipedia.org/wiki/List_of_file_signatures
 * @see https://www.file-recovery.com/mp4-signature-format.htm
 * Detecting Type Box (file ftyp or segment styp)
 * fmp4 is not a container @see https://github.com/videojs/vhs-utils/blob/master/src/containers.js#L120
 * 4 byte offset, 8 bit integer
 * ftyp/styp: number 102/115 116 121 112, hex 66/73 74 79 70
 * Hex dump: `xxd filename | less` or https://hexed.it/
 * int c1 = header[0] & 0xff; then c1 == 0x73
 * Init is ftyp/styp, moov
 * Segment is ftyp/styp, moof
 *
 * @param {Uint8Array} bytes
 * @returns {boolean}
 */
export function isMp4(bytes) {
  let boxBytes;
  let result = false;

  if (bytes.length >= 8) {
    boxBytes = bytes.subarray(4, 8); // offset 4, length 4
    result =
      (boxBytes[0] === 102 || boxBytes[0] === 115) &&
      boxBytes[1] === 116 &&
      boxBytes[2] === 121 &&
      boxBytes[3] === 112;
  }

  return result;
}

/**
 * Parse MPD files
 *
 * @param {string} data
 * @returns {Promise} with XMLDocument
 */
export function mpdParser(data) {
  let fileDOM, parser;

  return new Promise((resolve, reject) => {
    parser = new DOMParser();
    fileDOM = parser.parseFromString(data, 'application/xml');

    if (fileDOM.documentElement.nodeName == 'parsererror') {
      reject('Parse Error');
    }

    resolve(fileDOM);
  });
}

// TODO: For now it only works with mp4 file example.
function onSourceOpen(event, url) {
  let sourceBuffer = null;
  let mediaSource = event.target;

  // TODO: Check mediaSource.sourceBuffers.length or manage references here
  // TODO: Handle initial segment, A byte stream format specific structure that provides the Track ID, codec configuration, and other metadata for a single track. Each track description inside a single initialization segment has a unique Track ID. The user agent MUST run the append error algorithm if the Track ID is not unique within the initialization segment.
  // HTTP1.1 Chunked Transfer Coding https://tools.ietf.org/html/rfc2616#section-3.6.1
  // fetch(url, { headers: { range: 'bytes=0-567139' })
  // TODO: Ideas for inspiration
  //   @see https://www.slideshare.net/fitc_slideshare/next-generation-streaming-video
  //   @see https://www.slideshare.net/jefftapper/dash-in-flash
  //   @see https://github.com/google/shaka-player/blob/master/docs/design/architecture.md
  // TODO: list of more tasks:
  // - append next media segment
  // - fetching next media segment
  // - on seeking, progress, update end, playing handler
  // - buffer management utils
  // - appendWindowStart, appendWindowEnd,
  // - ms.abort, ms.remove(start,end)

  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      let ui8a = new Uint8Array(arrayBuffer);

      // TODO:
      // https://www.ramugedia.com/mp4-container
      // http://atomicparsley.sourceforge.net/mpeg-4files.html
      // Check and become pro with array buffers @see https://stackoverflow.com/a/16763445
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

      // TODO: mp41 and mp42 page 6 of ISO/IEC 14496-14 aka MP4 file format
      // console.log('isMp4', isMp4(ui8a));

      // TODO: Find and set type from the manifest or initial segment
      let type = 'video/mp4; codecs="avc1.4d4028";';

      // For non fragmented mp4 find and set mediaSource.duration
      let { duration, timescale } = getMp4Mvhd(ui8a);
      mediaSource.duration = duration / timescale;

      // A single SourceBuffer with 1 audio track and/or 1 video track.
      // Two SourceBuffers with one handling a single audio track and the other handling a single video track.
      sourceBuffer = mediaSource.addSourceBuffer(type); // mime type and codec

      sourceBuffer.addEventListener('error', (error) => {
        console.log('Source Buffer Error:', error);
      });

      sourceBuffer.addEventListener('updateend', () => {
        if (
          sourceBuffer.updating === false &&
          mediaSource.readyState === 'open'
        ) {
          // Finish loading
          mediaSource.endOfStream();
        }
      });

      sourceBuffer.appendBuffer(arrayBuffer);
    });
}
