import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// ZEV roadmap, following the milestones of the founders' project update of
// October 2026: the demonstrated proof of concept, the two prototypes in
// parallel development, then rewards and security, then pilots. Only the
// proof of concept is Demonstrated; the prototypes are In Development; the
// rest is Planned. No dates: none are given and §24 forbids promising them.

export const PHASES = [
  {
    id: "poc",
    step: "01",
    title: "ZEV Lite proof of concept",
    level: "demonstrated",
    body: "Shown working end to end: physical energy information captured by hardware, hashed, timestamped and anchored on BNB Smart Chain. Patent applications have since been filed for ZEV Lite and ZEV Pro.",
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
    id: "prototypes",
    step: "02",
    title: "Two prototypes in parallel",
    level: "in-development",
    body: "Dedicated ZEV Lite and ZEV Pro prototypes are being built side by side on the same foundation. Nothing listed here is deployed commercially today.",
    items: [
      "Dedicated ZEV Lite hardware",
      "ZEV Pro industrial hardware",
      "Secure-element signing in both",
      "Computing powered by stored surplus energy (ZEV Pro)",
      "Hardware integration and measurement testing",
      "Inverter, battery and grid integration",
    ],
    itemLevel: "in-development",
    more: { label: "Both devices, in detail", to: "/zev#hardware" },
  },
  {
    id: "readiness",
    step: "03",
    title: "Rewards and security",
    level: "planned",
    body: "Test verified participation and funded reward claims from device to wallet, finalise multi-signature custody and complete an independent security review.",
    items: [
      "Contribution rewards tested end to end",
      "Funded reward claims to operator wallets",
      "Multi-signature custody",
      "Independent security review",
    ],
    itemLevel: "planned",
  },
  {
    id: "pilots",
    step: "04",
    title: "Pilot installations",
    level: "planned",
    body: "Validate the system with initial customer installations, then grow towards networks of ZEV nodes rather than isolated machines.",
    items: [
      "Initial customer installations",
      "Operator dashboards on validated data",
      "Carbon / ESG data integration trials",
      "Networks of ZEV nodes",
    ],
    itemLevel: "planned",
  },
];

const PhaseCard = ({ phase, index }) => {
  const current = phase.level === "in-development";
  return (
    <Reveal delay={index * 0.06} className="relative h-full">
      {/* Timeline node (desktop: on the horizontal rail above the cards) */}
      <span
        aria-hidden="true"
        className={`absolute -top-[2.2rem] left-6 hidden h-4 w-4 rounded-full border-2 lg:block ${
          phase.level === "demonstrated"
            ? "border-eco bg-eco"
            : current
              ? "border-primary bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.6)]"
              : "border-border bg-background"
        }`}
      />
      <div className={`glass-card flex h-full flex-col p-6 lg:p-7 ${current ? "ring-1 ring-primary/30" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <span className="text-[13px] font-medium text-muted-foreground">
            Phase {phase.step}
          </span>
          <MaturityBadge level={phase.level} />
        </div>
        <h3 className="mt-2 subhead">{phase.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{phase.body}</p>
        {/* One badge per phase, in the header above. The capabilities are a
            plain list: a check for what the proof of concept showed, a
            hollow dot for what is still planned. */}
        <ul className="mt-4 space-y-2">
          {phase.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug">
              {phase.itemLevel ? (
                <span aria-hidden="true" className="mt-[6px] h-2 w-2 shrink-0 rounded-full border border-muted-foreground/60" />
              ) : (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-eco" strokeWidth={2.2} aria-hidden="true" />
              )}
              <span className={phase.itemLevel ? "text-muted-foreground" : "text-foreground"}>{item}</span>
            </li>
          ))}
        </ul>
        {phase.more && (
          <Link
            to={phase.more.to}
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-medium text-primary hover:underline"
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
          <h2 className="headline-standard mt-4">
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
              style={{ background: "linear-gradient(90deg, hsl(var(--eco)), hsl(var(--primary)))" }}
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
