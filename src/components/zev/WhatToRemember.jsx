import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Cpu, Database, Leaf, Coins, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

// What the visitor should remember (brief §25) and the core story every
// page reinforces (brief §23), as one interactive flow: five nodes joined
// by a live energy line, and the seven beats of the story grouped under
// them. Hovering or focusing a node brings its beats forward and lets the
// rest recede, so the diagram explains itself without a legend.

export const SENTENCE =
  "ZelionTech is developing ZEV, an intelligent energy-validation machine that connects renewable-energy infrastructure with secure data, AI, blockchain, carbon systems and digital utilities, supported by the ZLN ecosystem.";

// §25: ☀ RENEWABLE ENERGY → ⚡ ZEV → DATA + AI + BLOCKCHAIN → 🌍 CARBON + COMPUTE + DIGITAL ENERGY → ZLN ECOSYSTEM
export const SPINE = [
  { Icon: Sun, label: "Renewable energy", tone: "eco", beats: [0] },
  { Icon: Cpu, label: "ZEV", tone: "ink", beats: [1, 2], emphasis: true },
  { Icon: Database, label: "Data + AI + blockchain", tone: "primary", beats: [3] },
  { Icon: Leaf, label: "Carbon + compute + digital energy", tone: "primary", beats: [4, 5] },
  { Icon: Coins, label: "ZLN ecosystem", tone: "primary", beats: [6] },
];

// §23: the seven beats.
export const STORY = [
  { head: "Energy is physical.", body: "Solar panels, wind turbines, batteries and grids produce and move electricity." },
  { head: "ZEV makes energy digital.", body: "ZEV measures and processes energy information at the equipment." },
  { head: "ZEV makes the data verifiable.", body: "Cryptography and blockchain create an auditable digital trail." },
  { head: "AI makes the data intelligent.", body: "Energy information can be analysed and optimised." },
  { head: "Carbon systems can use trusted data.", body: "Validated renewable-energy information can support carbon accounting and MRV." },
  { head: "Computing can use energy.", body: "Renewable-energy infrastructure can potentially support computational workloads." },
  { head: "ZLN connects the digital economy.", body: "ZLN provides the blockchain-based digital utility layer of the broader ZelionTech ecosystem." },
];

const TILE = {
  eco: "bg-eco/10 text-eco",
  primary: "bg-accent text-primary",
  ink: "bg-foreground text-background shadow-[0_10px_30px_-12px_hsl(220_15%_8%/0.45)]",
};

const WhatToRemember = () => {
  const [active, setActive] = useState(null);
  const litBeats = active === null ? null : new Set(SPINE[active].beats);

  return (
    <section id="remember" className="section section-bg-alternate relative scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header: the takeaway sentence is the heading, as the brief asks. */}
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">What to remember</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              One story runs through every page of this site, and through the machine itself: from
              a physical source to a record anyone can check, and on to the ecosystem around it.
            </p>
          </div>
          <h2 className="headline lg:col-span-8">
            <span className="text-foreground">ZelionTech is developing </span>
            <span className="metal-gradient">ZEV,</span>
            <span className="text-foreground">
              {" "}an intelligent energy-validation machine that connects renewable-energy
              infrastructure with secure data, AI, blockchain, carbon systems and digital
              utilities, supported by the ZLN ecosystem.
            </span>
          </h2>
        </Reveal>

        {/* The flow */}
        <Reveal delay={0.08} className="relative mt-16 lg:mt-20">
          {/* Live energy line behind the tiles (desktop). Green at the source,
              azure at the record; a pulse travels it continuously. */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden lg:block" aria-hidden="true">
            <svg className="h-2 w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rememberLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#2E90FA" />
                </linearGradient>
                <linearGradient id="rememberPulse" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="4" x2="100%" y2="4" stroke="url(#rememberLine)" strokeWidth="2" strokeOpacity="0.28" />
              <line x1="0" y1="4" x2="100%" y2="4" stroke="url(#rememberLine)" strokeWidth="2" strokeOpacity="0.9" className="hero-ribbon" />
              <line x1="0" y1="4" x2="100%" y2="4" stroke="url(#rememberPulse)" strokeWidth="3" className="hero-ribbon" style={{ animationDelay: "-5s" }} />
            </svg>
          </div>

          <ol className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5" onMouseLeave={() => setActive(null)}>
            {SPINE.map(({ Icon, label, tone, emphasis }, i) => (
              <li key={label} className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-pressed={active === i}
                  className={`group relative inline-flex items-center justify-center rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none ${
                    emphasis ? "h-[4.5rem] w-[4.5rem]" : "h-16 w-16"
                  } ${TILE[tone]} ${active !== null && active !== i ? "opacity-50" : "opacity-100"}`}
                >
                  <Icon className={emphasis ? "h-8 w-8" : "h-7 w-7"} strokeWidth={1.7} aria-hidden="true" />
                  {emphasis && (
                    <span
                      aria-hidden="true"
                      className="absolute -inset-1.5 -z-10 rounded-[1.25rem] bg-primary/15 blur-md transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </button>
                <p
                  className={`mt-4 max-w-[11rem] text-[14px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 ${
                    active !== null && active !== i ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {label}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* The seven beats, indexed under the nodes above */}
        <div className="mt-16 lg:mt-20">
          <p className="eyebrow text-center">The story, in seven lines</p>
          <ol className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-x-6">
            {STORY.map((beat, i) => {
              const lit = litBeats === null || litBeats.has(i);
              return (
                <Reveal key={beat.head} delay={i * 0.04}>
                  <li
                    className={`border-t border-border pt-5 transition-all duration-300 ${
                      lit ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <span className="text-[13px] font-semibold tabular-nums text-primary">0{i + 1}</span>
                    <h3 className="mt-2 text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-foreground">
                      {beat.head}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{beat.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Link
            to="/zev"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-all hover:bg-foreground/90 hover:shadow-md"
          >
            Explore the technology
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href="#roadmap"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-7 text-[15px] font-semibold text-foreground transition-colors hover:border-foreground/20 hover:bg-muted"
          >
            See the roadmap
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatToRemember;
