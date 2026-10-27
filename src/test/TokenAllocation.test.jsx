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
    // The six headings the founders set on 26 October 2026.
    expect(ALLOCATIONS).toHaveLength(6);
    expect(ALLOCATIONS.map((a) => [a.label, a.pct])).toEqual([
      ["ZEV Network & Rewards", 30],
      ["Token Sales", 20],
      ["Treasury, Growth & Liquidity", 20],
      ["Ecosystem & Infrastructure", 15],
      ["Team & Contributors", 10],
      ["Strategic Partnerships", 5],
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

// Private sale terms as set out in the founders' project updates of October
// 2026: ten equal releases, the first at launch. The site states the schedule
// and the limit; it never states a price, a fundraising target or a token
// equivalent that would reveal one.
describe("Private sale terms on the token page", () => {
  it("states the agreed schedule and limit and no price", () => {
    expect(PRIVATE_SALE.release).toMatch(/^10% of purchased tokens available at launch, then 10% of the original purchase each month for nine months\./);
    expect(PRIVATE_SALE.release).toMatch(/released by month 9, with no waiting period \(cliff\)/);
    expect(PRIVATE_SALE.schedule).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    expect(PRIVATE_SALE.strategic).toBeUndefined();
    const byLabel = Object.fromEntries(PRIVATE_SALE.participation.map((p) => [p.label, p.value]));
    expect(byLabel["Minimum"]).toBeUndefined();
    expect(byLabel["Maximum"]).toBe("USD 50,000 per person or entity, across all wallets");
    expect(byLabel["Locked tokens"]).toMatch(/vesting wallet/);
    // The wallet and identity-verification rules stay in the sale documents.
    expect(byLabel["Wallets"]).toBeUndefined();
    expect(byLabel["Verification"]).toBeUndefined();
    expect(PRIVATE_SALE.notice).toMatch(/Not an offer to sell/);

    const { container } = render(
      <MemoryRouter>
        <TokenomicsPage />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(container.querySelector("#private-sale")).not.toBeNull();
    expect(container.querySelector("#rewards")).not.toBeNull();
    expect(text).toMatch(/10% of purchased tokens available at launch/);
    expect(text).toMatch(/USD 50,000 per person or entity/);
    expect(text).not.toMatch(/verified person|jurisdiction restrictions|strategic allocations|24 months/);
    // No price, no target, no per-token figure, no old price.
    expect(text).not.toMatch(/USD 0\.\d|US\$|per ZLN|0\.06|0\.08|4 million|31,250|625,000|KYC|declared wallets/);
    // The deck calls it contribution mining; the site never does.
    expect(text).not.toMatch(/mining|\bstake (and|ZLN)|hold and stake/i);
    // The partner stays off the token page (the footer's mark excepted).
    expect(container.querySelector("main").textContent).not.toMatch(/Expofin/);
    expect(text).not.toContain(String.fromCharCode(8212)); // no em dash anywhere on the page
  });

  it("links the whitepaper edition that exists in public/docs", () => {
    expect(WHITEPAPER.file).toMatch(/^\/docs\/ZEV-ZLN_Whitepaper_\d{4}-\d{2}(-\d{2})?\.pdf$/);
    expect(fs.existsSync(path.join(process.cwd(), "public", WHITEPAPER.file))).toBe(true);
    // Earlier editions stay in place so shared links keep working.
    for (const earlier of ["ZEV-ZLN_Whitepaper.pdf", "ZEV-ZLN_Whitepaper_2026-10.pdf"]) {
      expect(fs.existsSync(path.join(process.cwd(), "public", "docs", earlier))).toBe(true);
    }
  });
});
