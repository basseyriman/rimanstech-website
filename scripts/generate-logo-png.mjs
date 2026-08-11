import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const publicDir = path.join(__dirname, "../public");

const exports = [
  {
    input: path.join(brandDir, "rimanstech-wordmark-dark.svg"),
    output: path.join(brandDir, "rimanstech-wordmark-dark.png"),
    width: 1800,
  },
  {
    input: path.join(brandDir, "rimanstech-monogram.svg"),
    output: path.join(brandDir, "rimanstech-monogram.png"),
    width: 512,
  },
  {
    input: path.join(brandDir, "rimanstech-monogram-premium.svg"),
    output: path.join(brandDir, "rimanstech-monogram-premium.png"),
    width: 512,
  },
  {
    input: path.join(brandDir, "rimanstech-monogram-premium.svg"),
    output: path.join(publicDir, "apple-touch-icon.png"),
    width: 180,
  },
  {
    input: path.join(brandDir, "rimanstech-monogram-premium.svg"),
    output: path.join(publicDir, "app-icon.png"),
    width: 512,
  },
];

for (const item of exports) {
  await sharp(item.input)
    .resize(item.width)
    .png({ compressionLevel: 9 })
    .toFile(item.output);
  console.log("Generated:", item.output);
}
