import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowDown } from "lucide-react";
import DarkSection from "./DarkSection";
import MaturityBadge from "./MaturityBadge";
import { useReducedMotion } from "./hooks";

// Dark zone 2 of 4 — the flagship scroll animation (ZEV brief §18). The
// visitor scrolls and the story plays: sun → solar panels → ZEV → the
// validation chain inside ZEV (brief §3B) → the record splits toward five
// digital utilities → "One machine. Multiple digital energy utilities."
//
// Claims discipline (brief §24): every step of the chain and every output
// utility carries a maturity label. Only what the ZEV Lite proof of concept
// demonstrated (brief §15: measurement, energy-data processing, SHA-256
// hashing + timestamping, BNB Smart Chain anchoring, dashboard) is labelled
// Demonstrated; everything else defaults to Planned. Carbon wording follows
// brief §9 — trusted energy data that can *support* MRV, never credits.
//
// At every viewport the section pins for PIN_HEIGHT of scroll and drives the
// scene from scroll progress — phones stack the scene above the copy, desktop
// puts them side by side. Under prefers-reduced-motion it renders the
// finished scene with all stages listed instead — same content, no pinning.

const PIN_HEIGHT = "500vh";

/** The five steps inside ZEV (brief §18 / §3B), with maturity per §15. */
export const STEPS = [
  {
    label: "Measure",
    level: "demonstrated",
    detail: "reads production, consumption, voltage, current and power from the connected meter.",
  },
  {
    label: "Analyze",
    level: "planned",
    detail: "AI edge analysis — pattern analysis and anomaly detection on the device.",
  },
  {
    label: "Validate",
    level: "demonstrated",
    detail: "checks each reading for integrity and consistency before it is recorded.",
  },
  {
    label: "Sign",
    level: "planned",
    detail: "cryptographic signing inside a hardware Secure Element.",
  },
  {
    label: "Hash",
    level: "demonstrated",
    detail: "SHA-256 hash and timestamp, ready to anchor on-chain.",
  },
];

/** Where the validated record goes (brief §18), with maturity per §15. */
export const UTILITIES = [
  {
    label: "Blockchain",
    level: "demonstrated",
    detail: "hash anchored on BNB Smart Chain as a verifiable record.",
  },
  {
    label: "Energy dashboard",
    lines: ["Energy", "dashboard"],
    level: "demonstrated",
    detail: "validated readings visualised for operators.",
  },
  {
    label: "AI",
    level: "planned",
    detail: "predictive insights, optimisation and operational alerts.",
  },
  {
    label: "Carbon data",
    lines: ["Carbon", "data"],
    level: "planned",
    detail: "trusted energy data that can support carbon accounting and MRV processes.",
  },
  {
    label: "Compute",
    level: "planned",
    detail: "available renewable capacity allocated to computing workloads.",
  },
];

/**
 * The six beats of the animation. `at` is the scroll progress (0–1) at which
 * a beat becomes current in pinned mode; scene elements reveal around the
 * same points (see the reveal() calls in Scene).
 */
export const STAGES = [
  {
    id: "sun",
    at: 0,
    eyebrow: "01 — Sunlight",
    title: "Energy is physical.",
    body: "Solar panels, wind turbines, hydro plants, batteries and grids produce and move real electricity. Before any of it can be trusted digitally, it has to be measured where it happens.",
  },
  {
    id: "panels",
    at: 0.13,
    eyebrow: "02 — Solar panels",
    title: "Electricity begins flowing.",
    body: "Sunlight becomes electrical output — current, voltage and power that exist only in the physical world until something reads them. The same is true of wind, hydro or any other renewable source.",
  },
  {
    id: "zev",
    at: 0.27,
    eyebrow: "03 — ZEV",
    title: "ZEV begins receiving energy information.",
    body: "Installed next to the equipment, ZEV reads energy data from the connected meter and turns physical activity into structured digital information.",
    labels: [
      { label: "Energy meter integration", level: "demonstrated" },
      { label: "Inverter, battery and grid integration", level: "planned" },
    ],
  },
  {
    id: "inside",
    at: 0.4,
    eyebrow: "04 — Inside ZEV",
    title: "Measure → Analyze → Validate → Sign → Hash",
    body: "Every reading passes through the same chain. Each step carries its maturity label: what the ZEV Lite proof of concept demonstrated, and what ZEV Pro is designed to add.",
    labels: STEPS,
  },
  {
    id: "split",
    at: 0.7,
    eyebrow: "05 — Digital utilities",
    title: "One record, five destinations.",
    body: "A validated record can serve several systems at once. Blockchain anchoring and the energy dashboard were demonstrated in the proof of concept; the other utilities are planned architecture.",
    labels: UTILITIES,
  },
  {
    id: "finale",
    at: 0.87,
    eyebrow: "ZEV — Zelion Energy Validator",
    title: "One machine. Multiple digital energy utilities.",
    body: "ZEV is designed as the intelligence layer between physical energy infrastructure and the digital systems that need to trust it.",
    finale: true,
  },
];

