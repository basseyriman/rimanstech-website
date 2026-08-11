import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");
const source = path.join(brandDir, "rimanstech-wordmark-premium-flat-source.png");
const outputDark = path.join(brandDir, "rimanstech-wordmark-premium-nav-dark.png");
const outputLight = path.join(brandDir, "rimanstech-wordmark-premium-nav-light.png");

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = Buffer.from(data);

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  if (lum > 210) {
    pixels[i + 3] = 0;
    continue;
  }

  pixels[i] = 16;
  pixels[i + 1] = 17;
  pixels[i + 2] = 16;
  pixels[i + 3] = 255;
}

await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .png({ compressionLevel: 9 })
  .toFile(outputDark);

await sharp(outputDark)
  .negate({ alpha: false })
  .png({ compressionLevel: 9 })
  .toFile(outputLight);

const meta = await sharp(outputDark).metadata();
console.log(`Premium nav wordmark: ${meta.width}x${meta.height}`);
