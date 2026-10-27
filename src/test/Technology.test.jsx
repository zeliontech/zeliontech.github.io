import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Technology, { POC as POC_LIST, ZEV_LITE, ZEV_PRO, TRUST_CHAIN, SOURCES } from "@/pages/Technology";
import ValidationPipeline, { PIPELINE_STEPS } from "@/components/zev/ValidationPipeline";
import { MATURITY_LEVELS } from "@/components/zev/MaturityBadge";

// Brief §15: what the ZEV Lite proof of concept demonstrated. Any label marked
// Demonstrated on the Technology page must trace back to this list.
const POC = new Set(POC_LIST);
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
    for (const id of ["energy-data", "validation", "hardware", "security", "blockchain", "apis"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
    // The October 2026 project update makes no AI claims, so neither does the page.
    expect(container.querySelector("#ai")).toBeNull();
    expect(container.querySelector("main").textContent).not.toMatch(/\bAI\b|artificial intelligence/);
  });

  it("shows the partner's reference equipment as planned integrations, without its marketing figures", () => {
    const { container } = renderPage();
    const energy = container.querySelector("#energy-data");
    const text = energy.textContent;
    expect(text).toMatch(/Reference equipment · Expofin E\.S\.Co\./);
    for (const name of ["Solid Power", "EOS TH", "Smart Tower 5G", "Pensilina Smart"]) expect(text).toContain(name);
    expect(text).toMatch(/ZEV integration/);
    expect(within(energy).getAllByText("Upcoming").length).toBeGreaterThanOrEqual(4);
    expect(within(energy).getAllByRole("img").length).toBeGreaterThanOrEqual(4);
    // Expofin's own performance claims stay on expofin.eu.
    expect(text).not.toMatch(/\d\s?%|cycles|record|kWh|MWh/);
    const link = within(energy).getByRole("link", { name: /expofin\.eu/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toMatch(/noopener/);
  });

  it("names renewable sources beyond solar", () => {
    renderPage();
    expect(screen.getByText("Wind turbines")).toBeInTheDocument();
    expect(screen.getByText(/hydro and other renewable generation/i)).toBeInTheDocument();
    expect(SOURCES.map((s) => s.label)).toContain("Solar PV");
  });

  it("lists the proof of concept and both prototypes with the right labels", () => {
    const { container } = renderPage();
    expect(POC_LIST).toHaveLength(9);
    expect(ZEV_LITE).toContain("Secure-element signing");
    expect(ZEV_PRO).toContain("Computing powered by stored surplus energy");
    const hardware = within(container.querySelector("#hardware"));
    for (const item of [...POC_LIST, ...ZEV_LITE, ...ZEV_PRO]) expect(hardware.getByText(item)).toBeInTheDocument();
    expect(hardware.getByText(/Patent applications filed/)).toBeInTheDocument();
    // The owner's ZEV Pro material of 26 October 2026, in the site's own type.
    expect(hardware.getByRole("img", { name: /ZEV Pro development assembly/i })).toBeInTheDocument();
    expect(hardware.getByRole("img", { name: /enclosure concept mounted on a wall/i })).toBeInTheDocument();
    expect(hardware.getByText(/Developed with Expofin\./)).toBeInTheDocument();
    expect(hardware.getByRole("link", { name: /explore zev pro/i })).toHaveAttribute("href", "#zev-pro");
    expect(container.querySelector("#zev-pro")).not.toBeNull();
    expect(hardware.getByText("Serviceable enclosure")).toBeInTheDocument();
    expect(hardware.getByText("Protected connections")).toBeInTheDocument();
    // The owner removed the maturity badges from this section (2026-09-08):
    // the two cards carry their status in prose, not in chips.
    expect(hardware.queryByText("Upcoming")).toBeNull();
    expect(hardware.queryByText("In Development")).toBeNull();
    expect(hardware.queryByText("Working")).toBeNull();
    for (const id of ["security", "apis"]) {
      const section = within(container.querySelector(`#${id}`));
      expect(section.queryByText("Upcoming")).toBeNull();
      expect(section.queryByText("Working")).toBeNull();
    }
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
    // Secure-element items are prototype work, never demonstrated: signing is
    // in development in both prototypes; identity and tamper resistance are planned.
    for (const c of TRUST_CHAIN.filter((t) => /identity|signing|tamper/i.test(t.title))) {
      expect(c.level).not.toBe("demonstrated");
    }
    expect(TRUST_CHAIN.find((t) => t.title === "Cryptographic signing").level).toBe("in-development");
    expect(POC.has("Secure-element signing")).toBe(false);
  });

  it("uses no forbidden wording", () => {
    const { container } = renderPage();
    // Digital utilities and use cases carry their own wording tests and state
    // explicitly that ZEV does not issue carbon credits, so they are screened
    // there rather than against this page-level pattern.
    const main = container.querySelector("main").cloneNode(true);
    main.querySelector("#utilities")?.remove();
    main.querySelector("#use-cases")?.remove();
    expect(main.textContent).not.toMatch(FORBIDDEN);
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
