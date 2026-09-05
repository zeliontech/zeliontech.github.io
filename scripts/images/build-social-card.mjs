// Builds the social preview card (Open Graph / X / Telegram / WhatsApp) from
// the ZEV on-site scene: a 1200x630 crop of the photograph with the logo on a
// white tile in the lower-left corner. No text is rendered into the image (no
// brand font is available to the renderer); the title and description come
// from the meta tags next to it.
//
//   npm i --no-save sharp@0.33.5
//   node scripts/images/build-social-card.mjs path/to/zev-scene-source.png
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const SRC = process.argv[2] || path.join(REPO, "assets-source", "zev-scene-source.png");
const LOGO = path.join(REPO, "public", "logo.svg");
const OUT = path.join(REPO, "public", "preview.jpg");

const W = 1200;
const H = 630;

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error("Source image not found: " + SRC + " (pass the path as the first argument)");
  }
  const meta = await sharp(SRC).metadata();

  // Crop the source to the card ratio, keeping the top of the device: the
  // source is 1672x941, the card wants 1.905:1, so 1672x878 from y = 30.
  const cropH = Math.round(meta.width / (W / H));
  const top = Math.max(0, Math.min(meta.height - cropH, 30));
  const photo = sharp(SRC).extract({ left: 0, top, width: meta.width, height: cropH }).resize(W, H);

  // Logo tile: white rounded square, the black mark centred inside. The logo
  // viewBox is 200 520 280 390 (280 wide, 390 tall).
  const logoSvg = fs.readFileSync(LOGO, "utf8");
  const inner = logoSvg.slice(logoSvg.indexOf(">") + 1, logoSvg.lastIndexOf("</svg>"));
  const tile = 104;
  const pad = 56;
  const tileX = pad;
  const tileY = H - pad - tile;
  const markH = 60;
  const scale = markH / 390;
  const markW = 280 * scale;
  const markX = tileX + (tile - markW) / 2;
  const markY = tileY + (tile - markH) / 2;
  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0B0F17" flood-opacity="0.22"/>
        </filter>
      </defs>
      <rect x="${tileX}" y="${tileY}" width="${tile}" height="${tile}" rx="26" fill="#FFFFFF" filter="url(#shadow)"/>
      <g transform="translate(${markX} ${markY}) scale(${scale}) translate(-200 -520)" fill="#0B0F17">${inner}</g>
    </svg>`
  );

  const info = await photo
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(OUT);
  console.log("preview.jpg", info.width + "x" + info.height, info.size, "bytes");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
