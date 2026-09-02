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
    expect(byLabel["Maximum supply"]).toBe("500,000,000 ZLN");
    expect(byLabel["Decimals"]).toBe("18");
    expect(byLabel["Transaction tax"]).toBe("0%");
    expect(byLabel["Additional minting"]).toBe("Disabled");
    expect(ALLOCATIONS.reduce((sum, a) => sum + a.pct, 0)).toBe(100);
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
