import { AlertTriangle, ShieldOff, Unplug, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// Why validate at the source (ZEV brief §1, §3B). Replaces the pre-ZEV
// "Structural challenges", "Vision", "What is ZelionTech" and "Philosophy"
// sections with one: the problem, ZelionTech's answer, and the message that
// this is an infrastructure company whose token only coordinates around it.

export const CHALLENGES = [
  {
    Icon: AlertTriangle,
    title: "Unverified energy data",
    body: "Production and consumption figures are mostly self-reported. They are easy to alter and impossible to check after the fact.",
  },
  {
    Icon: ShieldOff,
    title: "Trust by intermediary",
    body: "Verification usually depends on whoever runs the platform. If they are wrong, or compromised, so is every number they publish.",
  },
  {
    Icon: Unplug,
    title: "The physical–digital gap",
    body: "Equipment and digital systems rarely share a verification layer, so data changes hands several times before anyone relies on it.",
  },
];

export const PRINCIPLES = [
  "Infrastructure before token",
  "Validation at the source, not in the cloud",
  "Long-term deployment over short-term incentives",
];

const WhyValidate = () => {
  return (
    <section id="why-validate" className="section-bg-subtle relative scroll-mt-16 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light">
            Why ZEV
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="metal-gradient">Why validate energy data at the source</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Renewable energy is physical — solar, wind, hydro, batteries, grids. The information about it
            is not. Between the two sits a gap that most of today&apos;s energy data falls through.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {CHALLENGES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08} className="glass-card-hover p-6 lg:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                <Icon className="h-6 w-6 text-silver-light" aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-5xl">
          <div className="glass-card grid gap-8 p-6 ring-1 ring-primary/20 lg:grid-cols-5 lg:p-10">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                ZelionTech&apos;s answer
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Measure at the equipment. Validate on the device. Anchor the proof where anyone can check it.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
                ZEV sits next to the equipment, reads the measurement itself, checks and hashes the record on
                the device, and writes that hash to a public chain. Whatever later reaches a dashboard, an
                auditor or a carbon-accounting system can be compared against that record by anyone —
                without trusting ZelionTech or an intermediary.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <MaturityBadge level="demonstrated" />
                <span>ZEV 1 proof of concept — measured, hashed and anchored on BNB Smart Chain end to end</span>
              </div>
            </div>
            <div className="border-t border-border pt-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                How ZelionTech builds
              </p>
              <ul className="mt-4 space-y-3">
                {PRINCIPLES.map((principle) => (
                  <li key={principle} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-silver-light" aria-hidden="true" />
                    {principle}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                ZelionTech is not a token project with hardware attached. ZEV is the product; ZLN, the
                ecosystem token, exists to coordinate participation around it — not the other way round.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyValidate;
