ffprobe started on 2019-03-12 at 20:48:47
Report written to "ffprobe-20190312-204847.log"
Command line:
ffprobe -report testsrc-hd720-rate24.av1.mp4
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
[NULL @ 0x7f9def004c00] Opening 'testsrc-hd720-rate24.av1.mp4' for reading
[file @ 0x7f9dedc02fc0] Setting default whitelist 'file,crypto'
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] Format mov,mp4,m4a,3gp,3g2,mj2 probed with size=2048 and score=100
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] ISO: File Type Major Brand: isom
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] Unknown dref type 0x206c7275 size 12
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] Processing st: 0, edit list 0 - media time: 0, duration: 124416
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] Before avformat_find_stream_info() pos: 1788 bytes read:32768 seeks:0 nb_streams:1
[libaom-av1 @ 0x7f9def015800] 1.0.0
[libaom-av1 @ 0x7f9def015800] -G "Unix Makefiles" -DAOM_TARGET_CPU=x86_64 -DCMAKE_FIND_FRAMEWORK=LAST
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] All info found
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7f9def004c00] After avformat_find_stream_info() pos: 6629 bytes read:32768 seeks:0 frames:1
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'testsrc-hd720-rate24.av1.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf58.20.100
  Duration: 00:00:10.13, start: 0.000000, bitrate: 47 kb/s
    Stream #0:0(und), 1, 1/12288: Video: av1 (Main) (av01 / 0x31307661), yuv420p(tv, progressive), 1280x720, 46 kb/s, SAR 1:1 DAR 16:9, 24 fps, 24 tbr, 12288 tbn, 12288 tbc (default)
    Metadata:
      handler_name    : VideoHandler
[libaom-av1 @ 0x7f9def00c200] 1.0.0
[libaom-av1 @ 0x7f9def00c200] -G "Unix Makefiles" -DAOM_TARGET_CPU=x86_64 -DCMAKE_FIND_FRAMEWORK=LAST
[AVIOContext @ 0x7f9dedc03100] Statistics: 32768 bytes read, 0 seeks
