// Builds the responsive set for the ZelionTech x Expofin joint-venture banner.
//
//   npm i --no-save sharp@0.33.5
//   node scripts/images/build-jv-banner.mjs path/to/zeliontech-expofin-banner.png
//
// The source is the co-branded 1933x813 PNG: all text baked into the
// pixels, and its own rounded corners painted in as near-white wedges of
// about 90px radius. It is not committed; the default path below is
// gitignored.
//
// On the page the banner is a crisp poster: every logo, label and URL on it
// is served untouched, clipped only by the site's own corner radius. The
// hero-style blur and fade sit behind it as an ambient glow of the scene's
// colours, so the composition dissolves into the page without dimming a
// single printed pixel. Two things are prepared here for that:
//
//   1. The painted corner wedges are rebuilt from the neighbouring pixels,
//      so the poster is a full rectangle and the CSS radius does the
//      rounding cleanly.
//   2. A tiny, heavily blurred rendition of the picture is inlined as the
//      glow (a data URI a few KB in size, scaled up and blurred again by
//      CSS), plus the usual 24px placeholder.
//
// One set lands under public/images/jv, jv-banner-{960,1440,1933}: the
// whole composite at every viewport. Phones show it complete rather than a
// crop, at the owner's request, so the small print is small there but the
// composition is never cut. Each width ships as AVIF, WebP and a JPEG
// fallback. Srcsets, dimensions, placeholder and glow are written to
// src/components/zev/jv-banner.js, which JointVenture.jsx imports.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
// The corrected edition of 15 September 2026 is a JPEG; the first edition was a PNG.
const SRC = process.argv[2] || path.join(REPO, "assets-source", "jv", "zeliontech-expofin-banner.jpg");
const OUT = path.join(REPO, "public", "images", "jv");
const MODULE = path.join(REPO, "src", "components", "zev", "jv-banner.js");

const CORNER_RADIUS = 110; // generous: the painted arc is about 90px, and the tips are sky and ground
const WIDTHS = [960, 1440, 1933];

// Replace the near-white wedge outside each painted corner arc with the
// pixels just inside the arc on the same row. Where the wedge is wide (at
// the very tip) the neighbours are sky or ground, so the fill is invisible.
async function rebuildCorners(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const r = CORNER_RADIUS;
  const copy = (x, y, sx, sy) => {
    const i = (y * W + x) * C;
    const j = (sy * W + sx) * C;
    data[i] = data[j];
    data[i + 1] = data[j + 1];
    data[i + 2] = data[j + 2];
    data[i + 3] = 255;
  };
  for (let y = 0; y < r; y++) {
    const dy = r - y;
    const wedge = Math.ceil(r - Math.sqrt(r * r - dy * dy)) + 2;
    for (let x = 0; x < wedge; x++) {
      copy(x, y, wedge, y);
      copy(W - 1 - x, y, W - 1 - wedge, y);
      copy(x, H - 1 - y, wedge, H - 1 - y);
      copy(W - 1 - x, H - 1 - y, W - 1 - wedge, H - 1 - y);
    }
  }
  return sharp(data, { raw: { width: W, height: H, channels: C } }).removeAlpha().png().toBuffer();
}

const encode = async (pipeline, name) => {
  const avif = await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(OUT, `${name}.avif`));
  const webp = await pipeline.clone().webp({ quality: 80, effort: 6 }).toFile(path.join(OUT, `${name}.webp`));
  const jpg = await pipeline
    .clone()
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  console.log(name, "avif", avif.size, "webp", webp.size, "jpg", jpg.size, `${avif.width}x${avif.height}`);
  return { width: avif.width, height: avif.height };
};

const dataUri = async (pipeline) => `data:image/webp;base64,${(await pipeline.toBuffer()).toString("base64")}`;

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error("Source image not found: " + SRC + " (pass the path as the first argument)");
  }
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (f.startsWith("jv-banner")) fs.unlinkSync(path.join(OUT, f));

  const meta = await sharp(SRC).metadata();
  console.log("source", meta.width, meta.height);
  const poster = await rebuildCorners(SRC);

  const out = {};
  for (const w of WIDTHS) {
    out[w] = await encode(sharp(poster).resize({ width: w, withoutEnlargement: true }), `jv-banner-${w}`);
  }

  // Placeholder: painted behind the poster while it loads.
  const placeholder = await dataUri(sharp(poster).resize({ width: 24 }).webp({ quality: 40 }));
  // Glow: the scene's colours, blurred, for the ambient light behind the
  // poster. Saturation is lifted a little so the halo reads as light, not as
  // a grey smudge, once the CSS blur and the page mask soften it further.
  const glow = await dataUri(sharp(poster).resize({ width: 96 }).blur(3).modulate({ saturation: 1.25 }).webp({ quality: 70 }));

  const srcset = (ext) => WIDTHS.map((w) => `/images/jv/jv-banner-${w}.${ext} ${w}w`).join(", ");
  const largest = WIDTHS[WIDTHS.length - 1];

  const src = `// Generated by scripts/images/build-jv-banner.mjs. Do not edit by hand.
// Responsive sources for the ZelionTech x Expofin joint-venture banner.

export const JV_BANNER = {
  avif: "${srcset("avif")}",
  webp: "${srcset("webp")}",
  jpg: "${srcset("jpg")}",
  fallback: "/images/jv/jv-banner-${largest}.jpg",
  width: ${out[largest].width},
  height: ${out[largest].height},
  // The figure sits in a max-w-6xl container (72rem) with 1rem side padding.
  sizes: "(min-width: 1280px) 1152px, calc(100vw - 2rem)",
  placeholder: "${placeholder}",
  glow: "${glow}",
};
`;
  fs.writeFileSync(MODULE, src);
  console.log("wrote", path.relative(REPO, MODULE));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
