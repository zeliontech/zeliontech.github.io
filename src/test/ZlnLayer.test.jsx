import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZlnLayer, { PARAMETERS, ALLOCATIONS, UTILITIES } from "@/components/zev/ZlnLayer";

// §24: no price, return, listing or appreciation language; no certification claims.
const FORBIDDEN = /\bprice|\breturns?\b|appreciat|listing|guarantee|certif|backed by carbon|IP67|IEC 61557|\bSLA\b|trustless|mining/i;

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

describe("<ZlnLayer /> (brief §11–§13)", () => {
  it("states the brief's technical parameters and an allocation that sums to 100%", () => {
    const byLabel = Object.fromEntries(PARAMETERS.map((p) => [p.label, p.value]));
    expect(byLabel["Blockchain"]).toBe("BNB Smart Chain");
    expect(byLabel["Token standard"]).toBe("BEP-20");
    expect(byLabel["Maximum supply"]).toBe("500,000,000 ZLN");
    expect(byLabel["Decimals"]).toBe("18");
    expect(byLabel["Transaction tax"]).toBe("0%");
    expect(byLabel["Additional minting"]).toBe("Disabled");
    expect(ALLOCATIONS.reduce((sum, a) => sum + a.pct, 0)).toBe(100);
  });

  // The owner-approved final allocation. These figures appear in three places
  // (this section, the tokenomics page and the whitepaper), so they are
  // pinned here rather than left to drift.
  it("matches the approved final allocation exactly", () => {
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
  });

  // The tokenomics page renders the same numbers with token counts; a
  // mismatch between the two would be a live inconsistency on the site.
  it("agrees with the tokenomics page allocation", async () => {
    const { ALLOCATIONS: PAGE, TOTAL_SUPPLY } = await import("@/components/zev/TokenAllocation");
    expect(PAGE.map((a) => [a.label, a.pct])).toEqual(ALLOCATIONS.map((a) => [a.label, a.pct]));
    const summed = PAGE.reduce((n, a) => n + Number(a.zln.replace(/,/g, "")), 0);
    expect(summed).toBe(TOTAL_SUPPLY);
    for (const a of PAGE) {
      expect(Number(a.zln.replace(/,/g, ""))).toBe((a.pct / 100) * TOTAL_SUPPLY);
    }
  });

  it("renders parameters, allocation, planned utilities and the §24 lines", () => {
    const { container } = render(
      <MemoryRouter>
        <ZlnLayer />
      </MemoryRouter>
    );
    for (const p of PARAMETERS) expect(screen.getByText(p.value)).toBeInTheDocument();
    for (const a of ALLOCATIONS) expect(screen.getByText(a.label)).toBeInTheDocument();
    for (const u of UTILITIES) expect(screen.getByRole("heading", { level: 3, name: u.title })).toBeInTheDocument();
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.queryByText("Demonstrated")).toBeNull();
    expect(container.textContent).toMatch(/not a financial product/i);
    expect(container.textContent).toMatch(/not a carbon credit/i);
    expect(container.textContent).not.toMatch(FORBIDDEN);
    expect(container.querySelector("#zln")).not.toBeNull();
    expect(screen.getByRole("link", { name: /full tokenomics/i })).toHaveAttribute("href", "/tokenomics");
  });
});
