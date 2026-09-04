import { Zap, BarChart3, FileCheck2, Lock, Boxes, Leaf, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// "How ZEV works" — the six-step strip from the approved design reference.
//
// Claims discipline (brief §15/§24): the ZEV 1 proof of concept demonstrated
// measurement, validation, SHA-256 hashing, timestamping and on-chain
// anchoring. AI anomaly detection and secure-element signing are ZEV 2 and
// are labelled Planned. Step six deliberately says the data *supports*
// carbon accounting rather than that ZEV issues credits (brief §9).

export const STEPS = [
  {
    n: 1,
    Icon: Zap,
    tone: "eco",
    title: "Energy is generated",
    body: "From solar, wind, hydro or any other renewable source.",
    level: null,
  },
  {
    n: 2,
    Icon: BarChart3,
    tone: "primary",
    title: "ZEV measures the data",
    body: "Continuous measurement taken at the equipment itself.",
    level: "demonstrated",
  },
  {
    n: 3,
    Icon: FileCheck2,
    tone: "eco",
    title: "ZEV validates the reading",
    body: "Integrity checks on the device, with AI anomaly detection in development.",
    level: "demonstrated",
  },
  {
    n: 4,
    Icon: Lock,
    tone: "primary",
    title: "Cryptographic proof",
    body: "Each record is hashed and timestamped so tampering is detectable.",
    level: "demonstrated",
  },
  {
    n: 5,
    Icon: Boxes,
    tone: "primary",
    title: "Recorded to blockchain",
    body: "The proof is anchored on BNB Smart Chain, where anyone can check it.",
    level: "demonstrated",
  },
  {
    n: 6,
    Icon: Leaf,
    tone: "eco",
    title: "Usable energy intelligence",
    body: "Evidence that supports ESG reporting, carbon accounting and energy markets.",
    level: "planned",
  },
];

const Step = ({ step, last }) => {
  const { Icon, tone } = step;
  return (
    <li className="relative flex flex-1 gap-4 sm:gap-0">
      {/* Mobile: a vertical rail. Desktop: a chevron between columns. */}
      <div className="flex flex-col items-center sm:hidden">
        <span className="step-dot">{step.n}</span>
        {!last && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className="min-w-0 flex-1 pb-8 sm:pb-0 sm:pr-6">
        <span className="step-dot mb-5 hidden sm:inline-flex">{step.n}</span>
        <Icon
          className={`mb-4 h-8 w-8 ${tone === "eco" ? "text-eco" : "text-primary"}`}
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <h3 className="text-[15px] font-bold leading-snug tracking-[-0.01em] text-foreground">
          {step.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{step.body}</p>
        {step.level && <MaturityBadge level={step.level} className="mt-3" />}
      </div>

      {!last && (
        <ChevronRight
          className="absolute -right-2 top-1 hidden h-5 w-5 text-border sm:block"
          aria-hidden="true"
        />
      )}
    </li>
  );
};

const ZevProcess = () => {
  return (
    <section id="how-zev-works" className="section scroll-mt-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <p className="eyebrow">How ZEV works</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <h2 className="headline">
              A simple process.
              <br />A powerful <span className="metal-gradient">impact.</span>
            </h2>
            <p className="lede max-w-xl lg:pt-3">
              ZEV captures, validates and secures energy data, turning real-world energy into
              trusted, usable intelligence.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="mt-14 flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-2 sm:gap-y-10 lg:flex lg:flex-row lg:gap-0">
            {STEPS.map((step, i) => (
              <Step key={step.n} step={step} last={i === STEPS.length - 1} />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default ZevProcess;
