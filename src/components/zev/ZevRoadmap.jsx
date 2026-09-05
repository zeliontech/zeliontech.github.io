import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// ZEV evolution (brief §15, §16 "PoC → ZEV Lite → ZEV Pro → Pilot Deployment →
// Network Expansion"). Replaces the generic Phase 1/2/3 roadmap. Only the
// ZEV Lite proof of concept is Demonstrated; ZEV Pro is In Development; the
// pilot and the network are Planned. No dates: the brief gives none and
// §24 forbids promising them.

export const PHASES = [
  {
    id: "zev1",
    step: "01",
    title: "ZEV Lite — Proof of concept",
    level: "demonstrated",
    body: "The initial architecture showed the idea works end to end: physical energy information captured by hardware, turned into cryptographically verifiable information and connected with blockchain infrastructure.",
    items: [
      "Physical energy measurement",
      "ESP32-based controller",
      "Energy meter integration",
      "Wi-Fi / network communication",
      "Energy-data processing",
      "SHA-256 hashing",
      "Timestamping",
      "BNB Smart Chain interaction",
      "On-chain energy-data proof",
      "Dashboard visualization",
    ],
  },
  {
    id: "zev2",
    step: "02",
    title: "ZEV Pro — Industrial evolution",
    level: "in-development",
    body: "The industrial platform being engineered around the proof of concept. Every capability listed is a planned part of ZEV Pro, not something deployed commercially today.",
    items: [
      "Industrial hardware",
      "Secure Element",
      "Inverter, battery and grid integration",
      "AI edge processing",
      "Anomaly and tamper detection",
      "Advanced energy analytics",
      "Carbon / MRV data",
      "Renewable computing",
      "Enterprise APIs",
      "Scalable deployment",
    ],
    itemLevel: "planned",
    more: { label: "Full ZEV Pro capability list", to: "/technology#hardware" },
  },
  {
    id: "pilot",
    step: "03",
    title: "Pilot deployment",
    level: "planned",
    body: "First ZEV Pro units operating at real renewable installations — solar, wind, storage — with validated data used by the operators and the first carbon and ESG data integrations tested.",
    items: ["Units in the field", "Operator dashboards on validated data", "Carbon / ESG data integration trials"],
    itemLevel: "planned",
  },
  {
    id: "network",
    step: "04",
    title: "Network expansion",
    level: "planned",
    body: "Distributed networks of ZEV nodes forming a shared energy-data infrastructure rather than isolated machines, with ecosystem utilities deployed alongside it.",
    items: ["Networks of ZEV nodes", "Distributed energy-data infrastructure", "Ecosystem utilities deployed"],
    itemLevel: "planned",
  },
];

const EMERALD = "#10B981";

const PhaseCard = ({ phase, index }) => {
  const current = phase.level === "in-development";
  return (
    <Reveal delay={index * 0.06} className="relative h-full">
      {/* Timeline node (desktop: on the horizontal rail above the cards) */}
      <span
        aria-hidden="true"
        className={`absolute -top-[2.2rem] left-6 hidden h-4 w-4 rounded-full border-2 lg:block ${
          phase.level === "demonstrated"
            ? "border-[#10B981] bg-[#10B981]"
            : current
              ? "border-primary bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.6)]"
              : "border-border bg-background"
        }`}
      />
      <div className={`glass-card flex h-full flex-col p-6 lg:p-7 ${current ? "ring-1 ring-primary/30" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Phase {phase.step}
          </span>
          <MaturityBadge level={phase.level} />
        </div>
        <h3 className="mt-2 subhead">{phase.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {phase.items.map((item) => (
            <li
              key={item}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
                phase.itemLevel ? "border-border text-muted-foreground" : "text-foreground"
              }`}
              style={
                phase.itemLevel
                  ? { borderStyle: "dashed" }
                  : { borderColor: `${EMERALD}4D`, backgroundColor: `${EMERALD}0F` }
              }
            >
              {!phase.itemLevel && (
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: EMERALD }} />
              )}
              {item}
            </li>
          ))}
        </ul>
        {phase.more && (
          <Link
            to={phase.more.to}
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary hover:underline"
          >
            {phase.more.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </Reveal>
  );
};

const ZevRoadmap = () => {
  return (
    <section id="roadmap" className="section-bg-alternate relative scroll-mt-16 section">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="eyebrow">
            Roadmap
          </p>
          <h2 className="headline mt-4">
            An evolving <span className="metal-gradient">platform</span>
          </h2>
          <p className="lede mt-5">
            ZEV is a technology platform, not a finished box. Each phase is labelled with where it
            genuinely stands. Timelines depend on real-world deployment conditions — no dates are promised.
          </p>
        </Reveal>

        <div className="relative mx-auto max-w-7xl lg:pt-10">
          {/* Horizontal rail (desktop) */}
          <div className="absolute left-6 right-6 top-[0.45rem] hidden h-0.5 lg:block" aria-hidden="true">
            <div className="h-full w-full bg-border" />
            <div
              className="absolute inset-y-0 left-0 w-[37%]"
              style={{ background: `linear-gradient(90deg, ${EMERALD}, hsl(var(--primary)))` }}
            />
          </div>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PHASES.map((phase, i) => (
              <li key={phase.id} className="h-full">
                <PhaseCard phase={phase} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ZevRoadmap;
