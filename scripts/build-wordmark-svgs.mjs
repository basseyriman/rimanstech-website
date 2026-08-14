import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const archiveDir = path.join(brandDir, "archive");

const CARBON = { r: 16, g: 17, b: 16 };
const FOREST = { r: 26, g: 71, b: 49 };

function isGreen(r, g, b) {
  return g > 55 && g > r + 10 && g > b + 8;
}

function isWhiteInk(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b > 252;
}

async function loadRaw(input) {
  return sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

async function writeSvg(outputPath, pngBuffer, width, height, label) {
  const base64 = pngBuffer.toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <title>${label}</title>
  <image width="${width}" height="${height}" xlink:href="data:image/png;base64,${base64}" />
</svg>`;
  fs.writeFileSync(outputPath, svg);
}

function mapPixels(px, mode) {
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];

    if (isGreen(r, g, b)) {
      px[i] = FOREST.r;
      px[i + 1] = FOREST.g;
      px[i + 2] = FOREST.b;
      px[i + 3] = 255;
      continue;
    }

    if (isWhiteInk(r, g, b)) {
      if (mode === "dark") {
        px[i] = 255;
        px[i + 1] = 255;
        px[i + 2] = 255;
      } else {
        px[i] = CARBON.r;
        px[i + 1] = CARBON.g;
        px[i + 2] = CARBON.b;
      }
      px[i + 3] = 255;
      continue;
    }

    px[i + 3] = 0;
  }
}

async function buildWordmark({
  input,
  outputPng,
  outputSvg,
  mode,
  name,
}) {
  const { data, info } = await loadRaw(input);
  const px = Buffer.from(data);
  mapPixels(px, mode);

  const trimmed = await sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });

  await sharp(trimmed.data).png().toFile(outputPng);
  await writeSvg(
    outputSvg,
    trimmed.data,
    trimmed.info.width,
    trimmed.info.height,
    "RimansTech"
  );

  return { name, ...trimmed.info };
}

const archiveBold = path.join(
  archiveDir,
  "rimanstech-wordmark-bold-accent-transparent.png"
);

const results = await Promise.all([
  buildWordmark({
    input: archiveBold,
    outputPng: path.join(brandDir, "rimanstech-wordmark-bold-accent-transparent.png"),
    outputSvg: path.join(brandDir, "rimanstech-wordmark-bold-accent-transparent.svg"),
    mode: "dark",
    name: "bold-accent-transparent",
  }),
  buildWordmark({
    input: archiveBold,
    outputPng: path.join(brandDir, "rimanstech-wordmark-accent-dark.png"),
    outputSvg: path.join(brandDir, "rimanstech-wordmark-accent-dark.svg"),
    mode: "light",
    name: "accent-dark",
  }),
]);

console.log(JSON.stringify(results, null, 2));
