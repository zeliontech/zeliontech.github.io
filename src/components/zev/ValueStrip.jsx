import { Globe, ShieldCheck, Leaf, Users } from "lucide-react";
import Reveal from "./Reveal";

// The four-value strip that closes the top of the homepage in the approved
// design reference. Kept factual: each line describes how the system is built
// rather than promising an outcome (brief §24).

const VALUES = [
  {
    Icon: Globe,
    tone: "primary",
    title: "Real-world data",
    body: "Measured at the equipment, not self-reported",
  },
  {
    Icon: ShieldCheck,
    tone: "primary",
    title: "Blockchain secured",
    body: "Every proof anchored on BNB Smart Chain",
  },
  {
    Icon: Leaf,
    tone: "eco",
    title: "Lower emissions",
    body: "Evidence that supports credible reporting",
  },
  {
    Icon: Users,
    tone: "primary",
    title: "A cleaner future",
    body: "Infrastructure built for the long term",
  },
];

const ValueStrip = () => {
  return (
    <section className="border-y border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {VALUES.map(({ Icon, tone, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <li className="flex items-center gap-4 px-2 py-7 sm:justify-center lg:px-6">
                <Icon
                  className={`h-8 w-8 shrink-0 ${tone === "eco" ? "text-eco" : "text-primary"}`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-[17px] font-bold leading-tight tracking-[-0.02em] text-foreground">
                    {title}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ValueStrip;
