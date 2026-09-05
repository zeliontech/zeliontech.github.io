import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import fs from "node:fs";
import path from "node:path";
import ZevHero from "@/components/zev/ZevHero";
import { HERO_IMAGE } from "@/components/zev/hero-image";

// §24: no price, return, listing or appreciation language; no certification claims.
const FORBIDDEN = /\bprice|\breturns?\b|appreciat|listing|guarantee|certif|carbon credit|IP67|IEC 61557|\bSLA\b|tamper-proof|trustless|mining/i;

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

const urlsOf = (srcset) => srcset.split(",").map((s) => s.trim().split(/\s+/)[0]);

describe("<ZevHero /> (brief §17)", () => {
  it("renders the copy, both actions and the two maturity claims", () => {
    const { container } = render(
      <MemoryRouter>
        <ZevHero />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/From physical energy to/);
    expect(screen.getByRole("link", { name: /explore zev/i })).toHaveAttribute("href", "/zev");
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute("href", "#how-zev-works");
    expect(screen.getByText("Demonstrated")).toBeInTheDocument();
    expect(screen.getByText("In Development")).toBeInTheDocument();
    expect(container.textContent).toMatch(/ZEV Lite/);
    expect(container.textContent).toMatch(/ZEV Pro/);
    expect(container.textContent).not.toMatch(FORBIDDEN);
  });

  it("shows the ZEV scene as a responsive picture with real, existing files", () => {
    const { container } = render(
      <MemoryRouter>
        <ZevHero />
      </MemoryRouter>
    );
    const img = screen.getByRole("img", { name: /ZEV device/i });
    expect(img).toHaveAttribute("width", String(HERO_IMAGE.width));
    expect(img).toHaveAttribute("height", String(HERO_IMAGE.height));
    expect(img).toHaveAttribute("loading", "eager");
    expect(img.getAttribute("alt")).toMatch(/solar/i);
    expect(img.getAttribute("alt")).toMatch(/wind turbine/i);
    expect(img.getAttribute("alt")).not.toMatch(FORBIDDEN);

    const sources = [...container.querySelectorAll("picture source")].map((s) => s.getAttribute("type"));
    expect(sources).toEqual(["image/avif", "image/webp"]);

    // Every URL in every srcset must map to a file under public/, so a
    // missing asset fails here rather than as a broken hero in production.
    const urls = [...urlsOf(HERO_IMAGE.avif), ...urlsOf(HERO_IMAGE.webp), ...urlsOf(HERO_IMAGE.jpg), HERO_IMAGE.fallback];
    for (const url of urls) {
      expect(fs.existsSync(path.join(process.cwd(), "public", url)), url).toBe(true);
    }
    expect(HERO_IMAGE.placeholder.startsWith("data:image/webp;base64,")).toBe(true);
  });
});
