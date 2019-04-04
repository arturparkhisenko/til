ffprobe started on 2019-03-12 at 20:08:23
Report written to "ffprobe-20190312-200823.log"
Command line:
ffprobe -report testsrc-hd720-rate24.mpg
ffprobe version 4.1.1 Copyright (c) 2007-2019 the FFmpeg developers
  built with Apple LLVM version 10.0.0 (clang-1000.11.45.5)
  configuration: --prefix=/usr/local/Cellar/ffmpeg/4.1.1 --enable-shared --enable-pthreads --enable-version3 --enable-hardcoded-tables --enable-avresample --cc=clang --host-cflags='-I/Library/Java/JavaVirtualMachines/openjdk-11.0.2.jdk/Contents/Home/include -I/Library/Java/JavaVirtualMachines/openjdk-11.0.2.jdk/Contents/Home/include/darwin' --host-ldflags= --enable-ffplay --enable-gnutls --enable-gpl --enable-libaom --enable-libbluray --enable-libmp3lame --enable-libopus --enable-librubberband --enable-libsnappy --enable-libtesseract --enable-libtheora --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libxvid --enable-lzma --enable-libfontconfig --enable-libfreetype --enable-frei0r --enable-libass --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librtmp --enable-libspeex --enable-videotoolbox --disable-libjack --disable-indev=jack --enable-libaom --enable-libsoxr
  libavutil      56. 22.100 / 56. 22.100
  libavcodec     58. 35.100 / 58. 35.100
  libavformat    58. 20.100 / 58. 20.100
  libavdevice    58.  5.100 / 58.  5.100
  libavfilter     7. 40.101 /  7. 40.101
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  3.100 /  5.  3.100
  libswresample   3.  3.100 /  3.  3.100
  libpostproc    55.  3.100 / 55.  3.100
[NULL @ 0x7ff947805e00] Opening 'testsrc-hd720-rate24.mpg' for reading
[file @ 0x7ff946c81480] Setting default whitelist 'file,crypto'
[mpeg @ 0x7ff947805e00] Format mpeg probed with size=2048 and score=26
[mpeg @ 0x7ff947805e00] Before avformat_find_stream_info() pos: 0 bytes read:32768 seeks:0 nb_streams:0
[mpeg @ 0x7ff947805e00] probing stream 0 pp:2500
[mpeg @ 0x7ff947805e00] Probe with size=2005, packets=1 detected mpegvideo with score=25
[mpeg @ 0x7ff947805e00] probed stream 0
[mpeg1video @ 0x7ff947008200] Format yuv420p chosen by get_format().
[mpeg @ 0x7ff947805e00] max_analyze_duration 5000000 reached at 5000000 microseconds st:0
[mpeg @ 0x7ff947805e00] After avformat_find_stream_info() pos: 0 bytes read:675984 seeks:2 frames:122
Input #0, mpeg, from 'testsrc-hd720-rate24.mpg':
  Duration: 00:00:10.08, start: 0.541667, bitrate: 563 kb/s
    Stream #0:0[0x1e0], 122, 1/90000: Video: mpeg1video, yuv420p(tv), 1280x720 [SAR 1:1 DAR 16:9], 104857 kb/s, 24 fps, 24 tbr, 90k tbn, 24 tbc
[AVIOContext @ 0x7ff946e1e640] Statistics: 675984 bytes read, 2 seeks