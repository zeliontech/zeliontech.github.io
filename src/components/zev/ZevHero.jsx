import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DarkSection from "./DarkSection";
import MaturityBadge from "./MaturityBadge";
import { LazyBoundary, useIsSmallScreen, useReducedMotion } from "./hooks";

// Dark zone 1 of 4 (ZEV brief §17): the homepage opens on the ZEV machine —
// not a coin. 3D device center stage with the seven ecosystem domains
// orbiting it, energy flowing in from the physical side and data flowing out
// to the digital side.
//
// The same composition renders at every viewport. Phones are most of the
// audience, so they get the 3D device and the full orbit too — the orbit is
// just pulled in a little so the outermost chips clear the screen edge. The
// static poster is only the loading / no-WebGL / reduced-motion / save-data
// fallback.

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

// Phones (<640px): every node moves toward the centre by this factor so the
// widest chips ("BLOCKCHAIN", "BATTERY") stay inside a ~340px orbit box.
const COMPACT_SCALE = 0.86;
const scaleNode = (node, k) => ({ ...node, x: CX + (node.x - CX) * k, y: CY + (node.y - CY) * k });

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
    width="260"
    height="340"
    loading="eager"
    fetchpriority="high"
    decoding="async"
    draggable={false}
  />
);

const NodeChip = ({ node }) => (
  <span
    className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border bg-card/90 px-2 py-0.5 font-mono text-[9px] font-medium tracking-widest text-foreground/90 backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
    style={{
      left: `${(node.x / 600) * 100}%`,
      top: `${(node.y / 600) * 100}%`,
      borderColor: node.kind === "energy" ? `${EMERALD}59` : "hsl(var(--primary) / 0.35)",
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

const OrbitLines = ({ nodes }) => (
  <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
    {nodes.map((node) => {
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
    {nodes.map((node, i) => {
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

const ZevHero = ({ children }) => {
  const reduced = useReducedMotion();
  const compact = useIsSmallScreen();
  // Respect an explicit data-saver setting: the 3D chunk is ~235 KB gzipped.
  const saveData = typeof navigator !== "undefined" && navigator.connection?.saveData === true;
  const show3D = !reduced && !saveData;
  const nodes = compact ? ORBIT_NODES.map((n) => scaleNode(n, COMPACT_SCALE)) : ORBIT_NODES;

  // Entrance uses the CSS `.zev-rise` utility rather than framer-motion: this
  // section is above the fold, and keeping the motion library out of its
  // chunk is worth more than the extra control here. The utility is inert
  // under prefers-reduced-motion.

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
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-6 lg:py-10">
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

            <div
              className="zev-rise mb-10 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.15s" }}
            >
              <Button asChild size="lg" className="font-heading uppercase tracking-wider">
                <a href="#how-zev-works">
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
            </div>

            <div className="zev-rise flex flex-col gap-2.5" style={{ animationDelay: "0.25s" }}>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <MaturityBadge level="demonstrated" />
                <span>ZEV 1 proof of concept — energy data validated on BNB Smart Chain</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <MaturityBadge level="in-development" />
                <span>ZEV 2 industrial platform</span>
              </div>
            </div>
          </div>

          {/* Visual column: device center stage, seven domains orbiting — at every size */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              <OrbitLines nodes={nodes} />
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
              {nodes.map((node) => (
                <NodeChip key={node.label} node={node} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </DarkSection>
  );
};

export default ZevHero;
