import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WhatToRemember, { SENTENCE, SPINE, STORY } from "@/components/zev/WhatToRemember";

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

describe("<WhatToRemember /> (brief §23 / §25)", () => {
  it("carries the brief's one-sentence takeaway, the five-node spine and the seven-beat story", () => {
    expect(SENTENCE).toMatch(/^ZelionTech is developing ZEV, an intelligent energy-validation machine/);
    expect(SENTENCE).toMatch(/supported by the ZLN ecosystem\.$/);
    expect(SPINE.map((s) => s.label)).toEqual([
      "Renewable energy",
      "ZEV",
      "Data + AI + blockchain",
      "Carbon + compute + digital energy",
      "ZLN ecosystem",
    ]);
    expect(STORY).toHaveLength(7);
    expect(STORY[0].head).toBe("Energy is physical.");
    expect(STORY[6].head).toBe("ZLN connects the digital economy.");
  });

  it("renders it all with ZelionTech naming and no forbidden wording", () => {
    const { container } = render(
      <MemoryRouter>
        <WhatToRemember />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 2, name: SENTENCE })).toBeInTheDocument();
    for (const beat of STORY) expect(screen.getByRole("heading", { level: 3, name: beat.head })).toBeInTheDocument();
    for (const node of SPINE) expect(screen.getByText(node.label)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bZelion ecosystem\b/);
    expect(container.textContent).not.toMatch(FORBIDDEN);
    expect(container.querySelector("#remember")).not.toBeNull();
  });
});
