# Revamp media provenance and review

Reviewed 8 November 2026. This revamp uses the school's existing repository photographs and video assets. No new private Drive photographs, pupil portraits, ID cards, or raw videos were downloaded into the public site. No source photo was replaced.

## New campus-story film

- File: `assets/media/videos/school-story-720.mp4`.
- An edited, silent montage of six existing real school photographs. It is not continuous footage, a live camera view, or a recording of one school day.
- Gentle editorial push-ins of at most 5.5%, with 0.5-second crossfades. English and Hindi scene labels are burned in. There are no generated pupils, altered facilities, invented awards, voices, music or other audio.
- Intended display text: **A 24-second edited film made from real school photographs.**
- Hindi: **विद्यालय की वास्तविक तस्वीरों से बनी 24 सेकंड की संपादित फ़िल्म।**
- Recommended player: controls, playsinline, preload="none", a responsive poster, and optional descriptive caption tracks. Do not autoplay on phones or when reduced-motion/data-saving preferences are enabled.

### Exact source images and labels

All source paths below are relative to the repository root. Their photo IDs and descriptive captions are already recorded in `scripts/photos-manifest.json` and `_data/photos.yml`.

| Approximate sequence | Source image | Visible subject / English label | Hindi label |
|---|---|---|---|
| 0:00–0:04 | `assets/media/photos/campus-front-1600.webp` | The main entrance | विद्यालय का प्रवेश द्वार |
| 0:04–0:08 | `assets/media/photos/activity-room-1200.webp` | Space for young learners | नन्हे बच्चों का गतिविधि कक्ष |
| 0:08–0:12 | `assets/media/photos/computer-lab-wide-1200.webp` | Our computer lab | हमारी कंप्यूटर लैब |
| 0:12–0:16 | `assets/media/photos/sports-finish-1200.webp` | Sport, effort and energy | खेल, प्रयास और उत्साह |
| 0:16–0:20 | `assets/media/photos/dance-lawn-1200.webp` | School life, in colour | स्कूली जीवन के रंग |
| 0:20–0:24 | `assets/media/photos/campus-lawn-1600.webp` | See the campus for yourself | आइए, हमारा परिसर देखिए |

The entrance and lawn photographs are documented as the 5 March 2026 campus shoot. The activity room and computer lab are documented as February 2026 photographs. The original repository does not consistently establish the sports photograph's event year, so the new film deliberately gives no year, placing or competition achievement. The dance caption identifies the visible activity without adding a new date or achievement.

The source photographs were already colour-graded and optimized in the repository. The film adds only editorial crop, movement, crossfade and text. No generative editing is used. A 16:9 crop is used, with the runner kept on the right and the dance group near the centre. Labels describe the visible scenes rather than asserting a school outcome.

### Poster and captions

- `assets/media/photos/video-school-story-480.webp` (480×270)
- `assets/media/photos/video-school-story-800.webp` (800×450)
- `assets/media/photos/video-school-story-1200.webp` (1200×675)
- `assets/media/videos/school-story-en.vtt`
- `assets/media/videos/school-story-hi.vtt`

The poster is a 16:9 crop of `campus-front-1600.webp`, without added people, logos, facilities or text. The WebVTT files describe the visual sequence. Because the film is silent, they are descriptive captions rather than a transcript of speech.

## Existing media selection

Recommended authentic hero: `campus-lawn-1600.webp`, 4:3 composition, object-position around `center 40%`. For a pupil-free entrance view use `campus-front-1600.webp`, around `center 45%`. Preserve the original architecture and sign when cropping. On mobile, `campus-lawn-tall-800.webp` is the existing portrait derivative.

Strong real supporting images:

- Campus: `campus-approach-1200.webp`, `assembly-courtyard-1200.webp`, `veranda-1200.webp`, `school-hall-1200.webp`.
- Learning spaces: `activity-room-1200.webp`, `classroom-benches-1200.webp`, `computer-lab-wide-1200.webp`, `science-lab-1200.webp`.
- Learning in action: `learning-exhibition-800.webp`; retain its wide composition and avoid aggressive enlargement. `robotics-training-800.webp` depicts adult staff training, not a student robotics class.
- Student life: `sports-finish-1200.webp`, `sports-drill-1200.webp`, `dance-lawn-1200.webp`, `ncc-cadets-1200.webp`.

Wide event photos are around 2.22:1. Prefer 16:9 or wider cards, with individual crop positioning, rather than automatic square crops that cut off participants. The science-lab and veranda photos are portrait and suit portrait cards.

## Explicitly synthetic or uncertain legacy assets

The following are marked `illustration: true` in the existing manifest and must not be presented as documentary school photography:

- `ai-campus-hero-*`
- `ai-campus-portrait-*`
- `ai-classroom-learning-*`
- `ai-computer-learning-*`

The manifest describes synthetic pupils and altered campus details in the AI hero images. AI images are excluded from the new film.

`assets/images/hero-main.png`, `assets/images/hero-popout.png` and `assets/media/gallery/academic/student-reading.jpg` lack reliable documentary provenance for this review. They should not be promoted into the authentic photo gallery. The reading image also displays an AI-style watermark.

## Content integrity and privacy

- The repository already contains pupil event photos. Reuse does not establish new consent; the school should maintain its guardian/adult publication permission records. No new private student media was added for this film.
- The private marketing collection explicitly distinguishes raw/source material from publication-cleared material. Do not publish new material merely because it is in that folder. Review selected excerpts with sound and check IDs, names, permissions and music rights first.
- Existing sports-video metadata and source notes disagree on some event years. Use descriptive, undated event captions unless the actual source date has been verified.
- Do not derive prize counts, academic results, alumni outcomes or rankings from activity or award-ceremony pictures.
- Existing copy contains conflicting enrollment counts, an unverified founding year, unsourced testimonials and teacher biographies, and static data labelled as live seats. None are evidence for new claims.
- The main public phone number and Amet/Rajsamand location are corroborated. Email addresses vary between site files and public listings. Do not invent a replacement address.

## Export verification

- Duration: 24.000 seconds, 576 frames at 24 fps.
- Video: H.264 High profile, 1280×720, yuv420p, approximately 1.31 Mbit/s.
- File size: 3,916,673 bytes (3.92 MB decimal / 3.74 MiB).
- Audio: none; ffprobe reports exactly one video stream.
- Fast start confirmed: `moov` precedes `mdat` (byte positions 36 and 7429).
- Source metadata removed during export (`-map_metadata -1`); no source EXIF/GPS or device information is copied.
- Poster sizes: 27,806 bytes (480×270), 62,934 bytes (800×450), 116,826 bytes (1200×675).
- Quality checks: representative frames from all six scenes inspected at output aspect ratio; full video decoded without ffmpeg errors; Hindi text shaped using Noto Sans Devanagari with RAQM.
