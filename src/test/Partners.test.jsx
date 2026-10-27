import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Partners, { EXPOFIN_FACTS, MORE_EQUIPMENT, CONNECTION, AGREEMENTS } from "@/pages/Partners";
import { EXPOFIN_PRODUCTS } from "@/components/zev/expofin";

// The Partners page gives the joint-venture partner room, within the site's
// rules: nothing about ownership or economics, none of Expofin's marketing
// figures, no hype wording, and no "planned" or "demonstrated" anywhere.
const CONFIDENTIAL = /50\s*\/\s*50|50\s*%|\bequal|allocation|profit|economic|shareholding|ownership|sale proceeds|fleet.management/i;
const FORBIDDEN = /guarantee|trustless|tamper-proof|\bprice|\breturns?\b|listing|certif|mining|\bplanned\b|\bdemonstrated\b/i;
const FIGURES = /\d\s?%|cycles|world record|kWh|MWh/;

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

const renderPage = () =>
  render(
    <MemoryRouter>
      <Partners />
    </MemoryRouter>
  );

describe("Partners page", () => {
  it("opens with the joint venture and gives Expofin its profile, equipment and connection to ZEV", () => {
    const { container } = renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /built with expofin/i })).toBeInTheDocument();
    for (const id of ["joint-venture", "expofin", "equipment", "how-it-connects", "agreements"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
    const main = container.querySelector("main").textContent;
    for (const fact of EXPOFIN_FACTS) expect(main).toContain(fact);
    for (const p of EXPOFIN_PRODUCTS) expect(main).toContain(p.name);
    for (const m of MORE_EQUIPMENT) expect(main).toContain(m.name);
    for (const c of CONNECTION) expect(main).toContain(c.title);
    for (const a of AGREEMENTS) expect(main).toContain(a.name);
    expect(main).toMatch(/As published on expofin\.eu/);
  });

  it("keeps to the site's rules on wording, confidentiality and third-party claims", () => {
    const { container } = renderPage();
    const main = container.querySelector("main").textContent;
    expect(main).not.toMatch(CONFIDENTIAL);
    expect(main).not.toMatch(FORBIDDEN);
    expect(main).not.toMatch(FIGURES);
    expect(main).not.toContain(String.fromCharCode(8212));
    // The token is never tied to the partner.
    expect(main).not.toMatch(/ZLN[^.]*Expofin|Expofin[^.]*ZLN/);
  });

  it("links out to Expofin safely", () => {
    renderPage();
    for (const name of [/visit expofin\.eu/i, /english catalogue/i]) {
      const link = screen.getAllByRole("link", { name })[0];
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toMatch(/noopener/);
      expect(link.getAttribute("rel")).toMatch(/noreferrer/);
      expect(link.getAttribute("href")).toMatch(/^https:\/\/expofin\.eu/);
    }
  });
});
