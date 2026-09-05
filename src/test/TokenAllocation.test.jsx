import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ALLOCATIONS, TOTAL_SUPPLY } from "@/components/zev/TokenAllocation";
import { PARAMETERS, TEASER_PARAMETERS } from "@/components/zev/zln";
import ZevStack from "@/components/zev/ZevStack";

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
