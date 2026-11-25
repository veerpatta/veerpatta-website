"""Add AVIF copies of school photos that so far had only WebP (25 Nov 2026).

Phones that understand AVIF (nearly all Android Chrome and iPhone Safari in
use) then download a smaller file for the same picture. The WebP stays as the
fallback, so nothing changes for older browsers.

The original camera files are not in the repo, so each AVIF is made from the
published WebP of the same width. Each width is encoded at the LOWEST AVIF
quality (from 55 up to 85) whose result still looks the same as the WebP:
SSIM against the WebP of 0.985 or higher. The fixed quality 52 used by
scripts/photo_story_2026_11.py visibly softened grass and crowds here
(SSIM down to 0.93), which would change how the photos look. A photo gains
AVIF only if every width passes and is at least 12% smaller; anything else
stays WebP-only and is listed.

Prints the ids that gained AVIF; src/data/media.ts lists them in AVIF_ADDED.
Needs Pillow with AVIF support and numpy.
"""
import glob, os, re, sys
import numpy as np
from PIL import Image

OUT = 'assets/media/photos'
MIN_SAVING = 0.12
MIN_SSIM = 0.985
QUALITIES = (55, 60, 65, 70, 75, 80, 85)


def ssim(a, b):
    # Global SSIM on luma, computed in 8x8 blocks and averaged.
    a = np.asarray(a.convert('L'), dtype=np.float64)
    b = np.asarray(b.convert('L'), dtype=np.float64)
    h, w = (a.shape[0] // 8) * 8, (a.shape[1] // 8) * 8
    a = a[:h, :w].reshape(h // 8, 8, w // 8, 8)
    b = b[:h, :w].reshape(h // 8, 8, w // 8, 8)
    ma, mb = a.mean((1, 3)), b.mean((1, 3))
    va, vb = a.var((1, 3)), b.var((1, 3))
    cov = ((a - ma[:, None, :, None]) * (b - mb[:, None, :, None])).mean((1, 3))
    c1, c2 = (0.01 * 255) ** 2, (0.03 * 255) ** 2
    s = ((2 * ma * mb + c1) * (2 * cov + c2)) / ((ma ** 2 + mb ** 2 + c1) * (va + vb + c2))
    return float(s.mean())


def main():
    ids = sorted({re.sub(r'-\d+\.webp$', '', os.path.basename(p)) for p in glob.glob(f'{OUT}/*-*.webp')})
    added, refused, before, after = [], [], 0, 0
    for pid in ids:
        webps = sorted(glob.glob(f'{OUT}/{pid}-[0-9]*.webp'))
        webps = [p for p in webps if re.fullmatch(rf'{re.escape(pid)}-\d+\.webp', os.path.basename(p))]
        if not webps or any(os.path.exists(p[:-5] + '.avif') for p in webps):
            continue
        made, ok = [], True
        for wp in webps:
            av = wp[:-5] + '.avif'
            with Image.open(wp) as im:
                im = im.convert('RGB')
                for q in QUALITIES:
                    im.save(av, 'AVIF', quality=q, speed=4)
                    with Image.open(av) as back:
                        s = ssim(im, back)
                    if s >= MIN_SSIM:
                        break
            ws, as_ = os.path.getsize(wp), os.path.getsize(av)
            made.append((av, ws, as_))
            if s < MIN_SSIM or as_ > ws * (1 - MIN_SAVING):
                ok = False
                refused.append(f'{os.path.basename(wp)} ssim={s:.4f} webp={ws} avif={as_}')
        if ok:
            added.append(pid)
            before += sum(m[1] for m in made)
            after += sum(m[2] for m in made)
        else:
            for av, _, _ in made:
                os.remove(av)
    print('AVIF added:', ' '.join(added))
    print(f'{len(added)} photos; WebP {before/1024:.0f} KB -> AVIF {after/1024:.0f} KB')
    if refused:
        print('Left WebP-only (a width failed the size or look check):')
        print('\n'.join('  ' + r for r in refused))


if __name__ == '__main__':
    sys.exit(main())
