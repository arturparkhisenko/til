# MP4

> MPEG-4 Part 14 (MP4), Fragmented MPEG-4

- [ISO/IEC 14496-14:2020 Information technology — Coding of audio-visual objects — Part 14: MP4 file format](https://www.iso.org/standard/79110.html)
- [Fragmented MPEG-4 in HLS spec](https://tools.ietf.org/html/rfc8216#section-3.3)
- [Atoms, Boxes](http://atomicparsley.sourceforge.net/mpeg-4files.html)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Abbreviations](#abbreviations)
- [ISO/IEC base media file format (BMF, MPEG-4 Part 12, 14496-12)](#isoiec-base-media-file-format-bmf-mpeg-4-part-12-14496-12)
- [Terms, definitions, and abbreviated terms](#terms-definitions-and-abbreviated-terms)
- [Notes from HLS](#notes-from-hls)
- [Examples](#examples)
  - [Inspected files](#inspected-files)
- [Tools](#tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Abbreviations

- MPEG, Moving Pictures Experts Group
- ISO, International Organization for Standardization
- IEC, International Electrotechnical Commission
- fMP4, Fragmented MP4

## ISO/IEC base media file format (BMF, MPEG-4 Part 12, 14496-12)

Based on the Apple [QuickTime File Format](https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFPreface/qtffPreface.html).

Specification [ISO/IEC 14496-12:2015 Information technology — Coding of audio-visual objects — Part 12: ISO base media file format](https://www.iso.org/standard/68960.html)

## Terms, definitions, and abbreviated terms

### Notes from BMF, MPEG-4 Part 12

- 3.1.1 `box` (aka `atom`) - object oriented building block defined by unique type identifier and length
- 3.1.2 `chunk` - contiguous set of samples for one track
- 3.1.18 `segment` - portion of an ISO base media file format file, consisting of either (a) a movie box, with its associated media data (if any) and other associated boxes or (b) one or more movie fragment boxes, with their associated media data, and other associated boxes
- 3.1.19 `track` - timed sequence of related samples (q.v.) in an ISO base media file. Note 1: For media data, a track corresponds to a sequence of images or sampled audio; for hint tracks a track corresponds to a streaming channel

### Notes from Media Source specification

- [Media Segment](https://www.w3.org/TR/media-source/#media-segment) Media Segment - A sequence of bytes that contain packetized & timestamped media data for a portion of the media timeline. Media segments are always associated with the most recently appended initialization segment.

### Notes from HLS specification

- 3.3 [Fragmented MPEG-4](https://tools.ietf.org/html/draft-pantos-http-live-streaming-23#section-3.3) - The Media Initialization Section for an fMP4 Segment is an ISO Base Media File that can initialize a parser for that Segment.

## Examples

fragmented=false, progressive=false, avc1.f4001f, Video: rawvideo (RGB[24] / 0x18424752), rgb24, 1280x720 [SAR 1:1 DAR 16:9], 24 tbr, 24 tbn, 24 tbc
```shell
ffmpeg -f lavfi -i testsrc=duration=5.42:size=1280x720:rate=24 testsrc-720p-24fps-h264-avc1-high-lvl3_1-444.mp4
```

fragmented=true (`frag_keyframe`), progressive=true (`empty_moov`), avc1.4d4028, Video: h264 (libx264) (avc1 / 0x31637661), yuv420p, 1280x720 [SAR 1:1 DAR 16:9], q=-1--1, 24 fps, 12288 tbn, 24 tbc

```shell
ffmpeg -f lavfi -i testsrc=duration=5.42:size=1280x720:rate=24 -c:v libx264 -profile:v main -level:v 4.0 -pix_fmt yuv420p -movflags empty_moov+default_base_moof+frag_keyframe testsrc-720p-24fps-h264-avc1-main-lvl4_0-420.mp4
```

### Inspected files

> box view

- fragmented=false, progressive=false: `[ftyp, mdat, moov]`
- fragmented=true, progressive=true: `[ftyp, moov, moof, mdat, mfra]`

## Tools

- [MPEG4 file parser](http://mp4parser.com/)
- [mp4explorer, Windows](https://archive.codeplex.com/?p=mp4explorer)
- [MP4Box.js / ISOBMFF Box Structure Viewer](http://download.tsi.telecom-paristech.fr/gpac/mp4box.js/filereader.html)
- [browser media mime support](https://cconcolato.github.io/media-mime-support/)
- [ISO viewer](https://github.com/sannies/isoviewer)
- [Bento Applications](https://www.bento4.com/)
- [DVB Inspector](http://www.digitalekabeltelevisie.nl/dvb_inspector/)
- [Thumbcoil web based video inspector](http://thumb.co.il/)
- [DVB Snoop, DVB / MPEG stream analyzer program](http://dvbsnoop.sourceforge.net/)
- [TSDuck, The MPEG Transport Stream Toolkit](https://tsduck.io/)
