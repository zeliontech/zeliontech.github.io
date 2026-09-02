import { cn } from "@/lib/utils";

/**
 * DarkSection — the ONLY way a section goes dark (ZEV brief: hybrid theme).
 *
 * Wraps children in the `.dark-zone` token scope (graphite surfaces, dark
 * borders, light-on-dark text, dark-tuned cyan — see index.css). Full-bleed
 * by design so dark zones read as intentional instrument panels.
 *
 * Edges. Each of `top` / `bottom` is one of:
 *   "seam"  — the crisp machined edge: a hairline cyan seam with a soft glow.
 *             Use where a dark zone meets the navbar or another dark zone.
 *   "fade"  — graphite dissolves into the page background over ~11rem, with
 *             matching padding so content never sits on the blend. Use
 *             wherever a dark zone meets light content: a hard graphite/sky
 *             cut reads as two different websites stacked on each other.
 *   "none"  — nothing. Use on the side that touches another dark zone which
 *             already draws the seam, so the hairlines don't double up.
 *
 * Dark treatment is capped at four zones site-wide: the ZEV hero, the
 * flagship scroll animation (ZevKeyAnimation), the digital twin, and the
 * dashboard mockup. Do not wrap anything else, and never invert colors ad hoc.
 *
 * overflow-clip, not overflow-hidden: hidden would make the section a scroll
 * container and the pinned (position: sticky) stage inside ZevKeyAnimation
 * would stop sticking. clip only clips paint, which is all we need.
 */
const DarkSection = ({ id, className, top = "seam", bottom = "seam", children }) => {
  return (
    <section
      id={id}
      className={cn(
        "dark-zone relative w-full overflow-clip",
        top === "fade" && "pt-44",
        bottom === "fade" && "pb-44",
        className
      )}
    >
      {top === "seam" && <div aria-hidden="true" className="zev-seam zev-seam-top" />}
      {top === "fade" && <div aria-hidden="true" className="zev-fade zev-fade-top" />}
      {children}
      {bottom === "seam" && <div aria-hidden="true" className="zev-seam zev-seam-bottom" />}
      {bottom === "fade" && <div aria-hidden="true" className="zev-fade zev-fade-bottom" />}
    </section>
  );
};

export default DarkSection;
