import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaturityBadge from "./MaturityBadge";
import { HERO_IMAGE } from "./hero-image";
import { useFinePointer, useReducedMotion } from "./hooks";

// Homepage hero, built to the approved design reference: white ground, a
// heavy near-black headline with a single azure word, two pill actions, and
// the ZEV device on site among solar arrays and wind turbines, the edges of
// the scene dissolving into the page.
//
// The scene is the owner-supplied render, delivered as AVIF / WebP / JPEG at
// three widths from public/zev (built by scratchpad/build-hero-image.js). It
// replaced the three.js device and the vector backdrop that stood in until
// imagery existed; the 3D model still drives the close-up in the pillar cards.

const ALT =
  "The ZEV device, a graphite tower with a silver edge and a cyan status light, standing on a concrete pad in front of a solar array, with wind turbines on the wooded hills behind";

const ZevHero = ({ children }) => {
  const reduced = useReducedMotion();

  // Pointer parallax: the section carries --px/--py in -1..1 and index.css
  // moves the scene and the chip at two rates. Only for mouse-like pointers,
  // never under reduced motion.
  const finePointer = useFinePointer();
  const parallax = finePointer && !reduced;
  const onPointerMove = useCallback((event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    el.style.setProperty("--px", (((event.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3));
  }, []);
  const onPointerLeave = useCallback((event) => {
    event.currentTarget.style.setProperty("--px", "0");
    event.currentTarget.style.setProperty("--py", "0");
  }, []);

  return (
    <section
      id="zev-hero"
      className="relative overflow-clip bg-background pt-20"
      onPointerMove={parallax ? onPointerMove : undefined}
      onPointerLeave={parallax ? onPointerLeave : undefined}
    >
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-10 py-12 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-12 lg:gap-8 lg:py-8">
          {/* Copy — painted at first render, so it counts toward LCP. */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow">Clean energy. Verified. Valuable.</p>

            <h1 className="display mt-5">
              From physical energy to <span className="metal-gradient">proof.</span>
            </h1>

            <p className="lede mt-6 max-w-xl">
              ZEV reads renewable energy where it is produced, validates it on the device, and
              records the proof on blockchain — turning real-world energy into data anyone can
              verify.
            </p>

            <div className="zev-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.1s" }}>
              <Button asChild size="lg">
                <Link to="/zev">
                  Explore ZEV
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#how-zev-works">See how it works</a>
              </Button>
            </div>

            {/* Capability status stays in the hero: the brief requires every
                claim to carry its maturity, and this is the first claim made. */}
            <div className="zev-rise mt-10 flex flex-col gap-2.5" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted-foreground">
                <MaturityBadge level="demonstrated" />
                <span>ZEV Lite proof of concept — energy data validated on BNB Smart Chain</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted-foreground">
                <MaturityBadge level="in-development" />
                <span>ZEV Pro industrial platform</span>
              </div>
            </div>
          </div>

          {/* The scene. The crop keeps the device just right of the copy with
              the arrays and turbines opening up behind it, and a mask
              dissolves the frame into the page on all four sides. The
              blurred placeholder is painted behind the picture so nothing
              flashes white while the image arrives. */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="hero-photo-mask relative mx-auto aspect-[4/3] w-full max-w-[720px] overflow-hidden lg:aspect-[3/2]">
              {/* Blurred placeholder, inset so it never reaches the frame edge
                  (at the edge the fades are only just white, and a hard
                  placeholder edge would print through as a hairline). */}
              <div
                aria-hidden="true"
                className="absolute inset-[8%] scale-110 blur-2xl"
                style={{
                  backgroundImage: `url("${HERO_IMAGE.placeholder}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "20% 50%",
                }}
              />
              <picture>
                <source type="image/avif" srcSet={HERO_IMAGE.avif} sizes={HERO_IMAGE.sizes} />
                <source type="image/webp" srcSet={HERO_IMAGE.webp} sizes={HERO_IMAGE.sizes} />
                <img
                  src={HERO_IMAGE.fallback}
                  srcSet={HERO_IMAGE.jpg}
                  sizes={HERO_IMAGE.sizes}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  alt={ALT}
                  className="hero-parallax-photo absolute inset-0 h-full w-full object-cover object-[22%_50%] lg:object-[12%_50%]"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  draggable={false}
                />
              </picture>
              <p className="eyebrow hero-parallax-chip absolute right-2 top-5 hidden max-w-[7.5rem] leading-relaxed sm:block">
                Clean energy, brighter tomorrows
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue: desktop only, hidden on short viewports where it would
            crowd the copy. Dissolves with the first scroll (see index.css). */}
        <a
          href="#how-zev-works"
          className="hero-scroll-cue absolute bottom-6 left-4 hidden items-center gap-3 lg:left-8 lg:flex [@media(max-height:760px)]:lg:hidden"
          aria-label="Scroll to how ZEV works"
        >
          <span className="relative block h-12 w-px overflow-hidden bg-border" aria-hidden="true">
            <span className="hero-scroll-cue-dot absolute left-0 top-0 h-4 w-px bg-foreground" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Scroll
          </span>
        </a>
      </div>
      {children}
    </section>
  );
};

export default ZevHero;
