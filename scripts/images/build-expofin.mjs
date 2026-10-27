// Builds the Expofin reference-equipment renders and the Expofin wordmark.
//
//   npm i --no-save sharp@0.33.5
//   node scripts/images/build-expofin.mjs
//
// Sources live in assets-source/expofin (gitignored): product renders from
// Expofin's own material and from expofin.eu, used with the partner's
// agreement, plus the wordmark from the expofin.eu header. All of them are
// cut-outs on a transparent ground, except the Pensilina Smart render, which
// arrives on a flat sky-blue card that is keyed out here.
//
// Each render is trimmed and fitted inside a square box at two sizes, so a
// tall tower and a squat storage unit share one tile height on the page.
// Output: public/images/expofin/<id>-{480,960}.{avif,webp,png} with alpha,
// the wordmark at 320 and 640 px wide, and src/components/zev/expofin.js
// with the srcsets, which Technology.jsx, Footer.jsx and UseCases.jsx import.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const SRC = path.join(REPO, "assets-source", "expofin");
const OUT = path.join(REPO, "public", "images", "expofin");
const MODULE = path.join(REPO, "src", "components", "zev", "expofin.js");

const SIZES = [480, 960];

// Order and copy are the page's, kept here so the module carries the whole
// tile: the picture, the product name and what the equipment does.
const PRODUCTS = [
  {
    id: "solid-power",
    file: "solid-power-10kwh.png",
    name: "Solid Power",
    kind: "Graphene supercapacitor storage",
    body: "All-in-one energy storage with the inverter built in, from home units to containerised systems for industrial sites.",
  },
  {
    id: "eos-th",
    file: "eos-th.png",
    name: "EOS TH",
    kind: "Biaxial parabolic solar concentrator",
    body: "A mirrored parabola that tracks the sun to produce thermal energy for buildings and industrial processes.",
  },
  {
    id: "smart-tower-5g",
    file: "smart-tower-5g.png",
    name: "Smart Tower 5G",
    kind: "Self-powered urban tower",
    body: "A photovoltaic tower with its own storage that carries lighting, connectivity, sensing and services for smart cities.",
  },
  {
    id: "pensilina-smart",
    file: "pensilina-smart.png",
    name: "Pensilina Smart",
    kind: "Photovoltaic carport",
    body: "A free-standing solar canopy for car parks and public spaces, with electric-vehicle charging and services built in.",
    key: { r: 57, g: 181, b: 255 },
  },
];

// Replace a flat key colour with transparency. Pixels near the key fade out
// in proportion to their distance from it, so anti-aliased edges keep a soft
// rim instead of a blue halo.
async function keyOut(input, key) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const C = info.channels;
  for (let i = 0; i < data.length; i += C) {
    const d = Math.hypot(data[i] - key.r, data[i + 1] - key.g, data[i + 2] - key.b);
    if (d < 48) data[i + 3] = 0;
    else if (d < 110) data[i + 3] = Math.round(data[i + 3] * ((d - 48) / 62));
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: C } }).png().toBuffer();
}

const encode = async (pipeline, name) => {
  const avif = await pipeline.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(OUT, `${name}.avif`));
  const webp = await pipeline.clone().webp({ quality: 82, effort: 6, alphaQuality: 90 }).toFile(path.join(OUT, `${name}.webp`));
  const png = await pipeline.clone().png({ compressionLevel: 9, palette: false }).toFile(path.join(OUT, `${name}.png`));
  console.log(name, "avif", avif.size, "webp", webp.size, "png", png.size, `${avif.width}x${avif.height}`);
  return { width: avif.width, height: avif.height };
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

  const out = [];
  for (const p of PRODUCTS) {
    const file = path.join(SRC, p.file);
    if (!fs.existsSync(file)) throw new Error("Source image not found: " + file);
    let input = fs.readFileSync(file);
    if (p.key) input = await keyOut(input, p.key);
    const trimmed = await sharp(input).ensureAlpha().trim({ threshold: 12 }).png().toBuffer();
    const dims = {};
    for (const S of SIZES) {
      dims[S] = await encode(sharp(trimmed).resize({ width: S, height: S, fit: "inside", withoutEnlargement: false }), `${p.id}-${S}`);
    }
    const largest = dims[SIZES[SIZES.length - 1]];
    out.push({ ...p, file: undefined, key: undefined, width: largest.width, height: largest.height });
  }

  // Wordmark: trimmed, two widths, PNG and WebP (the AVIF saving is not worth
  // a third request for a 300px mark).
  const mark = await sharp(path.join(SRC, "expofin-wordmark.png")).ensureAlpha().trim({ threshold: 12 }).png().toBuffer();
  const markDims = {};
  for (const w of [320, 640]) {
    const webp = await sharp(mark).resize({ width: w }).webp({ quality: 90, alphaQuality: 95 }).toFile(path.join(OUT, `wordmark-${w}.webp`));
    const png = await sharp(mark).resize({ width: w }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `wordmark-${w}.png`));
    markDims[w] = { width: png.width, height: png.height };
    console.log(`wordmark-${w}`, "webp", webp.size, "png", png.size, `${png.width}x${png.height}`);
  }

  const srcset = (id, ext) => SIZES.map((S) => `/images/expofin/${id}-${S}.${ext} ${S}w`).join(", ");
  const src = `// Generated by scripts/images/build-expofin.mjs. Do not edit by hand.
// Expofin E.S.Co. reference equipment and wordmark: pictures, names and copy.

export const EXPOFIN_URL = "https://expofin.eu";

export const EXPOFIN_PRODUCTS = ${JSON.stringify(
    out.map((p) => ({
      id: p.id,
      name: p.name,
      kind: p.kind,
      body: p.body,
      avif: srcset(p.id, "avif"),
      webp: srcset(p.id, "webp"),
      png: srcset(p.id, "png"),
      fallback: `/images/expofin/${p.id}-${SIZES[SIZES.length - 1]}.png`,
      width: p.width,
      height: p.height,
    })),
    null,
    2
  )};

export const EXPOFIN_WORDMARK = {
  webp: "/images/expofin/wordmark-320.webp 320w, /images/expofin/wordmark-640.webp 640w",
  png: "/images/expofin/wordmark-320.png 320w, /images/expofin/wordmark-640.png 640w",
  fallback: "/images/expofin/wordmark-640.png",
  width: ${markDims[640].width},
  height: ${markDims[640].height},
};
`;
  fs.writeFileSync(MODULE, src);
  console.log("wrote", path.relative(REPO, MODULE));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
