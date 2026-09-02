import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import MaturityBadge from "./MaturityBadge";

// Interactive validation pipeline (ZEV brief §3B / §5):
//   REAL-WORLD ENERGY DATA → ZEV → PROCESSING → HASH / DIGITAL SIGNATURE →
//   TIMESTAMP → BLOCKCHAIN → VERIFIABLE RECORD
// One step is open at a time; click or arrow through them. Every capability
// in a step carries its maturity label (brief §24): the ZEV 1 proof of
// concept demonstrated meter reading, processing, SHA-256 hashing,
// timestamping and BNB Smart Chain anchoring; Secure Element signing and AI
// analysis are ZEV 2 and stay Planned.

export const PIPELINE_STEPS = [
  {
    id: "source",
    label: "Real-world energy data",
    where: "On site",
    body: "Solar panels, wind turbines, hydro or any other renewable source produce electricity; batteries store it; the grid moves it. All of that is physical activity in equipment on site — nothing digital yet.",
    labels: [{ label: "Meter readings from the connected equipment", level: "demonstrated" }],
  },
  {
    id: "zev",
    label: "ZEV",
    where: "On the device",
    body: "ZEV is installed next to the equipment and reads the measurement at the source — production, consumption, voltage, current and power — rather than receiving it second-hand from a cloud service.",
    labels: [
      { label: "Energy meter integration", level: "demonstrated" },
      { label: "Inverter, battery and grid integration", level: "planned" },
    ],
  },
  {
    id: "processing",
    label: "Processing",
    where: "On the device",
    body: "The reading is structured into a record and checked for integrity and consistency before anything is recorded. ZEV 2 is designed to add AI edge analysis here — pattern analysis and anomaly detection on the device itself.",
    labels: [
      { label: "Energy-data processing", level: "demonstrated" },
      { label: "AI edge analysis", level: "planned" },
    ],
  },
  {
    id: "hash",
    label: "Hash / digital signature",
    where: "On the device",
    body: "A SHA-256 hash of the record is computed: a fixed-length fingerprint that changes completely if a single value in the record changes. ZEV 2 is designed to also sign the record inside a hardware Secure Element, binding it to one specific device identity.",
    labels: [
      { label: "SHA-256 hashing", level: "demonstrated" },
      { label: "Secure Element signature", level: "planned" },
    ],
  },
  {
    id: "timestamp",
    label: "Timestamp",
    where: "On the device",
    body: "The record is timestamped so the proof says not only what was measured but when. The timestamp travels with the hash.",
    labels: [{ label: "Timestamping", level: "demonstrated" }],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    where: "BNB Smart Chain",
    body: "The hash and timestamp are written to BNB Smart Chain in a transaction. The raw energy data itself stays off-chain: the chain is used as an integrity and verification layer, not as a database.",
    onChain: "On-chain: hash, timestamp, transaction reference. Off-chain: the raw measurements, equipment telemetry, dashboards.",
    labels: [{ label: "On-chain energy-data proof", level: "demonstrated" }],
  },
  {
    id: "record",
    label: "Verifiable record",
    where: "Anyone",
    body: "Anyone holding the original record can recompute its hash and compare it with the value anchored on-chain. A match proves the data existed in exactly that form at that time — without having to trust ZelionTech.",
    labels: [{ label: "Hash comparison against the on-chain proof", level: "demonstrated" }],
  },
];

const CYAN = "hsl(var(--primary))";

const ValidationPipeline = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const count = PIPELINE_STEPS.length;

  const go = (index) => {
    const next = (index + count) % count;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event) => {
    const keys = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 };
    if (event.key in keys) {
      event.preventDefault();
      go(keys[event.key]);
    }
  };

  const step = PIPELINE_STEPS[active];

  return (
    <div>
      <div className="relative">
        {/* Track between the first and last node centres (desktop layout only) */}
        <div className="absolute left-[7%] right-[7%] top-5 hidden md:block" aria-hidden="true">
          <svg className="h-[2px] w-full overflow-visible">
            <line x1="0" y1="1" x2="100%" y2="1" stroke={CYAN} strokeOpacity="0.2" strokeWidth="2" />
            <line x1="0" y1="1" x2="100%" y2="1" stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" className="zev-energy-path" />
          </svg>
        </div>

        <ol
          role="tablist"
          aria-label="Validation pipeline"
          className="relative flex flex-wrap justify-center gap-2 md:flex-nowrap md:justify-between md:gap-0"
        >
          {PIPELINE_STEPS.map((s, i) => {
            const state = i === active ? "active" : i < active ? "done" : "todo";
            return (
              <li key={s.id} className="md:min-w-0 md:flex-1">
                <button
                  type="button"
                  role="tab"
                  id={`pipeline-tab-${s.id}`}
                  aria-selected={i === active}
                  aria-controls="pipeline-panel"
                  tabIndex={i === active ? 0 : -1}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-left transition-colors md:w-full md:flex-col md:items-center md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:px-1 md:py-0 ${
                    state === "active"
                      ? "border-primary/60 bg-primary/10"
                      : "border-border bg-card/60 hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors md:h-10 md:w-10 md:text-sm ${
                      state === "active"
                        ? "border-primary bg-primary text-primary-foreground"
                        : state === "done"
                          ? "border-primary/70 bg-background text-primary"
                          : "border-border bg-background text-muted-foreground group-hover:border-primary/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-xs font-medium md:text-center md:text-[11px] md:leading-tight ${
                      state === "active" ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        role="tabpanel"
        id="pipeline-panel"
        aria-labelledby={`pipeline-tab-${step.id}`}
        className="glass-card mt-8 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>
            Step {active + 1} of {count}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground/80">{step.where}</span>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">{step.label}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{step.body}</p>
        {step.onChain && (
          <p className="mt-3 max-w-3xl rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            {step.onChain}
          </p>
        )}
        <ul className="mt-5 space-y-2">
          {step.labels.map((item) => (
            <li key={item.label} className="flex items-start gap-2.5 text-sm">
              <MaturityBadge level={item.level} className="mt-px shrink-0" />
              <span className="text-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go(active + 1)}
          className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
        >
          {active === count - 1 ? "Start again" : "Next step"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ValidationPipeline;
