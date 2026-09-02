import { Link } from "react-router-dom";
import { Leaf, Cpu, Brain, ArrowRight, ArrowDown } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// Digital utilities (brief §6 AI, §8 renewable-powered computing, §9 carbon
// data & MRV): what a validated, anchored record is for beyond a dashboard.
// All three are ahead of the ZEV 1 proof of concept, so every card is
// Planned. Carbon wording follows §9 exactly — ZEV supports MRV; it does not
// create credits. Compute is framed as renewable compute infrastructure,
// never as a mining pitch (§8).

export const UTILITIES = [
  {
    id: "carbon",
    Icon: Leaf,
    title: "Carbon data & MRV",
    body: "ZEV is designed to provide trusted, traceable and auditable energy data that can support carbon accounting and digital Measurement, Reporting and Verification (MRV) processes.",
    flow: [
      "Renewable energy (solar, wind, hydro…)",
      "ZEV measurement",
      "Validated energy data",
      "Digital audit trail",
      "MRV / carbon accounting",
      "Independent verification",
      "Potential carbon-credit issuance",
    ],
    caveat:
      "ZEV itself does not create carbon credits. Issuance requires an accepted methodology, project registration and independent validation under the applicable carbon standard. ZLN is not a carbon credit.",
  },
  {
    id: "compute",
    Icon: Cpu,
    title: "Renewable compute",
    body: "Where technically and economically appropriate, excess or allocated renewable capacity could support useful computing — AI, distributed computing, blockchain and validation infrastructure — instead of remaining an isolated energy resource.",
    flow: ["Renewable generation", "ZEV", "Validated available capacity", "Energy allocation", "Computing workloads"],
    caveat: "A development direction and architecture capability, not a commercially deployed service.",
  },
  {
    id: "ai",
    Icon: Brain,
    title: "AI edge intelligence",
    body: "ZEV 2 is designed to analyse energy information on the device itself: pattern analysis, anomaly and abnormal-equipment detection, data-integrity monitoring, optimisation and operational alerts.",
    flow: ["Validated readings", "On-device analysis", "Anomaly & tamper detection", "Predictive insights", "Operational alerts"],
    more: { label: "AI functions on the Technology page", to: "/technology#ai" },
  },
];

const FlowList = ({ steps }) => (
  <ol className="mt-4 space-y-1.5">
    {steps.map((step, i) => (
      <li key={step} className="flex items-start gap-2 text-sm text-foreground">
        {i === 0 ? (
          <span aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0" />
        ) : (
          <ArrowDown className="mt-1 h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden="true" />
        )}
        <span className={i === 0 ? "font-medium" : ""}>{step}</span>
      </li>
    ))}
  </ol>
);

const DigitalUtilities = () => {
  return (
    <section id="utilities" className="section-bg-alternate relative scroll-mt-16 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light">
            Digital utilities
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            What <span className="metal-gradient">trusted energy data</span> is for
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Once a record is validated and anchored it can serve far more than a dashboard. Three of the
            utilities ZEV is designed to feed — each one still ahead of the proof of concept.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {UTILITIES.map(({ Icon, title, body, flow, caveat, more }, i) => (
            <Reveal key={title} delay={i * 0.08} className="glass-card flex h-full flex-col p-6 lg:p-8">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <MaturityBadge level="planned" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <FlowList steps={flow} />
              {caveat && (
                <p className="mt-4 rounded-md border border-border bg-muted/40 px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
                  {caveat}
                </p>
              )}
              {more && (
                <Link
                  to={more.to}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary hover:underline"
                >
                  {more.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalUtilities;
