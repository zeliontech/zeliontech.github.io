import DarkSection from "./DarkSection";
import { MaturityLegend } from "./MaturityBadge";

/**
 * PageHeader — the compact dark instrument-panel header every subpage opens
 * with, so subpages start the way the homepage does and then fade into light
 * content. `title` may be a node (for two-tone headings); `children` render
 * under the lede (e.g. anchor pills); `legend` appends the maturity legend.
 */
const PageHeader = ({ eyebrow, title, lede, children, legend = false }) => {
  return (
    <DarkSection id="page-header" className="pt-16" bottom="fade">
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="container relative mx-auto px-4 pt-14 sm:pt-20 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold uppercase leading-[1.04] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        </div>
        {children && <div className="mt-8">{children}</div>}
        {legend && (
          <div className="mt-10">
            <MaturityLegend />
          </div>
        )}
      </div>
    </DarkSection>
  );
};

/** Anchor pills for the sections of a page. */
export const SectionPills = ({ items }) => (
  <nav aria-label="On this page" className="flex flex-wrap gap-2">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary"
      >
        {item.label}
      </a>
    ))}
  </nav>
);

export default PageHeader;
