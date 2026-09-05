import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaturityBadge from "./MaturityBadge";
import HeroScene from "./HeroScene";
import { LazyBoundary, useReducedMotion } from "./hooks";

// Homepage hero, built to the approved design reference: white ground, a
// heavy near-black headline with a single azure word, two pill actions, and
// the ZEV device presented as a product shot over an energy-ribbon backdrop.

const ZevDevice3D = lazy(() => import("./ZevDevice3D"));

const DevicePoster = ({ className }) => (
  <img
    src="/zev/device-poster.svg"
    alt="The ZEV device: a brushed aluminium tower with a black glass front panel and a vertical blue status light"
    className={className}
    width="300"
    height="390"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    draggable={false}
  />
);

const ZevHero = ({ children }) => {
  const reduced = useReducedMotion();
  // The 3D chunk is ~235 KB gzipped; respect an explicit data-saver setting.
  const saveData = typeof navigator !== "undefined" && navigator.connection?.saveData === true;
  const show3D = !reduced && !saveData;

  return (
    <section id="zev-hero" className="relative overflow-clip bg-background pt-20">
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

          {/* Device stage */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[720px]">
              <HeroScene className="absolute inset-0 h-full w-full" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[88%] w-[72%]">
                  {show3D ? (
                    <LazyBoundary fallback={<DevicePoster className="mx-auto h-full w-auto" />}>
                      <Suspense fallback={<DevicePoster className="mx-auto h-full w-auto" />}>
                        <ZevDevice3D />
                      </Suspense>
                    </LazyBoundary>
                  ) : (
                    <DevicePoster className="mx-auto h-full w-auto" />
                  )}
                </div>
              </div>

              <p className="eyebrow absolute right-2 top-6 hidden max-w-[7.5rem] leading-relaxed sm:block">
                Clean energy, brighter tomorrows
              </p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};

export default ZevHero;
