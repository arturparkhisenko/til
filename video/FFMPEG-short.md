# FFMPEG

> [site](https://www.ffmpeg.org)

FFmpeg is the multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play (read/write, compress/decompress content).
It contains libavcodec, libavutil, libavformat, libavfilter, libavdevice, libswscale and libswresample which can be used by applications. As well as ffmpeg, ffplay and ffprobe which can be used by end users for transcoding and playing.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Install](#install)
- [Docs](#docs)
  - [Tools](#tools)
    - [ffmpeg options](#ffmpeg-options)
  - [Devices](#devices)
  - [Video Sources](#video-sources)
  - [Utils](#utils)
    - [Video Size abbreviations](#video-size-abbreviations)
    - [Video Rate](#video-rate)
    - [ffprobe](#ffprobe)
    - [Colors](#colors)
- [Examples](#examples)
  - [Working with .mov](#working-with-mov)
  - [Working with HLS](#working-with-hls)
  - [Working with DASH](#working-with-dash)
  - [HTML markup for test](#html-markup-for-test)
  - [GIF to video](#gif-to-video)
  - [Concatenation](#concatenation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

- `brew install ffmpeg`
- [With all 3d party plugins](https://github.com/varenc/homebrew-ffmpeg)

## [Docs](https://ffmpeg.org/documentation.html)

### [Tools](https://ffmpeg.org/about.html)

- `ffmpeg` A command line tool to convert multimedia files between formats.
- `ffplay` A simple media player based on SDL and the FFmpeg libraries.
- `ffprobe` A simple multimedia stream analyzer.

#### ffmpeg options

- `-i input output` input output files (can handle audio and video streams for each file)
- `-f` fmt (input/output), force input or output file format
- `-map_metadata -1` will remove video metadata.
- `-c:a libopus or -c:a libfdk_aac` selects an audio codec.
- `-c:v libaom-av1` selects a video codec, a library to compress images into a video stream.
- `-preset veryslow` forces H.264 and HEVC codecs to generate smaller video file even if it will be much longer.
- `-profile:v main` that we use in our H.264 command selects the video codec profile. We can only use “Main”, as our video will not be played in Safari otherwise.
- `-b:v 0` a sets minimum bitrate to force the constant quality mode in AV1.
- `-pix_fmt yuv420p` (pixel format) is a trick to reduce the size of a video. Basically, it uses full resolution for brightness and a smaller resolution for color. It is a way to fool a human eye, and you can safely remove this argument if it does not work in your case. Use `-pix_fmts` to ouput all other values.
- `-movflags +faststart` moves the important information to the beginning of the file. It allows browser to start playing video during downloading. Recommended.
- `-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"` is a way to ensure the produced video will always have an even size (some codecs will only work with sizes like 300x200 and 302x200, but not with 301x200). This option tells FFmpeg to scale the source for the closes even resolution. If your video dimensions were even in the first place, it would not do anything.
- `-strict experimental` option needs to be used for AV1, AV1 encoder is still experimental.
- `-crf 34` stands for Constant Rate Factor and sets your size and quality balance. 0 stands for best quality and bigger size. CRF scale is different for H.264 and AV1: H.264 goes from 0 to 51, AV1 from 0 to 61. According to this [av1-beats-x264-and-libvpx-vp9-in-practical-use-case](https://code.fb.com/video-engineering/av1-beats-x264-and-libvpx-vp9-in-practical-use-case/) guide by Facebook, here are the optimal mappings between H.264 and AV1 CRF values: 19 → 27, 23 → 33, 27 → 39, 31 → 45, 35 → 51, 39 → 57.

### [Devices](https://www.ffmpeg.org/ffmpeg-devices.html)

- `lavfi` Libavfilter input virtual device. Currently only video data is supported. The filtergraph is specified through the option graph.

### [Video Sources](https://ffmpeg.org/ffmpeg-filters.html#allrgb_002c-allyuv_002c-color_002c-haldclutsrc_002c-nullsrc_002c-pal75bars_002c-pal100bars_002c-rgbtestsrc_002c-smptebars_002c-smptehdbars_002c-testsrc_002c-testsrc2_002c-yuvtestsrc)

- `testsrc` Generates a test video pattern showing a color pattern, a scrolling gradient, and a timestamp.
- `smptebars` Generates a color bars pattern, based on the SMPTE Engineering Guideline EG 1-1990, SMPTE RP 219-2002.
- color source
- `rgbtestsrc` Generates an RGB test pattern useful for detecting RGB vs BGR issues. We should see a red, green and blue stripe from top to bottom.

### [Utils](https://ffmpeg.org/ffmpeg-utils.html)

#### [Video Size abbreviations](https://ffmpeg.org/ffmpeg-utils.html#video-size-syntax)

- `hd480` or `852x480`
- `hd720` or `1280x720`
- `hd1080` or `1920x1080`
- `4k` or `4096x2160`

#### Video Rate

- `ntsc` or `30000/1001`, original aspect ratio 720x480 (1.5)
- `pal` or `25/1`, original aspect ratio 720x576 (1.25)
- `film` or `24/1`

#### ffprobe

- `ffprobe -h > ffprobe_help.txt` redirects the ffprobe help to a file
- `ffprobe -report SOMEFILE.mp4` creates a report next to your file
- `ffprobe -v quiet -print_format json -show_format -show_streams SOMEFILE.mp4 > ffprobe.json` creates your report as .json file next to your file

#### Colors

- `BlueViolet` or `0x8A2BE2`, can be lowercase
- `random`

## Examples

As pipeline: `VideoSource` -> `Device` -> `Tool` -> Output.

- `ffmpeg -f lavfi -i testsrc=duration=10.123:size=1280x720:rate=24 testsrc.mpg` output to a file
- `ffplay -f lavfi -i testsrc=duration=10.123:size=1280x720:rate=24` just play it
- `ffplay -f lavfi -i smptebars=duration=10:size=hd480:rate=film` options names used
- `ffplay -f lavfi color=c=blueviolet` just plain color
- `ffplay -f lavfi color=c=red@0.2` color with opacity `0.2`
- `ffplay -f lavfi rgbtestsrc` three bars
- `ffprobe -v error -show_format -show_streams input.mp4` show analyze results
- `ffmpeg -ss 00:00:00 -i source.mp4 -to 00:00:42 -c copy source-short.mp4` trim video duration, 0 -> 42s

### Working with .mov

- `ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -c:v libx264 -crf 24 -preset veryslow -profile:v main -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.h264.mp4` - generate .h264.mp4
- `ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libopus -c:v libaom-av1 -crf 34 -b:v 0 -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -strict experimental video.av1.mp4` - generate .av1.mp4
- `ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -c:v libx265 -crf 24 -preset veryslow -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.hevc.mp4` - generate .hevc.mp4

### Working with HLS

- `ffmpeg -f lavfi -i testsrc=duration=6:size=1920x1080:rate=24 -c:a libfdk_aac -c:v libx264 testsrc.mp4` and `ffmpeg -i testsrc.mp4 -c copy testsrc.ts`
- `ffmpeg -re -i testsrc.mp4 -codec copy -map 0 -f segment -segment_list playlist.m3u8 -segment_list_flags +live -segment_time 2 out%03d.ts` - re-stream live content
- `ffmpeg -i video.mpg -f hls -master_pl_name master.m3u8 chunks.m3u8` with master playlist

### Working with DASH

- `ffmpeg -f lavfi -i testsrc=duration=42:size=hd1080:rate=24 -movflags frag_keyframe+empty_moov+default_base_moof testsrc-hd1080-rate24.h264.fragmented.mp4` generate fmp4
- `ffmpeg -i non_fragmented.mp4 -movflags frag_keyframe+empty_moov+default_base_moof fragmented.mp4` transform to fmp4
- `ffmpeg -i fragmented.mp4 -codec copy -f dash master.mpd` dash mpd, [more examples](DASH-short.md#generate-with-ffmpeg)
- `ffmpeg -i testsrc-hd720-rate24.h264.mp4  -c copy -f dash -window_size 20 -seg_duration 4 -single_file 1 test-1/master.mpd`

### HTML markup for test

```html
<video controls width="600" height="400">
  <source
    src="video.hevc.mp4"
    type="video/mp4; codecs=hevc,mp4a.40.2"
  />
  <source
    src="video.av1.mp4"
    type="video/mp4; codecs=av01.0.05M.08,opus"
  />
  <source
    src="video.h264.mp4"
    type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
  />
</video>
```

### GIF to video and back

> [demo](https://arturparkhisenko.github.io/til/video/gif-to-video/index.html)

We can use `animation.h264.mp4` and `animation.av1.mp4` in our HTML. Just replace VIDEO_WIDTH, VIDEO_HEIGHT, and PATH_TO_VIDEO:

```html
<video
  autoplay
  loop
  muted
  playsinline
  width="VIDEO_WIDTH"
  height="VIDEO_HEIGHT"
>
  <source
    src="PATH_TO_VIDEO/animation.av1.mp4"
    type="video/mp4; codecs=av01.0.05M.08"
  />
  <source
    src="PATH_TO_VIDEO/animation.h264.mp4"
    type="video/mp4"
  />
</video>
```

- `ffmpeg -i image.gif -map_metadata -1 -an -c:v libx264 -crf 24 -preset veryslow -profile:v main -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" animation.h264.mp4` GIF to H.264, p.s. check `-vsync 0` [here](https://ffmpeg.org/ffmpeg.html#Advanced-options)
- `ffmpeg -i image.gif -map_metadata -1 -an -c:v libx265 -crf 24 -b:v 0 -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -strict experimental animation.hevc.mp4` GIF to H.265/HEVC
- `ffmpeg -i image.gif -map_metadata -1 -an -c:v libaom-av1 -crf 24 -b:v 0 -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -strict experimental animation.av1.mp4` GIF to AV1
- `ffmpeg -i animation.h264.mp4 -filter_complex "[0:v] fps=18,scale=540:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" -loop 0 video-to-gif.gif` Video to GIF

### Concatenation

- [how-to-concatenate-two-mp4-files-using-ffmpeg](https://stackoverflow.com/questions/7333232/how-to-concatenate-two-mp4-files-using-ffmpeg)

- how to concatenate video and audio

```shell
# Creates 8 seconds long test video with video and audio
ffmpeg -f lavfi -i "sine=frequency=528:duration=8" -c:a pcm_s16le wine-sin-528.wav
ffmpeg -f lavfi -i testsrc2=duration=8:size=hd1080:rate=30 testsrc.mp4
ffmpeg -i testsrc.mp4 -i wine-sin-528.wav -c:v copy -c:a aac -b:a 128k -ac 2 test-wave.mp4
# Merging video and audio, with audio re-encoding
ffmpeg -i testsrc.mp4 -i wine-sin-528.wav -c:v copy -c:a aac -strict experimental test-merge-av.mp4
# Replacing audio stream
ffmpeg -i testsrc.mp4 -i wine-sin-528.wav -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 test-replace-audio.mp4
```
