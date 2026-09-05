/**
 * The backdrop behind the hero device: a soft golden-hour sky, layered
 * hills in atmospheric haze, wind turbines and solar arrays at the horizon,
 * and glowing energy ribbons sweeping through the scene.
 *
 * PHOTOGRAPHY SWAP POINT. The approved reference uses a photographic
 * composite here. This scene is built to the same composition, palette and
 * fade-to-white, so the page is complete today. When licensed imagery of a
 * real site exists, drop it in as <img> behind the ribbons (see ZevHero) and
 * remove the horizon layers; the ribbons and the edge fades still apply.
 */

const RIBBONS = [
  { d: "M-60 330 C 160 200, 300 420, 520 300 S 820 140, 1080 250", core: 0.95, delay: 0 },
  { d: "M-60 384 C 170 262, 320 474, 540 352 S 850 200, 1080 302", core: 0.8, delay: 2.2 },
  { d: "M-60 290 C 150 170, 290 380, 505 260 S 840 92, 1080 200", core: 0.7, delay: 4.6 },
  { d: "M-60 428 C 180 322, 340 512, 560 402 S 900 272, 1080 352", core: 0.55, delay: 7.1 },
  { d: "M-60 250 C 140 140, 280 330, 500 220 S 830 52, 1080 150", core: 0.42, delay: 9.5 },
];

