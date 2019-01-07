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
    - [Shared options](#shared-options)
  - [Devices](#devices)
  - [Video Sources](#video-sources)
  - [Utils](#utils)
    - [Video Size](#video-size)
    - [Video Rate](#video-rate)
    - [Colors](#colors)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

- `brew install ffmpeg`

## [Docs](https://ffmpeg.org/documentation.html)

### [Tools](https://ffmpeg.org/about.html)

- `ffmpeg` A command line tool to convert multimedia files between formats.
- `ffplay` A simple media player based on SDL and the FFmpeg libraries.
- `ffprobe` A simple multimedia stream analyzer.

#### ffmpeg options

- `ffmpeg -i input output` input option
- `ffmpeg -f` fmt (input/output), force input or output file format

### [Devices](https://www.ffmpeg.org/ffmpeg-devices.html)

- `lavfi` Libavfilter input virtual device. Currently only video data is supported. The filtergraph is specified through the option graph.

### [Video Sources](https://ffmpeg.org/ffmpeg-filters.html#allrgb_002c-allyuv_002c-color_002c-haldclutsrc_002c-nullsrc_002c-pal75bars_002c-pal100bars_002c-rgbtestsrc_002c-smptebars_002c-smptehdbars_002c-testsrc_002c-testsrc2_002c-yuvtestsrc)

- `testsrc` Generates a test video pattern showing a color pattern, a scrolling gradient, and a timestamp.
- `smptebars` Generates a color bars pattern, based on the SMPTE Engineering Guideline EG 1-1990, SMPTE RP 219-2002.
- color source
- `rgbtestsrc` Generates an RGB test pattern useful for detecting RGB vs BGR issues. We should see a red, green and blue stripe from top to bottom.

### [Utils](https://ffmpeg.org/ffmpeg-utils.html)

#### Video Size

- `hd480` or `852x480`
- `hd720` or `1280x720`
- `hd1080` or `1920x1080`
- `4k` or `4096x2160`

#### Video Rate

- `ntsc` or `30000/1001`, original aspect ratio 720x480 (1.5)
- `pal` or `25/1`, original aspect ratio 720x576 (1.25)
- `film` or `24/1`

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
