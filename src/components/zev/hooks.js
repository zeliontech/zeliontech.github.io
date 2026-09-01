// Shared v2 utilities (spec: SHARED UTILITIES).
// NOTE: this file is .js and the build uses @vitejs/plugin-react-swc, which only
// transforms JSX in .jsx files — so components here use createElement (plain JS).
// Palette: only existing tokens (hsl(var(--primary))). Micro-interactions: easeOut,
// <=6px translations, 150ms transitions. Everything is inert under reduced motion.

import { Component, createElement, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** Subscribe to a media query. SSR-safe (returns false without window). */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    // Older Safari fallback
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. Live matchMedia listener. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True at >=768px viewports. SSR-safe default false. */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 768px)");
}

/** True only for mouse-like pointers (used to keep hover effects off touch). */
function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * Reveal — tiny whileInView fade+rise wrapper (y:16, 0.5s, easeOut, once).
 * Under reduced motion it renders children plainly (static end-state).
 * Props: className, delay (s), plus any div props.
 */
export function Reveal({ children, className, delay = 0, lcpSafe = false, ...rest }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement("div", { className, ...rest }, children);
  }

  // lcpSafe: transform-only entrance (opacity stays 1) so above-the-fold
  // text/images count toward LCP at first paint instead of after the fade.
  return createElement(
    motion.div,
    {
      className,
      initial: lcpSafe ? { y: 16 } : { opacity: 0, y: 16 },
      whileInView: lcpSafe ? { y: 0 } : { opacity: 1, y: 0 },
      viewport: { once: true, margin: "0px 0px -60px 0px" },
      transition: { duration: 0.5, ease: "easeOut", delay },
      ...rest,
    },
    children
  );
}

const GLOW_REST = "-25%"; // parks the glow off the card until the cursor enters

/**
 * useCardGlow — cursor-reactive glow for cards.
 * Returns { ref, onMouseMove, style }. Attach ref + onMouseMove to the card,
 * spread style onto an absolutely-positioned overlay (pointer-events-none).
 * Sets CSS vars --gx/--gy (percent) on the element; inert on touch/reduced motion.
 */
export function useCardGlow() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reduced;

  const onMouseMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!active || !el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const gx = ((event.clientX - rect.left) / rect.width) * 100;
      const gy = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--gx", gx.toFixed(2) + "%");
      el.style.setProperty("--gy", gy.toFixed(2) + "%");
    },
    [active]
  );

  // Ease the glow back off the card when the cursor leaves.
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return undefined;
    const reset = () => {
      el.style.setProperty("--gx", GLOW_REST);
      el.style.setProperty("--gy", GLOW_REST);
    };
    el.addEventListener("mouseleave", reset);
    return () => el.removeEventListener("mouseleave", reset);
  }, [active]);

  const style = active
    ? {
        background:
          "radial-gradient(240px circle at var(--gx, " +
          GLOW_REST +
          ") var(--gy, " +
          GLOW_REST +
          "), hsl(var(--primary) / 0.10), transparent 65%)",
      }
    : {};

  return { ref, onMouseMove, style };
}

/**
 * Magnetic — wraps a button/link; content translates toward the cursor
 * (max 6px) and eases back on leave (transform 150ms ease-out).
 * Inert on touch/reduced motion. Props: className, strength (px), div props.
 */
export function Magnetic({ children, className, strength = 6, style, ...rest }) {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reduced;
  const innerRef = useRef(null);

  const onMouseMove = useCallback(
    (event) => {
      const inner = innerRef.current;
      if (!inner) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = Math.max(
        -1,
        Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2))
      );
      const ny = Math.max(
        -1,
        Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2))
      );
      inner.style.transform =
        "translate(" + (nx * strength).toFixed(2) + "px, " + (ny * strength).toFixed(2) + "px)";
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = "translate(0px, 0px)";
  }, []);

  return createElement(
    "div",
    {
      className,
      style: { display: "inline-block", ...style },
      onMouseMove: active ? onMouseMove : undefined,
      onMouseLeave: active ? onMouseLeave : undefined,
      ...rest,
    },
    createElement(
      "div",
      {
        ref: innerRef,
        style: {
          display: "inline-block",
          transition: "transform 150ms ease-out",
          willChange: "transform",
        },
      },
      children
    )
  );
}

/**
 * Error boundary for lazy 3D chunks: if the dynamic import or WebGL init
 * fails, render the static fallback instead of unmounting the page.
 */
export class LazyBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const hooks = { useReducedMotion, useIsDesktop, Reveal, useCardGlow, Magnetic, LazyBoundary };
export default hooks;
