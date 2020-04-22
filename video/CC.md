# Closed Captions

> and subtitles

Notes about 608 and 708 from the spec:

```markdown
608 can be carried within 708 - 608 over 708 captions are embedded in MPEG-2 TS streams according to SCTE 128.

DTVCC Transport - CEA-708 captions are injected into MPEG-2 video streams in the picture user data. The packets are in picture order, and must be rearranged just like picture frames are. This is known as the DTVCC Transport Stream.

SCTE 128 Section 8.2 specifies how 708 data should be embedded in an ATSC MPEG-2 TS stream. A/72 Part 2 Section 6.2 and A/53 Part 3 describe the same process in a less concise manner.
```
