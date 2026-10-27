import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Technology from "@/pages/Technology";
import TokenomicsPage from "@/pages/TokenomicsPage";
import CarbonCredits from "@/pages/CarbonCredits";
import About from "@/pages/About";
import Partners from "@/pages/Partners";
import Whitepaper from "@/pages/Whitepaper";
import Legal from "@/pages/Legal";
import ContactUs from "@/pages/ContactUs";

// The owner's wording rule of 26 October 2026: the words "planned" and
// "demonstrated" appear nowhere a visitor reads. Capability labels say
// Working, Prototype, In Development and Upcoming instead. Every page is
// rendered and its text, image alternatives and titles are checked, so the
// rule holds for what is shown rather than for what the code is called.
const BANNED = /\b(planned|demonstrated)\b/i;

const PAGES = [
  ["/", Index],
  ["/zev", Technology],
  ["/tokenomics", TokenomicsPage],
  ["/carbon", CarbonCredits],
  ["/about", About],
  ["/partners", Partners],
  ["/whitepaper", Whitepaper],
  ["/legal", Legal],
  ["/contact", ContactUs],
];

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
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

describe("Wording rule across the site", () => {
  for (const [path, Page] of PAGES) {
    it(`${path} never shows the words planned or demonstrated`, () => {
      const { container, unmount } = render(
        <MemoryRouter initialEntries={[path]}>
          <Page />
        </MemoryRouter>
      );
      const visible = [
        container.textContent,
        ...[...container.querySelectorAll("[alt]")].map((el) => el.getAttribute("alt")),
        ...[...container.querySelectorAll("[title], [aria-label]")].map(
          (el) => `${el.getAttribute("title") ?? ""} ${el.getAttribute("aria-label") ?? ""}`
        ),
      ].join("\n");
      const m = visible.match(BANNED);
      expect(m ? `${path}: "${m[0]}" near "${visible.slice(Math.max(0, m.index - 60), m.index + 60)}"` : null).toBeNull();
      unmount();
    });
  }
});
