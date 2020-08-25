# MSE, Media Source Extensions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Sources](#sources)
- [URLs](#urls)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Sources

720p-24fps-h264-avc1-main-lvl4_0-420

```shell
# progressive and fragmented: video/mp4; codecs="avc1.4d4028";
ffmpeg -f lavfi -i testsrc=duration=7.42:size=1280x720:rate=24 -c:v libx264 -profile:v main -level:v 4.0 -pix_fmt yuv420p -movflags empty_moov+default_base_moof+frag_keyframe testsrc-progressive-fragmented.mp4

ffmpeg -i testsrc-progressive-fragmented.mp4 -c copy -f dash -seg_duration 2 -single_file 1 example-mpd-playlist-based/master.mpd

ffmpeg -i testsrc-progressive-fragmented.mp4 -c copy -f dash -seg_duration 2 example-mpd-template-based/master.mpd

# progressive but not fragmented
ffmpeg -f lavfi -i testsrc=duration=7.42:size=1280x720:rate=24 -c:v libx264 -profile:v main -level:v 4.0 -pix_fmt yuv420p -movflags faststart testsrc-progressive.mp4

# not progressive or fragmented
ffmpeg -f lavfi -i testsrc=duration=7.42:size=1280x720:rate=24 -c:v libx264 -profile:v main -level:v 4.0 -pix_fmt yuv420p -movflags faststart testsrc.mp4
```

## URLs

- [MSE specification](https://w3c.github.io/media-source/)
- [ISO BMFF Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-isobmff/)
- [MPEG-2 TS Byte Stream Format](https://www.w3.org/TR/mse-byte-stream-format-mp2t/)
- [w3c-test.org/media-source](http://w3c-test.org/media-source/)
- [mse basics, google](https://developers.google.com/web/fundamentals/media/mse/basics)
- [HTTP1.1 Chunked Transfer Coding](https://tools.ietf.org/html/rfc2616#section-3.6.1)
- [DASH-IF Guidelines](https://dashif.org/guidelines/)
- [DASH-IF Interoperability Points v4.3 2018, 3.3. Client Implementation Guidelines](https://dashif.org/docs/DASH-IF-IOP-v4.3.pdf)
- [DASH-IF conformance tests](https://conformance.dashif.org/)
