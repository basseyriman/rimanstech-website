import sharp from "sharp";
import fs from "fs";

const gen =
  "C:/Users/basse/.cursor/projects/c-Users-basse-Documents-RimanTech-rimanstech-website/assets/rimanstech-monogram-hero-v2.png";
const outPath = "public/brand/rimanstech-monogram-hero-clean.png";

const { data, info } = await sharp(gen)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const px = Buffer.from(data);
for (let i = 0; i < px.length; i += 4) {
  const L = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
  if (L <= 20) px[i + 3] = 0;
}

const tmpKnock = "public/brand/_mono-knock.png";
await sharp(px, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .extend({
    top: 24,
    bottom: 24,
    left: 24,
    right: 24,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(tmpKnock);

const trimmed = await sharp(tmpKnock)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const tw = trimmed.info.width;
const th = trimmed.info.height;
const td = Buffer.from(trimmed.data);

const solid = (x, y) => {
  if (x < 0 || x >= tw || y < 0 || y >= th) return false;
  const i = (y * tw + x) * 4;
  if (td[i + 3] < 140) return false;
  const L = 0.299 * td[i] + 0.587 * td[i + 1] + 0.114 * td[i + 2];
  return L > 40;
};

const top = new Array(tw).fill(-1);
for (let x = 0; x < tw; x++) {
  for (let y = 0; y < Math.min(120, th); y++) {
    if (solid(x, y) && solid(x, y + 1) && solid(x, y + 2)) {
      top[x] = y;
      break;
    }
  }
}

const cols = [];
for (let x = 10; x < tw - 10; x++) {
  if (top[x] < 0 || top[x] > 50) continue;
  let n = 0;
  for (let dx = -6; dx <= 6; dx++) {
    if (top[x + dx] >= 0 && Math.abs(top[x + dx] - top[x]) <= 6) n++;
  }
  if (n >= 10) cols.push(x);
}

const x0 = cols[0];
const x1 = cols[cols.length - 1];
const targetY = Math.min(...cols.map((x) => top[x]));
const ridgeY = targetY + 3;
const depth = 22;
console.log({ x0, x1, targetY, ridgeY, tw, th });

const profile = [];
for (let dy = 0; dy < depth; dy++) {
  let r = 0,
    g = 0,
    b = 0,
    n = 0;
  for (const x of cols) {
    const t = (x - x0) / (x1 - x0);
    if (t < 0.1 || t > 0.35) continue;
    const y = top[x] + dy;
    if (y >= th) continue;
    const i = (y * tw + x) * 4;
    if (td[i + 3] < 140) continue;
    r += td[i];
    g += td[i + 1];
    b += td[i + 2];
    n++;
  }
  if (!n) {
    profile.push(profile[profile.length - 1] || [200, 200, 200]);
    continue;
  }
  profile.push([Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
}

for (let dy = 0; dy < depth; dy++) {
  const y = targetY + dy;
  const dist = Math.abs(y - ridgeY);
  const L = Math.max(115, Math.round(255 - dist * dist * 3.2));
  const p = profile[dy];
  const cur = 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2] || 1;
  const s = L / cur;
  profile[dy] = [
    Math.min(255, Math.round(p[0] * s)),
    Math.min(255, Math.round(p[1] * s)),
    Math.min(255, Math.round(p[2] * s)),
  ];
}

const out = Buffer.from(td);
for (let x = x0; x <= x1; x++) {
  let hits = 0;
  for (let dy = 0; dy < depth; dy++) if (solid(x, top[x] + dy)) hits++;
  if (hits < depth * 0.45) continue;

  for (let y = 0; y < targetY; y++) {
    const i = (y * tw + x) * 4;
    out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
  }
  if (targetY > 0) {
    const ai = ((targetY - 1) * tw + x) * 4;
    out[ai] = profile[0][0];
    out[ai + 1] = profile[0][1];
    out[ai + 2] = profile[0][2];
    out[ai + 3] = 100;
  }
  for (let dy = 0; dy < depth; dy++) {
    const y = targetY + dy;
    if (y >= th) break;
    if (!solid(x, top[x] + Math.min(dy, depth - 1)) && dy > 3) continue;
    const i = (y * tw + x) * 4;
    const p = profile[dy];
    out[i] = p[0];
    out[i + 1] = p[1];
    out[i + 2] = p[2];
    out[i + 3] = 255;
  }
}

// Light horizontal smoothing on the top band only (in-place)
for (let y = Math.max(0, targetY - 1); y < Math.min(th, targetY + depth + 1); y++) {
  const row = Buffer.alloc(tw * 4);
  for (let x = 0; x < tw; x++) {
    const i = (y * tw + x) * 4;
    row[x * 4] = out[i];
    row[x * 4 + 1] = out[i + 1];
    row[x * 4 + 2] = out[i + 2];
    row[x * 4 + 3] = out[i + 3];
  }
  for (let x = x0 + 1; x < x1; x++) {
    const i = (y * tw + x) * 4;
    if (row[x * 4 + 3] < 140) continue;
    for (let c = 0; c < 3; c++) {
      out[i + c] = Math.round(
        row[(x - 1) * 4 + c] * 0.25 +
          row[x * 4 + c] * 0.5 +
          row[(x + 1) * 4 + c] * 0.25,
      );
    }
  }
}

await sharp(out, { raw: { width: tw, height: th, channels: 4 } })
  .resize(607, 557, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(outPath);

fs.unlinkSync(tmpKnock);

const final = await sharp(outPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const fw = final.info.width;
const fd = final.data;
const tops = [];
const brights = [];
for (let x = 40; x < fw - 40; x++) {
  let t = -1;
  let bY = -1;
  let bL = -1;
  for (let y = 0; y < 80; y++) {
    const i = (y * fw + x) * 4;
    if (fd[i + 3] < 140) continue;
    const L = 0.299 * fd[i] + 0.587 * fd[i + 1] + 0.114 * fd[i + 2];
    if (L <= 40) continue;
    if (t < 0) t = y;
    if (L > bL) {
      bL = L;
      bY = y;
    }
  }
  if (t >= 0) tops.push(t);
  if (bY >= 0) brights.push(bY);
}
tops.sort((a, b) => a - b);
brights.sort((a, b) => a - b);
console.log(
  "silhouette delta",
  tops[tops.length - 1] - tops[0],
  "ridge delta",
  brights[brights.length - 1] - brights[0],
);

const meta = await sharp(outPath).metadata();
const zx = Math.max(0, Math.floor(meta.width * 0.28));
const zw = Math.min(meta.width - zx, Math.floor(meta.width * 0.44));
const zh = Math.min(meta.height, 90);
await sharp(outPath)
  .extract({ left: zx, top: 0, width: zw, height: zh })
  .resize(zw * 3, zh * 3, { kernel: "nearest" })
  .png()
  .toFile("public/brand/_top-zoom.png");

console.log("wrote", outPath);
