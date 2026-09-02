import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Technology, { ZEV1, ZEV2, TRUST_CHAIN, AI_FUNCTIONS, SOURCES } from "@/pages/Technology";
import ValidationPipeline, { PIPELINE_STEPS } from "@/components/zev/ValidationPipeline";
import { MATURITY_LEVELS } from "@/components/zev/MaturityBadge";

// Brief §15: what the ZEV 1 proof of concept demonstrated. Any label marked
// Demonstrated on the Technology page must trace back to this list.
const POC = new Set(ZEV1);
const DEMONSTRATED_ALLOWED = [
  "Meter readings from the connected equipment",
  "Energy meter integration",
  "Energy-data processing",
  "SHA-256 hashing",
  "Timestamping",
  "On-chain energy-data proof",
  "Hash comparison against the on-chain proof",
  "Secure energy data",
  "Blockchain verification",
  "Energy dashboard",
];

const FORBIDDEN = /carbon credit|guarantee|certif|\bprice|\breturns?\b|IP67|IEC 61557|\bSLA\b|tamper-proof|cannot be cloned|mining|byzantine/i;

const renderPage = () =>
  render(
    <MemoryRouter>
      <Technology />
    </MemoryRouter>
  );

beforeEach(() => {
  // Static (reduced-motion) layouts keep framer's whileInView out of jsdom.
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

describe("Technology page content (brief §3–§6, §15)", () => {
  it("renders the page header and every section anchor", () => {
    const { container } = renderPage();
    expect(screen.getByRole("heading", { level: 1, name: /inside zev/i })).toBeInTheDocument();
    for (const id of ["energy-data", "validation", "hardware", "security", "ai", "blockchain", "apis"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("names renewable sources beyond solar", () => {
    renderPage();
    expect(screen.getByText("Wind turbines")).toBeInTheDocument();
    expect(screen.getByText(/hydro and other renewable generation/i)).toBeInTheDocument();
    expect(SOURCES.map((s) => s.label)).toContain("Solar PV");
  });

  it("lists the brief's ZEV 1 and ZEV 2 capabilities with the right labels", () => {
    const { container } = renderPage();
    expect(ZEV1).toHaveLength(9);
    expect(ZEV2).toHaveLength(13);
    const hardware = within(container.querySelector("#hardware"));
    for (const item of ZEV1) expect(hardware.getByText(item)).toBeInTheDocument();
    for (const item of ZEV2) expect(hardware.getByText(item)).toBeInTheDocument();
    // Every ZEV 2 item carries its own Planned badge; the platform is In Development.
    expect(hardware.getAllByText("Planned")).toHaveLength(ZEV2.length);
    expect(hardware.getAllByText("In Development")).toHaveLength(1);
    expect(hardware.getAllByText("Demonstrated")).toHaveLength(1);
  });

  it("keeps every Demonstrated label inside the proof-of-concept scope", () => {
    for (const c of [...TRUST_CHAIN]) {
      expect(Object.keys(MATURITY_LEVELS)).toContain(c.level);
      if (c.level === "demonstrated") expect(DEMONSTRATED_ALLOWED).toContain(c.title);
    }
    for (const step of PIPELINE_STEPS) {
      for (const l of step.labels) {
        expect(Object.keys(MATURITY_LEVELS)).toContain(l.level);
        if (l.level === "demonstrated") expect(DEMONSTRATED_ALLOWED).toContain(l.label);
      }
    }
    // Secure Element items can never be demonstrated: they are ZEV 2.
    for (const c of TRUST_CHAIN.filter((t) => /identity|signing|tamper/i.test(t.title))) {
      expect(c.level).toBe("planned");
    }
    expect(POC.has("Secure Element")).toBe(false);
  });

  it("labels all AI functions as planned and uses no forbidden wording", () => {
    const { container } = renderPage();
    expect(AI_FUNCTIONS).toHaveLength(9);
    const ai = within(container.querySelector("#ai"));
    expect(ai.getAllByText("Planned").length).toBeGreaterThanOrEqual(1);
    expect(ai.queryByText("Demonstrated")).toBeNull();
    expect(container.querySelector("main").textContent).not.toMatch(FORBIDDEN);
  });
});

describe("<ValidationPipeline /> interaction (brief §5)", () => {
  it("has the seven steps of the brief in order", () => {
    expect(PIPELINE_STEPS.map((s) => s.label)).toEqual([
      "Real-world energy data",
      "ZEV",
      "Processing",
      "Hash / digital signature",
      "Timestamp",
      "Blockchain",
      "Verifiable record",
    ]);
  });

  it("opens one step at a time and advances by click, keyboard and the Next button", () => {
    render(<ValidationPipeline />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(7);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/nothing digital yet/i);

    fireEvent.click(tabs[5]);
    expect(tabs[5]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/BNB Smart Chain/);
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/stays off-chain/i);

    fireEvent.keyDown(tabs[5], { key: "ArrowRight" });
    expect(screen.getAllByRole("tab")[6]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("button", { name: /start again/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /start again/i }));
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("button", { name: /next step/i }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/Step 2 of 7/);
  });
});
