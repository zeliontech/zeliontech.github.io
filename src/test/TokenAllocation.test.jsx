import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import fs from "node:fs";
import path from "node:path";
import { ALLOCATIONS, TOTAL_SUPPLY } from "@/components/zev/TokenAllocation";
import { PARAMETERS, TEASER_PARAMETERS, PRIVATE_SALE, WHITEPAPER } from "@/components/zev/zln";
import ZevStack from "@/components/zev/ZevStack";
import TokenomicsPage from "@/pages/TokenomicsPage";

// The owner-approved token facts appear on the Tokenomics page, in the ZLN
// layer of the homepage stack and in the whitepaper. They are pinned here so
// a change in one place cannot go unnoticed in the others.

beforeEach(() => {
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
});

describe("ZLN facts (brief §11–§13)", () => {
  it("keeps the technical parameters exactly as approved", () => {
    const byLabel = Object.fromEntries(PARAMETERS.map((p) => [p.label, p.value]));
    expect(byLabel["Network"]).toBe("BNB Smart Chain");
    expect(byLabel["Token standard"]).toBe("BEP-20");
    expect(byLabel["Maximum supply"]).toBe("500,000,000 ZLN");
    expect(byLabel["Decimals"]).toBe("18");
    expect(byLabel["Transaction tax"]).toBe("0%");
    expect(byLabel["Additional minting"]).toBe("Disabled");
    expect(TEASER_PARAMETERS).toHaveLength(4);
  });

  it("matches the approved final allocation exactly and sums to the supply", () => {
    expect(ALLOCATIONS).toHaveLength(8);
    expect(ALLOCATIONS.map((a) => [a.label, a.pct])).toEqual([
      ["Compute Rewards & ZEV Network", 20],
      ["Ecosystem & Infrastructure", 15],
      ["Liquidity & Market Stability", 15],
      ["Core Contributors (Team)", 10],
      ["Private & Strategic Sale", 10],
      ["Public Sale", 10],
      ["Strategic Partnerships", 10],
      ["Community & Marketing", 10],
    ]);
    expect(ALLOCATIONS.reduce((sum, a) => sum + a.pct, 0)).toBe(100);
    const summed = ALLOCATIONS.reduce((n, a) => n + Number(a.zln.replace(/,/g, "")), 0);
    expect(summed).toBe(TOTAL_SUPPLY);
    for (const a of ALLOCATIONS) {
      expect(Number(a.zln.replace(/,/g, ""))).toBe((a.pct / 100) * TOTAL_SUPPLY);
    }
  });

  it("shows the token teaser and the carbon-credit distinction in the homepage stack", () => {
    const { container } = render(
      <MemoryRouter>
        <ZevStack />
      </MemoryRouter>
    );
    for (const p of TEASER_PARAMETERS) expect(screen.getByText(p.value)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full tokenomics/i })).toHaveAttribute("href", "/tokenomics");
    expect(container.textContent).toMatch(/not a carbon credit/i);
    expect(container.textContent).toMatch(/not a financial product/i);
    expect(container.querySelector("#ecosystem")).not.toBeNull();
  });
});

// Private sale and strategic allocation terms as decided on 14 October 2026.
// The site states the schedule and the participation limits; it never states
// a price or a token equivalent that would reveal one.
describe("Private sale terms on the token page", () => {
  it("states the agreed schedule and limits and no price", () => {
    expect(PRIVATE_SALE.release).toMatch(/^15% of purchased tokens available at launch\./);
    expect(PRIVATE_SALE.release).toMatch(/remaining 85% is locked for 6 months \(the cliff\), then released monthly over 24 months/);
    expect(PRIVATE_SALE.strategic).toMatch(/fully locked for 6 months, then released monthly over 24 months/);
    const byLabel = Object.fromEntries(PRIVATE_SALE.participation.map((p) => [p.label, p.value]));
    expect(byLabel["Minimum"]).toMatch(/USD 2,500/);
    expect(byLabel["Maximum"]).toMatch(/USD 50,000/);
    expect(byLabel["Wallets"]).toMatch(/Up to 3 declared wallets/);
    expect(byLabel["Verification"]).toMatch(/KYC/);
    expect(byLabel["Locked tokens"]).toMatch(/vesting contract/);
    expect(PRIVATE_SALE.notice).toMatch(/Not an offer to sell/);

    const { container } = render(
      <MemoryRouter>
        <TokenomicsPage />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(container.querySelector("#private-sale")).not.toBeNull();
    expect(text).toMatch(/15% of purchased tokens available at launch/);
    expect(text).toMatch(/USD 50,000 per verified person or entity/);
    // No price, no per-token figure, no old price, and the pool is not split.
    expect(text).not.toMatch(/USD 0\.\d|per ZLN|0\.06|0\.08|31,250|625,000/);
    expect(text).not.toContain(String.fromCharCode(8212)); // no em dash anywhere on the page
  });

  it("links the whitepaper edition that exists in public/docs", () => {
    expect(WHITEPAPER.file).toMatch(/^\/docs\/ZEV-ZLN_Whitepaper_\d{4}-\d{2}\.pdf$/);
    expect(fs.existsSync(path.join(process.cwd(), "public", WHITEPAPER.file))).toBe(true);
    // The previous edition stays in place so shared links keep working.
    expect(fs.existsSync(path.join(process.cwd(), "public", "docs", "ZEV-ZLN_Whitepaper.pdf"))).toBe(true);
  });
});
