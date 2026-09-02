import { Link } from "react-router-dom";
import { Sun, Cpu, Database, Leaf, Coins, ArrowRight, ArrowDown } from "lucide-react";
import Reveal from "./Reveal";

// What the visitor should remember (brief §25) and the core story every
// page reinforces (brief §23). Sits after the token section, before the
// team, as the homepage's closing statement.

export const SENTENCE =
  "ZelionTech is developing ZEV, an intelligent energy-validation machine that connects renewable-energy infrastructure with secure data, AI, blockchain, carbon systems and digital utilities, supported by the ZLN ecosystem.";

// §25: ☀ RENEWABLE ENERGY → ⚡ ZEV → DATA + AI + BLOCKCHAIN → 🌍 CARBON + COMPUTE + DIGITAL ENERGY → ZLN ECOSYSTEM
export const SPINE = [
  { Icon: Sun, label: "Renewable energy", tone: "emerald" },
  { Icon: Cpu, label: "ZEV", tone: "primary", emphasis: true },
  { Icon: Database, label: "Data + AI + blockchain", tone: "primary" },
  { Icon: Leaf, label: "Carbon + compute + digital energy", tone: "primary" },
  { Icon: Coins, label: "ZLN ecosystem", tone: "primary" },
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

const EMERALD = "#10B981";

const WhatToRemember = () => {
  return (
    <section id="remember" className="section-bg-alternate relative scroll-mt-16 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light">
            What to remember
          </span>
          <h2 className="font-heading text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:text-4xl">
            {SENTENCE}
          </h2>
        </Reveal>

        {/* The spine (§25) */}
        <Reveal delay={0.08} className="mx-auto mt-12 max-w-6xl">
          <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
            {SPINE.map(({ Icon, label, tone, emphasis }, i) => {
              const color = tone === "emerald" ? EMERALD : "hsl(var(--primary))";
              return (
                <li key={label} className="flex flex-col items-center lg:flex-1 lg:flex-row">
                  {i > 0 && (
                    <span aria-hidden="true" className="flex items-center justify-center py-1 lg:flex-1 lg:py-0">
                      <ArrowDown className="h-4 w-4 text-primary/60 lg:hidden" />
                      <svg className="hidden h-[2px] w-full lg:block" aria-hidden="true">
                        <line x1="0" y1="1" x2="100%" y2="1" stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="2" />
                        <line x1="0" y1="1" x2="100%" y2="1" stroke="hsl(var(--primary))" strokeOpacity="0.7" strokeWidth="2" className="zev-energy-path" />
                      </svg>
                    </span>
                  )}
                  <span
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-widest lg:w-auto ${
                      emphasis ? "text-primary" : "text-foreground/90"
                    }`}
                    style={{
                      borderColor: `${tone === "emerald" ? EMERALD + "59" : "hsl(var(--primary) / 0.35)"}`,
                      backgroundColor: emphasis ? "hsl(var(--primary) / 0.1)" : "hsl(var(--card) / 0.9)",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} aria-hidden="true" />
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* The story (§23) */}
        <div className="mx-auto mt-14 max-w-5xl">
          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            The story, in seven lines
          </p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-2">
            {STORY.map((beat, i) => (
              <Reveal key={beat.head} delay={i * 0.04}>
                <li className="glass-card h-full p-4">
                  <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-1 font-heading text-sm font-semibold text-foreground">{beat.head}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{beat.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/technology"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore the technology
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href="#roadmap"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
          >
            See the roadmap
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatToRemember;
