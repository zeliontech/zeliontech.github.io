// Builds the team portraits: one square crop per person, centred on the
// subject by sharp's attention heuristic, at 280px (2x of the 140px circle),
// as AVIF, WebP and JPEG. EXIF orientation is honoured, so phone photos come
// out upright.
//
//   npm i --no-save sharp@0.33.5
//   node scripts/images/build-team.mjs [source-dir]
//
// Sources are the originals the owner supplied, kept out of the repo under the
// gitignored assets-source/team folder (they were 0.9 to 1.6 MB PNGs, far too
// heavy to ship for a 140px avatar). Output names are the slugs TeamSection
// uses.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const SRC_DIR = process.argv[2] || path.join(REPO, "assets-source", "team");
const OUT = path.join(REPO, "public", "team");
const SIZE = 280;

const PEOPLE = [
  { slug: "ihsan-serdar-eldek", source: "Serdar Photo.jpeg" },
  { slug: "roula-jamil", source: "Roula photo.jpeg" },
  { slug: "allam-jamil", source: "allam photo.jpeg" },
  { slug: "dino-vincoletto", source: "dino-vincoletto.jpeg" },
  { slug: "alessio-munerato", source: "alessio-munerato.png" },
  { slug: "federico-davoli", source: "federico-davoli.png" },
  { slug: "luigi-benacchio", source: "luigi-benacchio.jpeg" },
  { slug: "eleonora-passarella", source: "eleonora-passarella.png" },
  { slug: "antonio-guadagnino", source: "antonio-guadagnino.png" },
  { slug: "michele-de-carli", source: "michele-de-carli.png" },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  for (const p of PEOPLE) {
    const src = path.join(SRC_DIR, p.source);
    if (!fs.existsSync(src)) throw new Error("Missing source: " + src);
    const base = sharp(src).rotate().resize(SIZE, SIZE, { fit: "cover", position: sharp.strategy.attention });
    const avif = await base.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(OUT, `${p.slug}.avif`));
    const webp = await base.clone().webp({ quality: 80, effort: 6 }).toFile(path.join(OUT, `${p.slug}.webp`));
    const jpg = await base.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(path.join(OUT, `${p.slug}.jpg`));
    total += avif.size + webp.size + jpg.size;
    console.log(p.slug.padEnd(22), "avif", avif.size, "webp", webp.size, "jpg", jpg.size);
  }
  console.log("all formats together:", total, "bytes");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
