"""Generate PWA icon set (manifest icons + apple-touch-icon) for the Alièfè web app."""
from PIL import Image, ImageDraw, ImageFont
import os, math

BG = (20, 32, 27, 255)
BRASS = (185, 147, 86, 255)
BRASS_LIGHT = (212, 185, 120, 255)
FONT_PATH = r"C:\Windows\Fonts\georgiab.ttf"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
os.makedirs(OUT, exist_ok=True)


def monogram(size, scale=1.0, padding_scale=1.0):
    img = Image.new("RGBA", (size, size), BG)
    d = ImageDraw.Draw(img)
    cx = cy = size / 2
    r = size * 0.37 * scale * padding_scale
    stroke = max(2, int(size * 0.012))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=BRASS, width=stroke)
    dot_r = size * 0.012 * scale * padding_scale
    for angle in (200, -20):
        ax = cx + r * math.cos(math.radians(angle))
        ay = cy + r * math.sin(math.radians(angle))
        d.ellipse([ax - dot_r, ay - dot_r, ax + dot_r, ay + dot_r], fill=BRASS_LIGHT)
    font_size = int(size * 0.4 * scale * padding_scale)
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = d.textbbox((0, 0), "A", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1] - size * 0.01), "A", font=font, fill=BRASS_LIGHT)
    return img


for size in (192, 512):
    monogram(size).convert("RGB").save(os.path.join(OUT, f"icon-{size}.png"))

# Maskable variant keeps content within the safe zone (~80%) since OS masks can crop edges
monogram(512, padding_scale=0.8).convert("RGB").save(os.path.join(OUT, "icon-512-maskable.png"))

# Apple touch icon
monogram(180).convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"))

print("PWA icons generated in", os.path.abspath(OUT))
