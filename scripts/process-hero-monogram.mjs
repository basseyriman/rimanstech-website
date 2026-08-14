import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const archiveDir = path.join(brandDir, "archive");

const sources = [
  path.join(archiveDir, "rimanstech-monogram-chrome-ref.png"),
  path.join(brandDir, "rimanstech-monogram-premium.png"),
  path.join(archiveDir, "rimanstech-monogram-chrome.png"),
];

const output = path.join(brandDir, "rimanstech-monogram-hero-clean.png");
const source = sources.find((file) => fs.existsSync(file));

if (!source) {
  console.error("No monogram source found");
  process.exit(1);
}

const BLACK_LUM = 18;

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const pi = i * 4;
  const lum =
    0.299 * pixels[pi] + 0.587 * pixels[pi + 1] + 0.114 * pixels[pi + 2];

  if (lum <= BLACK_LUM) {
    pixels[pi + 3] = 0;
  }
}

await sharp(pixels, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`source: ${path.basename(source)}`);
console.log(`hero-clean: ${meta.width}x${meta.height}`);
