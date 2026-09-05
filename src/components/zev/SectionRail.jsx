import { useEffect, useState } from "react";

// A slim rail of dots on the right edge of wide screens, one per homepage
// section, so a long page offers orientation instead of an endless scroll.
// The active dot follows the section nearest the middle of the viewport; the
// rail stays hidden until the visitor has left the hero. Labels appear on
// hover and on keyboard focus; the current section is announced with
// aria-current.

export const RAIL_SECTIONS = [
  { id: "how-zev-works", label: "How it works" },
  { id: "why-validate", label: "Why validate" },
  { id: "ecosystem", label: "ZEV and ZLN" },
  { id: "roadmap", label: "Roadmap" },
  { id: "remember", label: "What to remember" },
  { id: "team", label: "Team" },
  { id: "faq", label: "Questions" },
  { id: "contact", label: "Contact" },
];

const SectionRail = ({ sections = RAIL_SECTIONS }) => {
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    // Show once the hero has scrolled away; hide again at the very top.
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track which section sits around the middle of the viewport.
    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id);
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) io.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
    };
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-500 motion-reduce:transition-none xl:flex ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex h-4 w-4 items-center justify-center rounded-full outline-none"
          >
            <span
              aria-hidden="true"
              className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${
                isActive ? "h-2.5 w-2.5 bg-primary" : "h-1.5 w-1.5 bg-border group-hover:bg-muted-foreground"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[13px] font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

export default SectionRail;
