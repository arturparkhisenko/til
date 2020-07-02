/**
 * Player
 *
 * @see https://www.w3.org/TR/media-source/
 * @see https://www.w3.org/TR/mse-byte-stream-format-isobmff/
 * @see https://www.w3.org/TR/mse-byte-stream-format-mp2t/
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

    const mediaSource = new MediaSource();

    mediaSource.addEventListener('sourceopen', (event) =>
      onSourceOpen(event, url)
    );

    this.elVideo.src = window.URL.createObjectURL(mediaSource);

    // TODO: handle the source/manifest loading and parsing
    return Promise.resolve();
  }
}

export function createLogger(prefix) {
  return (...args) => {
    console.log(prefix, ...args);
  };
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

// TODO: For now it only works with mp4 file example.
function onSourceOpen(event, url) {
  let sourceBuffer = null;
  let mediaSource = event.target;

  // TODO: Check mediaSource.sourceBuffers.length or manage references here

  // TODO: Handle initial segment, A byte stream format specific structure that provides the Track ID, codec configuration, and other metadata for a single track. Each track description inside a single initialization segment has a unique Track ID. The user agent MUST run the append error algorithm if the Track ID is not unique within the initialization segment.
  // HTTP1.1 Chunked Transfer Coding https://tools.ietf.org/html/rfc2616#section-3.6.1
  // fetch(url, { headers: { range: 'bytes=0-567139' })

  // TODO: list of more tasks:
  // append next media segment
  // fetching next media segment
  // on seeking, progress, update end, playing handler
  // buffer management utils
  // appendWindowStart, appendWindowEnd,
  // ms.abort, ms.remove(start,end)

  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      // TODO: Check if supported
      // Array buffer should be represented in some way @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
      console.log('isMp4', isMp4(new Uint8Array(arrayBuffer)));

      // TODO: Find and set type from the manifest or initial segment
      let type = 'video/mp4; codecs="avc1.4d4028";';
      // TODO: Find and set mediaSource.duration
      mediaSource.duration = 7.458;

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