/** Index of the stage that is current at scroll progress p (0–1). */
export const stageAt = (p) => {
  let index = 0;
  for (let i = 0; i < STAGES.length; i += 1) {
    if (p >= STAGES[i].at) index = i;
  }
  return index;
};

// ---------------------------------------------------------------------------
// Scene. Driven by one CSS custom property, --p (scroll progress 0–1), set on
// the wrapper. Every element derives its own reveal from --p with clamp(), so
// scrolling never re-renders React — the browser just recomputes styles.
// Static mode sets --p: 1 and the finished scene renders.

const progress = (start, span) => `clamp(0, calc((var(--p) - ${start}) / ${span}), 1)`;

/** Fade + 8px rise once --p passes `start`. Apply to a wrapper <g>, never to an
 *  element that also carries an SVG transform attribute (CSS wins). */
const reveal = (start, span = 0.06) => {
  const k = progress(start, span);
  return { opacity: k, transform: `translateY(calc((1 - ${k}) * 8px))` };
};

/** Draw a path from start to end as --p passes `start`. The path must carry
 *  pathLength={1} so the dash maths is geometry-independent. */
const draw = (start, span = 0.06) => ({
  strokeDasharray: 1,
  strokeDashoffset: `calc(1px * (1 - ${progress(start, span)}))`,
});

/** Show the drifting-dash flow overlay only once its base path is drawn. */
const flowAfter = (start, span = 0.06) => ({ opacity: progress(start + span, 0.04) });

const AMBER = "#FBBF24";
const EMERALD = "#10B981";
const CYAN = "hsl(var(--primary))";
const CX = 320;
const SUN_Y = 64;
const PANEL_X = [200, 320, 440];
const PANEL_Y = 172;
const DEVICE = { x: 190, y: 250, w: 260, h: 290 };
const STEP_Y = [312, 358, 404, 450, 496];
const NODE_X = [96, 208, 320, 432, 544];
const NODE_Y = 660;

const maturityColor = (level) =>
  level === "demonstrated"
    ? "hsl(var(--maturity-demonstrated))"
    : level === "planned"
      ? "hsl(var(--maturity-planned))"
      : "hsl(var(--maturity-progress))";

const MaturityDot = ({ cx, cy, level }) => (
  <circle
    cx={cx}
    cy={cy}
    r="4"
    fill={level === "demonstrated" ? maturityColor(level) : "transparent"}
    stroke={maturityColor(level)}
    strokeWidth="1.5"
  />
);

const Sun = () => (
  <g style={reveal(0, 0.05)}>
    <circle cx={CX} cy={SUN_Y} r="64" fill={AMBER} opacity="0.1" />
    <circle cx={CX} cy={SUN_Y} r="28" fill={AMBER} />
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <line
          key={i}
          x1={CX + Math.cos(a) * 36}
          y1={SUN_Y + Math.sin(a) * 36}
          x2={CX + Math.cos(a) * 48}
          y2={SUN_Y + Math.sin(a) * 48}
          stroke={AMBER}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      );
    })}
  </g>
);

const Sunlight = () => (
  <g style={reveal(0.13)}>
    {PANEL_X.map((x) => {
      const d = `M${CX + (x - CX) * 0.25} 100 L${x} 150`;
      return (
        <g key={x}>
          <path d={d} stroke={AMBER} strokeOpacity="0.2" strokeWidth="1.5" fill="none" />
          <path d={d} stroke={AMBER} strokeOpacity="0.7" strokeWidth="1.5" fill="none" className="zev-energy-path" />
        </g>
      );
    })}
  </g>
);

