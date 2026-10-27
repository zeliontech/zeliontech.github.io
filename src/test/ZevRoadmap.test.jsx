import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZevRoadmap, { PHASES } from "@/components/zev/ZevRoadmap";

const FORBIDDEN = /carbon credit|guarantee|certif|\bprice|\breturns?\b|IP67|IEC 61557|\bSLA\b|tamper-proof|cannot be cloned|mining|byzantine|trustless/i;

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

describe("<ZevRoadmap /> (brief §15 / §16)", () => {
  it("follows the October 2026 milestones with honest statuses", () => {
    expect(PHASES.map((p) => p.id)).toEqual(["poc", "prototypes", "readiness", "pilots"]);
    expect(PHASES.map((p) => p.level)).toEqual(["demonstrated", "in-development", "planned", "planned"]);
    // Only the proof-of-concept items are plain facts; everything after it is
    // in development or planned.
    expect(PHASES[0].itemLevel).toBeUndefined();
    expect(PHASES[1].itemLevel).toBe("in-development");
    for (const p of PHASES.slice(2)) expect(p.itemLevel).toBe("planned");
  });

  it("renders all phases, promises no dates and uses no forbidden wording", () => {
    const { container } = render(
      <MemoryRouter>
        <ZevRoadmap />
      </MemoryRouter>
    );
    for (const p of PHASES) expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
    expect(screen.getByText("Working")).toBeInTheDocument();
    expect(screen.getByText("In Development")).toBeInTheDocument();
    expect(screen.getAllByText("Upcoming")).toHaveLength(2);
    expect(container.textContent).toMatch(/no dates are promised/i);
    expect(container.textContent).not.toMatch(/\b20\d{2}\b|Q[1-4]\b/);
    expect(container.textContent).not.toMatch(FORBIDDEN);
    expect(container.querySelector("#roadmap")).not.toBeNull();
  });
});
