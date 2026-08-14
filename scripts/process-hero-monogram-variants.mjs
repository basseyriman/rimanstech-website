import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const archiveDir = path.join(brandDir, "archive");

const CHROME_REF = path.join(archiveDir, "rimanstech-monogram-chrome-ref.png");
const CHROME_FALLBACK = path.join(archiveDir, "rimanstech-monogram-chrome.png");

const COLOR_VARIANTS = [
  {
    id: "forest",
    archive: "rimanstech-monogram-forest.png",
    pick: (r, g, b) => g > r && g > b && g > 40,
  },
  {
    id: "gold",
    archive: "rimanstech-monogram-gold.png",
    pick: (r, g, b) => r > g && r > b && r > 60,
  },
  {
    id: "ivory",
    archive: "rimanstech-monogram-ceramic.png",
    pick: (r, g, b) => r > 170 && g > 170 && b > 170,
  },
];

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

async function sampleBrandColor(archivePath, pick) {
  const { data, info } = await sharp(archivePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let i = 0; i < info.width * info.height; i++) {
    const pi = i * 4;
    if (data[pi + 3] < 16) continue;
    if (!pick(data[pi], data[pi + 1], data[pi + 2])) continue;
    r += data[pi];
    g += data[pi + 1];
    b += data[pi + 2];
    count++;
  }

  if (count === 0) return { r: 180, g: 180, b: 180 };
  return { r: r / count, g: g / count, b: b / count };
}

function mixShade(brand, shade) {
  const dark = {
    r: brand.r * 0.18,
    g: brand.g * 0.18,
    b: brand.b * 0.18,
  };
  const bright = {
    r: Math.min(255, brand.r * 1.75 + 48),
    g: Math.min(255, brand.g * 1.75 + 48),
    b: Math.min(255, brand.b * 1.75 + 48),
  };

  return {
    r: Math.round(dark.r + (bright.r - dark.r) * shade),
    g: Math.round(dark.g + (bright.g - dark.g) * shade),
    b: Math.round(dark.b + (bright.b - dark.b) * shade),
  };
}

function tintPixel(r, g, b, a, brand) {
  if (a < 8) return { r: 0, g: 0, b: 0, a: 0 };

  const lum = luminance(r, g, b);
  if (lum < 12) return { r: 0, g: 0, b: 0, a: 0 };

  const shade = Math.pow(lum / 255, 0.72);
  const rgb = mixShade(brand, shade);
  return { ...rgb, a };
}

async function loadChromeRef() {
  const input = fs.existsSync(CHROME_REF) ? CHROME_REF : CHROME_FALLBACK;
  if (!fs.existsSync(input)) throw new Error("Chrome reference not found");

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data: Buffer.from(data), info, input };
}

async function writeChrome(source, outputPath) {
  const { data, info } = source;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`${path.basename(outputPath)}: ${meta.width}x${meta.height}`);
  return meta;
}

async function writeTinted(source, brand, outputPath) {
  const { data, info } = source;
  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const pi = i * 4;
    const pixel = tintPixel(data[pi], data[pi + 1], data[pi + 2], data[pi + 3], brand);
    out[pi] = pixel.r;
    out[pi + 1] = pixel.g;
    out[pi + 2] = pixel.b;
    out[pi + 3] = pixel.a;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`${path.basename(outputPath)}: ${meta.width}x${meta.height}`);
  return meta;
}

const source = await loadChromeRef();
console.log(`source: ${path.basename(source.input)} (${source.info.width}x${source.info.height})`);

const chromeOut = path.join(brandDir, "rimanstech-monogram-hero-chrome.png");
await writeChrome(source, chromeOut);

for (const variant of COLOR_VARIANTS) {
  const archivePath = path.join(archiveDir, variant.archive);
  const brand = await sampleBrandColor(archivePath, variant.pick);
  const outputPath = path.join(brandDir, `rimanstech-monogram-hero-${variant.id}.png`);
  await writeTinted(source, brand, outputPath);
  console.log(`  brand rgb: ${Math.round(brand.r)}, ${Math.round(brand.g)}, ${Math.round(brand.b)}`);
}

fs.copyFileSync(chromeOut, path.join(brandDir, "rimanstech-monogram-hero-clean.png"));
console.log("done");
