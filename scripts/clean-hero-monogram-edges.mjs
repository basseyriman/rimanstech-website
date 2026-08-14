import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const output = path.join(brandDir, "rimanstech-monogram-hero-clean.png");

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function sat(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  if (max === 0) return 0;
  return (max - min) / max;
}

function morphAlpha(alpha, width, height, op) {
  const out = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      let value = alpha[i];

      for (const [nx, ny] of [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        value = op === "erode" ? Math.min(value, alpha[n]) : Math.max(value, alpha[n]);
      }

      out[i] = value;
    }
  }

  return out;
}

const { data, info } = await sharp(output)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const pi = i * 4;
  let r = pixels[pi];
  let g = pixels[pi + 1];
  let b = pixels[pi + 2];
  let a = pixels[pi + 3];

  if (a === 0) continue;

  const alpha = a / 255;

  // Remove black-matte contamination (fixes dark halos on light backgrounds).
  if (alpha > 0.04) {
    r = Math.min(255, Math.round(r / alpha));
    g = Math.min(255, Math.round(g / alpha));
    b = Math.min(255, Math.round(b / alpha));
  }

  const l = lum(r, g, b);
  const s = sat(r, g, b);

  if (a < 36) {
    a = 0;
  } else if (a < 210 && l < 98) {
    a = 0;
  } else if (a < 210 && l > 112) {
    a = 0;
  } else if (a < 170 && s < 0.07) {
    a = 0;
  }

  pixels[pi] = r;
  pixels[pi + 1] = g;
  pixels[pi + 2] = b;
  pixels[pi + 3] = a;
}

const alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  alpha[i] = pixels[i * 4 + 3];
}

let cleaned = morphAlpha(alpha, width, height, "erode");
cleaned = morphAlpha(cleaned, width, height, "dilate");

for (let i = 0; i < width * height; i++) {
  const pi = i * 4;
  pixels[pi + 3] = cleaned[i];
  if (cleaned[i] === 0) {
    pixels[pi] = 0;
    pixels[pi + 1] = 0;
    pixels[pi + 2] = 0;
  }
}

await sharp(pixels, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`cleaned: ${width}x${height}`);
