import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DigitalUtilities, { UTILITIES } from "@/components/zev/DigitalUtilities";

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

describe("<DigitalUtilities /> (brief §6, §8, §9)", () => {
  it("covers carbon MRV, renewable compute and contribution rewards, all planned, with the §9 carbon flow", () => {
    expect(UTILITIES.map((u) => u.id)).toEqual(["carbon", "compute", "rewards"]);
    expect(UTILITIES[2].flow).toEqual(["Capture and sign", "Verify contribution", "Allocate rewards", "Claim ZLN"]);
    const carbon = UTILITIES[0];
    expect(carbon.flow).toEqual([
      "Renewable energy (solar, wind, hydro…)",
      "ZEV measurement",
      "Validated energy data",
      "Digital audit trail",
      "MRV / carbon accounting",
      "Independent verification",
      "Potential carbon-credit issuance",
    ]);
    const { container } = render(
      <MemoryRouter>
        <DigitalUtilities />
      </MemoryRouter>
    );
    for (const u of UTILITIES) expect(screen.getByRole("heading", { level: 3, name: u.title })).toBeInTheDocument();
    expect(screen.getAllByText("Upcoming")).toHaveLength(3);
    expect(screen.queryByText("Working")).toBeNull();
    expect(container.querySelector("#utilities")).not.toBeNull();
    // The ZEV Compute design concept sits with the renewable-compute utility.
    expect(container.textContent).toMatch(/ZEV Compute\./);
    expect(container.textContent).toMatch(/Design concept/);
    expect(screen.getByRole("img", { name: /three ZEV compute racks/i })).toBeInTheDocument();
  });

  it("never lets ZEV create credits, never pitches mining, never sells returns", () => {
    const { container } = render(
      <MemoryRouter>
        <DigitalUtilities />
      </MemoryRouter>
    );
    const text = container.textContent;
    expect(text).toMatch(/ZEV itself does not create carbon credits/);
    expect(text).toMatch(/ZLN is not a carbon credit/);
    expect(text).not.toMatch(/ZEV (generates|creates|issues|produces) carbon credits/i);
    expect(text).not.toMatch(/mining|\bprice|\breturns?\b|guarantee|certif|trustless/i);
  });
});
