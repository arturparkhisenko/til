# Dynamic adaptive streaming over HTTP (DASH)

> [ISO/IEC 23009-1:2014](https://www.iso.org/standard/65274.html), [mpeg-dash on mpeg.chiariglione.org](https://mpeg.chiariglione.org/standards/mpeg-dash)

Current Publication date: 2014-05, Edition: 2.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Media presentation description and segment formats](#media-presentation-description-and-segment-formats)
  - [3. Terms, definitions, symbols and abbreviated terms](#3-terms-definitions-symbols-and-abbreviated-terms)
    - [3.1.23 Media Presentation Description (MPD)](#3123-media-presentation-description-mpd)
    - [3.1.24 Media Presentation timeline](#3124-media-presentation-timeline)
  - [4 Introduction](#4-introduction)
    - [4.1 System description](#41-system-description)
    - [4.2 DASH client model](#42-dash-client-model)
    - [4.3 DASH data model overview](#43-dash-data-model-overview)
      - [DASH High-Level Data Model](#dash-high-level-data-model)
- [Examples](#examples)
  - [Generate with ffmpeg](#generate-with-ffmpeg)
- [URLs](#urls)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Media presentation description and segment formats

> Part number: 1

### 3. Terms, definitions, symbols and abbreviated terms

#### 3.1.23 Media Presentation Description (MPD)

Formalized description for a Media Presentation for the purpose of providing a streaming service.

#### 3.1.24 Media Presentation timeline

Concatenation of the timeline of all Periods which itself is common to all Representations in the Period.

### 4 Introduction

#### 4.1 System description

Dynamic Adaptive Streaming over HTTP (DASH) specifies XML and binary formats that enable delivery of media content from standard HTTP servers to HTTP clients and enable caching of content by standard HTTP caches.

This part of ISO/IEC 23009 primarily defines two formats:

- The Media Presentation Description (MPD) describes a Media Presentation, i.e. a bounded or unbounded presentation of media content. In particular, it defines formats to announce resource identifiers for Segments and to provide the context for these identified resources within a Media Presentation. These resource identifiers are HTTP-URLs possibly combined with a byte range.
- The Segment formats specify the formats of the entity body of the HTTP response to an HTTP GET request or a partial HTTP GET with the indicated byte range using HTTP/1.1 as defined in RFC 2616 to a resource identified in the MPD. Segments typically contain efficiently coded media data and metadata conforming to or at least closely aligned with common media formats.

#### 4.2 DASH client model

- The output of the DASH access engine consists of media in MPEG container formats, or parts thereof, together with timing information that maps the internal timing of the media to the timeline of the Media Presentation.
- In addition, the DASH access client may also receive and extract Events that are related to the media time. The events may be processed in the DASH client or may be forwarded to an application in the execution environment of the DASH client.

#### 4.3 DASH data model overview

- `MPD` The collection of encoded and deliverable versions of media content and the appropriate description of these form a Media Presentation. This describes the sequence of Periods.
- `Period` Media content is composed of a single or multiple contiguous media content periods in time. A Period typically represents a media content (audio or video) period during which a consistent set of encoded versions of the media content is available i.e. the set of available bitrates, languages, captions, subtitles etc. does not change during a Period.
- `AdaptationSet` An Adaptation Set represents a set of interchangeable encoded versions (aka streams) of one or several media content components. For example there may be one Adaptation Set for the main video component and a separate one for the main audio component. If there is other material available, for example captions or audio descriptions, then these may each have a separate Adaptation Set. Material may also be provided in multiplexed form, in which case interchangeable versions of the multiplex may be described as a single Adaptation Set, for example an Adaptation Set containing both the main audio and main video for a Period. Each of the multiplexed components may be described individually by a media content component description. Content in different media content periods may be completely independent or certain periods of a Media Presentation may belong to the same Asset, for example a Media Presentation is a collection of main program composed of multiple periods, each assigned to the same Asset, and interleaved with inserted advertisement periods.
- `Representation`  A Representation describes a deliverable encoded version of one or several media content components. A Representation includes one or more media streams (one for each media content component in the multiplex). Any single Representation within an Adaptation Set is sufficient to render the contained media content components. By collecting different Representations in one Adaptation Set, the Media Presentation author expresses that the Representations represent perceptually equivalent content. Typically this means, that clients may switch dynamically from Representation to Representation within an Adaptation Set in order to adapt to network conditions or other factors. Switching refers to the presentation of decoded data up to a certain time t, and presentation of decoded data of another Representation from time t onwards. If Representations are included in one Adaptation Set, and the client switches properly, the Media Presentation is expected to be perceived seamless across the switch. Clients may ignore Representations that rely on codecs or other rendering technologies they do not support or that are otherwise unsuitable.
- `Segment` Within a Representation, the content may be divided in time into Segments (see 5.3.9 and 6) for proper accessibility and delivery. In order to access a Segment, a URL is provided for each Segment. Consequently, a Segment is the largest unit of data that can be retrieved with a single HTTP request. NOTE This is not strictly true, since the MPD may also include a byte range with the URL, meaning that the Segment is contained in the provided byte range of some larger resource. An intelligent client could in principle construct a single request for multiple Segments, but this would not be the typical case.

##### DASH High-Level Data Model

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<MPD>
  <Period>
    <AdaptationSet>
      <Representation>
        <Segment/>
        <SubRepresentation>
          <SubSegment/>
        </SubRepresentation>
      </Representation>
    </AdaptationSet>
  </Period>
</MPD>
```

> Continue page 16

## Examples

### Generate with ffmpeg

```sh
ffmpeg -i testsrc-hd720-rate24.h264.mp4 -codec copy -f dash test-1/testsrc.mpd

ffmpeg -i testsrc-hd720-rate24.h264.mp4 -codec copy -f dash -seg_duration 2 -use_template 1 -use_timeline 1 test-1/testsrc.mpd

ffmpeg -i testsrc-hd720-rate24.h264.mp4  -c copy -f dash -window_size 20 -seg_duration 4 -single_file 1 -init_seg_name '$RepresentationID-$.m4s' -media_seg_name '$RepresentationID$-$Number%05d$.m4s' -use_template 0 test-2/testsrc.mpd

ffmpeg -i testsrc-hd720-rate24.h264.mp4 -codec copy -f dash -seg_duration 4 -use_template 1 -use_timeline 1 -init_seg_name '$RepresentationID$-init.m4s' -media_seg_name '$RepresentationID$-$Time$.m4s' test-3/testsrc.mpd
```

## URLs

- [DASH-IF Guidelines](https://dashif.org/guidelines/)
- [DASH-IF Interoperability Points v4.3 2018, 3.3. Client Implementation Guidelines](https://dashif.org/docs/DASH-IF-IOP-v4.3.pdf)
- [DASH-IF conformance tests](https://conformance.dashif.org/)
