# HLS

> [specification rfc](https://tools.ietf.org/html/rfc8216)

Current Protocol version 7 201901.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [1, 2. Overview](#1-2-overview)
  - [Variant Stream](#variant-stream)
- [3. Media Segments](#3-media-segments)
  - [Formats](#formats)
    - [3.2 MPEG-2 Transport Streams](#32-mpeg-2-transport-streams)
    - [3.3 Fragmented MPEG-4](#33-fragmented-mpeg-4)
    - [3.4 Packed Audio](#34-packed-audio)
    - [3.5 WebVTT (subtitles)](#35-webvtt-subtitles)
- [4. Playlists](#4-playlists)
  - [4.1 Definition of a Playlist](#41-definition-of-a-playlist)
  - [4.2 Attribute Lists](#42-attribute-lists)
  - [4.3. Playlist Tags](#43-playlist-tags)
    - [4.3.1. Basic Tags](#431-basic-tags)
    - [4.3.2. Media Segment Tags](#432-media-segment-tags)
    - [4.3.3. Media Playlist Tags](#433-media-playlist-tags)
    - [4.3.4 Master Playlist Tags](#434-master-playlist-tags)
    - [4.3.5. Media or Master Playlist Tags](#435-media-or-master-playlist-tags)
- [5. Key Files](#5-key-files)
- [6. Client/Server Rsponsibilities](#6-clientserver-rsponsibilities)
  - [6.2. Server Responsibilities](#62-server-responsibilities)
  - [6.3. Client Responsibilities](#63-client-responsibilities)
    - [6.3.2. Loading the Media Playlist File](#632-loading-the-media-playlist-file)
    - [6.3.3. Playing the Media Playlist File](#633-playing-the-media-playlist-file)
    - [6.3.4. Reloading the Media Playlist File](#634-reloading-the-media-playlist-file)
    - [6.3.5. Determining the Next Segment to Load](#635-determining-the-next-segment-to-load)
    - [6.3.6. Decrypting Encrypted Media Segments](#636-decrypting-encrypted-media-segments)
- [10. Security Considerations](#10-security-considerations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1, 2. Overview

- A multimedia presentation is specified by a Uniform Resource Identifier URI (RFC3986) to a Playlist.
- A Playlist is either a Media Playlist or a Master Playlist.  Both are UTF-8 text files containing URIs and descriptive tags.

### Variant Stream

Has a particular:

- Bitrate
- Format
- Resolution
- Renditions (optional)

## 3. Media Segments

- A Media Segment is specified by a URI and optionally a byte range.
- Duration is in the Media Playlist
- Media Sequence Number in segment or in the playlist, uninterrupted except 1st which starts from 0.
- If it contains a Video, should include information for video decoder initialization, example: H.264 segment should contain Instantaneous Decoding Refresh (IDR) frame.

### Formats

#### 3.2 MPEG-2 Transport Streams

- Transport Stream Segment Media Initialization section MUST contain a Program Association Table (PAT) followed by a Program Map Table (PMT) or have an `EXT-X-MAP` tag applied to it.

#### 3.3 Fragmented MPEG-4

- Header Atom, examples: Movie Fragment Box ('moof') for initialization with non-sample-specific information.
- fMP4 defined by Section 3 of ISOBMFF, with constraints on Media Data Boxes in Section 8.16 of ISOBMFF.
- The Media Initialization Section  MUST contain a File Type Box ('ftyp') containing a brand that is compatible with `iso6` or higher.  The File Type Box MUST be followed by a Movie Box.
- The Movie Box MUST contain a Track Box ('trak') for every Track Fragment Box ('traf') in the Segment, with matching `track_ID`.
- Each Track Box SHOULD contain a sample table, but its sample count MUST be zero.  
- Movie Header Boxes ('mvhd') and Track Header Boxes ('tkhd') MUST have durations of zero.
- A Movie Extends Box ('mvex') MUST follow the last Track Box.
- Every Track Fragment Box MUST contain a Track Fragment Decode Time Box ('tfdt').
- Segments MUST NOT use external data references.
- Segment in a Playlist containing the `EXT-X-I-FRAMES-ONLY` tag MAY omit the portion of the Media Data Box following the intra-coded frame (I-frame) sample data.
- Each Segment in a Media Playlist MUST have an `EXT-X-MAP` tag applied to it.
- Common Media Application Format (CMAF) Header meets all these requirements.

#### 3.4 Packed Audio

- Encoded audio samples and ID3 tags packed together with minimal framing without per-sample timestamps.
- Supported formats: Advanced Audio Coding (AAC) with Audio Data Transport Stream (ADTS) framing ISO_13818_7, MP3 ISO_13818_3, AC-3, and Enhanced AC-3.
- Segment has no Media Initialization Section
- Each Segment MUST signal the timestamp of its first sample with ID3 Private frame (PRIV) tag ID3 at the beginning of the segment. Clients SHOULD NOT play Packed Audio Segments without this ID3 tag.
- The ID3 PRIV owner identifier MUST be `"com.apple.streaming.transportStreamTimestamp"`.
- The ID3 payload MUST be a 33-bit MPEG-2 Program Elementary Stream timestamp expressed as a big-endian eight-octet number, with the upper 31 bits set to zero.

#### 3.5 WebVTT (subtitles)

- A WebVTT Segment is a section of a WebVTT file.
- The Media Initialization Section of a WebVTT Segment is the WebVTT header.
- Each WebVTT Segment MUST contain all subtitle cues that are intended to be displayed during the period indicated by the segment `EXTINF` duration.
- A WebVTT Segment MAY contain no cues; this indicates that no subtitles are to be displayed during that period.
- Each WebVTT Segment MUST either start with a WebVTT header or have an `EXT-X-MAP` tag applied to it.
- In order to synchronize timestamps between audio/video and subtitles, an `X-TIMESTAMP-MAP` metadata header SHOULD be added to each WebVTT header. This header maps WebVTT cue timestamps to MPEG-2 (PES) timestamps in other Renditions of the Variant Stream.
- The cue timestamp in the LOCAL attribute MAY fall outside the range of time covered by the segment.
- If a WebVTT segment does not have the `X-TIMESTAMP-MAP`, the client MUST assume that the WebVTT cue time of 0 maps to an MPEG-2 timestamp of 0.
- When synchronizing WebVTT with PES timestamps, clients SHOULD account for cases where the 33-bit PES timestamps have wrapped and the WebVTT cue times have not.

## 4. Playlists

- Playlist will be reloaded
- Starts with `#EXTM3U`
- The format of the Playlist files is derived from the M3U playlist file format and inherits two tags from that earlier file format: `EXTM3U` and `EXTINF`.
- String enclosed by `<>` identifies a tag parameter, parameter surrounded by `[]` is optional.
- Each Playlist file MUST be identifiable either by the path component of its URI or by HTTP Content-Type. In the first case, the path MUST end with either `.m3u8` or `.m3u`. In the second, the HTTP Content-Type MUST be `"application/vnd.apple.mpegurl"` or `"audio/mpegurl"`.
- `.m3u8` has `8` because it is encoded in UTF-8.

### 4.1 Definition of a Playlist

- Playlist files MUST be encoded in UTF-8 RFC3629
- Without Byte Order Mark (BOM)
- All character sequences MUST be normalized according to Unicode normalization form "NFC" UNICODE.
- Note that US-ASCII conforms to these rules
- Each line is a URI, is blank, or starts with the character `#`
- Blank lines are ignored
- Whitespace MUST NOT be present
- Tags begin with `#EXT`
- Case sensitive
- All other lines that begin with `#` are comments
- A URI in a Playlist, whether it is a URI line or part of a tag, MAY be relative.  Any relative URI is considered to be relative to the URI of the Playlist that contains it.
- The duration of a Media Playlist is the sum of the durations of the Media Segments within it.
- The segment bit rate of a Media Segment is described in this section.

### 4.2 Attribute Lists

- Certain tags have values that are attribute-lists. An attribute-list is a comma-separated list of attribute/value pairs with no whitespace.
- Syntax: AttributeName=AttributeValue
- AttributeNames contain only uppercase letters, not lowercase.
- There MUST NOT be any whitespace around the '=' character.
- No duplicates

### 4.3. Playlist Tags

Playlist tags specify either global parameters of the Playlist or information about the Media Segments or Media Playlists that appear after them.

#### 4.3.1. Basic Tags

- `EXTM3U` indicates the playlist file as Extended M3U
- `#EXT-X-VERSION:<n>` compatibility version

#### 4.3.2. Media Segment Tags

- A Media Segment tag MUST NOT appear in a Master Playlist.
- `#EXTINF:<duration>,[<title>]` required, duration of the next segment
- `#EXT-X-BYTERANGE:<n>[@<o>]` optional, sub-range of the resource
- `#EXT-X-DISCONTINUITY` discontinuity between followed and preceded segments, if any change in the: format, number, type, ids, timestamps and maybe for encoding.
- `#EXT-X-KEY:<attribute-list>` specifies how to decrypt segments, with METHOD, URI, IV, KEYFORMAT, KEYFORMATVERSIONS.
- `#EXT-X-MAP:<attribute-list>` specifies how to obtain Media Initialization Section, with URI, BYTERANGE.
- `#EXT-X-PROGRAM-DATE-TIME:2010-02-19T14:54:23.031+08:00` associates first sample of the segment with an absolute date and/or time for the next segment.
- `#EXT-X-DATERANGE:<attribute-list>` associates a Date Range with a set of attribute/value pairs with ID, CLASS, START-DATE, END-DATE, DURATION, PLANNED-DURATION, `X-<client-attribute>`, SCTE35-CMD/OUT/IN, END-ON-NEXT.

#### 4.3.3. Media Playlist Tags

Describe global parameters, can not appear in Master Playlist.

- `#EXT-X-TARGETDURATION:<s>` maximum segment duration
- `#EXT-X-MEDIA-SEQUENCE:<number>` number of the first segment in the playlist
- `#EXT-X-DISCONTINUITY-SEQUENCE:<number>` allows sync between diff Renditions of the same Variant Stream/Streams than have Discontinuity tag.
- `#EXT-X-ENDLIST` indicates that no more segments will be added to the playlist.
- `#EXT-X-PLAYLIST-TYPE:<type-enum>` mutability information about playlist, EVENT (live) or VOD (const).
- `#EXT-X-I-FRAMES-ONLY` indicates that each segment describes a single I-frame.

#### 4.3.4 Master Playlist Tags

Defines Variant Streams, Renditions and other global params.

- `#EXT-X-MEDIA:<attribute-list>` used to relate playlists that contain alternative renditions of the same content. With TYPE, URI, GROUP-ID, LANGUAGE, ASSOC-LANGUAGE, NAME, DEFAULT, AUTOSELECT, FORCED, INSTREAM-ID, CHARACTERISTICS, CHANNELS.
- `#EXT-X-STREAM-INF:<attribute-list>` specifies a Variant Stream which is a set of Renditions. With BANDWITH, AVERAGE-BANDWITH, CODECS, RESOLUTION, FRAME-RATE, AUDIO, VIDEO, SUBTITLES, CLOSED-CAPTIONS.
- `#EXT-X-I-FRAME-STREAM-INF:<attribute-list>` identitifes playlist containing the I-frames. With URI.
- `#EXT-X-SESSION-DATA:<attribute-list>` allows arbitrary session data to be carried. With DATA-ID, VALUE, URI, LANGUAGE.
- `#EXT-X-SESSION-KEY:<attribute-list>` allows encryption keys specified in Master Playlist.

#### 4.3.5. Media or Master Playlist Tags

If any of these tags appears in the Master Playlist, then it SHOULD NOT appear in usual ones, or with the same values only.

- `#EXT-X-INDEPENDENT-SEGMENTS` indicates that all media samples in a segment can be decoded without information from other segments.
- `#EXT-X-START:<attribute-list>` indicates a preferred point at which to start playing a Playlist. With TIME-OFFSET, PRECISE.

## 5. Key Files

- `EXT-X-KEY` tag with a URI attribute identitifes a Key file with a cipher key. AES-128 packed array of 16 octets in binary.

## 6. Client/Server Rsponsibilities

- How the server generates the Playlist and Media Segments
- How the client should download them for playback

### 6.2. Server Responsibilities

- MUST divide the source media into individual Media Segments where duration <= of source.
- MUST create a URI for each segment, if supports partial loading - use a sub-ranges.
- SHOULD transfer text files using `gzip` Content-Encoding if client indicates that it's prepared to receive it.
- MUST create a Media Playlist file.
- Changes to the Playlist file MUST be atomic. Append/Remove Lines.
- MAY associate an absolute date and time with a Media Segment.
- To remove an entire presentation, it SHOULD an naswer with HTTP 404 or 410 response.
- For the live playlists media-sequence tag must only grow.
- A server MAY offer multiple Media Playlist files to provide different encodings of the same presentation.  If it does so, it SHOULD provide a Master Playlist file that lists each Variant Stream to allow clients to switch between encodings dynamically.
- Each Variant stream MUST present the same content.
- Matching content in Variant Streams MUST have matching timestamps. This allows clients to synchronize the media.
- Matching content in Variant Streams MUST have matching Discontinuity Sequence Numbers.
- Each Media Playlist in each Variant Stream MUST have the same target duration. The only exceptions are SUBTITLES Renditions and Media Playlists containing an EXT-X-I-FRAMES-ONLY tag, which MAY  have different target durations if they have an EXT-X-PLAYLIST-TYPE of VOD.
- Content that appears in a Media Playlist of one Variant Stream but not in another MUST appear either at the beginning or at the end of the Media Playlist file and MUST NOT be longer than the target duration.
- If any Media Playlists have an EXT-X-PLAYLIST-TYPE tag, all Media Playlists MUST have an EXT-X-PLAYLIST-TYPE tag with the same value.
- If the Playlist contains an EXT-X-PLAYLIST-TYPE tag with the value of VOD, the first segment of every Media Playlist in every Variant Stream MUST start at the same media timestamp.
- If any Media Playlist in a Master Playlist contains an EXT-X- PROGRAM-DATE-TIME tag, then all Media Playlists in that Master Playlist MUST contain EXT-X-PROGRAM-DATE-TIME tags with consistent mappings of date and time to media timestamps.
- Each Variant Stream MUST contain the same set of Date Ranges, each one identified by an EXT-X-DATERANGE tag(s) with the same ID attribute value and containing the same set of attribute/value pairs.
- In addition, for broadest compatibility, Variant Streams SHOULD contain the same encoded audio bitstream.  This allows clients to switch between Variant Streams without audible glitching.

### 6.3. Client Responsibilities

- If the Playlist file so obtained is a Master Playlist, the client can select a Variant Stream to load from the Master Playlist.
- All clients MUST support HTTP schemes.
- Ignore any unrecognized tags.
- Ignore any attribute/value pair with an unrecognized AttributeName.
- Ignore any tag containing an attribute/value pair of type enumerated-string whose AttributeName is recognized but whose AttributeValue is not recognized, unless the definition of the attribute says otherwise.

#### 6.3.2. Loading the Media Playlist File

- Segments with the same Media Sequence Number in different Variant Streams or Renditions could have a different position in the presentation
- Playlists MAY have independent Media Sequence Numbers.
- Client MUST use the relative position of each segment on the Playlist timeline and its Discontinuity Sequence Number to locate corresponding segments.
- A client MUST load the Media Playlist file of every Rendition selected for playback in order to locate the media specific to that Rendition.

#### 6.3.3. Playing the Media Playlist File

- MUST choose which Media Segment to play first from the Media Playlist when playback starts.
- SHOULD NOT choose a segment that starts less than three target durations from the end of the Playlist file.
- MAY present the available media in any way it wishes, including normal playback, random access, and trick modes.
- SHOULD deal with encoding changes as they are encountered, for example, by scaling video content to accommodate a resolution change.
- If the Variant Stream includes a RESOLUTION attribute, clients SHOULD display all video within a rectangle with the same proportions as that resolution.
- SHOULD be prepared to handle multiple tracks of a particular type (e.g., audio or video).
- Without a preference it SHOULD choose the track with the lowest numerical track identifier that it can play.
- SHOULD ignore private streams inside Transport Streams that they do not recognize.
- MUST be prepared to reset its parser(s) and decoder(s) before playing a Media Segment.
- SHOULD attempt to load Media Segments in advance of when they will be required for uninterrupted playback to compensate for temporary variations in latency and throughput.
- MAY use the value of the EXT-X-PROGRAM-DATE-TIME tag to display the program origination time to the user. If the value includes time zone information, the client SHALL take it into account; if it does not, the client MAY assume the time to be local.
- If the first EXT-X-PROGRAM-DATE-TIME tag in a Playlist appears after one or more Media Segment URIs, the client SHOULD extrapolate backward from that tag (using EXTINF durations and/or media timestamps) to associate dates with those segments. To associate a date with any other Media Segment that does not have an EXT-X-PROGRAM-DATE-TIME tag applied to it directly, the client SHOULD extrapolate forward from the last EXT-X-PROGRAM-DATE-TIME tag appearing before that segment in the Playlist.

#### 6.3.4. Reloading the Media Playlist File

- MUST periodically reload a Media Playlist file to learn what media is currently available, unless it contains an EXT-X-PLAYLIST-TYPE tag with a value of VOD, or a value of EVENT and the EXT-X-ENDLIST tag is also present.
- MUST wait for at least the target duration before attempting to reload the Playlist file again.
- IF Playlist file has not changed, then it MUST wait for a period of one-half the target duration before retrying.
- SHOULD verify that each Media Segment in it has the same URI (and byte range, if specified) as the Media Segment with the same Media Sequence Number in the previous Media Playlist.
- SHOULD NOT reload the Playlist files of Variant Streams or alternate Renditions that are not currently being played.
- If it decides to switch playback to a different Variant Stream, it SHOULD stop reloading the Playlist of the old Variant Stream and begin loading the Playlist of the new Variant Stream.
- MUST NOT attempt to use the Media Sequence Number to synchronize between streams.

#### 6.3.5. Determining the Next Segment to Load

- MUST examine the Media Playlist file every time it is loaded or reloaded to determine the next Media Segment to load.

#### 6.3.6. Decrypting Encrypted Media Segments

- MUST ignore any EXT-X-KEY tag with an unsupported or unrecognized KEYFORMAT attribute.
- IF EXT-X-KEY tags with unrecognized or unsupported KEYFORMAT attributes are applied, playback SHOULD fail.
- MUST NOT attempt to decrypt any segments whose EXT-X-KEY tag has a METHOD attribute that it does not recognize.

## 10. Security Considerations

- Implementors SHOULD pay particular attention to code that will parse data received from a server and ensure that all possible inputs are handled correctly.
- SHOULD range-check responses to prevent buffer overflows.
- SHOULD limit each playback session to a reasonable number of concurrent downloads (e.g., four) to avoid contributing to denial-of-service attacks.
- HTTP requests often include session state ("cookies"), which may contain private user data. Implementations MUST follow cookie restriction and expiry rules specified by "HTTP State Management Mechanism" RFC6265 to protect themselves from attack.
- Encryption keys are specified by URI. The delivery of these keys SHOULD be secured by a mechanism such as HTTP Over TLS RFC2818 (formerly SSL) in conjunction with a secure realm or a session token.
