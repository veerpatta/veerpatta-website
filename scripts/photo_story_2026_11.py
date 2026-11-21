"""Make the November 2026 photo-story set (see CHANGELOG, 2026-11-21).

Usage:
    python3 scripts/photo_story_2026_11.py <originals_dir> [id ...]

<originals_dir> holds the full-size originals downloaded from the school's
Drive photo library. They are private and are never committed. The local
names used below map to these Drive files:

    maths-exhibition-2026.jpg  VPPS_Learning_Student_Maths_Exhibition_2026.jpg
    sd25-early-years.heic      VPPS_SportsDay_2025-02-10_Early-Years-Track-Games.heic
    sd25-sprint-start.heic     VPPS_SportsDay_2025-02-10_Sprint-Starting-Line.heic
    slc-seasons.jpg            VPPS_SLC2023_Primary_Students_Nature_Models.jpg
    slc-placevalue.jpg         VPPS_SLC2023_Interactive_Maths_Place_Value.jpg
    slc-planets.jpg            VPPS_SLC2023_Solar_System_Visitor_Explanation.jpg
    slc-angles.jpg             VPPS_SLC2023_Hands_On_Learning_Adult_Participation.jpg
    slc-circulatory.jpg        VPPS_SLC2023_Circulatory_System_Student_Model.jpg
    slc-greenhouse.jpg         VPPS_SLC2023_Science_Model_Student_Explanation.jpg
    slc-tablet.jpg             VPPS_SLC2023_Tablet_Learning_Student_Demonstration.jpg
    football-goal.jpg          12_FootballLawn_Goalpost.jpg

Two photos come from files already in this repo: a frame of
assets/media/videos/hero-loop-720.mp4 (the inter-house dance) and a crop of
assets/media/photos/dance-lawn-1200.webp (the school film poster).

Each photo is turned upright from EXIF, converted to sRGB, cropped to a box
(pixels in the original), lightly finished with scripts/grade.py (white
balance, exposure and shadow lift, clarity only where there is texture) and
saved as WebP and AVIF with no metadata. Nothing in any frame is added,
removed or retouched. Crops of the Drive photos keep every pupil's face out
of frame; faces appear only in photos the website had already published.
Needs Pillow with AVIF, pillow-heif, numpy and opencv-python-headless.
"""
import io, json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageCms, ImageFilter, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'scripts'))
from grade import grade  # noqa: E402

ORIG = sys.argv[1] if len(sys.argv) > 1 else 'originals'
OUT = REPO + '/assets/media/photos'
SRGB = ImageCms.createProfile('sRGB')

# Restrained documentary finish: white balance, a little exposure and shadow
# lift, clarity only where there is texture. Nothing in the frame is changed.
G = dict(wb=0.15, shadows=0.3, highlights=0.2, clahe=0.35, vibrance=0.1, contrast=0.04)
JOBS = {
    'learning-exhibition': dict(src='maths-exhibition-2026.jpg', widths=[480, 800, 1200, 1600],
                                grade=dict(G, wb=0.1, shadows=0.25, clahe=0.25)),
    'hero-exhibition-phone': dict(src='maths-exhibition-2026.jpg', box=(0, 20, 1240, 640), widths=[480, 800, 1200],
                                  grade=dict(G, wb=0.1, shadows=0.25, clahe=0.25), aq=44),
    'hero-exhibition-panel': dict(src='maths-exhibition-2026.jpg', box=(360, 0, 1200, 720), widths=[480, 840],
                                  grade=dict(G, wb=0.1, shadows=0.25, clahe=0.25), aq=44),
    'early-years-dance': dict(src='video:hero-loop-720.mp4', box=(140, 140, 1280, 720), widths=[480, 800, 1140],
                              grade=dict(G, highlights=0.35, green=0.15, clahe=0.15), denoise=True, dn=5, q=60, aq=44),
    'early-years-track': dict(src='sd25-early-years.heic', box=(1150, 330, 3750, 1730), widths=[480, 800, 1200],
                              grade=dict(G, highlights=0.3, sky=0.15, clahe=0.15), q=56, aq=42, sharpen=False),
    'seasons-model': dict(src='slc-seasons.jpg', box=(360, 1330, 3640, 2970), widths=[480, 800, 1200]),
    'place-value-blocks': dict(src='slc-placevalue.jpg', box=(440, 1300, 2920, 2850), widths=[480, 800, 1200]),
    'planets-project': dict(src='slc-planets.jpg', box=(60, 1780, 2100, 3000), widths=[480, 800, 1200]),
    'angles-board': dict(src='slc-angles.jpg', box=(1040, 1150, 2640, 2217), widths=[480, 800, 1200]),
    'circulatory-model': dict(src='slc-circulatory.jpg', box=(950, 1800, 2900, 2950), widths=[480, 800, 1200]),
    'greenhouse-model': dict(src='slc-greenhouse.jpg', box=(1400, 1080, 3744, 2252), widths=[480, 800, 1200]),
    'tablet-quiz': dict(src='slc-tablet.jpg', box=(0, 1900, 2252, 3307), widths=[480, 800, 1200]),
    'sprint-start': dict(src='sd25-sprint-start.heic', box=(760, 540, 3120, 2015), widths=[480, 800, 1200],
                         grade=dict(G, highlights=0.3, sky=0.15, clahe=0.12), q=50, aq=40, sharpen=False),
    'football-goal': dict(src='football-goal.jpg', box=(300, 300, 3900, 2950), widths=[480, 800, 1200],
                          grade=dict(G, highlights=0.25, green=0.15, sky=0.1, clahe=0.12), q=50, aq=40, sharpen=False),
    'film-dance-poster': dict(src='repo:dance-lawn-1200.webp', box=(170, 0, 1130, 540), widths=[480, 800, 960],
                              grade=None, sharpen=False, aq=44),
}


