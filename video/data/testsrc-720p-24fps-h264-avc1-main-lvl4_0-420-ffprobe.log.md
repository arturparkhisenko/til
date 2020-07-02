ffprobe started on 2020-06-28 at 15:47:43
Report written to "ffprobe-20200628-154743.log"
Log level: 48
Command line:
ffprobe -report testsrc-720p-24fps-h264-avc1-main-lvl4_0-420.mp4
ffprobe version 4.3 Copyright (c) 2007-2020 the FFmpeg developers
  built with Apple clang version 11.0.3 (clang-1103.0.32.62)
  configuration: --prefix=/usr/local/Cellar/ffmpeg/4.3_1 --enable-shared --enable-pthreads --enable-version3 --enable-avresample --cc=clang --host-cflags= --host-ldflags= --enable-ffplay --enable-gnutls --enable-gpl --enable-libaom --enable-libbluray --enable-libdav1d --enable-libmp3lame --enable-libopus --enable-librav1e --enable-librubberband --enable-libsnappy --enable-libsrt --enable-libtesseract --enable-libtheora --enable-libvidstab --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxvid --enable-lzma --enable-libfontconfig --enable-libfreetype --enable-frei0r --enable-libass --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librtmp --enable-libspeex --enable-libsoxr --enable-videotoolbox --disable-libjack --disable-indev=jack
  libavutil      56. 51.100 / 56. 51.100
  libavcodec     58. 91.100 / 58. 91.100
  libavformat    58. 45.100 / 58. 45.100
  libavdevice    58. 10.100 / 58. 10.100
  libavfilter     7. 85.100 /  7. 85.100
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  7.100 /  5.  7.100
  libswresample   3.  7.100 /  3.  7.100
  libpostproc    55.  7.100 / 55.  7.100
[NULL @ 0x7fb9cd017800] Opening 'testsrc-720p-24fps-h264-avc1-main-lvl4_0-420.mp4' for reading
[file @ 0x7fb9ccc22ec0] Setting default whitelist 'file,crypto,data'
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] Format mov,mp4,m4a,3gp,3g2,mj2 probed with size=2048 and score=100
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] ISO: File Type Major Brand: iso5
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] Unknown dref type 0x206c7275 size 12
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] found tfdt time 0, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] Before avformat_find_stream_info() pos: 68804 bytes read:32835 seeks:1 nb_streams:1
[h264 @ 0x7fb9cd018400] nal_unit_type: 7(SPS), nal_ref_idc: 3
[h264 @ 0x7fb9cd018400] nal_unit_type: 8(PPS), nal_ref_idc: 3
[h264 @ 0x7fb9cd018400] nal_unit_type: 6(SEI), nal_ref_idc: 0
[h264 @ 0x7fb9cd018400] nal_unit_type: 5(IDR), nal_ref_idc: 3
[h264 @ 0x7fb9cd018400] Format yuv420p chosen by get_format().
[h264 @ 0x7fb9cd018400] Reinit context to 1280x720, pix_fmt: yuv420p
[h264 @ 0x7fb9cd018400] no picture 
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] All info found
[mov,mp4,m4a,3gp,3g2,mj2 @ 0x7fb9cd017800] After avformat_find_stream_info() pos: 19819 bytes read:65603 seeks:2 frames:21
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'testsrc-720p-24fps-h264-avc1-main-lvl4_0-420.mp4':
  Metadata:
    major_brand     : iso5
    minor_version   : 512
    compatible_brands: iso5iso6mp41
    encoder         : Lavf58.45.100
  Duration: 00:00:05.46, start: 0.083333, bitrate: 100 kb/s
    Stream #0:0(und), 21, 1/12288: Video: h264 (Main) (avc1 / 0x31637661), yuv420p, 1280x720 [SAR 1:1 DAR 16:9], 97 kb/s, 24 fps, 24 tbr, 12288 tbn, 48 tbc (default)
    Metadata:
      handler_name    : VideoHandler
[h264 @ 0x7fb9cd01b200] nal_unit_type: 7(SPS), nal_ref_idc: 3
[h264 @ 0x7fb9cd01b200] nal_unit_type: 8(PPS), nal_ref_idc: 3
[AVIOContext @ 0x7fb9ccc23080] Statistics: 65603 bytes read, 2 seeks
