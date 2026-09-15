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

describe("Joint-venture confidentiality", () => {
  it("keeps ownership and economics wording out of every shipped source file", () => {
    const hits = [];
    for (const file of walk(SRC)) {
      const text = fs.readFileSync(file, "utf8");
      const m = text.match(FORBIDDEN);
      if (m) hits.push(`${path.relative(process.cwd(), file)}: "${m[0]}"`);
    }
    expect(hits).toEqual([]);
  });
});
