import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");

const sources = [
  "rimanstech-wordmark-bold-light-transparent.png",
  "rimanstech-wordmark-resend-light-transparent.png",
  "rimanstech-wordmark-resend-dark-transparent.png",
];

function makeTransparent(raw, info) {
  const pixels = Buffer.from(raw);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance > 160) {
      pixels[i + 3] = 0;
      continue;
    }

    pixels[i] = r < 128 ? 16 : 245;
    pixels[i + 1] = g < 128 ? 17 : 243;
    pixels[i + 2] = b < 128 ? 16 : 238;
    pixels[i + 3] = 255;
  }

  return pixels;
}

for (const source of sources) {
  const input = path.join(brandDir, source);
  const base = source.replace(".png", "");
  const output = path.join(brandDir, `${base}-clean.png`);

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const processed = makeTransparent(data, info);

  await sharp(processed, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`Generated ${path.basename(output)} (${meta.width}x${meta.height})`);
}

// Primary header assets — normal weight wordmark, tight crop, true alpha
const headerInput = path.join(brandDir, "rimanstech-wordmark-resend-light-transparent.png");
const headerOutputDark = path.join(brandDir, "rimanstech-wordmark-header-dark.png");
const headerOutputLight = path.join(brandDir, "rimanstech-wordmark-header-light.png");

const { data: headerData, info: headerInfo } = await sharp(headerInput)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const normalWordmark = makeTransparent(headerData, headerInfo);

await sharp(normalWordmark, {
  raw: { width: headerInfo.width, height: headerInfo.height, channels: 4 },
})
  .trim({ threshold: 1 })
  .png()
  .toFile(headerOutputDark);

// White variant for dark mode (invert black → white)
await sharp(headerOutputDark)
  .negate({ alpha: false })
  .png()
  .toFile(headerOutputLight);

const headerMeta = await sharp(headerOutputDark).metadata();
console.log(
  `Header wordmarks (normal weight): ${headerMeta.width}x${headerMeta.height}`,
);

function makeTransparentWithGray(raw) {
  const pixels = Buffer.from(raw);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance > 200) {
      pixels[i + 3] = 0;
      continue;
    }

    if (luminance > 90) {
      pixels[i] = 80;
      pixels[i + 1] = 83;
      pixels[i + 2] = 79;
    } else {
      pixels[i] = 16;
      pixels[i + 1] = 17;
      pixels[i + 2] = 16;
    }
    pixels[i + 3] = 255;
  }

  return pixels;
}

function toLightVariant(raw) {
  const pixels = Buffer.from(raw);

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;

    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance > 90) {
      pixels[i] = 154;
      pixels[i + 1] = 157;
      pixels[i + 2] = 152;
    } else {
      pixels[i] = 245;
      pixels[i + 1] = 243;
      pixels[i + 2] = 238;
    }
  }

  return pixels;
}

// Industries split lockup — RimansTe · INDUSTRIES · ch
const lockupInput = path.join(brandDir, "rimanstech-industries-lockup-light.png");
const lockupOutputDark = path.join(brandDir, "rimanstech-industries-lockup-dark-text.png");
const lockupOutputLight = path.join(brandDir, "rimanstech-industries-lockup-light-text.png");

const { data: lockupData, info: lockupInfo } = await sharp(lockupInput)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const lockupProcessed = makeTransparentWithGray(lockupData);

await sharp(lockupProcessed, {
  raw: { width: lockupInfo.width, height: lockupInfo.height, channels: 4 },
})
  .trim({ threshold: 1 })
  .png()
  .toFile(lockupOutputDark);

const lockupMetaBeforeLight = await sharp(lockupOutputDark).metadata();
const lockupLightRaw = await sharp(lockupOutputDark).ensureAlpha().raw().toBuffer();
const lockupLightPixels = toLightVariant(Buffer.from(lockupLightRaw));

await sharp(lockupLightPixels, {
  raw: {
    width: lockupMetaBeforeLight.width,
    height: lockupMetaBeforeLight.height,
    channels: 4,
  },
})
  .png()
  .toFile(lockupOutputLight);

const lockupMeta = await sharp(lockupOutputDark).metadata();
console.log(
  `Industries lockup: ${lockupMeta.width}x${lockupMeta.height}`,
);