const Panels = () => (
  <g style={reveal(0.15)}>
    {PANEL_X.map((x) => (
      <g key={x} transform={`translate(${x} ${PANEL_Y})`}>
        <g transform="skewX(-14)">
          <rect x="-50" y="-20" width="100" height="40" rx="3" fill="#12315A" stroke={CYAN} strokeOpacity="0.6" />
          {[-25, 0, 25].map((gx) => (
            <line key={gx} x1={gx} y1="-20" x2={gx} y2="20" stroke={CYAN} strokeOpacity="0.35" />
          ))}
          <line x1="-50" y1="0" x2="50" y2="0" stroke={CYAN} strokeOpacity="0.35" />
        </g>
      </g>
    ))}
    <text x={PANEL_X[0] - 64} y={PANEL_Y + 4} textAnchor="end" className="fill-muted-foreground font-mono" fontSize="9" letterSpacing="1.5">
      SOLAR PV
    </text>
  </g>
);

/** Panel bus + drop into the device: electricity flowing toward ZEV. */
const Feed = () => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M200 192 V208 H440 V192 M320 208 V250"
      pathLength={1}
      stroke={EMERALD}
      strokeOpacity="0.35"
      strokeWidth="2"
      style={draw(0.2, 0.07)}
    />
    {["M200 192 V208 H320 V250", "M440 192 V208 H320 V250"].map((d) => (
      <path key={d} d={d} stroke={EMERALD} strokeOpacity="0.9" strokeWidth="2" className="zev-energy-path" style={flowAfter(0.2, 0.07)} />
    ))}
  </g>
);

const Device = () => (
  <g style={reveal(0.27)}>
    <rect
      x={DEVICE.x}
      y={DEVICE.y}
      width={DEVICE.w}
      height={DEVICE.h}
      rx="14"
      className="fill-card"
      stroke={CYAN}
      strokeOpacity="0.45"
      strokeWidth="1.5"
    />
    {/* Finale: the enclosure lights up */}
    <rect
      x={DEVICE.x}
      y={DEVICE.y}
      width={DEVICE.w}
      height={DEVICE.h}
      rx="14"
      fill="none"
      stroke={CYAN}
      strokeWidth="2"
      style={{ opacity: progress(0.87, 0.06) }}
    />
    <text x={DEVICE.x + 18} y={DEVICE.y + 30} className="fill-foreground font-mono" fontSize="10" fontWeight="600" letterSpacing="2">
      ZEV
    </text>
    <text x={DEVICE.x + 50} y={DEVICE.y + 30} className="fill-muted-foreground font-mono" fontSize="9" letterSpacing="1.5">
      ZELION ENERGY VALIDATOR
    </text>
    <circle cx={DEVICE.x + DEVICE.w - 34} cy={DEVICE.y + 26} r="3" fill={CYAN} />
    <circle cx={DEVICE.x + DEVICE.w - 22} cy={DEVICE.y + 26} r="3" fill={EMERALD} />
    <line x1={DEVICE.x + 14} y1={DEVICE.y + 44} x2={DEVICE.x + DEVICE.w - 14} y2={DEVICE.y + 44} stroke={CYAN} strokeOpacity="0.25" />
  </g>
);

const Steps = () => (
  <g>
    {STEPS.map((step, i) => {
      const y = STEP_Y[i];
      const start = 0.4 + i * 0.05;
      const planned = step.level !== "demonstrated";
      return (
        <g key={step.label} style={reveal(start, 0.04)}>
          {i > 0 && (
            <line x1={CX} y1={y - 31} x2={CX} y2={y - 15} stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
          )}
          <rect
            x={CX - 88}
            y={y - 15}
            width="176"
            height="30"
            rx="6"
            fill={CYAN}
            fillOpacity={planned ? 0.04 : 0.14}
            stroke={planned ? "hsl(var(--maturity-planned))" : CYAN}
            strokeOpacity={planned ? 0.6 : 0.7}
            strokeDasharray={planned ? "4 3" : undefined}
          />
          <text x={CX - 72} y={y + 4} className="fill-foreground font-mono" fontSize="11" fontWeight="600" letterSpacing="2">
            {step.label.toUpperCase()}
          </text>
          <MaturityDot cx={CX + 72} cy={y} level={step.level} />
        </g>
      );
    })}
  </g>
);

