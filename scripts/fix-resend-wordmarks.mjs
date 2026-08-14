import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "../public/brand");

const assets =
  "C:/Users/basse/.cursor/projects/c-Users-basse-Documents-RimanTech-rimanstech-website/assets";

const lightSrc = `${assets}/c__Users_basse_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_rimanstech-wordmark-resend-light-6753b0d1-f2da-49a3-aab8-92ba59a96463.png`;

async function stripBlack(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    if (lum < 20) {
      px[i + 3] = 0;
      continue;
    }
    px[i] = 245;
    px[i + 1] = 243;
    px[i + 2] = 238;
    px[i + 3] = 255;
  }

  await sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`${path.basename(output)}: ${meta.width}x${meta.height}`);
}

const lightOut = path.join(brandDir, "rimanstech-wordmark-resend-light.png");
const darkOut = path.join(brandDir, "rimanstech-wordmark-resend-dark.png");

await stripBlack(lightSrc, lightOut);

await sharp(lightOut)
  .negate({ alpha: false })
  .png()
  .toFile(darkOut);

const darkMeta = await sharp(darkOut).metadata();
console.log(`${path.basename(darkOut)}: ${darkMeta.width}x${darkMeta.height}`);
