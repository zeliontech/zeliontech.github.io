import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import WhyValidate, { CHALLENGES, PRINCIPLES } from "@/components/zev/WhyValidate";

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

describe("<WhyValidate /> (brief §1: why validate at the source)", () => {
  it("renders the three challenges, the answer and the principles", () => {
    const { container } = render(<WhyValidate />);
    expect(screen.getByRole("heading", { level: 2, name: /why validate energy data at the source/i })).toBeInTheDocument();
    expect(CHALLENGES).toHaveLength(3);
    for (const c of CHALLENGES) expect(screen.getByRole("heading", { level: 3, name: c.title })).toBeInTheDocument();
    for (const p of PRINCIPLES) expect(screen.getByText(p)).toBeInTheDocument();
    expect(screen.getByText(/not a token project with hardware attached/i)).toBeInTheDocument();
    expect(container.querySelector("#why-validate")).not.toBeNull();
  });

  it("names renewable sources beyond solar and keeps claims inside the proof of concept", () => {
    const { container } = render(<WhyValidate />);
    expect(container.textContent).toMatch(/solar, wind, hydro/i);
    expect(screen.getAllByText("Demonstrated")).toHaveLength(1);
    expect(screen.queryByText("In Development")).toBeNull();
    expect(container.textContent).not.toMatch(FORBIDDEN);
  });
});
