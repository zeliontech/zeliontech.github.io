import { Sun, Building2, Factory, BatteryCharging, Leaf, Cpu, Network, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// Use cases (brief §14). The seven deployment scenarios from the brief, with
// the owner's note that renewable generation is not only solar. These are
// designed deployment scenarios, not commercial deployments: the ZEV Lite
// proof of concept validated the core chain, and each scenario depends on
// ZEV Pro capabilities labelled on the roadmap, so every card is Planned.

export const CASES = [
  {
    id: "plants",
    Icon: Sun,
    title: "Renewable power plants",
    sectors: "Solar farms · wind farms · hydro",
    body: "Connect renewable generation with digital monitoring and validation infrastructure, so production figures can be verified rather than declared.",
    flow: ["Solar or wind farm", "ZEV", "Blockchain", "Energy intelligence"],
  },
  {
    id: "buildings",
    Icon: Building2,
    title: "Commercial buildings",
    sectors: "Offices · retail · campuses",
    body: "Monitor and validate energy production and consumption for energy monitoring, renewable-energy verification, efficiency analysis, sustainability reporting and carbon-data support.",
  },
  {
    id: "industrial",
    Icon: Factory,
    title: "Industrial facilities",
    sectors: "Plants · logistics · manufacturing",
    body: "ZEV as an intelligent data layer between industrial electrical infrastructure — meters, grid connection, on-site renewables — and the digital monitoring systems that depend on it.",
    flow: ["Factory loads, meters, grid, on-site renewables", "ZEV", "Monitoring systems"],
  },
  {
    id: "storage",
    Icon: BatteryCharging,
    title: "Battery energy storage",
    sectors: "BESS · inverters",
    body: "Interact with battery and inverter infrastructure to monitor energy movement and operational data — what was stored, when, and where it went.",
    flow: ["Solar / wind", "Battery", "ZEV", "Grid"],
  },
  {
    id: "carbon",
    Icon: Leaf,
    title: "Carbon / ESG infrastructure",
    sectors: "Reporting · accounting · MRV",
    body: "Validated energy data that can support environmental reporting, carbon accounting and future digital MRV infrastructure — without ZEV itself issuing anything.",
  },
  {
    id: "compute",
    Icon: Cpu,
    title: "Renewable computing",
    sectors: "AI · distributed compute",
    body: "Available renewable energy could potentially support computing infrastructure instead of remaining an isolated resource.",
    flow: ["Renewables", "ZEV", "Energy allocation", "GPU / compute"],
  },
  {
    id: "network",
    Icon: Network,
    title: "Smart energy infrastructure",
    sectors: "Networks of ZEV nodes",
    body: "Longer-term deployments form networks of distributed intelligent energy nodes — a distributed energy-data infrastructure rather than isolated machines.",
    wide: true,
  },
];

const Flow = ({ steps }) => (
  <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-muted-foreground">
    {steps.map((step, i) => (
      <li key={step} className="flex items-center gap-1.5">
        {i > 0 && <ArrowRight className="h-3 w-3 text-primary/70" aria-hidden="true" />}
        <span className={step === "ZEV" ? "rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-primary" : ""}>
          {step}
        </span>
      </li>
    ))}
  </ol>
);

const UseCases = () => {
  return (
    <section id="use-cases" className="relative scroll-mt-16 section">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">
            Use cases
          </p>
          <h2 className="headline mt-4">
            Where <span className="metal-gradient">ZEV</span> is designed to work
          </h2>
          <p className="lede mt-5">
            One machine, wherever renewable energy is produced, stored, moved or consumed. The proof of
            concept validated the core chain; each scenario below builds on ZEV Pro capabilities shown on
            the roadmap.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[15px] text-muted-foreground">
            <MaturityBadge level="planned" />
            <span>Deployment scenarios, not commercial deployments</span>
          </div>
        </Reveal>

        <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map(({ Icon, title, sectors, body, flow, wide }, i) => (
            <Reveal key={title} delay={i * 0.05} className={wide ? "md:col-span-2 lg:col-span-3" : ""}>
              <li className={`glass-card-hover flex h-full flex-col p-6 ${wide ? "lg:flex-row lg:items-center lg:gap-8 lg:p-8" : ""}`}>
                <div className={wide ? "lg:w-1/3" : ""}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-body text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
                  <p className="mt-1 text-[13px] font-medium text-muted-foreground">{sectors}</p>
                </div>
                <div className={wide ? "mt-4 lg:mt-0 lg:flex-1" : ""}>
                  <p className={`text-[15px] leading-relaxed text-muted-foreground ${wide ? "" : "mt-3"}`}>{body}</p>
                  {flow && <Flow steps={flow} />}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UseCases;
