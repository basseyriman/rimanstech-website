import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");

const CARBON = { r: 16, g: 17, b: 16 };
const IVORY = { r: 245, g: 243, b: 238 };
const FOREST = { r: 24, g: 60, b: 50 };
const BRASS = { r: 167, g: 140, b: 93 };

const VARIANTS = [
  {
    id: "editorial-refined",
    source: "rimanstech-wordmark-editorial-refined-source.png",
    mode: "mono-light-bg",
    description: "Thin refined strokes, wide tracking — carbon on light UI",
  },
  {
    id: "editorial-accent",
    source: "rimanstech-wordmark-editorial-accent-source.png",
    mode: "accent-light-bg",
    description: "Carbon Rimans + forest Tech — brand accent editorial",
  },
  {
    id: "editorial-brass",
    source: "rimanstech-wordmark-editorial-brass-source.png",
    mode: "mono-dark-bg",
    recolor: BRASS,
    description: "Brass gold on dark — luxury collateral / dark hero",
  },
  {
    id: "editorial-ivory",
    source: "rimanstech-wordmark-editorial-ivory-source.png",
    mode: "mono-dark-bg",
    recolor: IVORY,
    description: "Ivory editorial tracking — dark mode nav candidate",
  },
];

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function findTechSplit(pixels, width, height) {
  const start = Math.floor(width * 0.58);
  const end = Math.floor(width * 0.66);
  let bestX = Math.floor(width * 0.62);
  let bestInk = Infinity;

  for (let x = start; x <= end; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] > 0) count++;
    }
    if (count < bestInk) {
      bestInk = count;
      bestX = x;
    }
  }

  return bestX;
}

async function loadSource(filename) {
  const input = path.join(brandDir, filename);

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { pixels: Buffer.from(data), ...info };
}

async function savePng(pixels, width, height, output) {
  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 2 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function processMonoLightBg(pixels, width, height) {
  for (let i = 0; i < pixels.length; i += 4) {
    const l = lum(pixels[i], pixels[i + 1], pixels[i + 2]);
    if (l > 210) {
      pixels[i + 3] = 0;
      continue;
    }
    pixels[i] = CARBON.r;
    pixels[i + 1] = CARBON.g;
    pixels[i + 2] = CARBON.b;
    pixels[i + 3] = 255;
  }
}

async function processAccentLightBg(pixels, width, height) {
  for (let i = 0; i < pixels.length; i += 4) {
    const l = lum(pixels[i], pixels[i + 1], pixels[i + 2]);
    if (l > 210) {
      pixels[i + 3] = 0;
      continue;
    }
    pixels[i + 3] = 255;
  }

  const splitX = findTechSplit(pixels, width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (pixels[i + 3] === 0) continue;
      const color = x >= splitX ? FOREST : CARBON;
      pixels[i] = color.r;
      pixels[i + 1] = color.g;
      pixels[i + 2] = color.b;
    }
  }
}

async function processMonoDarkBg(pixels, width, height, color) {
  for (let i = 0; i < pixels.length; i += 4) {
    const l = lum(pixels[i], pixels[i + 1], pixels[i + 2]);
    if (l < 40) {
      pixels[i + 3] = 0;
      continue;
    }
    pixels[i] = color.r;
    pixels[i + 1] = color.g;
    pixels[i + 2] = color.b;
    pixels[i + 3] = 255;
  }
}

function toIvory(pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;
    pixels[i] = IVORY.r;
    pixels[i + 1] = IVORY.g;
    pixels[i + 2] = IVORY.b;
  }
}

function toAccentLight(pixels, width, height, splitX) {
  const SAGE = { r: 138, g: 156, b: 141 };
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

for (const variant of VARIANTS) {
  const sourceBrand = path.join(brandDir, variant.source);
  if (!fs.existsSync(sourceBrand)) {
    console.warn(`Skipping ${variant.id}: missing ${variant.source}`);
    continue;
  }

  const { pixels, width, height } = await loadSource(variant.source);
  const darkPixels = Buffer.from(pixels);
  const lightPixels = Buffer.from(pixels);

  if (variant.mode === "mono-light-bg") {
    await processMonoLightBg(darkPixels, width, height);
    await savePng(
      darkPixels,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-dark.png`)
    );

    await processMonoLightBg(lightPixels, width, height);
    toIvory(lightPixels);
    await savePng(
      lightPixels,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-light.png`)
    );
  } else if (variant.mode === "accent-light-bg") {
    await processAccentLightBg(darkPixels, width, height);
    const splitX = findTechSplit(darkPixels, width, height);
    await savePng(
      darkPixels,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-dark.png`)
    );

    const accentLight = Buffer.from(darkPixels);
    toAccentLight(accentLight, width, height, splitX);
    await savePng(
      accentLight,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-light.png`)
    );
  } else if (variant.mode === "mono-dark-bg") {
    await processMonoDarkBg(darkPixels, width, height, variant.recolor);
    await savePng(
      darkPixels,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-light.png`)
    );

    await processMonoDarkBg(lightPixels, width, height, CARBON);
    await savePng(
      lightPixels,
      width,
      height,
      path.join(brandDir, `rimanstech-wordmark-${variant.id}-nav-dark.png`)
    );
  }

  console.log(`✓ ${variant.id}: ${variant.description}`);
}

// Side-by-side comparison sheet for review
const navDarkFiles = VARIANTS.map(
  (v) => path.join(brandDir, `rimanstech-wordmark-${v.id}-nav-dark.png`)
).filter((f) => fs.existsSync(f));

if (navDarkFiles.length) {
  const resized = await Promise.all(
    navDarkFiles.map((file) =>
      sharp(file)
        .resize({ width: 900, withoutEnlargement: true })
        .extend({
          top: 40,
          bottom: 40,
          left: 40,
          right: 40,
          background: { r: 245, g: 243, b: 238, alpha: 255 },
        })
        .toBuffer()
    )
  );

  const metas = await Promise.all(resized.map((buf) => sharp(buf).metadata()));
  const totalHeight = metas.reduce((sum, m) => sum + (m.height ?? 0), 0);
  const maxWidth = Math.max(...metas.map((m) => m.width ?? 0));

  let y = 0;
  const layers = resized.map((input, idx) => {
    const layer = { input, left: 0, top: y };
    y += metas[idx].height ?? 0;
    return layer;
  });

  await sharp({
    create: {
      width: maxWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 245, g: 243, b: 238, alpha: 255 },
    },
  })
    .composite(layers)
    .png()
    .toFile(path.join(brandDir, "rimanstech-wordmark-editorial-comparison.png"));

  console.log("✓ editorial comparison sheet saved");
}

console.log("\nEditorial wordmark variants ready in public/brand/");
