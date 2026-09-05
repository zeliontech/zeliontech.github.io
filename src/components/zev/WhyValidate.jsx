import { AlertTriangle, ShieldOff, Unplug, CheckCircle2, Globe, ShieldCheck, Leaf, Users } from "lucide-react";
import Reveal from "./Reveal";
import MaturityBadge from "./MaturityBadge";

// Why validate at the source (ZEV brief §1, §3B). Replaces the pre-ZEV
// "Structural challenges", "Vision", "What is ZelionTech" and "Philosophy"
// sections with one: the problem, ZelionTech's answer, and the message that
// this is an infrastructure company whose token only coordinates around it.
// The four proof points that used to be a separate value strip close the
// section, so the argument and its evidence read as one.

export const PROOF_POINTS = [
  { Icon: Globe, tone: "primary", title: "Real-world data", body: "Measured at the equipment, not self-reported." },
  { Icon: ShieldCheck, tone: "primary", title: "Blockchain secured", body: "Every proof anchored on BNB Smart Chain." },
  { Icon: Leaf, tone: "eco", title: "Evidence, not claims", body: "Records that support credible reporting." },
  { Icon: Users, tone: "primary", title: "Hardware first", body: "The token coordinates; it does not lead." },
];

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
    <section id="why-validate" className="relative scroll-mt-16 section-lead bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="mb-14">
          <p className="eyebrow">Why ZEV</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-16">
            <h2 className="headline">
              Why validate energy data <span className="metal-gradient">at the source</span>
            </h2>
            <p className="lede max-w-xl lg:pt-3">
              Renewable energy is physical — solar, wind, hydro, batteries, grids. The information about it
              is not. Between the two sits a gap that most of today&apos;s energy data falls through.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {CHALLENGES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08} className="glass-card-hover p-6 lg:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-body text-[17px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div className="glass-card grid gap-8 p-6 ring-1 ring-primary/20 lg:grid-cols-5 lg:p-10">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                ZelionTech&apos;s answer
              </p>
              <h3 className="mt-2 subhead">
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
                <span>ZEV Lite proof of concept — measured, hashed and anchored on BNB Smart Chain end to end</span>
              </div>
            </div>
            <div className="border-t border-border pt-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                How ZelionTech builds
              </p>
              <ul className="mt-4 space-y-3">
                {PRINCIPLES.map((principle) => (
                  <li key={principle} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
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

        {/* Proof points: the four things the argument above rests on. */}
        <Reveal delay={0.12} className="mt-10">
          <ul className="grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {PROOF_POINTS.map(({ Icon, tone, title, body }) => (
              <li key={title} className="group flex items-start gap-4 px-2 py-6 lg:px-6">
                <Icon
                  className={`mt-0.5 h-6 w-6 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none ${
                    tone === "eco" ? "text-eco" : "text-primary"
                  }`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-[16px] font-bold leading-tight tracking-[-0.02em] text-foreground">{title}</p>
                  <p className="mt-1 text-[13.5px] leading-snug text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyValidate;
