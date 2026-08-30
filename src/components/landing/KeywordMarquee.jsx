const keywords = [
  "ENERGY VALIDATION",
  "HARDWARE VERIFICATION",
  "REAL-WORLD DATA",
  "AI INFRASTRUCTURE",
  "IOT SYSTEMS",
  "BLOCKCHAIN COORDINATION",
  "ZEV ECOSYSTEM",
  "TAMPER-RESISTANT RECORDS",
  "VERIFIABLE DATA INTEGRITY",
  "INFRASTRUCTURE-FIRST",
  "DECENTRALIZED COORDINATION",
  "ENERGY INTELLIGENCE",
];

const KeywordMarquee = () => {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-primary/10 py-[18px] bg-gradient-to-r from-primary/[0.02] via-primary/[0.04] to-primary/[0.02]"
    >
      {/* Top & bottom hairline gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling track — list rendered twice for a seamless loop */}
      <div className="flex whitespace-nowrap animate-marquee">
        {[...keywords, ...keywords].map((word, i) => (
          <div key={`${word}-${i}`} className="flex items-center flex-shrink-0 px-12">
            <span className="font-kanit font-medium text-xs uppercase tracking-[0.3em] text-slate-900/45">
              {word}
            </span>
            <span className="ml-12 text-primary/40 text-[5px]">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordMarquee;
