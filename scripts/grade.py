"""Marketing-grade photo finishing for VPPS campus photos.

grade(im, g) takes a PIL RGB image and a dict of settings, returns a PIL image.
All settings are optional; the defaults leave the photo untouched.

  rotate    degrees, + = counter-clockwise (level a tilted horizon)
  keystone  0..0.3, straightens converging verticals from a phone tilted up
            (+) or down (-); the frame is then cropped back to a rectangle
  wb        0..1, how far to neutralise the colour cast of the brightest
            non-sky areas (white walls, white paint) toward true white
  ev        exposure in stops (+0.3 = a third of a stop brighter)
  shadows   0..1, lifts dark areas without greying the whites
  highlights 0..1, pulls back bright areas (clouds, sunlit walls)
  clahe     0..3, local contrast on lightness only ("clarity")
  contrast  -0.5..0.5, gentle S-curve
  vibrance  0..1, boosts muted colours more than already-strong ones
  warmth    -0.1..0.1, + = warmer
  green     0..0.5, extra life in grass and leaves only
  sky       0..0.5, deepens a washed-out blue sky only
"""
import math
import numpy as np
from PIL import Image

try:
    import cv2
except ImportError:  # grading still works, without clarity/keystone
    cv2 = None


def _keystone(a, k):
    h, w = a.shape[:2]
    d = abs(k) * w / 2
    if k > 0:   # top is too narrow: pull the top corners outward
        src = np.float32([[d, 0], [w - d, 0], [w, h], [0, h]])
    else:       # bottom too narrow
        src = np.float32([[0, 0], [w, 0], [w - d, h], [d, h]])
    dst = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
    M = cv2.getPerspectiveTransform(src, dst)
    out = cv2.warpPerspective(a, M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    # the stretched side loses no content; the other side gained reflected
    # edges, so trim a margin proportional to the correction
    mx = int(d * 0.55)
    my = int(abs(k) * h * 0.12)
    return out[my:h - my, mx:w - mx] if k > 0 else out[my:h - my, mx:w - mx]


def _rotate(a, deg):
    h, w = a.shape[:2]
    M = cv2.getRotationMatrix2D((w / 2, h / 2), deg, 1.0)
    out = cv2.warpAffine(a, M, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT)
    # largest axis-aligned rectangle inside the rotated frame
    r = math.radians(abs(deg))
    cw = w * math.cos(r) - h * math.sin(r)
    ch = h * math.cos(r) - w * math.sin(r)
    sx = max(0, int((w - cw) / 2)) + 1
    sy = max(0, int((h - ch) / 2)) + 1
    return out[sy:h - sy, sx:w - sx]


def _sat_hue(x):
    mx = x.max(axis=2); mn = x.min(axis=2)
    s = (mx - mn) / (mx + 1e-6)
    return s


def grade(im, g):
    if not g:
        return im
    a = np.asarray(im.convert('RGB'))
    if cv2 is not None:
        if g.get('rotate'):
            a = _rotate(a, g['rotate'])
        if g.get('keystone'):
            a = _keystone(a, g['keystone'])
    x = a.astype(np.float32) / 255.0

    # sky mask: bluish and fairly bright, in the upper part of the frame
    r, gg, b = x[..., 0], x[..., 1], x[..., 2]
    lum = 0.2126 * r + 0.7152 * gg + 0.0722 * b
    skyish = (b > r + 0.08) & (b > gg + 0.02)

    # white balance from bright, low-saturation, non-sky pixels
    wb = g.get('wb', 0)
    if wb:
        sat = _sat_hue(x)
        sel = (~skyish) & (sat < 0.25) & (lum > np.percentile(lum, 70))
        if sel.sum() > 500:
            m = x[sel].mean(axis=0)
            target = m.mean()
            gains = target / (m + 1e-6)
            gains = 1 + (gains - 1) * wb
            x = x * gains[None, None, :]

    ev = g.get('ev', 0)
    if ev:
        x = x * (2 ** ev)

    sh = g.get('shadows', 0)
    hl = g.get('highlights', 0)
    if sh or hl:
        L = np.clip(0.2126 * x[..., 0] + 0.7152 * x[..., 1] + 0.0722 * x[..., 2], 1e-4, None)
        Ln = np.clip(L, 0, 1)
        lift = sh * 0.6 * Ln * (1 - Ln) ** 2 * 4      # peaks in the shadows
        pull = hl * 0.5 * (Ln ** 3) * (1 - Ln) * 4    # peaks near the top
        L2 = L + lift - pull
        x = x * (L2 / L)[..., None]

    # soft shoulder so brightened whites roll off instead of clipping
    x = np.where(x > 0.85, 0.85 + (1 - np.exp(-(x - 0.85) / 0.15)) * 0.15, x)

    c = g.get('contrast', 0)
    if c:
        x = np.clip(x, 0, 1)
        s = x * x * (3 - 2 * x)   # smoothstep S
        x = x + (s - x) * c * 2

    w = g.get('warmth', 0)
    if w:
        x[..., 0] *= 1 + w
        x[..., 2] *= 1 - w

    x = np.clip(x, 0, 1)

    v = g.get('vibrance', 0)
    gr = g.get('green', 0)
    sk = g.get('sky', 0)
    if v or gr or sk:
        hsv = cv2.cvtColor((x * 255).astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32) if cv2 is not None else None
        if hsv is not None:
            H, S, V = hsv[..., 0], hsv[..., 1] / 255, hsv[..., 2]
            boost = v * (1 - S)
            if gr:
                greens = ((H > 25) & (H < 85)).astype(np.float32)
                boost = boost + gr * greens * (1 - S)
            if sk:
                blues = ((H > 95) & (H < 125)).astype(np.float32)
                boost = boost + sk * blues * (1 - S)
                V = V * (1 - 0.08 * sk * blues)
            S = np.clip(S * (1 + boost), 0, 1)
            hsv = np.stack([H, S * 255, V], axis=-1).astype(np.uint8)
            x = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB).astype(np.float32) / 255

    out = (np.clip(x, 0, 1) * 255 + 0.5).astype(np.uint8)

    cl = g.get('clahe', 0)
    if cl and cv2 is not None:
        lab = cv2.cvtColor(out, cv2.COLOR_RGB2LAB)
        tiles = 8
        clahe = cv2.createCLAHE(clipLimit=1.0 + cl, tileGridSize=(tiles, tiles))
        L0 = lab[..., 0]
        Lc = clahe.apply(L0)
        # Only where there is texture: on smooth sky and plain walls CLAHE
        # makes blotches and bands, so weight it by local detail.
        gx = cv2.Sobel(L0, cv2.CV_32F, 1, 0, ksize=3)
        gy = cv2.Sobel(L0, cv2.CV_32F, 0, 1, ksize=3)
        mag = cv2.GaussianBlur(np.sqrt(gx * gx + gy * gy), (0, 0), max(2, L0.shape[1] / 300))
        wgt = np.clip(mag / 40.0, 0, 1) * 0.55
        lab[..., 0] = np.clip(L0 * (1 - wgt) + Lc * wgt, 0, 255).astype(np.uint8)
        out = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

    return Image.fromarray(out)
