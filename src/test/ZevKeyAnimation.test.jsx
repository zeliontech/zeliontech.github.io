import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ZevKeyAnimation, { STAGES, STEPS, UTILITIES, stageAt } from "@/components/zev/ZevKeyAnimation";
import { MATURITY_LEVELS } from "@/components/zev/MaturityBadge";

// Brief §15: the ZEV 1 proof of concept demonstrated measurement, energy-data
// processing, SHA-256 hashing + timestamping, BNB Smart Chain anchoring and a
// dashboard. Nothing else may carry the Demonstrated label (brief §24).
const POC_DEMONSTRATED = new Set(["Measure", "Validate", "Hash", "Blockchain", "Energy dashboard"]);

// Wording the brief forbids or that would overstate the proof of concept.
const FORBIDDEN = /carbon credit|guarantee|certif|\bprice|\breturns?\b|IP67|IEC 61557|\bSLA\b|tamper-proof|cannot be cloned|mining/i;

/** Point window.matchMedia at a predicate so the layout hooks pick a mode. */
const mockMedia = (matches) => {
  window.matchMedia = (query) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
};
const reducedMotion = (q) => q.includes("prefers-reduced-motion");

describe("stageAt", () => {
  it("maps scroll progress onto the six beats in order", () => {
    expect(stageAt(0)).toBe(0);
    expect(stageAt(0.2)).toBe(1);
    expect(stageAt(0.3)).toBe(2);
    expect(stageAt(0.5)).toBe(3);
    expect(stageAt(0.75)).toBe(4);
    expect(stageAt(1)).toBe(STAGES.length - 1);
  });

  it("never goes backwards as progress increases", () => {
    let last = 0;
    for (let p = 0; p <= 1; p += 0.01) {
      const s = stageAt(p);
      expect(s).toBeGreaterThanOrEqual(last);
      last = s;
    }
  });
});

describe("claims discipline (brief §24)", () => {
  const capabilities = [...STEPS, ...UTILITIES];

  it("labels every step and utility with a known maturity level", () => {
    for (const c of capabilities) {
      expect(Object.keys(MATURITY_LEVELS)).toContain(c.level);
    }
  });

  it("marks exactly the proof-of-concept capabilities as demonstrated", () => {
    const demonstrated = capabilities.filter((c) => c.level === "demonstrated").map((c) => c.label);
    expect(new Set(demonstrated)).toEqual(POC_DEMONSTRATED);
  });

  it("keeps carbon wording to data that supports MRV, never credits", () => {
    const carbon = UTILITIES.find((u) => u.label === "Carbon data");
    expect(carbon.level).not.toBe("demonstrated");
    expect(carbon.detail).toMatch(/support carbon accounting and MRV/);
  });
});

describe("<ZevKeyAnimation /> static layout (prefers-reduced-motion)", () => {
  beforeEach(() => mockMedia(reducedMotion));

  it("renders every beat, the chain, the five utilities and the closing line", () => {
    const { container } = render(<ZevKeyAnimation />);

    expect(screen.getByRole("heading", { level: 2, name: /from sunlight to a verifiable record/i })).toBeInTheDocument();
    for (const stage of STAGES) {
      expect(screen.getByRole("heading", { level: 3, name: stage.title })).toBeInTheDocument();
    }
    for (const step of STEPS) {
      expect(screen.getAllByText(step.label.toUpperCase()).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(/one machine\. multiple digital energy utilities\./i)).toBeInTheDocument();

    // The SVG scene is described for assistive tech and finished (--p: 1).
    const scene = screen.getByRole("img", { name: /sunlight reaches solar panels/i });
    expect(scene).toBeInTheDocument();
    expect(scene.parentElement.style.getPropertyValue("--p")).toBe("1");

    // No pinning under reduced motion.
    expect(container.querySelector(".sticky")).toBeNull();

    // Section id is the hero CTA's target and lands inside a dark zone.
    const section = container.querySelector("#how-zev-works");
    expect(section).not.toBeNull();
    expect(section.className).toContain("dark-zone");
  });

  it("shows a maturity badge for every capability and no forbidden wording", () => {
    const { container } = render(<ZevKeyAnimation />);
    const text = container.textContent;

    expect(text).not.toMatch(FORBIDDEN);

    // Static mode renders one badge per labelled capability across the beats
    // (the "inside" beat lists STEPS, the "split" beat lists UTILITIES).
    const rendered = STAGES.flatMap((s) => s.labels ?? []);
    const badgeCount = (label) => screen.queryAllByText(label).length;
    expect(badgeCount("Demonstrated")).toBe(rendered.filter((c) => c.level === "demonstrated").length);
    expect(badgeCount("Planned")).toBe(rendered.filter((c) => c.level === "planned").length);
    expect(badgeCount("Demonstrated")).toBeGreaterThanOrEqual(POC_DEMONSTRATED.size);
  });
});

describe("<ZevKeyAnimation /> pinned layout (motion allowed, any viewport)", () => {
  beforeEach(() => {
    mockMedia(() => false);
    // framer-motion's useScroll measures the target with ResizeObserver.
    if (typeof globalThis.ResizeObserver === "undefined") {
      globalThis.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
  });

  it("pins the stage, starts on the first beat with the scene at --p 0", () => {
    const { container } = render(<ZevKeyAnimation />);

    expect(container.querySelector(".sticky")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 3, name: STAGES[0].title })).toBeInTheDocument();
    // Only the current beat is mounted in pinned mode.
    expect(screen.queryByRole("heading", { level: 3, name: STAGES[5].title })).toBeNull();

    const scene = screen.getByRole("img", { name: /sunlight reaches solar panels/i });
    expect(scene.parentElement.style.getPropertyValue("--p")).toBe("0");
  });
});
