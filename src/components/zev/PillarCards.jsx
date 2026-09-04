import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import Reveal from "./Reveal";

// The three pillar cards from the approved design reference: the device, the
// token, and the environmental layer. One dark card, one light, one green.
//
// Claims discipline (brief §9/§24): the reference copy said ZEV "enables the
// generation of high-integrity carbon credits". ZEV does not issue credits —
// issuance needs an accepted methodology, registration and independent
// verification — so the card says the data supports carbon accounting and MRV.

const CoinArt = () => (
  <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2E90FA" />
        <stop offset="55%" stopColor="#1B6FD0" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="coinEdge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0F2A4A" />
        <stop offset="100%" stopColor="#081726" />
      </linearGradient>
    </defs>
    {/* Stack behind */}
    {[26, 18, 10].map((dy, i) => (
      <ellipse key={dy} cx="88" cy={112 - i * 0} rx="46" ry="14" fill="url(#coinEdge)" transform={`translate(0 ${-dy + 26})`} opacity={0.55 + i * 0.15} />
    ))}
    <ellipse cx="88" cy="112" rx="46" ry="14" fill="url(#coinEdge)" />
    <ellipse cx="88" cy="104" rx="46" ry="14" fill="url(#coinFace)" />
    {/* Face-on coin */}
    <circle cx="160" cy="82" r="42" fill="url(#coinEdge)" />
    <circle cx="160" cy="78" r="42" fill="url(#coinFace)" />
    <circle cx="160" cy="78" r="35" fill="none" stroke="#7CC0FF" strokeOpacity="0.5" strokeWidth="1.2" />
    <path d="M148 64 h26 l-16 15 h16 l-26 15 16 -15 h-16 z" fill="#FFFFFF" opacity="0.94" />
  </svg>
);

const DeviceArt = () => (
  <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="pcBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#F2F5F8" />
        <stop offset="55%" stopColor="#CFD8E1" />
        <stop offset="100%" stopColor="#9BA7B4" />
      </linearGradient>
      <linearGradient id="pcGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7CC0FF" />
        <stop offset="100%" stopColor="#2E90FA" />
      </linearGradient>
    </defs>
    <rect x="72" y="18" width="96" height="140" rx="12" fill="url(#pcBody)" />
    <rect x="84" y="30" width="60" height="116" rx="8" fill="#0E1319" />
    <rect x="95" y="44" width="7" height="52" rx="3.5" fill="url(#pcGlow)" />
    <rect x="103" y="120" width="22" height="6" rx="3" fill="#FFFFFF" opacity="0.85" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={150} y={44 + i * 20} width="12" height="12" rx="2" fill="#8794A3" opacity="0.55" />
    ))}
  </svg>
);

const ForestArt = () => (
  <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DFF5E6" />
        <stop offset="100%" stopColor="#EEFBF2" />
      </linearGradient>
      <linearGradient id="fHill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5FB87F" />
        <stop offset="100%" stopColor="#2F8F55" />
      </linearGradient>
      <linearGradient id="fHill2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8FD0A5" />
        <stop offset="100%" stopColor="#5AAE79" />
      </linearGradient>
    </defs>
    <rect width="240" height="170" fill="url(#fSky)" />
    <circle cx="196" cy="40" r="20" fill="#FFFFFF" opacity="0.75" />
    <path d="M-10 108 C 40 74, 84 112, 130 92 C 176 72, 210 100, 250 84 L250 170 L-10 170 Z" fill="url(#fHill2)" opacity="0.85" />
    <path d="M-10 132 C 46 108, 96 138, 148 120 C 194 104, 224 126, 250 116 L250 170 L-10 170 Z" fill="url(#fHill)" />
    {[24, 52, 80, 168, 200].map((x, i) => (
      <g key={x} transform={`translate(${x} ${132 + (i % 2) * 8}) scale(${0.9 + (i % 3) * 0.15})`}>
        <path d="M0 0 L-9 0 L0 -26 L9 0 Z" fill="#1F7A45" opacity="0.9" />
        <rect x="-1.4" y="0" width="2.8" height="9" fill="#14532D" opacity="0.8" />
      </g>
    ))}
  </svg>
);

const CARDS = [
  {
    id: "zev",
    eyebrow: "ZEV device",
    title: (
      <>
        More than a monitor.
        <br />A new <span className="text-primary">standard.</span>
      </>
    ),
    body: "ZEV is a next-generation device built to bring intelligence, transparency and verifiable value to renewable energy infrastructure.",
    to: "/zev",
    dark: true,
    Art: DeviceArt,
  },
  {
    id: "zln",
    eyebrow: "ZLN token",
    title: (
      <>
        Real value.
        <br />Real <span className="metal-gradient">impact.</span>
      </>
    ),
    body: "ZLN is the digital utility layer of the ecosystem, designed to connect verified energy data, ecosystem services and participation.",
    to: "/tokenomics",
    Art: CoinArt,
  },
  {
    id: "carbon",
    eyebrow: "Carbon credits",
    title: (
      <>
        Verified today.
        <br />A cleaner <span className="text-eco">tomorrow.</span>
      </>
    ),
    body: "Trusted, traceable energy data that supports carbon accounting, ESG reporting and digital MRV processes.",
    to: "/carbon",
    Art: ForestArt,
    badge: "A greener planet awaits",
  },
];

const PillarCards = () => {
  return (
    <section className="section bg-background pt-0">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const { Art } = card;
            return (
              <Reveal key={card.id} delay={i * 0.07} className="h-full">
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                    card.dark
                      ? "ink-surface border-transparent"
                      : "border-border bg-card hover:border-foreground/15"
                  }`}
                  style={
                    card.dark
                      ? undefined
                      : { boxShadow: "0 1px 2px hsl(220 15% 8% / 0.04), 0 8px 24px -14px hsl(220 15% 8% / 0.12)" }
                  }
                >
                  <div className="flex flex-1 flex-col p-7 lg:p-8">
                    <p className={`eyebrow ${card.dark ? "text-white/55" : ""}`}>{card.eyebrow}</p>
                    <h3 className={`subhead mt-4 ${card.dark ? "text-white" : ""}`}>{card.title}</h3>
                    <p
                      className={`mt-4 text-[14.5px] leading-relaxed ${
                        card.dark ? "text-white/70" : "text-muted-foreground"
                      }`}
                    >
                      {card.body}
                    </p>
                    <Link
                      to={card.to}
                      className={`mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold transition-colors ${
                        card.dark ? "text-white hover:text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="relative mt-auto h-44 overflow-hidden">
                    <Art />
                    {card.badge && (
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-eco backdrop-blur-sm">
                        <Leaf className="h-3 w-3" aria-hidden="true" />
                        {card.badge}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PillarCards;
