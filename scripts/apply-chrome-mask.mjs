import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const archiveDir = path.join(brandDir, "archive");

const MASK_PATH = path.join(brandDir, "rimanstech-monogram-hero-chrome.png");

const COLOR_SOURCES = [
  { id: "forest", input: "rimanstech-monogram-forest.png" },
  { id: "gold", input: "rimanstech-monogram-gold.png" },
  { id: "ivory", input: "rimanstech-monogram-ceramic.png" },
];

async function loadRaw(filePath) {
  return sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

async function applyMask(colorInput, outputPath) {
  const [mask, color] = await Promise.all([
    loadRaw(MASK_PATH),
    loadRaw(colorInput),
  ]);

  const { width: mw, height: mh } = mask.info;
  const colorResized = await sharp(color.data, {
    raw: { width: color.info.width, height: color.info.height, channels: 4 },
  })
    .resize(mw, mh, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const out = Buffer.alloc(mw * mh * 4);

  for (let i = 0; i < mw * mh; i++) {
    const mi = i * 4;
    const alpha = mask.data[mi + 3];

    if (alpha < 16) {
      out[mi + 3] = 0;
      continue;
    }

    out[mi] = colorResized[mi];
    out[mi + 1] = colorResized[mi + 1];
    out[mi + 2] = colorResized[mi + 2];
    out[mi + 3] = Math.min(255, Math.round((alpha / 255) * 255));
  }

  await sharp(out, { raw: { width: mw, height: mh, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`${path.basename(outputPath)}: ${meta.width}x${meta.height}`);
}

for (const variant of COLOR_SOURCES) {
  const input = path.join(archiveDir, variant.input);
  const output = path.join(brandDir, `rimanstech-monogram-hero-${variant.id}.png`);
  await applyMask(input, output);
}

console.log("masked variants done");
