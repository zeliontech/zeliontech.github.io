/**
 * The backdrop behind the hero device: flowing energy ribbons and a stylised
 * renewable horizon (solar array and wind turbines).
 *
 * PHOTOGRAPHY SWAP POINT. The approved reference uses a photographic
 * composite here. This vector scene is built to the same composition and
 * palette so the page is complete and on-brand today; when licensed imagery
 * of the ZEV device on a real site exists, replace <HeroScene /> with that
 * image and keep the ribbons.
 */

const RIBBONS = [
  { d: "M-40 300 C 140 180, 300 400, 520 250 S 860 120, 1060 240", w: 2.2, o: 0.9, delay: 0 },
  { d: "M-40 348 C 150 240, 320 440, 540 300 S 880 180, 1060 292", w: 1.6, o: 0.7, delay: 0.6 },
  { d: "M-40 258 C 130 150, 290 350, 505 205 S 850 70, 1060 190", w: 1.3, o: 0.5, delay: 1.2 },
  { d: "M-40 396 C 160 300, 340 486, 560 352 S 900 240, 1060 340", w: 1.1, o: 0.42, delay: 1.8 },
];

const Turbine = ({ x, y, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <path d="M0 0 L-2.6 62 L2.6 62 Z" fill="#C7D3DE" />
    {[0, 120, 240].map((a) => (
      <path
        key={a}
        d="M0 -1.6 C 12 -7, 30 -12, 44 -8 C 32 -1, 13 2.4, 0 1.6 Z"
        fill="#D9E2EA"
        transform={`rotate(${a})`}
      />
    ))}
    <circle r="2.6" fill="#AEBBC8" />
  </g>
);

const SolarRow = ({ x, y, count = 5, s = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    {Array.from({ length: count }, (_, i) => (
      <g key={i} transform={`translate(${i * 56} 0)`}>
        <g transform="skewX(-16)">
          <rect x="0" y="0" width="46" height="26" rx="1.5" fill="url(#panelFill)" />
          <line x1="15.3" y1="0" x2="15.3" y2="26" stroke="#7FA8CC" strokeWidth="0.7" opacity="0.5" />
          <line x1="30.6" y1="0" x2="30.6" y2="26" stroke="#7FA8CC" strokeWidth="0.7" opacity="0.5" />
          <line x1="0" y1="13" x2="46" y2="13" stroke="#7FA8CC" strokeWidth="0.7" opacity="0.5" />
        </g>
        <path d="M18 26 L20 38 M28 26 L26 38" stroke="#C7D3DE" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    ))}
  </g>
);

const HeroScene = ({ className = "" }) => (
  <svg
    viewBox="0 0 1020 620"
    className={className}
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="ribbonA" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
        <stop offset="28%" stopColor="#22C55E" stopOpacity="0.85" />
        <stop offset="62%" stopColor="#2E90FA" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#2E90FA" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2C4A6B" />
        <stop offset="100%" stopColor="#173049" />
      </linearGradient>
      <linearGradient id="skyWash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EAF4FF" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DDE7F1" />
        <stop offset="100%" stopColor="#EFF4F9" />
      </linearGradient>
      <linearGradient id="edgeFadeY" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="edgeFadeX" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="88%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
      </linearGradient>
    </defs>

    {/* Sky wash */}
    <rect width="1020" height="620" fill="url(#skyWash)" />

    {/* Distant hills */}
    <path d="M-20 470 C 120 402, 250 452, 380 424 C 520 394, 640 448, 780 418 C 900 392, 990 430, 1040 414 L1040 620 L-20 620 Z" fill="url(#hillFar)" />

    {/* Energy ribbons */}
    <g fill="none" stroke="url(#ribbonA)" strokeLinecap="round">
      {RIBBONS.map((r) => (
        <path
          key={r.d}
          d={r.d}
          strokeWidth={r.w}
          strokeOpacity={r.o}
          className="hero-ribbon"
          style={{ animationDelay: `${r.delay}s` }}
        />
      ))}
    </g>

    {/* Renewable horizon */}
    <Turbine x={126} y={370} s={1.05} opacity={0.9} />
    <Turbine x={212} y={396} s={0.8} opacity={0.7} />
    <Turbine x={905} y={366} s={1.15} opacity={0.92} />
    <Turbine x={840} y={398} s={0.75} opacity={0.62} />
    <SolarRow x={44} y={492} count={4} s={0.92} opacity={0.85} />
    <SolarRow x={704} y={500} count={5} s={0.98} opacity={0.9} />

    {/* Vignette: the scene dissolves into the white page on every edge rather
        than ending on a hard rectangle. */}
    <rect width="1020" height="620" fill="url(#edgeFadeY)" />
    <rect width="1020" height="620" fill="url(#edgeFadeX)" />
  </svg>
);

export default HeroScene;
