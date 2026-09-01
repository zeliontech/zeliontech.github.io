import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DarkSection from "./DarkSection";
import MaturityBadge from "./MaturityBadge";
import { LazyBoundary, useIsDesktop, useReducedMotion } from "./hooks";

// Dark zone 1 of 4 (ZEV brief §17): the homepage opens on the ZEV machine —
// not a coin. 3D device center stage with the seven ecosystem domains
// orbiting it, energy flowing in from the physical side and data flowing out
// to the digital side.

const ZevDevice3D = lazy(() => import("./ZevDevice3D"));

const CX = 300;
const CY = 300;

// kind "energy" = physical inputs (emerald, flowing INTO ZEV);
// kind "data" = digital utilities (cyan, flowing OUT of ZEV).
const ORBIT_NODES = [
  { label: "SOLAR", kind: "energy", x: 300, y: 40 },
  { label: "BATTERY", kind: "energy", x: 40, y: 300 },
  { label: "GRID", kind: "energy", x: 98, y: 478 },
  { label: "COMPUTE", kind: "data", x: 300, y: 560 },
  { label: "CARBON", kind: "data", x: 502, y: 478 },
  { label: "BLOCKCHAIN", kind: "data", x: 560, y: 300 },
  { label: "AI", kind: "data", x: 502, y: 122 },
];

// Gentle quadratic arc between a node and the center. Energy paths run
// node→center and data paths center→node so the shared dash animation drifts
// in the correct direction for each.
const flowPath = (node, outward) => {
  const mx = (node.x + CX) / 2;
  const my = (node.y + CY) / 2;
  const dx = CX - node.x;
  const dy = CY - node.y;
  const len = Math.hypot(dx, dy) || 1;
  const c = `${(mx + (-dy / len) * 28).toFixed(1)} ${(my + (dx / len) * 28).toFixed(1)}`;
  return outward
    ? `M ${CX} ${CY} Q ${c} ${node.x} ${node.y}`
    : `M ${node.x} ${node.y} Q ${c} ${CX} ${CY}`;
};

const EMERALD = "#10B981";

const DevicePoster = ({ className }) => (
  <img
    src="/zev/device-poster.svg"
    alt="ZEV device — industrial DIN-rail enclosure with cyan status lighting"
    className={className}
    loading="eager"
    decoding="async"
    draggable={false}
  />
);

const NodeChip = ({ node, positioned = true }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border bg-card/90 px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest text-foreground/90 backdrop-blur-sm sm:text-[11px]"
    style={{
      borderColor: node.kind === "energy" ? `${EMERALD}59` : "hsl(var(--primary) / 0.35)",
      ...(positioned
        ? {
            position: "absolute",
            left: `${(node.x / 600) * 100}%`,
            top: `${(node.y / 600) * 100}%`,
            transform: "translate(-50%, -50%)",
          }
        : {}),
    }}
  >
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: node.kind === "energy" ? EMERALD : "hsl(var(--primary))" }}
    />
    {node.label}
  </span>
);

const OrbitLines = () => (
  <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
    {ORBIT_NODES.map((node) => {
      const stroke = node.kind === "energy" ? EMERALD : "hsl(var(--primary))";
      return (
        <path
          key={`base-${node.label}`}
          d={flowPath(node, node.kind === "data")}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.16"
          strokeWidth="1"
        />
      );
    })}
    {ORBIT_NODES.map((node, i) => {
      const stroke = node.kind === "energy" ? EMERALD : "hsl(var(--primary))";
      return (
        <path
          key={`flow-${node.label}`}
          d={flowPath(node, node.kind === "data")}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.55"
          strokeWidth="1.5"
          className="zev-energy-path"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      );
    })}
  </svg>
);

const ZevHero = () => {
  const reduced = useReducedMotion();
  const show3D = useIsDesktop() && !reduced;

  const fadeIn = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
      };

  return (
    <DarkSection id="zev-hero" className="pt-16">
      {/* Instrument-panel backdrop: faint grid + a cyan energy glow behind the device */}
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(42% 42% at 68% 50%, hsl(var(--primary) / 0.09) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-10">
          {/* Copy column — static (no entrance animation) so the headline is
              painted at first render and counts toward LCP. */}
          <div className="max-w-2xl lg:col-span-5">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              ZEV — Zelion Energy Validator
            </span>

            <h1 className="mb-6 font-heading text-4xl font-bold uppercase leading-[1.04] tracking-tight sm:text-5xl xl:text-6xl">
              <span className="metal-gradient">The Intelligence Layer</span>
              <br />
              <span className="text-foreground">for Renewable Energy</span>
            </h1>

            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              ZEV connects physical energy infrastructure with secure data validation, AI,
              blockchain and digital energy applications — transforming renewable-energy
              activity into trusted digital intelligence.
            </p>

            <motion.div {...fadeIn} className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-heading uppercase tracking-wider">
                <a href="#zev-story">
                  Explore ZEV
                  <ArrowRight className="ml-1 h-4 w-4 motion-reduce:transition-none" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border bg-transparent font-heading uppercase tracking-wider text-foreground hover:bg-secondary hover:text-foreground"
              >
                <a href="#ecosystem">Discover the Ecosystem</a>
              </Button>
            </motion.div>

            <motion.div {...fadeIn} className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <MaturityBadge level="demonstrated" />
                <span>ZEV 1 proof of concept — energy data validated on BNB Smart Chain</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <MaturityBadge level="in-development" />
                <span>ZEV 2 industrial platform</span>
              </div>
            </motion.div>
          </div>

          {/* Visual column: device center stage, seven domains orbiting */}
          <div className="lg:col-span-7">
            {/* Desktop / tablet: full orbit */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] sm:block">
              <OrbitLines />
              <div className="absolute inset-[17%]">
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
              {ORBIT_NODES.map((node) => (
                <NodeChip key={node.label} node={node} />
              ))}
            </div>

            {/* Small screens: poster plus a compact domain list */}
            <div className="sm:hidden">
              <DevicePoster className="mx-auto h-64 w-auto" />
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {ORBIT_NODES.map((node) => (
                  <NodeChip key={node.label} node={node} positioned={false} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DarkSection>
  );
};

export default ZevHero;
