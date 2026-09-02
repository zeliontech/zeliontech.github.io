import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UseCases, { CASES } from "@/components/zev/UseCases";

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

describe("<UseCases /> (brief §14)", () => {
  it("has the brief's seven scenarios, with renewable sources beyond solar", () => {
    expect(CASES.map((c) => c.id)).toEqual(["plants", "buildings", "industrial", "storage", "carbon", "compute", "network"]);
    expect(CASES[0].sectors).toMatch(/wind/i);
    expect(CASES[3].flow).toEqual(["Solar / wind", "Battery", "ZEV", "Grid"]);
    expect(CASES[5].flow).toEqual(["Renewables", "ZEV", "Energy allocation", "GPU / compute"]);
  });

  it("renders every scenario as a planned deployment with no forbidden wording", () => {
    const { container } = render(<UseCases />);
    for (const c of CASES) expect(screen.getByRole("heading", { level: 3, name: c.title })).toBeInTheDocument();
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.queryByText("Demonstrated")).toBeNull();
    expect(container.textContent).toMatch(/not commercial deployments/i);
    expect(container.textContent).not.toMatch(FORBIDDEN);
    expect(container.querySelector("#use-cases")).not.toBeNull();
  });
});
