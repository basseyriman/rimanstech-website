import sharp from "sharp";
import fs from "fs";

/**
 * Force a perfectly straight, constant-thickness chrome top bar.
 * Paints the bridge over the R/T gap so the middle can't look notched.
 */
const src = "public/brand/rimanstech-monogram-hero-clean.png";
const backup = "public/brand/archive/rimanstech-monogram-hero-clean-pre-straight.png";

if (!fs.existsSync(backup)) fs.copyFileSync(src, backup);
fs.copyFileSync(backup, src);

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const px = Buffer.from(data);
const out = Buffer.from(px);

const Lof = (buf, i) => 0.299 * buf[i] + 0.587 * buf[i + 1] + 0.114 * buf[i + 2];
const solid = (buf, x, y) => {
  if (x < 0 || x >= w || y < 0 || y >= h) return false;
  const i = (y * w + x) * 4;
  return buf[i + 3] > 140 && Lof(buf, i) > 40;
};

const top = new Array(w).fill(-1);
for (let x = 0; x < w; x++) {
  for (let y = 0; y < 90; y++) {
    if (solid(px, x, y) && solid(px, x, y + 1)) {
      top[x] = y;
      break;
    }
  }
}

// Find left/right extents of the top bar from solid tops
let x0 = -1;
let x1 = -1;
for (let x = 0; x < w; x++) {
  if (top[x] >= 0 && top[x] < 45) {
    if (x0 < 0) x0 = x;
    x1 = x;
  }
}

// Tighten to the main body (ignore soft fringe)
while (x0 < x1 && !solid(px, x0, top[x0] + 4)) x0++;
while (x1 > x0 && !solid(px, x1, top[x1] + 4)) x1--;

const targetY = 18;
const depth = 20; // constant bar thickness
console.log({ x0, x1, targetY, depth });

// Chrome strip profile — identical every column
const strip = [];
for (let dy = 0; dy < depth; dy++) {
  const u = dy / (depth - 1);
  let L;
  if (u < 0.1) L = 170 + u * 850;
  else if (u < 0.25) L = 255;
  else if (u < 0.75) L = 248 - (u - 0.25) * 70;
  else L = 212 - (u - 0.75) * 180;
  L = Math.max(95, Math.min(255, Math.round(L)));
  strip.push([L, L, L]);
}

// A column is part of the top bar if it has metal near the top OR is between
// left and right bar anchors (bridge the center gap under the bar)
function hasTopMetal(x) {
  for (let y = 0; y < 55; y++) if (solid(px, x, y)) return true;
  return false;
}

const leftAnchor = x0;
const rightAnchor = x1;

for (let x = leftAnchor; x <= rightAnchor; x++) {
  // Include bridge columns even if currently empty below the bar
  const inBridge = x > leftAnchor && x < rightAnchor;
  if (!hasTopMetal(x) && !inBridge) continue;

  // For bridge: only paint if neighbors have top bar (avoid filling the big hole below)
  // We only paint targetY..targetY+depth-1, so the hole under stays empty.

  // Clear above
  for (let y = 0; y < targetY; y++) {
    const i = (y * w + x) * 4;
    out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
  }

  if (targetY > 0) {
    const ai = ((targetY - 1) * w + x) * 4;
    out[ai] = out[ai + 1] = out[ai + 2] = strip[0][0];
    out[ai + 3] = 130;
  }

  for (let dy = 0; dy < depth; dy++) {
    const y = targetY + dy;
    const i = (y * w + x) * 4;
    const p = strip[dy];
    out[i] = p[0];
    out[i + 1] = p[1];
    out[i + 2] = p[2];
    out[i + 3] = 255;
  }

  // Soften transition into original body just under the strip
  const joinY = targetY + depth;
  if (joinY < h && solid(px, x, joinY)) {
    const i = (joinY * w + x) * 4;
    const oi = i;
    out[i] = Math.round(out[i - w * 4] * 0.45 + px[oi] * 0.55);
    out[i + 1] = Math.round(out[i - w * 4 + 1] * 0.45 + px[oi + 1] * 0.55);
    out[i + 2] = Math.round(out[i - w * 4 + 2] * 0.45 + px[oi + 2] * 0.55);
    out[i + 3] = 255;
  }
}

await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(src);

// Verify across full bar including bridge
const check = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const tops = [];
const ridge = [];
for (let x = leftAnchor; x <= rightAnchor; x++) {
  let t = -1;
  let bY = -1;
  let bL = -1;
  for (let y = 0; y < targetY + depth; y++) {
    const i = (y * w + x) * 4;
    if (check.data[i + 3] < 150) continue;
    const L = Lof(check.data, i);
    if (L <= 40) continue;
    if (t < 0) t = y;
    if (L > bL) {
      bL = L;
      bY = y;
    }
  }
  if (t >= 0) tops.push(t);
  if (bY >= 0) ridge.push(bY);
}
tops.sort((a, b) => a - b);
ridge.sort((a, b) => a - b);
console.log(
  "cols",
  tops.length,
  "silhouette delta",
  tops[tops.length - 1] - tops[0],
  "ridge delta",
  ridge[ridge.length - 1] - ridge[0],
);

await sharp(src)
  .extract({
    left: Math.floor(w * 0.25),
    top: Math.max(0, targetY - 8),
    width: Math.floor(w * 0.5),
    height: depth + 20,
  })
  .resize({ width: Math.floor(w * 1.5), kernel: "nearest" })
  .png()
  .toFile("public/brand/_top-zoom.png");

console.log("updated", src);
