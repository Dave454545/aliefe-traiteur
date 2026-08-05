"""Generate placeholder brand icons for the Alièfè app (Direction B — Nuit d'Abidjan).
Run once with: python scripts/gen_icons.py
Produces flat vector-style monogram icons; the client should replace these
with a designed logomark before shipping to app stores.
"""
from PIL import Image, ImageDraw, ImageFont
import os

BG = (20, 32, 27, 255)       # #14201B vert-noir profond
BRASS = (185, 147, 86, 255)  # #B99356
BRASS_LIGHT = (212, 185, 120, 255)  # #D4B978

FONT_PATH = r"C:\Windows\Fonts\georgiab.ttf"
OUT = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(OUT, exist_ok=True)


def monogram(size, transparent=False, ring=True, scale=1.0):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0) if transparent else BG)
    d = ImageDraw.Draw(img)
    cx = cy = size / 2
    r = size * 0.37 * scale

    if ring:
        stroke = max(2, int(size * 0.012))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BRASS, width=stroke)
        # two small flanking dots on the ring, echoing the wax/pearl motif
        dot_r = size * 0.012 * scale
        for angle in (200, -20):
            import math
            ax = cx + r * math.cos(math.radians(angle))
            ay = cy + r * math.sin(math.radians(angle))
            d.ellipse([ax - dot_r, ay - dot_r, ax + dot_r, ay + dot_r], fill=BRASS_LIGHT)

    font_size = int(size * 0.4 * scale)
    font = ImageFont.truetype(FONT_PATH, font_size)
    letter = "A"
    bbox = d.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1] - size * 0.01), letter, font=font, fill=BRASS_LIGHT)
    return img


# 1. App icon (iOS) — full bleed, opaque background
icon = monogram(1024, transparent=False, ring=True, scale=1.0)
icon.convert("RGB").save(os.path.join(OUT, "icon.png"))

# 2. Adaptive icon foreground (Android) — transparent, content within safe zone
adaptive = monogram(1024, transparent=True, ring=True, scale=0.62)
adaptive.save(os.path.join(OUT, "adaptive-icon.png"))

# 3. Splash icon — transparent, centered mark
splash = monogram(512, transparent=True, ring=True, scale=0.9)
splash.save(os.path.join(OUT, "splash-icon.png"))

# 4. Favicon (web)
favicon = monogram(196, transparent=False, ring=True, scale=1.0)
favicon.convert("RGB").save(os.path.join(OUT, "favicon.png"))

print("Icons generated in", os.path.abspath(OUT))
