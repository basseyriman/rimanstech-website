import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");

const input = path.join(brandDir, "rimanstech-monogram-chrome.png");
const output = path.join(brandDir, "rimanstech-monogram-hero-clean.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = Buffer.from(data);

function lumAt(x, y) {
  const i = (y * width + x) * 4;
  return (
    0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]
  );
}

function keepLargestComponent(mask) {
  const visited = new Uint8Array(width * height);
  let best = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const start = y * width + x;
      if (!mask[start] || visited[start]) continue;

      const component = [];
      const stack = [start];
      visited[start] = 1;

      while (stack.length > 0) {
        const idx = stack.pop();
        component.push(idx);

        const px = idx % width;
        const py = (idx - px) / width;
        for (const [nx, ny] of [
          [px - 1, py],
          [px + 1, py],
          [px, py - 1],
          [px, py + 1],
        ]) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const nIdx = ny * width + nx;
          if (!mask[nIdx] || visited[nIdx]) continue;
          visited[nIdx] = 1;
          stack.push(nIdx);
        }
      }

      if (component.length > best.length) best = component;
    }
  }

  const cleaned = new Uint8Array(width * height);
  for (const idx of best) cleaned[idx] = 1;
  return cleaned;
}

// Grow only from bright chrome highlights — stops before dark squircle tile
const keep = new Uint8Array(width * height);
const dist = new Int16Array(width * height).fill(-1);
const queue = [];
const MAX_DIST = 100;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const lum = lumAt(x, y);
    if (lum > 105) {
      const idx = y * width + x;
      keep[idx] = 1;
      dist[idx] = 0;
      queue.push(idx);
    }
  }
}

let head = 0;
while (head < queue.length) {
  const idx = queue[head++];
  const d = dist[idx];
  if (d >= MAX_DIST) continue;

  const x = idx % width;
  const y = (idx - x) / width;

  for (const [nx, ny] of [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    const nIdx = ny * width + nx;
    if (keep[nIdx]) continue;

    const lum = lumAt(nx, ny);
    if (lum < 32) continue;

    keep[nIdx] = 1;
    dist[nIdx] = d + 1;
    queue.push(nIdx);
  }
}

const logoOnly = keepLargestComponent(keep);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const idx = y * width + x;
    if (!logoOnly[idx]) {
      pixels[i + 3] = 0;
      continue;
    }

    const lum = lumAt(x, y);
    if (lum < 45) {
      const fade = Math.max(0, (lum - 24) / 21);
      pixels[i + 3] = Math.round(pixels[i + 3] * fade);
    }
  }
}

await sharp(pixels, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 2 })
  .png({ compressionLevel: 9 })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`Chrome-only hero: ${meta.width}x${meta.height}`);
