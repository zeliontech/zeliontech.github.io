import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// The site names the joint venture with Expofin and what each partner
// builds. It must never say how the venture is owned, split or funded, nor
// tie a partner to a token allocation. This scans the shipped source, not
// just the components a test happens to render, so a stray sentence on any
// page fails here rather than in public.
const FORBIDDEN = /50\s*\/\s*50|equal share|owned equally|equal ownership|equally owned|economic participation|shareholding in the joint venture|Strategic Partnerships allocation|profit.sharing arrangement/i;

const SRC = path.join(process.cwd(), "src");

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "test") continue;
      walk(full, out);
    } else if (/\.(jsx?|tsx?)$/.test(entry.name) && !/-Allam55\./.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
};

// The founders' project update of October 2026 exists in two editions: a
// community deck that may be shared, and an investor briefing shared only
// under a non-disclosure agreement. The site draws on the community edition.
// These are markers of material found only in the investor briefing (the
// sale price and target, the proof-of-concept contract reference, competitor
// analysis, anchoring-cost figures, reward-scoring internals, the price
// oracle, partner fleet-management plans, treasury signer controls and the
// prototype bench equipment), so none of it can reach a page by accident.
const NDA_ONLY = /US\$\s?0\.08|0\.08 per|US\$\s?4 million|4 million|0x93754358|Sourceful|EnergyTag|Association of Issuing Bodies|731\.77|Contribution Performance Score|System Schema|\boracle\b|fleet.management|authori[sz]ed signers|approval controls|SIMATIC|Siemens/i;

const scan = (pattern) => {
  const hits = [];
  for (const file of walk(SRC)) {
    const text = fs.readFileSync(file, "utf8");
    const m = text.match(pattern);
    if (m) hits.push(`${path.relative(process.cwd(), file)}: "${m[0]}"`);
  }
  return hits;
};

describe("Joint-venture confidentiality", () => {
  it("keeps ownership and economics wording out of every shipped source file", () => {
    expect(scan(FORBIDDEN)).toEqual([]);
  });
});

describe("Investor-briefing confidentiality", () => {
  it("keeps material found only in the NDA edition out of every shipped source file", () => {
    expect(scan(NDA_ONLY)).toEqual([]);
  });
});