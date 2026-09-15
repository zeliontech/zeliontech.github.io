import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import fs from "node:fs";
import path from "node:path";
import JointVenture, { BANNER_ALT, JV_NAME } from "@/components/zev/JointVenture";
import PartnerStrip from "@/components/zev/PartnerStrip";
import { JV_BANNER } from "@/components/zev/jv-banner";
import { RAIL_SECTIONS } from "@/components/zev/SectionRail";

// The joint-venture section may say who the partners are and what each
// builds. It may not say how the venture is owned, funded or split, and it
// keeps to the site's no-hype wording rules.
const CONFIDENTIAL = /50\s*\/\s*50|50\s*%|\bequal|25 million|allocation|profit|economic|shareholding|ownership|\bVAT\b|company number|sale proceeds/i;
const HYPE = /guarantee|trustless|tamper-proof|\bprice|\breturns?\b|listing|certif/i;

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

const renderSection = () =>
  render(
    <MemoryRouter>
      <JointVenture />
    </MemoryRouter>
  );

describe("<JointVenture />", () => {
  it("names the venture and both partners, says what each builds, and reveals nothing about ownership", () => {
    const { container } = renderSection();
    expect(container.querySelector("#joint-venture")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Built together with Expofin/);
    const text = container.textContent;
    expect(text).toContain(JV_NAME);
    expect(text).toMatch(/being established in the United Kingdom/);
    expect(text).toMatch(/Expofin S\.R\.L\./);
    expect(text).toMatch(/Directors of the joint venture/);
    expect(text).toMatch(/Dino Vincoletto/);
    expect(text).not.toMatch(CONFIDENTIAL);
    expect(text).not.toMatch(HYPE);
    expect(BANNER_ALT).not.toMatch(CONFIDENTIAL);
  });

  it("links out safely and ships the banner as existing files with dimensions on every source", () => {
    const { container } = renderSection();
    const expofin = screen.getByRole("link", { name: /visit expofin\.eu/i });
    expect(expofin).toHaveAttribute("href", "https://expofin.eu");
    expect(expofin).toHaveAttribute("target", "_blank");
    expect(expofin.getAttribute("rel")).toMatch(/noopener/);
    expect(expofin.getAttribute("rel")).toMatch(/noreferrer/);
    expect(screen.getByRole("link", { name: /read the whitepaper/i })).toHaveAttribute("href", "/whitepaper");

    const img = screen.getByRole("img", { name: BANNER_ALT });
    expect(img).toHaveAttribute("width", String(JV_BANNER.width));
    expect(img).toHaveAttribute("height", String(JV_BANNER.height));
    expect(img).toHaveAttribute("loading", "lazy");
    // The whole composite at every viewport: no media-specific crop.
    for (const source of container.querySelectorAll("picture source")) {
      expect(source.getAttribute("width")).toBeTruthy();
      expect(source.getAttribute("height")).toBeTruthy();
      expect(source.getAttribute("media")).toBeNull();
    }
    expect(container.querySelector("figcaption")).toHaveTextContent(/ZelionTech.*Expofin/);

    const urls = [...urlsOf(JV_BANNER.avif), ...urlsOf(JV_BANNER.webp), ...urlsOf(JV_BANNER.jpg), JV_BANNER.fallback];
    for (const url of urls) {
      expect(fs.existsSync(path.join(process.cwd(), "public", url)), url).toBe(true);
    }
    expect(JV_BANNER.placeholder.startsWith("data:image/webp;base64,")).toBe(true);
    expect(JV_BANNER.glow.startsWith("data:image/webp;base64,")).toBe(true);
  });

  it("has a partner strip that jumps to the section, and a rail entry in the right place", () => {
    const { container } = render(<PartnerStrip />);
    expect(container.textContent).toMatch(/In joint venture with/);
    expect(container.textContent).toMatch(/Expofin S\.R\.L\./);
    expect(container.textContent).not.toMatch(CONFIDENTIAL);
    expect(screen.getByRole("link", { name: /about the joint venture/i })).toHaveAttribute("href", "#joint-venture");

    const ids = RAIL_SECTIONS.map((s) => s.id);
    expect(ids.indexOf("joint-venture")).toBe(ids.indexOf("roadmap") + 1);
    expect(ids.indexOf("remember")).toBe(ids.indexOf("joint-venture") + 1);
  });
});
