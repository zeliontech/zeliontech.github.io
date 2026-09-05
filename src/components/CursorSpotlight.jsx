import { useEffect } from "react";

// One document-level pointer listener feeds --gx/--gy (percent) to whichever
// card the pointer is over; index.css paints the glaze from those variables.
// Nothing is attached on touch devices or under reduced motion, and the
// work per move is one rAF-throttled getBoundingClientRect.
const SELECTOR = ".glass-card, .glass-card-hover";

const CursorSpotlight = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    let raf = 0;
    let pending = null;
    const paint = () => {
      raf = 0;
      if (!pending) return;
      const { card, x, y } = pending;
      pending = null;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      card.style.setProperty("--gx", (((x - rect.left) / rect.width) * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", (((y - rect.top) / rect.height) * 100).toFixed(1) + "%");
    };
    const onMove = (event) => {
      const target = event.target;
      const card = target instanceof Element ? target.closest(SELECTOR) : null;
      if (!card) return;
      pending = { card, x: event.clientX, y: event.clientY };
      if (!raf) raf = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
};

export default CursorSpotlight;
