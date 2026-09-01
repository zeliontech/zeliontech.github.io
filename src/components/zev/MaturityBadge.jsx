import { cn } from "@/lib/utils";

/**
 * Maturity labeling (ZEV brief §15/§24): every capability shown on the site
 * carries one of these four labels. Colors come from the --maturity-* tokens
 * so badges stay WCAG-AA readable in both the light base theme and inside
 * .dark-zone sections. Anything not sourced from the brief as demonstrated
 * defaults to "planned".
 */
export const MATURITY_LEVELS = {
  demonstrated: {
    label: "Demonstrated",
    description: "Shown working in the ZEV 1 proof of concept.",
    tone: "demonstrated",
    solidDot: true,
  },
  prototype: {
    label: "Prototype",
    description: "Built and under test; not commercially deployed.",
    tone: "progress",
    solidDot: true,
  },
  "in-development": {
    label: "In Development",
    description: "Actively being engineered for ZEV 2.",
    tone: "progress",
    solidDot: false,
  },
  planned: {
    label: "Planned",
    description: "On the architecture roadmap; not yet built.",
    tone: "planned",
    solidDot: false,
  },
};

const toneVar = {
  demonstrated: "--maturity-demonstrated",
  progress: "--maturity-progress",
  planned: "--maturity-planned",
};

const MaturityBadge = ({ level, className }) => {
  const config = MATURITY_LEVELS[level] ?? MATURITY_LEVELS.planned;
  const v = toneVar[config.tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider whitespace-nowrap",
        className
      )}
      style={{
        color: `hsl(var(${v}))`,
        borderColor: `hsl(var(${v}) / 0.35)`,
        backgroundColor: `hsl(var(${v}) / 0.08)`,
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full border"
        style={{
          borderColor: `hsl(var(${v}))`,
          backgroundColor: config.solidDot ? `hsl(var(${v}))` : "transparent",
        }}
      />
      {config.label}
    </span>
  );
};

/** Shown once on the homepage: what the four maturity labels mean. */
export const MaturityLegend = ({ className }) => {
  return (
    <div className={cn("glass-card px-5 py-4 sm:px-6", className)}>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        How to read capability labels
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(MATURITY_LEVELS).map(([key, config]) => (
          <div key={key} className="flex flex-col items-start gap-1.5">
            <MaturityBadge level={key} />
            <p className="text-xs leading-relaxed text-muted-foreground">{config.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityBadge;
