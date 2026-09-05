import { MaturityLegend } from "./MaturityBadge";

/**
 * The header every subpage opens with, on the approved light design system:
 * white ground, small uppercase eyebrow, a heavy near-black headline whose
 * emphasised word carries the azure accent, then a lede.
 *
 * `title` may be a node so a single word can be wrapped in .metal-gradient.
 * `children` render under the lede (typically anchor pills); `legend` appends
 * the capability-label key. `media` (optional) places a picture beside the
 * copy on large screens and under it on small ones.
 */
const PageHeader = ({ eyebrow, title, lede, children, legend = false, media = null }) => {
  return (
    <section className="bg-background pt-14 sm:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={media ? "grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10" : undefined}>
          <div className={media ? "max-w-3xl lg:col-span-7" : "max-w-3xl"}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display mt-5">{title}</h1>
            <p className="lede mt-6 max-w-2xl">{lede}</p>
            {children && <div className="mt-8">{children}</div>}
          </div>
          {media && <div className="lg:col-span-5">{media}</div>}
        </div>
        {legend && (
          <div className="mt-10">
            <MaturityLegend />
          </div>
        )}
      </div>
    </section>
  );
};

/** Anchor pills for the sections of a page. */
export const SectionPills = ({ items }) => (
  <nav aria-label="On this page" className="flex flex-wrap gap-2">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
      >
        {item.label}
      </a>
    ))}
  </nav>
);

export default PageHeader;