const Turbine = ({ x, y, s = 1, opacity = 1, spin = 16 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <ellipse cx="2" cy="3" rx="14" ry="3" fill="#0F172A" opacity="0.08" />
    {/* Tapered tower */}
    <path d="M-3.6 0 L3.6 0 L1.5 -92 L-1.5 -92 Z" fill="url(#towerFill)" />
    {/* Nacelle */}
    <rect x="-4.5" y="-98" width="13" height="6.5" rx="2.2" fill="url(#nacelleFill)" />
    {/* Rotor: translated parent, CSS-rotated child, so the attribute and the
        animation do not fight over the same transform. */}
    <g transform="translate(0 -94.8)">
      <g className="turbine-rotor" style={{ animationDuration: `${spin}s` }}>
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            d="M0 -1.3 C 9 -6.5, 32 -12.5, 52 -8 C 42 -2.2, 15 2.4, 0 1.5 Z"
            fill="url(#bladeFill)"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="3.1" fill="#E5EBF1" stroke="#B8C4CF" strokeWidth="0.6" />
      </g>
    </g>
  </g>
);

const SolarRow = ({ x, y, count = 5, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    {Array.from({ length: count }, (_, i) => {
      const k = 1 - i * 0.035; // slight perspective shrink along the row
      return (
        <g key={i} transform={`translate(${i * 58} ${i * 1.2}) scale(${k})`}>
          <ellipse cx="26" cy="41" rx="26" ry="3" fill="#0F172A" opacity="0.06" />
          <g transform="skewX(-18)">
            <rect x="0" y="0" width="52" height="30" rx="2" fill="url(#panelFill)" stroke="#C9D3DC" strokeWidth="0.9" />
            <rect x="0" y="0" width="52" height="30" rx="2" fill="url(#panelSheen)" />
            <g stroke="#7FB0DA" strokeWidth="0.55" opacity="0.5">
              <line x1="17.3" y1="0" x2="17.3" y2="30" />
              <line x1="34.6" y1="0" x2="34.6" y2="30" />
              <line x1="0" y1="10" x2="52" y2="10" />
              <line x1="0" y1="20" x2="52" y2="20" />
            </g>
          </g>
          <path d="M14 30 L16 41 M30 30 L28 41" stroke="#B4C0CB" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    })}
  </g>
);

const HeroScene = ({ className = "" }) => (
  <svg viewBox="0 0 1020 620" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <defs>
      {/* Sky and sun */}
      <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8F2FC" />
        <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFF1CC" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#FFF6E0" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="sunCore" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
      </radialGradient>

      {/* Horizon layers, blued by distance */}
      <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E3EBF3" />
        <stop offset="100%" stopColor="#F2F6FA" />
      </linearGradient>
      <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D6E1EB" />
        <stop offset="100%" stopColor="#EAF0F5" />
      </linearGradient>
      <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CBD8E4" />
        <stop offset="100%" stopColor="#E6EDF3" />
      </linearGradient>
      <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
      </linearGradient>

      {/* Hardware */}
      <linearGradient id="towerFill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#F4F7FA" />
        <stop offset="55%" stopColor="#DCE4EB" />
        <stop offset="100%" stopColor="#AEBBC7" />
      </linearGradient>
      <linearGradient id="nacelleFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F1F5F8" />
        <stop offset="100%" stopColor="#C2CDD7" />
      </linearGradient>
      <linearGradient id="bladeFill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#F6F8FA" />
        <stop offset="100%" stopColor="#CFD9E2" />
      </linearGradient>
      <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1B3B63" />
        <stop offset="100%" stopColor="#2C5E92" />
      </linearGradient>
      <linearGradient id="panelSheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>

      {/* Energy ribbons: green at the source, azure at the record */}
      <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
        <stop offset="14%" stopColor="#22C55E" stopOpacity="1" />
        <stop offset="46%" stopColor="#06B6D4" stopOpacity="1" />
        <stop offset="76%" stopColor="#2E90FA" stopOpacity="1" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="pulse" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id="glowWide" x="-10%" y="-40%" width="120%" height="180%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="glowSoft" x="-10%" y="-40%" width="120%" height="180%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>

      {/* The scene dissolves into the page on every edge */}
      <linearGradient id="edgeFadeY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="edgeFadeX" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="86%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
      </linearGradient>
    </defs>

    {/* Sky, sun */}
    <rect width="1020" height="620" fill="url(#skyWash)" />
    <circle cx="790" cy="150" r="300" fill="url(#sunGlow)" />
    <circle cx="790" cy="150" r="70" fill="url(#sunCore)" />

    {/* Hills, far to near, each softened by haze */}
    <path d="M-20 440 C 110 380, 230 430, 360 396 C 500 360, 620 416, 760 384 C 880 358, 970 404, 1040 380 L1040 620 L-20 620 Z" fill="url(#hillFar)" />
    <rect x="-20" y="380" width="1060" height="90" fill="url(#haze)" />
    <path d="M-20 474 C 120 428, 260 478, 400 446 C 540 414, 660 470, 800 440 C 920 414, 990 456, 1040 438 L1040 620 L-20 620 Z" fill="url(#hillMid)" />
    <rect x="-20" y="430" width="1060" height="70" fill="url(#haze)" opacity="0.8" />
    <path d="M-20 512 C 140 480, 300 520, 460 494 C 620 468, 760 516, 900 490 C 970 478, 1010 492, 1040 486 L1040 620 L-20 620 Z" fill="url(#hillNear)" />

    {/* Energy ribbons: wide glow, soft body, core, and a travelling pulse */}
    <g fill="none" strokeLinecap="round">
      {RIBBONS.map((r) => (
        <path key={`g-${r.d}`} d={r.d} stroke="url(#ribbon)" strokeWidth="26" strokeOpacity={0.16 * r.core} filter="url(#glowWide)" />
      ))}
      {RIBBONS.map((r) => (
        <path key={`s-${r.d}`} d={r.d} stroke="url(#ribbon)" strokeWidth="8" strokeOpacity={0.42 * r.core} filter="url(#glowSoft)" />
      ))}
      {RIBBONS.map((r) => (
        <path key={`c-${r.d}`} d={r.d} stroke="url(#ribbon)" strokeWidth="2.3" strokeOpacity={0.95 * r.core} />
      ))}
      {RIBBONS.map((r) => (
        <path
          key={`p-${r.d}`}
          d={r.d}
          stroke="url(#pulse)"
          strokeWidth="2.6"
          strokeOpacity={0.9 * r.core}
          className="hero-ribbon"
          style={{ animationDelay: `${r.delay}s` }}
        />
      ))}
    </g>

    {/* Renewable horizon */}
    <Turbine x={118} y={452} s={1.15} opacity={0.92} spin={17} />
    <Turbine x={206} y={470} s={0.82} opacity={0.72} spin={21} />
    <Turbine x={40} y={468} s={0.72} opacity={0.55} spin={24} />
    <Turbine x={912} y={446} s={1.25} opacity={0.94} spin={15} />
    <Turbine x={842} y={472} s={0.78} opacity={0.62} spin={23} />
    <SolarRow x={34} y={506} count={4} s={0.95} opacity={0.9} />
    <SolarRow x={700} y={512} count={5} s={1.0} opacity={0.92} />

    {/* Vignette */}
    <rect width="1020" height="620" fill="url(#edgeFadeY)" />
    <rect width="1020" height="620" fill="url(#edgeFadeX)" />
  </svg>
);

export default HeroScene;
