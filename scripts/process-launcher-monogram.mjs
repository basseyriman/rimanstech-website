import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");

const premiumInput = path.join(brandDir, "rimanstech-monogram-premium.png");
const chromeInput = path.join(brandDir, "rimanstech-monogram-chrome.png");
const squircleOutput = path.join(brandDir, "rimanstech-monogram-launcher-dark.png");
const iconOutput = path.join(brandDir, "rimanstech-monogram-launcher-icon.png");
// Back-compat alias used by the site
const launcherOutput = path.join(brandDir, "rimanstech-monogram-launcher.png");

function lumAt(pixels, width, x, y) {
  const i = (y * width + x) * 4;
  return (
    0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]
  );
}

async function stripOuterBlack(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const pixels = Buffer.from(data);

  const background = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const idx = y * width + x;
      if (lumAt(pixels, width, x, y) < 22) {
        background[idx] = 1;
        queue.push(idx);
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const idx = y * width + x;
      if (background[idx] || lumAt(pixels, width, x, y) >= 22) continue;
      background[idx] = 1;
      queue.push(idx);
    }
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
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
      if (background[nIdx]) continue;
      if (lumAt(pixels, width, nx, ny) >= 22) continue;
      background[nIdx] = 1;
      queue.push(nIdx);
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (background[y * width + x]) {
        pixels[i + 3] = 0;
      }
    }
  }

  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 2 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function makeLauncherIcon(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const pixels = Buffer.from(data);

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

  const keep = new Uint8Array(width * height);
  const dist = new Int16Array(width * height).fill(-1);
  const queue = [];
  const MAX_DIST = 90;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const lum = lumAt(pixels, width, x, y);
      if (lum > 100) {
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

      const lum = lumAt(pixels, width, nx, ny);
      if (lum < 34) continue;

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

      const lum = lumAt(pixels, width, x, y);
      if (lum < 42) {
        const fade = Math.max(0, (lum - 24) / 18);
        pixels[i + 3] = Math.round(pixels[i + 3] * fade);
      }
    }
  }

  // Remove stray bright glow specks outside the main chrome body
  const brightMask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] === 0) continue;
      if (lumAt(pixels, width, x, y) > 215) {
        brightMask[y * width + x] = 1;
      }
    }
  }

  const brightComponents = [];
  const visited = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const start = y * width + x;
      if (!brightMask[start] || visited[start]) continue;
      const component = [];
      const stack = [start];
      visited[start] = 1;
      while (stack.length) {
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
          if (!brightMask[nIdx] || visited[nIdx]) continue;
          visited[nIdx] = 1;
          stack.push(nIdx);
        }
      }
      brightComponents.push(component);
    }
  }

  for (const component of brightComponents) {
    if (component.length > 600) continue;
    for (const idx of component) {
      const i = idx * 4;
      pixels[i + 3] = 0;
    }
  }

  const trimmed = await sharp(pixels, {
    raw: { width, height, channels: 4 },
  })
    .trim({ threshold: 2 })
    .png()
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  const size = Math.max(meta.width, meta.height);
  const pad = Math.round(size * 0.1);

  await sharp(trimmed)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

await stripOuterBlack(premiumInput, squircleOutput);
await makeLauncherIcon(chromeInput, iconOutput);
await sharp(iconOutput).png().toFile(launcherOutput);

const iconMeta = await sharp(iconOutput).metadata();
const squircleMeta = await sharp(squircleOutput).metadata();
console.log(`Launcher icon (transparent): ${iconMeta.width}x${iconMeta.height}`);
console.log(`Launcher squircle (dark UI): ${squircleMeta.width}x${squircleMeta.height}`);