/** Stem out of the device and the fan of branches to the five utilities. */
const Split = () => (
  <g fill="none" strokeLinecap="round">
    <path d={`M${CX} ${DEVICE.y + DEVICE.h} V570`} pathLength={1} stroke={CYAN} strokeOpacity="0.35" strokeWidth="2" style={draw(0.7, 0.04)} />
    {NODE_X.map((x) => {
      const d = `M${CX} 570 C${CX} 615 ${x} 600 ${x} ${NODE_Y - 19}`;
      return (
        <g key={x}>
          <path d={d} pathLength={1} stroke={CYAN} strokeOpacity="0.3" strokeWidth="1.5" style={draw(0.72, 0.08)} />
          <path d={d} stroke={CYAN} strokeOpacity="0.8" strokeWidth="1.5" className="zev-energy-path" style={flowAfter(0.72, 0.08)} />
        </g>
      );
    })}
  </g>
);

const Nodes = () => (
  <g>
    {UTILITIES.map((u, i) => {
      const x = NODE_X[i];
      const lines = u.lines ?? [u.label.toUpperCase()];
      return (
        <g key={u.label} style={reveal(0.74 + i * 0.02, 0.04)}>
          <rect
            x={x - 52}
            y={NODE_Y - 19}
            width="104"
            height="38"
            rx="19"
            className="fill-card"
            stroke={maturityColor(u.level)}
            strokeOpacity="0.55"
            strokeDasharray={u.level === "demonstrated" ? undefined : "4 3"}
          />
          <text x={x - 4} y={NODE_Y + (lines.length > 1 ? -1 : 3.5)} textAnchor="middle" className="fill-foreground font-mono" fontSize="9" fontWeight="600" letterSpacing="1.2">
            {lines.map((line, li) => (
              <tspan key={line} x={x - 4} dy={li === 0 ? 0 : 11}>
                {line.toUpperCase()}
              </tspan>
            ))}
          </text>
          <MaturityDot cx={x + 40} cy={NODE_Y} level={u.level} />
        </g>
      );
    })}
  </g>
);

const SCENE_LABEL =
  "Sunlight reaches solar panels; electricity flows into the ZEV device, where each reading is measured, analyzed, validated, signed and hashed; the record then splits toward blockchain, an energy dashboard, AI, carbon data and compute.";

const Scene = ({ className }) => (
  <svg viewBox="0 0 640 740" className={className} role="img" aria-label={SCENE_LABEL}>
    <Sun />
    <Sunlight />
    <Panels />
    <Feed />
    <Device />
    <Steps />
    <Split />
    <Nodes />
  </svg>
);

// ---------------------------------------------------------------------------

// dense: the pinned layout on phones — two columns, no detail text — so the
// five-step beat fits under the scene on a small screen. Desktop (lg) and the
// static layout show the full list.
const Labels = ({ labels, dense }) => (
  <ul
    className={
      dense
        ? "mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 lg:mt-5 lg:block lg:space-y-2.5"
        : "mt-5 space-y-2.5"
    }
  >
    {labels.map((item) => (
      <li key={item.label} className="flex items-start gap-2 text-[13px] leading-snug sm:gap-2.5 sm:text-sm">
        <MaturityBadge level={item.level} className="mt-px shrink-0" />
        <span>
          <span className="font-medium text-foreground">{item.label}</span>
          {item.detail && (
            <span className={dense ? "hidden text-muted-foreground lg:inline" : "text-muted-foreground"}>
              {" "}
              — {item.detail}
            </span>
          )}
        </span>
      </li>
    ))}
  </ul>
);

const StageCopy = ({ stage, className, dense }) => (
  <div className={className}>
    <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{stage.eyebrow}</p>
    <h3
      className={`mt-1.5 font-heading font-bold leading-tight text-foreground sm:mt-2 ${
        stage.finale
          ? "text-2xl uppercase tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl"
          : "text-xl sm:text-2xl lg:text-3xl"
      }`}
    >
      {stage.title}
    </h3>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-3 lg:text-base">{stage.body}</p>
    {stage.labels && <Labels labels={stage.labels} dense={dense} />}
    {stage.finale && (
      <a
        href="#ecosystem"
        className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
      >
        See the full ZEV + ZLN stack
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    )}
  </div>
);

