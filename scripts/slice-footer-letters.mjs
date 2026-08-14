import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

/**
 * Slice the official wordmark into individual letter glyphs
 * for the animated footer wordmark (true logo letterforms).
 *
 * Usage: node scripts/slice-footer-letters.mjs
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const src = path.join(brandDir, "rimanstech-wordmark-bold-accent-transparent.png");
const outDir = path.join(brandDir, "footer-letters");

fs.mkdirSync(outDir, { recursive: true });

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const px = Buffer.from(data);

for (let i = 0; i < px.length; i += 4) {
  if (px[i + 3] < 40) {
    px[i + 3] = 0;
    continue;
  }
  px[i] = 245;
  px[i + 1] = 243;
  px[i + 2] = 238;
  px[i + 3] = 255;
}

/** Inclusive start, exclusive end — tuned to wordmark ink gaps */
const letters = [
  ["R", 0, 208],
  ["i", 208, 265],
  ["m", 265, 472],
  ["a", 472, 622],
  ["n", 622, 765],
  ["s", 765, 882],
  ["T", 882, 1002],
  ["e", 1002, 1132],
  ["c", 1132, 1270],
  ["h", 1270, 1397],
];

for (const [name, left, right] of letters) {
  const cropW = right - left;
  let y0 = h;
  let y1 = 0;

  for (let y = 0; y < h; y++) {
    for (let x = left; x < right; x++) {
      if (px[(y * w + x) * 4 + 3] > 40) {
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y);
      }
    }
  }

  const top = Math.max(0, y0 - 1);
  const bottom = Math.min(h - 1, y1 + 1);
  const cropH = bottom - top + 1;
  const crop = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const si = ((top + y) * w + (left + x)) * 4;
      const di = (y * cropW + x) * 4;
      crop[di] = px[si];
      crop[di + 1] = px[si + 1];
      crop[di + 2] = px[si + 2];
      crop[di + 3] = px[si + 3];
    }
  }

  const out = path.join(outDir, `${name}.png`);
  await sharp(crop, { raw: { width: cropW, height: cropH, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(name, `${meta.width}x${meta.height}`);
}
