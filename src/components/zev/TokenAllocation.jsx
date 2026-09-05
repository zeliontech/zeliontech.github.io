import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "./CountUp";
import { useReducedMotion } from "./hooks";

/**
 * ZLN allocation of the fixed 500,000,000 supply.
 *
 * Form: a ranked single-hue horizontal bar chart, plus a slim segmented
 * supply bar showing parts-of-a-whole. Deliberately not a pie chart, which
 * the brief rules out, and deliberately not an eight-colour categorical
 * palette: four allocations share the same 10% value, so colour would carry
 * no information those ties do not already break, and eight competing hues
 * would fight the restrained brand. Identity comes from the row labels,
 * never from colour alone, and every row is directly labelled with its
 * percentage and token count.
 *
 * Hovering or focusing a row highlights its segment in the supply bar. The
 * bars grow in and the percentages count up the first time the chart is
 * seen; both are static under reduced motion.
 */

export const ALLOCATIONS = [
  { label: "Compute Rewards & ZEV Network", pct: 20, zln: "100,000,000", note: "Network participation and validated-compute rewards" },
  { label: "Ecosystem & Infrastructure", pct: 15, zln: "75,000,000", note: "Ecosystem development, integrations and infrastructure" },
  { label: "Liquidity & Market Stability", pct: 15, zln: "75,000,000", note: "Exchange liquidity and orderly market conditions" },
  { label: "Core Contributors (Team)", pct: 10, zln: "50,000,000", note: "Long-term alignment, subject to vesting" },
  { label: "Private & Strategic Sale", pct: 10, zln: "50,000,000", note: "Strategic and institutional participants" },
  { label: "Public Sale", pct: 10, zln: "50,000,000", note: "Public distribution" },
  { label: "Strategic Partnerships", pct: 10, zln: "50,000,000", note: "Partner and integration agreements" },
  { label: "Community & Marketing", pct: 10, zln: "50,000,000", note: "Community programmes, growth and awareness" },
];

export const TOTAL_SUPPLY = 500_000_000;


// In-view stagger for a container: attached only when motion is allowed, so
// reduced-motion users (and test environments without IntersectionObserver)
// get the finished layout with no observer at all.
const staggerInView = (children, viewport) => ({
  initial: "hidden",
  whileInView: "show",
  viewport,
  variants: { show: { transition: { staggerChildren: children } } },
});

const grow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

const TokenAllocation = () => {
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();

  return (
    <figure className="m-0">
      {/* Supply bar: parts of the whole. Alternating tints with a 2px surface
          gap so adjacent segments stay readable; the detail lives below. */}
      <motion.div
        className="flex h-3 w-full gap-[2px] overflow-hidden rounded-full"
        role="presentation"
        {...(reduced ? {} : staggerInView(0.05, { once: true, amount: 0.5 }))}
      >
        {ALLOCATIONS.map((a, i) => (
          <motion.div
            key={a.label}
            variants={grow}
            className="h-full origin-left rounded-full transition-opacity duration-200"
            style={{
              width: `${a.pct}%`,
              backgroundColor: "hsl(var(--primary))",
              opacity: active === null ? (i % 2 === 0 ? 1 : 0.62) : active === i ? 1 : 0.22,
            }}
          />
        ))}
      </motion.div>

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[13px] text-muted-foreground">
          Fixed maximum supply — no further minting
        </span>
        <span className="font-body text-[13px] font-semibold text-foreground">
          {TOTAL_SUPPLY.toLocaleString("en-US")} ZLN
        </span>
      </figcaption>

      {/* Ranked rows */}
      <motion.ul
        className="mt-8 space-y-1"
        {...(reduced ? {} : staggerInView(0.06, { once: true, amount: 0.2 }))}
      >
        {ALLOCATIONS.map((a, i) => (
          <li key={a.label}>
            <div
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="grid cursor-default grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 rounded-xl px-3 py-3 outline-none transition-colors hover:bg-muted focus-visible:bg-muted sm:grid-cols-[minmax(0,1fr)_7rem_6rem]"
            >
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-foreground">{a.label}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{a.note}</p>
              </div>

              {/* Bar sits under the label on small screens, inline on larger */}
              <div className="col-span-2 order-last h-2 w-full overflow-hidden rounded-full bg-muted sm:order-none sm:col-span-1 sm:w-28">
                <motion.div
                  variants={grow}
                  className="h-full origin-left rounded-full transition-opacity duration-200"
                  style={{
                    width: `${(a.pct / 20) * 100}%`,
                    backgroundColor: "hsl(var(--primary))",
                    opacity: active === null || active === i ? 1 : 0.35,
                  }}
                />
              </div>

              <div className="text-right">
                <p className="font-body text-[15px] font-bold tabular-nums text-foreground">
                  <CountUp value={a.pct} suffix="%" />
                </p>
                <p className="text-[13px] tabular-nums text-muted-foreground">{a.zln}</p>
              </div>
            </div>
          </li>
        ))}
      </motion.ul>
    </figure>
  );
};

export default TokenAllocation;