// compact: pinned layout — on phones only the eyebrow is visible (the h2 stays
// for assistive tech) so the copy fits under the scene.
const Heading = ({ align = "left", compact }) => (
  <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
    <span className="mb-1 inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-light lg:mb-3">
      How ZEV works
    </span>
    <h2
      className={`font-heading text-xl font-semibold text-foreground sm:text-2xl ${
        compact ? "sr-only lg:not-sr-only" : ""
      }`}
    >
      From sunlight to a verifiable record
    </h2>
  </div>
);

/** Desktop: pinned viewport, scene driven by scroll progress. */
const PinnedFlow = () => {
  const wrapperRef = useRef(null);
  const sceneRef = useRef(null);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    sceneRef.current?.style.setProperty("--p", p.toFixed(4));
    const next = stageAt(p);
    if (next !== stageRef.current) {
      stageRef.current = next;
      setStage(next);
    }
  });

  const current = STAGES[stage];

  const tick = (i) =>
    `h-1 rounded-full transition-all duration-300 motion-reduce:transition-none ${
      i <= stage ? "w-6 bg-primary" : "w-3 bg-border"
    }`;

  // Phones: scene on top (capped at ~38% of the viewport), copy underneath.
  // Desktop (lg): copy left, scene right. dvh keeps the pinned box inside the
  // visible area while a mobile browser's address bar is showing.
  return (
    <div ref={wrapperRef} style={{ height: PIN_HEIGHT }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
        <div className="container mx-auto flex h-full flex-col justify-center gap-4 px-4 py-4 lg:grid lg:h-auto lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:py-0">
          <div className="order-1 shrink-0 lg:order-2 lg:col-span-7">
            <div ref={sceneRef} className="mx-auto w-full max-w-[560px]" style={{ "--p": 0 }}>
              <Scene className="mx-auto h-auto max-h-[38vh] w-full supports-[height:100dvh]:max-h-[38dvh] lg:max-h-[calc(100vh-8rem)]" />
            </div>
          </div>
          <div className="order-2 flex min-h-0 flex-col gap-3 overflow-hidden lg:order-1 lg:col-span-5 lg:h-full lg:justify-between lg:gap-8 lg:overflow-visible">
            <div className="flex items-center justify-between gap-4">
              <Heading compact />
              {/* Progress ticks sit beside the eyebrow on phones, under the copy on desktop */}
              <ol className="flex items-center gap-1.5 lg:hidden" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <li key={s.id} className={tick(i)} />
                ))}
              </ol>
            </div>
            {/* Re-mount per stage so the entrance utility (.zev-rise) replays. */}
            <StageCopy key={current.id} stage={current} className="zev-rise" dense />
            <div className="hidden lg:block">
              <ol className="flex items-center gap-1.5" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <li key={s.id} className={tick(i)} />
                ))}
              </ol>
              <p
                className={`mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-opacity ${
                  stage === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                Scroll to follow the energy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Small screens / reduced motion: the finished scene, then every beat. */
const StaticFlow = () => (
  <div className="container mx-auto px-4 py-20 lg:px-8">
    <Heading align="center" />
    <div className="mx-auto mt-10 max-w-md" style={{ "--p": 1 }}>
      <Scene className="h-auto w-full" />
    </div>
    <ol className="mx-auto mt-12 max-w-xl space-y-10">
      {STAGES.map((s) => (
        <li key={s.id}>
          <StageCopy stage={s} />
        </li>
      ))}
    </ol>
  </div>
);

const ZevKeyAnimation = () => {
  const reduced = useReducedMotion();
  const pinned = !reduced;

  // top="none": the hero's dark zone (which draws the seam) sits directly
  // above. bottom="fade": the light content that follows blends in.
  return (
    <DarkSection id="how-zev-works" className="scroll-mt-16" top="none" bottom="fade">
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
      <div className="relative">{pinned ? <PinnedFlow /> : <StaticFlow />}</div>
    </DarkSection>
  );
};

export default ZevKeyAnimation;
