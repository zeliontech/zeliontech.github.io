import { motion } from "framer-motion";
import { Sun, Cpu, Link2, Coins } from "lucide-react";
import MaturityBadge from "./MaturityBadge";
import Reveal from "./Reveal";
import { useReducedMotion } from "./hooks";

// ZEV + ZLN relationship (brief §12) — one of the central graphics of the
// site. Light zone: physical world → ZEV → digital world → ZLN ecosystem,
// with energy flowing down the spine. Every capability carries a maturity
// label; anything not demonstrated in the ZEV Lite proof of concept (brief §15)
// is labeled Planned.

const TIERS = [
  {
    id: "physical",
    eyebrow: "Layer 01 — Physical World",
    title: "Energy Infrastructure",
    Icon: Sun,
    body: "Solar generation, battery storage and grid connections produce and move real electricity.",
    items: ["Solar", "Battery", "Grid", "Energy"],
    accent: "emerald",
  },
  {
    id: "zev",
    eyebrow: "Layer 02 — The Hinge",
    title: "ZEV",
    Icon: Cpu,
    body: "ZEV interacts with connected energy systems: it measures energy activity, processes it, and turns it into structured, signed digital information.",
    items: [
      { label: "Measurement", level: "demonstrated" },
      { label: "Validation & hashing", level: "demonstrated" },
      { label: "Secure Element", level: "planned" },
      { label: "AI edge analysis", level: "planned" },
    ],
    accent: "primary",
    emphasis: true,
  },
  {
    id: "digital",
    eyebrow: "Layer 03 — Digital World",
    title: "Verifiable Data",
    Icon: Link2,
    body: "Selected records are cryptographically anchored, creating an auditable trail that other systems can build on.",
    items: [
      { label: "Blockchain anchoring", level: "demonstrated" },
      { label: "Energy dashboard", level: "demonstrated" },
      { label: "Carbon MRV data", level: "planned" },
      { label: "Renewable compute", level: "planned" },
    ],
    accent: "primary",
  },
  {
    id: "zln",
    eyebrow: "Layer 04 — Ecosystem Layer",
    title: "ZLN",
    Icon: Coins,
    body: "ZLN is the ecosystem's blockchain-based digital utility layer. It can support participation and economic interactions within the ZelionTech ecosystem as those utilities are deployed.",
    items: [
      { label: "Digital utility", level: "planned" },
      { label: "Ecosystem participation", level: "planned" },
    ],
    accent: "primary",
  },
];

const EMERALD = "#10B981";

const accentColor = (accent) => (accent === "emerald" ? EMERALD : "hsl(var(--primary))");

// Vertical connector with drifting dashes — the energy/data flowing down the
// stack. Static under prefers-reduced-motion (the .zev-energy-path rule
// disables its own animation).
const Connector = ({ accent }) => (
  <div className="flex justify-center py-3" aria-hidden="true">
    <svg width="24" height="56" viewBox="0 0 24 56" className="overflow-visible">
      <line x1="12" y1="0" x2="12" y2="56" stroke={accentColor(accent)} strokeOpacity="0.18" strokeWidth="2" />
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="56"
        stroke={accentColor(accent)}
        strokeOpacity="0.75"
        strokeWidth="2"
        className="zev-energy-path"
      />
      <path
        d="M6 44 L12 52 L18 44"
        fill="none"
        stroke={accentColor(accent)}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Chip = ({ item, accent }) => {
  if (typeof item === "string") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-foreground"
        style={{ borderColor: `${EMERALD}4D`, backgroundColor: `${EMERALD}0F` }}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: EMERALD }} />
        {item}
      </span>
    );
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
      <span className="text-xs font-medium text-foreground">{item.label}</span>
      <MaturityBadge level={item.level} />
    </span>
  );
};

const Tier = ({ tier, index }) => {
  const { Icon } = tier;
  return (
    <Reveal delay={index * 0.05}>
      <div
        className={`glass-card relative overflow-hidden p-6 sm:p-8 ${
          tier.emphasis ? "ring-1 ring-primary/25" : ""
        }`}
      >
        {/* Left accent rail */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1"
          style={{ backgroundColor: accentColor(tier.accent), opacity: tier.emphasis ? 0.9 : 0.45 }}
        />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
            style={{
              borderColor: `${tier.accent === "emerald" ? EMERALD + "40" : "hsl(var(--primary) / 0.3)"}`,
              backgroundColor: `${tier.accent === "emerald" ? EMERALD + "12" : "hsl(var(--primary) / 0.08)"}`,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: accentColor(tier.accent) }} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {tier.eyebrow}
            </p>
            <h3
              className={`mt-1 font-body font-bold tracking-[-0.02em] text-foreground ${
                tier.emphasis ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {tier.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tier.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tier.items.map((item) => (
                <Chip key={typeof item === "string" ? item : item.label} item={item} accent={tier.accent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const ZevStack = () => {
  const reduced = useReducedMotion();

  return (
    <section id="ecosystem" className="relative scroll-mt-16 section">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="eyebrow">
            ZEV + ZLN
          </p>
          <h2 className="headline mt-4">
            <span className="metal-gradient">One Stack, Two Layers</span>
          </h2>
          <p className="lede mx-auto max-w-2xl">
            ZEV is the physical and technological infrastructure. ZLN is the digital utility layer
            of the ecosystem. Energy activity enters at the bottom of the physical world and leaves
            as information other systems can verify.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {TIERS.map((tier, index) => (
            <div key={tier.id}>
              <Tier tier={tier} index={index} />
              {index < TIERS.length - 1 && <Connector accent={TIERS[index + 1].accent} />}
            </div>
          ))}
        </div>

        {/* Brief §10: ZLN and carbon credits are separate assets and must never
            be presented as the same thing. */}
        <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-muted/40 px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">ZLN is not a carbon credit.</span> ZLN is
            the ZelionTech ecosystem&apos;s utility token. A carbon credit is a separately verified
            environmental asset, issued by an independent body under an applicable standard. Holding
            ZLN does not represent holding a carbon credit, and $ZLN is not a financial product.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ZevStack;