def to_srgb(im):
    icc = im.info.get('icc_profile')
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            im = ImageCms.profileToProfile(im, src, SRGB, renderingIntent=ImageCms.Intent.PERCEPTUAL, outputMode='RGB')
        except Exception as e:  # unreadable profile: keep pixels as they are
            print('  icc skipped:', e)
    return im.convert('RGB')


def sharpest_frame(path, start, end, step=0.1):
    import cv2
    best = None
    t = start
    while t <= end:
        raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-ss', f'{t:.2f}', '-i', path, '-frames:v', '1',
                              '-f', 'image2pipe', '-vcodec', 'png', '-'], capture_output=True).stdout
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        g = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2GRAY)[300:650, 200:1200]
        v = cv2.Laplacian(g, cv2.CV_64F).var()
        if best is None or v > best[0]:
            best = (v, t, im)
        t += step
    print(f'  sharpest frame at {best[1]:.2f}s (focus {best[0]:.0f})')
    return best[2]


def load(src):
    if src.startswith('video:'):
        return sharpest_frame(REPO + '/assets/media/videos/' + src[6:], 3.5, 6.5)
    if src.startswith('repo:'):
        return Image.open(OUT + '/' + src[5:]).convert('RGB')
    im = Image.open(ORIG + '/' + src)
    im = ImageOps.exif_transpose(im)
    return to_srgb(im)


SHARPEN = ImageFilter.UnsharpMask(radius=0.8, percent=55, threshold=3)


def run(pid, job, report):
    im = load(job['src'])
    if job.get('box'):
        im = im.crop(job['box'])
    if job.get('denoise'):
        import cv2
        a = cv2.fastNlMeansDenoisingColored(np.asarray(im), None, job.get('dn', 3), job.get('dn', 3), 5, 15)
        im = Image.fromarray(a)
    g = job.get('grade', G)
    if g:
        im = grade(im, g)
    im.info = {}
    W, H = im.size
    out = {}
    for w in job['widths']:
        w = min(w, W)
        h = round(H * w / W)
        r = im.resize((w, h), Image.LANCZOS) if w != W else im.copy()
        if job.get('sharpen', True) and w != W:
            r = r.filter(SHARPEN)
        r.info = {}
        wp = f'{OUT}/{pid}-{w}.webp'
        r.save(wp, 'WEBP', quality=job.get('q', 72), method=6)
        av = f'{OUT}/{pid}-{w}.avif'
        r.save(av, 'AVIF', quality=job.get('aq', 52), speed=4)
        out[w] = (os.path.getsize(wp), os.path.getsize(av), h)
    top = max(out)
    report[pid] = dict(w=top, h=out[top][2], widths=sorted(out),
                       bytes={w: dict(webp=v[0], avif=v[1]) for w, v in out.items()})
    print(pid, im.size, {w: f'{v[0]//1024}K/{v[1]//1024}K' for w, v in out.items()})


if __name__ == '__main__':
    ids = sys.argv[2:] or list(JOBS)
    report = {}
    for pid in ids:
        run(pid, JOBS[pid], report)
    print(json.dumps(report, indent=1))
