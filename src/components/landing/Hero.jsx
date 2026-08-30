import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CYAN = [0, 153, 214];
const EMERALD = [16, 185, 129];

const stats = [
  { value: "500M", label: "TOTAL $ZLN SUPPLY" },
  { value: "3-Layer", label: "ARCHITECTURE" },
  { value: "Hardware", label: "VALIDATION" },
  { value: "Long-Term", label: "INFRASTRUCTURE" },
];

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ~250 points distributed on a sphere (fibonacci spiral)
    const POINT_COUNT = 250;
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points.push({
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
        emerald: Math.random() < 0.2,
        size: 1 + Math.random(),
      });
    }

    // Slowly drifting squares
    const SQUARE_COUNT = 15;
    const squares = [];
    for (let i = 0; i < SQUARE_COUNT; i++) {
      squares.push({
        fx: Math.random(),
        fy: Math.random(),
        vx: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.008,
        size: 3 + Math.random() * 5,
        alpha: 0.1 + Math.random() * 0.15,
        emerald: Math.random() < 0.4,
        spin: Math.random() * Math.PI,
      });
    }

    const ROTATION_SPEED = 0.15; // rad/s
    let lastTime = performance.now();
    let angle = 0;
    const projected = new Array(POINT_COUNT);

    const draw = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      angle += ROTATION_SPEED * dt;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.42; // slightly above middle
      const R = Math.min(width, height) * 0.32;

      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // Orthographic projection with Y-axis rotation
      for (let i = 0; i < POINT_COUNT; i++) {
        const p = points[i];
        const rx = p.x * cos + p.z * sin;
        const rz = -p.x * sin + p.z * cos;
        projected[i] = {
          sx: cx + rx * R,
          sy: cy + p.y * R,
          depth: rz, // -1 (back) .. 1 (front)
          emerald: p.emerald,
          size: p.size,
        };
      }

      // Faint lines between near neighbors (front-ish points only)
      const linkDist = R * 0.28;
      for (let i = 0; i < POINT_COUNT; i++) {
        const a = projected[i];
        if (a.depth < -0.2) continue;
        for (let j = i + 1; j < POINT_COUNT; j++) {
          const b = projected[j];
          if (b.depth < -0.2) continue;
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const fade = (1 - dist / linkDist) * 0.12;
            ctx.strokeStyle = `rgba(${CYAN[0]}, ${CYAN[1]}, ${CYAN[2]}, ${fade})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (let i = 0; i < POINT_COUNT; i++) {
        const p = projected[i];
        const alpha = 0.15 + ((p.depth + 1) / 2) * 0.55;
        const c = p.emerald ? EMERALD : CYAN;
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drifting squares
      for (let i = 0; i < SQUARE_COUNT; i++) {
        const s = squares[i];
        s.fx += s.vx * dt;
        s.fy += s.vy * dt;
        if (s.fx < -0.05) s.fx = 1.05;
        if (s.fx > 1.05) s.fx = -0.05;
        if (s.fy < -0.05) s.fy = 1.05;
        if (s.fy > 1.05) s.fy = -0.05;

        const c = s.emerald ? EMERALD : CYAN;
        ctx.save();
        ctx.translate(s.fx * width, s.fy * height);
        ctx.rotate(s.spin);
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${s.alpha})`;
        ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Perspective floor grid */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        aria-hidden="true"
        style={{
          transform: "perspective(600px) rotateX(60deg) scale(1.6)",
          transformOrigin: "top center",
          backgroundImage:
            "linear-gradient(rgba(0,153,214,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,214,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 90%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 90%)",
        }}
      />

      {/* Rotating dot-globe canvas */}
      <HeroCanvas />

      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(transparent 35%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.95) 100%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 label-rule-r" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
            INFRASTRUCTURE-FIRST ENERGY VALIDATION
          </span>
          <div className="h-px w-12 label-rule-l" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-black leading-[0.92] tracking-tight mb-8"
          style={{ fontSize: "clamp(2.8rem,6.5vw,5.5rem)" }}
        >
          <span className="block navy-gradient-text">Verifiable Energy</span>
          <span className="block navy-gradient-text">Infrastructure</span>
          <span
            className="block gradient-text"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,153,214,0.35))" }}
          >
            for the Next Digital Economy
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-kanit font-light text-lg sm:text-xl text-slate-900/60 max-w-2xl mx-auto mb-12"
        >
          ZelionTech transforms real-world energy systems into trusted,
          hardware-validated, auditable digital infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
        >
          <Link
            to="/technology"
            className="group cta-gradient text-white font-heading font-bold px-10 py-5 rounded-xl text-base flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(0,153,214,0.35)]"
          >
            Explore Technology
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/whitepaper"
            className="bg-primary/5 border border-primary/25 text-slate-900 font-heading font-semibold px-10 py-5 rounded-xl backdrop-blur-xl flex items-center justify-center"
          >
            View Whitepaper
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="font-mono font-bold text-2xl"
                style={{
                  background: "linear-gradient(135deg, #0099D6, #0B1B2E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-900/40">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
