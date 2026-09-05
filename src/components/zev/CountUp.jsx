import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

// Counts from zero to `value` the first time it scrolls into view. Renders the
// final value outright under reduced motion or where IntersectionObserver is
// missing (tests, old engines), so the number is never wrong, only animated.
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const CountUp = ({ value, suffix = "", decimals = 0, duration = 900, className }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const canAnimate = !reduced && typeof IntersectionObserver !== "undefined";
  const [display, setDisplay] = useState(value);

  // Before first paint, park the number at zero when it will animate.
  useLayoutEffect(() => {
    if (canAnimate) setDisplay(0);
  }, [canAnimate]);

  useEffect(() => {
    if (!canAnimate) {
      setDisplay(value);
      return undefined;
    }
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          setDisplay(value * easeOut(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [canAnimate, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
