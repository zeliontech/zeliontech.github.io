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
// Two sets land under public/images/jv:
//
//   jv-banner-{960,1440,1933}   the whole composite, viewports >= 640px
//   jv-banner-mobile-{640,960}  an art-directed crop of the left part (the
//                               two logos in full, the headline, ZEV Pro and
//                               ZEV Lite) for phones, where the full width
//                               would make the baked-in text unreadable
//
// Each width ships as AVIF, WebP and a JPEG fallback. Srcsets, dimensions,
// placeholder and glow are written to src/components/zev/jv-banner.js,
// which JointVenture.jsx imports.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const SRC = process.argv[2] || path.join(REPO, "assets-source", "jv", "zeliontech-expofin-banner.png");
const OUT = path.join(REPO, "public", "images", "jv");
const MODULE = path.join(REPO, "src", "components", "zev", "jv-banner.js");

const CORNER_RADIUS = 110; // generous: the painted arc is about 90px, and the tips are sky and ground
// Left part of the composite for phones. Ends just past the ZEV Lite pole
// and well clear of the Expofin wordmark, so neither logo is touched.
const MOBILE_CROP_RIGHT = 1060;
const DESKTOP_WIDTHS = [960, 1440, 1933];
const MOBILE_WIDTHS = [640, 960];

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
  const mobilePoster = await sharp(poster)
    .extract({ left: 0, top: 0, width: MOBILE_CROP_RIGHT, height: meta.height })
    .png()
    .toBuffer();

  const desktop = {};
  for (const w of DESKTOP_WIDTHS) {
    desktop[w] = await encode(sharp(poster).resize({ width: w, withoutEnlargement: true }), `jv-banner-${w}`);
  }
  const mobile = {};
  for (const w of MOBILE_WIDTHS) {
    mobile[w] = await encode(sharp(mobilePoster).resize({ width: w, withoutEnlargement: true }), `jv-banner-mobile-${w}`);
  }

  // Placeholder: painted behind the poster while it loads.
  const placeholder = await dataUri(sharp(poster).resize({ width: 24 }).webp({ quality: 40 }));
  // Glow: the scene's colours, blurred, for the ambient light behind the
  // poster. Saturation is lifted a little so the halo reads as light, not as
  // a grey smudge, once the CSS blur and the page mask soften it further.
  const glow = await dataUri(sharp(poster).resize({ width: 96 }).blur(3).modulate({ saturation: 1.25 }).webp({ quality: 70 }));
  const mobileGlow = await dataUri(sharp(mobilePoster).resize({ width: 96 }).blur(3).modulate({ saturation: 1.25 }).webp({ quality: 70 }));

  const srcset = (prefix, widths, ext) => widths.map((w) => `/images/jv/${prefix}-${w}.${ext} ${w}w`).join(", ");
  const largestDesktop = DESKTOP_WIDTHS[DESKTOP_WIDTHS.length - 1];
  const largestMobile = MOBILE_WIDTHS[MOBILE_WIDTHS.length - 1];

  const src = `// Generated by scripts/images/build-jv-banner.mjs. Do not edit by hand.
// Responsive sources for the ZelionTech x Expofin joint-venture banner.

export const JV_BANNER = {
  // Whole composite, viewports from 640px up.
  desktop: {
    avif: "${srcset("jv-banner", DESKTOP_WIDTHS, "avif")}",
    webp: "${srcset("jv-banner", DESKTOP_WIDTHS, "webp")}",
    jpg: "${srcset("jv-banner", DESKTOP_WIDTHS, "jpg")}",
    fallback: "/images/jv/jv-banner-${largestDesktop}.jpg",
    width: ${desktop[largestDesktop].width},
    height: ${desktop[largestDesktop].height},
    glow: "${glow}",
  },
  // Art-directed crop of the left part, viewports below 640px.
  mobile: {
    media: "(max-width: 639px)",
    avif: "${srcset("jv-banner-mobile", MOBILE_WIDTHS, "avif")}",
    webp: "${srcset("jv-banner-mobile", MOBILE_WIDTHS, "webp")}",
    jpg: "${srcset("jv-banner-mobile", MOBILE_WIDTHS, "jpg")}",
    width: ${mobile[largestMobile].width},
    height: ${mobile[largestMobile].height},
    glow: "${mobileGlow}",
  },
  // The figure sits in a max-w-6xl container (72rem) with 1rem side padding.
  sizes: "(min-width: 1280px) 1152px, calc(100vw - 2rem)",
  placeholder: "${placeholder}",
};
`;
  fs.writeFileSync(MODULE, src);
  console.log("wrote", path.relative(REPO, MODULE));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
