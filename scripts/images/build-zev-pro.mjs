// Builds the ZEV Pro and ZEV Compute pictures for the ZEV page.
//
//   npm i --no-save sharp@0.33.5
//   node scripts/images/build-zev-pro.mjs
//
// Sources (assets-source/zev-pro, gitignored), as delivered by the owner on
// 26 October 2026:
//   zev-pro-poster.jpg     the ZEV Pro enclosure composite (main view plus
//                          two insets, text baked in)
//   zev-pro-section.jpg    the owner's mock-up of the "From development to
//                          industrial design" pair; only its right panel,
//                          the enclosure on site, is used
//   zev-compute.jpg        the ZEV Compute composite (racks plus three
//                          insets, text baked in)
//   zev-pro-bench.png      the development assembly photograph
//
// Every panel is cut out so the page can set its own captions, and served
// as AVIF, WebP and JPEG at two widths. The module written to
// src/components/zev/zev-pro-images.js carries the srcsets and dimensions.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const SRC = path.join(REPO, "assets-source", "zev-pro");
const OUT = path.join(REPO, "public", "images", "zev-pro");
const MODULE = path.join(REPO, "src", "components", "zev", "zev-pro-images.js");

// Each cut: source file, crop box in source pixels, output widths, and the
// aspect ratio to deliver (applied as a cover resize after the crop).
const CUTS = {
  // The development assembly photograph, trimmed to the same landscape
  // frame as the enclosure panel beside it.
  bench: {
    file: "zev-pro-bench.png",
    // Full width, trimmed top and bottom to the panel ratio.
    box: (m) => {
      const height = Math.min(m.height, Math.round(m.width / (695 / 480)));
      return { left: 0, top: Math.max(0, Math.round((m.height - height) * 0.45)), width: m.width, height };
    },
    widths: [720, 1440],
    ratio: 695 / 480,
  },
  // The enclosure on site, from the owner's mock-up (its right panel).
  enclosureSite: { file: "zev-pro-section.jpg", box: { left: 795, top: 308, width: 695, height: 480 }, widths: [720, 1040], ratio: 695 / 480, sharpen: true },
  // The poster's main view, cut right of the baked-in title.
  poster: { file: "zev-pro-poster.jpg", box: { left: 410, top: 0, width: 625, height: 1024 }, widths: [520, 1040], ratio: 625 / 1024 },
  posterFront: { file: "zev-pro-poster.jpg", box: { left: 1060, top: 20, width: 462, height: 520 }, widths: [480, 960], ratio: 462 / 520 },
  posterGlands: { file: "zev-pro-poster.jpg", box: { left: 1060, top: 612, width: 462, height: 340 }, widths: [480, 960], ratio: 462 / 340 },
  // ZEV Compute: the racks, then the three insets.
  // Cut below the composite's subtitle line, which runs to y≈172.
  compute: { file: "zev-compute.jpg", box: { left: 232, top: 186, width: 862, height: 774 }, widths: [720, 1440], ratio: 862 / 774 },
  computeServer: { file: "zev-compute.jpg", box: { left: 1120, top: 176, width: 392, height: 200 }, widths: [400, 800], ratio: 392 / 200 },
  computeNetwork: { file: "zev-compute.jpg", box: { left: 1120, top: 440, width: 392, height: 190 }, widths: [400, 800], ratio: 392 / 190 },
  computePower: { file: "zev-compute.jpg", box: { left: 1120, top: 700, width: 392, height: 246 }, widths: [400, 800], ratio: 392 / 246 },
};

const encode = async (pipeline, name) => {
  const avif = await pipeline.clone().avif({ quality: 64, effort: 8 }).toFile(path.join(OUT, `${name}.avif`));
  const webp = await pipeline.clone().webp({ quality: 84, effort: 6 }).toFile(path.join(OUT, `${name}.webp`));
  const jpg = await pipeline.clone().jpeg({ quality: 85, progressive: true, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
  console.log(name, "avif", avif.size, "webp", webp.size, "jpg", jpg.size, `${avif.width}x${avif.height}`);
  return { width: avif.width, height: avif.height };
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

  const out = {};
  for (const [id, cut] of Object.entries(CUTS)) {
    const file = path.join(SRC, cut.file);
    if (!fs.existsSync(file)) throw new Error("Source image not found: " + file);
    const meta = await sharp(file).metadata();
    const box = typeof cut.box === "function" ? cut.box(meta) : cut.box;
    if (box.left + box.width > meta.width || box.top + box.height > meta.height) {
      throw new Error(`${id}: crop ${JSON.stringify(box)} exceeds ${meta.width}x${meta.height}`);
    }
    const base = await sharp(file).extract(box).png().toBuffer();
    const sizes = {};
    for (const w of cut.widths) {
      const h = Math.round(w / cut.ratio);
      let p = sharp(base).resize({ width: w, height: h, fit: "cover" });
      // The mock-up panel is small; a light sharpen after the upscale keeps
      // its edges honest on dense screens.
      if (cut.sharpen) p = p.sharpen({ sigma: 0.9, m1: 0.5, m2: 0.2 });
      sizes[w] = await encode(p, `${id}-${w}`);
    }
    const largest = sizes[cut.widths[cut.widths.length - 1]];
    const placeholder = `data:image/webp;base64,${(await sharp(base).resize({ width: 20 }).webp({ quality: 40 }).toBuffer()).toString("base64")}`;
    const srcset = (ext) => cut.widths.map((w) => `/images/zev-pro/${id}-${w}.${ext} ${w}w`).join(", ");
    out[id] = {
      avif: srcset("avif"),
      webp: srcset("webp"),
      jpg: srcset("jpg"),
      fallback: `/images/zev-pro/${id}-${cut.widths[cut.widths.length - 1]}.jpg`,
      width: largest.width,
      height: largest.height,
      placeholder,
    };
  }

  const src = `// Generated by scripts/images/build-zev-pro.mjs. Do not edit by hand.
// ZEV Pro and ZEV Compute pictures for the ZEV page: the development
// assembly, the enclosure concept on site, the poster's main view and two
// insets, and the ZEV Compute racks with three insets.

export const ZEV_PRO_IMAGES = ${JSON.stringify(out, null, 2)};
`;
  fs.writeFileSync(MODULE, src);
  console.log("wrote", path.relative(REPO, MODULE));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
