import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const source = path.join(brandDir, "rimanstech-wordmark-premium-flat-source.png");

const FOREST = { r: 24, g: 60, b: 50 }; // #183C32
const CARBON = { r: 16, g: 17, b: 16 }; // #101110
const IVORY = { r: 245, g: 243, b: 238 }; // #F5F3EE
const SAGE = { r: 138, g: 156, b: 141 }; // #8A9C8D

function makeTransparentBuffer(data, info) {
  const pixels = Buffer.from(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const lum =
      0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
    if (lum > 210) {
      pixels[i + 3] = 0;
      continue;
    }
    pixels[i + 3] = 255;
  }

  return pixels;
}

function columnInk(pixels, width, height, x) {
  let count = 0;
  for (let y = 0; y < height; y++) {
    const i = (y * width + x) * 4;
    if (pixels[i + 3] > 0) count++;
  }
  return count;
}

function findTechSplit(pixels, width, height) {
  const start = Math.floor(width * 0.58);
  const end = Math.floor(width * 0.66);
  let bestX = Math.floor(width * 0.62);
  let bestInk = Infinity;

  for (let x = start; x <= end; x++) {
    const ink = columnInk(pixels, width, height, x);
    if (ink < bestInk) {
      bestInk = ink;
      bestX = x;
    }
  }

  return bestX;
}

function applyColors(pixels, width, height, splitX, rimansColor, techColor) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] === 0) continue;

      const color = x >= splitX ? techColor : rimansColor;
      pixels[i] = color.r;
      pixels[i + 1] = color.g;
      pixels[i + 2] = color.b;
    }
  }
}

function toAccentLight(pixels, width, height, splitX) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] === 0) continue;
      const color = x >= splitX ? SAGE : IVORY;
      pixels[i] = color.r;
      pixels[i + 1] = color.g;
      pixels[i + 2] = color.b;
    }
  }
}

function toIvoryVariant(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;
    pixels[i] = IVORY.r;
    pixels[i + 1] = IVORY.g;
    pixels[i + 2] = IVORY.b;
  }
}

async function saveRaw(pixels, width, height, output) {
  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function makeBold(inputPath, outputPath) {
  const base = sharp(inputPath).ensureAlpha();
  const meta = await base.metadata();
  const layer = await base.png().toBuffer();

  await sharp({
    create: {
      width: meta.width + 2,
      height: meta.height + 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: layer, left: 1, top: 1 },
      { input: layer, left: 0, top: 1 },
      { input: layer, left: 2, top: 1 },
      { input: layer, left: 1, top: 0 },
      { input: layer, left: 1, top: 2 },
    ])
    .trim({ threshold: 2 })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

// --- Base transparent wordmark ---
const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let pixels = makeTransparentBuffer(data, info);
const trimmed = await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .raw()
  .toBuffer({ resolveWithObject: true });

pixels = Buffer.from(trimmed.data);
const { width, height } = trimmed.info;
const splitX = findTechSplit(pixels, width, height);
console.log(`Split at x=${splitX} (${width}x${height})`);

// --- 1. Accent: Rimans + forest Tech ---
const accentDark = Buffer.from(pixels);
applyColors(accentDark, width, height, splitX, CARBON, FOREST);
await saveRaw(
  accentDark,
  width,
  height,
  path.join(brandDir, "rimanstech-wordmark-premium-accent-dark.png")
);

const accentLight = Buffer.from(accentDark);
toAccentLight(accentLight, width, height, splitX);
await saveRaw(
  accentLight,
  width,
  height,
  path.join(brandDir, "rimanstech-wordmark-premium-accent-light.png")
);

// --- 2. Bold: heavier stroke weight (from nav master) ---
const boldDarkPath = path.join(brandDir, "rimanstech-wordmark-premium-bold-dark.png");
const boldLightPath = path.join(brandDir, "rimanstech-wordmark-premium-bold-light.png");

await makeBold(
  path.join(brandDir, "rimanstech-wordmark-premium-nav-dark.png"),
  boldDarkPath
);

const boldRaw = await sharp(boldDarkPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const boldLight = Buffer.from(boldRaw.data);
toIvoryVariant(boldLight);
await saveRaw(
  boldLight,
  boldRaw.info.width,
  boldRaw.info.height,
  boldLightPath
);

// --- 3. Hero steel: 3D embossed wordmark (keep existing if present) ---
const heroSteelPath = path.join(brandDir, "rimanstech-wordmark-premium-hero-steel.png");
const steelSource = path.join(brandDir, "rimanstech-wordmark-premium-steel.png");
if (!fs.existsSync(heroSteelPath) && fs.existsSync(steelSource)) {
  fs.copyFileSync(steelSource, heroSteelPath);
  console.log("Hero steel copied from premium-steel source.");
}

console.log("Polish variants saved: accent, bold, hero-steel.");
