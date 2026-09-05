import { motion } from "framer-motion";
import { Zap, BarChart3, FileCheck2, Lock, Boxes, Leaf, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";
import { useReducedMotion } from "./hooks";

// "How ZEV works" — the six-step strip from the approved design reference.
//
// Claims discipline (brief §15/§24): the ZEV Lite proof of concept demonstrated
// measurement, validation, SHA-256 hashing, timestamping and on-chain
// anchoring. AI anomaly detection and secure-element signing are ZEV Pro and
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

// The steps arrive one after another, left to right, the first time the
// strip scrolls into view; the chevrons follow so the sequence reads as a
// flow rather than six cards landing at once.

// In-view stagger for a container: attached only when motion is allowed, so
// reduced-motion users (and test environments without IntersectionObserver)
// get the finished layout with no observer at all.
const staggerInView = (children, viewport) => ({
  initial: "hidden",
  whileInView: "show",
  viewport,
  variants: { show: { transition: { staggerChildren: children } } },
});

const stepVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const chevronVariants = {
  hidden: { opacity: 0, x: -4 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut", delay: 0.2 } },
};

const Step = ({ step, last }) => {
  const { Icon, tone } = step;
  return (
    <motion.li variants={stepVariants} className="group relative flex flex-1 gap-4 sm:gap-0">
      {/* Mobile: a vertical rail. Desktop: a chevron between columns. */}
      <div className="flex flex-col items-center sm:hidden">
        <span className="step-dot transition-colors duration-300 group-hover:bg-primary">{step.n}</span>
        {!last && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className="min-w-0 flex-1 pb-8 sm:pb-0 sm:pr-6">
        <span className="step-dot mb-5 hidden transition-colors duration-300 group-hover:bg-primary sm:inline-flex">
          {step.n}
        </span>
        <Icon
          className={`mb-4 h-8 w-8 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none ${
            tone === "eco" ? "text-eco" : "text-primary"
          }`}
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
        <motion.span variants={chevronVariants} className="absolute -right-2 top-1 hidden sm:block" aria-hidden="true">
          <ChevronRight className="h-5 w-5 text-border" />
        </motion.span>
      )}
    </motion.li>
  );
};

const ZevProcess = () => {
  const reduced = useReducedMotion();
  return (
    <section id="how-zev-works" className="section-lead scroll-mt-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <p className="eyebrow">How ZEV works</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <h2 className="headline">
              Six steps from equipment
              <br />to <span className="metal-gradient">proof.</span>
            </h2>
            <p className="lede max-w-xl lg:pt-3">
              ZEV captures, validates and secures energy data, turning real-world energy into
              trusted, usable intelligence.
            </p>
          </div>
        </Reveal>

        <motion.ol
          className="mt-14 flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-2 sm:gap-y-10 lg:flex lg:flex-row lg:gap-0"
          {...(reduced ? {} : staggerInView(0.09, { once: true, margin: "0px 0px -80px 0px" }))}
        >
          {STEPS.map((step, i) => (
            <Step key={step.n} step={step} last={i === STEPS.length - 1} />
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default ZevProcess;
