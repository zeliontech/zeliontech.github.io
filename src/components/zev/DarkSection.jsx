import { cn } from "@/lib/utils";

/**
 * DarkSection — the ONLY way a section goes dark (ZEV brief: hybrid theme).
 *
 * Wraps children in the `.dark-zone` token scope (graphite surfaces, dark
 * borders, light-on-dark text, dark-tuned cyan — see index.css) and renders
 * the single approved light/dark boundary treatment: a crisp machined edge
 * with a hairline cyan seam top and bottom. Full-bleed by design so dark
 * zones read as intentional instrument panels.
 *
 * Dark treatment is capped at four zones site-wide: the ZEV hero, the
 * flagship scroll animation, the digital twin, and the dashboard mockup.
 * Do not wrap anything else, and never invert colors ad hoc.
 */
const DarkSection = ({ id, className, children }) => {
  return (
    <section id={id} className={cn("dark-zone relative w-full overflow-hidden", className)}>
      <div aria-hidden="true" className="zev-seam zev-seam-top" />
      {children}
      <div aria-hidden="true" className="zev-seam zev-seam-bottom" />
    </section>
  );
};

export default DarkSection;
