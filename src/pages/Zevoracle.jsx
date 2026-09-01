import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BNB_LOGO = "data:image/jpeg;base64,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";

const BnbLogo = ({ size = 24, className = "" }) => (
  <img
    src={BNB_LOGO}
    width={size}
    height={size}
    alt="BNB Chain"
    className={className}
    style={{ display: "block", objectFit: "contain", mixBlendMode: "screen" }}
  />
);

const useReveal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px", amount: 0.08 });
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}>
      {children}
    </motion.div>
  );
};

// ─── Inline styles for this page (IBM Plex fonts + dashboard design tokens) ──
const pageStyles = `
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400&display=swap");
  .zp{--zb:#0d1219;--zb1:#111820;--zb2:#161f2e;--zb3:#1a2332;--zb4:#1e2a3c;
    --zw:rgba(255,255,255,.05);--zw2:rgba(255,255,255,.09);--zw3:rgba(255,255,255,.16);
    --zc:#dde8f0;--zc2:#6e8098;--zc3:#344559;
    --za:#f5a623;--zt:#00d4aa;--zg:#22c55e;
    --zm:"IBM Plex Mono","Courier New",monospace;
    --zs:"IBM Plex Serif",Georgia,serif;
    font-family:var(--zm);
  }
  .zp{background:var(--zb);color:var(--zc);}
  .zp p{color:var(--zc2);line-height:1.78;}
  .zo-grid{position:absolute;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);
    background-size:64px 64px;
    mask-image:radial-gradient(ellipse 110% 80% at 50% 45%,black 25%,transparent 92%);
    animation:zo-gs 20s linear infinite;}
  @keyframes zo-gs{0%{background-position:0 0,0 0}100%{background-position:64px 64px,64px 64px}}
  .zo-ga{position:absolute;width:760px;height:480px;border-radius:50%;background:radial-gradient(ellipse,rgba(245,166,35,.042) 0%,transparent 62%);top:8%;left:50%;transform:translateX(-50%);}
  .zo-gb{position:absolute;width:380px;height:380px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,212,170,.026) 0%,transparent 60%);bottom:8%;right:4%;}
  .zo-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.09) 20%,rgba(245,166,35,.055) 50%,rgba(255,255,255,.09) 80%,transparent);}
  .zo-dlabel{font-family:var(--zm);font-size:.62rem;font-weight:500;letter-spacing:.22em;color:var(--zc3);text-transform:uppercase;display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;}
  .zo-dlabel::before{content:"";display:inline-block;width:14px;height:1px;background:var(--zc3);}
  .zo-sh{font-family:var(--zs);font-size:clamp(2rem,3.5vw,3rem);color:var(--zc);letter-spacing:-.025em;line-height:1.1;margin-bottom:1rem;}
  .zo-sh em{font-style:italic;color:rgba(221,232,240,.45);}
  .zo-pill{display:inline-flex;align-items:center;gap:.42rem;padding:.28rem .75rem;border-radius:4px;font-family:var(--zm);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;}
  .zo-pt{background:rgba(0,212,170,.08);border:1px solid rgba(0,212,170,.2);color:var(--zt);}
  .zo-pa{background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.25);color:var(--za);}
  .zo-pg{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:var(--zg);}
  .zo-pdot{width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0;}
  .zo-dbar{height:2px;background:rgba(255,255,255,.07);border-radius:1px;overflow:hidden;margin:.7rem 0;}
  .zo-dbar-f{height:100%;border-radius:1px;}
  .zo-live{display:inline-flex;align-items:center;gap:.45rem;font-family:var(--zm);font-size:.6rem;font-weight:700;letter-spacing:.12em;color:var(--zt);text-transform:uppercase;}
  .zo-live-d{width:6px;height:6px;border-radius:50%;background:var(--zt);animation:zo-ld 1.4s ease-in-out infinite;}
  @keyframes zo-ld{0%,100%{opacity:1;box-shadow:0 0 4px #00d4aa}50%{opacity:.25;box-shadow:none}}
  .zo-panel{background:var(--zb3);border:1px solid var(--zw2);border-radius:12px;}
  .zo-lay{display:grid;grid-template-columns:auto 1fr;gap:1rem;align-items:start;padding:1rem 1.2rem;border-radius:8px;border:1px solid var(--zw);background:var(--zb3);transition:border-color .25s,background .25s;}
  .zo-lay:hover{border-color:var(--zw2);background:var(--zb4);}
  .zo-lay.hl{border-color:rgba(245,166,35,.18);background:rgba(245,166,35,.025);border-left:2px solid var(--za);}
  .zo-lnum{font-family:var(--zm);font-size:.6rem;font-weight:700;color:var(--za);padding:.25rem .5rem;border-radius:3px;background:rgba(245,166,35,.07);border:1px solid rgba(245,166,35,.14);letter-spacing:.06em;white-space:nowrap;}
  .zo-lb h4{font-family:var(--zm);font-size:.72rem;font-weight:600;color:var(--zc);margin-bottom:.28rem;letter-spacing:.04em;}
  .zo-lb p{font-size:.84rem;margin:0;line-height:1.65;color:var(--zc2);}
  .zo-psteps{display:flex;gap:0;position:relative;}
  .zo-pstep{flex:1;position:relative;cursor:pointer;}
  .zo-pconn{position:absolute;top:35px;left:calc(50% + 35px);right:calc(-50% + 35px);height:1px;background:var(--zw2);z-index:0;transition:background .4s;}
  .zo-pstep:last-child .zo-pconn{display:none;}
  .zo-pstep.act .zo-pconn,.zo-pstep:hover .zo-pconn{background:linear-gradient(90deg,rgba(245,166,35,.42),rgba(245,166,35,.08));}
  .zo-pnw{display:flex;justify-content:center;position:relative;z-index:1;margin-bottom:1.2rem;}
  .zo-pnum{width:70px;height:70px;border-radius:50%;border:1px solid var(--zw2);background:var(--zb3);display:flex;align-items:center;justify-content:center;transition:all .35s;}
  .zo-pnum svg{color:var(--zc3);transition:color .3s;}
  .zo-pstep.act .zo-pnum,.zo-pstep:hover .zo-pnum{border-color:rgba(245,166,35,.4);background:rgba(245,166,35,.06);box-shadow:0 0 0 6px rgba(245,166,35,.04);}
  .zo-pstep.act .zo-pnum svg,.zo-pstep:hover .zo-pnum svg{color:var(--za);}
  .zo-plab{text-align:center;padding:0 .5rem;}
  .zo-plab h4{font-family:var(--zm);font-size:.65rem;font-weight:700;color:var(--zc2);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.25rem;transition:color .3s;}
  .zo-pstep.act .zo-plab h4,.zo-pstep:hover .zo-plab h4{color:var(--zc);}
  .zo-plab p{font-size:.72rem;color:var(--zc3);line-height:1.55;}
  .zo-pdtl{margin-top:2.75rem;padding:2.25rem;border-radius:12px;border:1px solid var(--zw2);background:var(--zb3);min-height:148px;border-left:2px solid var(--za);position:relative;}
  .zo-pdtl::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(245,166,35,.25),transparent 50%);}
  .zo-pdtl h3{font-family:var(--zm);font-size:.92rem;font-weight:700;color:var(--zc);margin-bottom:.625rem;letter-spacing:.04em;text-transform:uppercase;}
  .zo-pdtl p{font-size:.9rem;line-height:1.8;max-width:580px;color:var(--zc2);}
  .zo-pcard{border-radius:18px;overflow:hidden;transition:transform .3s,box-shadow .3s;}
  .zo-pcard:hover{transform:translateY(-3px);box-shadow:0 24px 56px rgba(0,0,0,.55);}
  .zo-pcard-lite{background:var(--zb3);border:1px solid var(--zw2);}
  .zo-pcard-pro{background:linear-gradient(170deg,#14200d 0%,#0f1809 40%,#0d1219 100%);border:1px solid rgba(245,166,35,.16);}
  .zo-pcard-head{padding:1.875rem;border-bottom:1px solid var(--zw);}
  .zo-pbadge{display:inline-flex;align-items:center;gap:.4rem;padding:.28rem .7rem;border-radius:4px;font-family:var(--zm);font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.875rem;}
  .zo-bl{border:1px solid var(--zw2);color:var(--zc3);}
  .zo-bp{border:1px solid rgba(245,166,35,.25);color:var(--za);background:rgba(245,166,35,.05);}
  .zo-pname{font-family:var(--zs);font-size:1.85rem;color:var(--zc);letter-spacing:-.02em;margin-bottom:.375rem;line-height:1.15;}
  .zo-psub{font-size:.875rem;color:var(--zc2);line-height:1.65;}
  .zo-pbody{padding:1.5rem 1.875rem;}
  .zo-feat{display:flex;align-items:flex-start;gap:.75rem;padding:.6rem 0;border-bottom:1px solid var(--zw);}
  .zo-feat:last-child{border-bottom:none;}
  .zo-ft{font-size:.875rem;color:var(--zc2);line-height:1.55;}
  .zo-ft strong{color:var(--zc);font-weight:700;}
  .zo-bnbpanel{border-radius:18px;padding:2.25rem;background:var(--zb3);border:1px solid var(--zw2);border-top:2px solid rgba(243,186,47,.2);}
  .zo-contract{font-family:var(--zm);font-size:.74rem;background:var(--zb);border:1px solid var(--zw2);border-radius:8px;padding:.875rem 1rem;color:var(--zc2);word-break:break-all;line-height:1.7;position:relative;margin-bottom:1.25rem;}
  .zo-bst{padding:.875rem 1rem;border-radius:8px;background:var(--zb);border:1px solid var(--zw);text-align:center;}
  .zo-bst .v{font-family:var(--zm);font-size:.95rem;font-weight:700;color:var(--zc);display:block;}
  .zo-bst .l{font-family:var(--zm);font-size:.57rem;color:var(--zc3);text-transform:uppercase;letter-spacing:.1em;margin-top:.2rem;}
  .zo-bscan{display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.65rem;border-radius:8px;border:1px solid var(--zw);background:var(--zb);font-family:var(--zm);font-size:.65rem;font-weight:600;letter-spacing:.06em;color:var(--zc2);text-decoration:none;text-transform:uppercase;transition:all .2s;}
  .zo-bscan:hover{border-color:var(--zw2);color:var(--zc);background:var(--zb3);}
  .zo-ti{flex:1;display:flex;align-items:center;gap:.875rem;padding:1.5rem;border-right:1px solid var(--zw);transition:background .2s;}
  .zo-ti:last-child{border-right:none;}
  .zo-ti:hover{background:rgba(255,255,255,.014);}
  .zo-tiic{width:32px;height:32px;border-radius:6px;border:1px solid var(--zw2);background:rgba(255,255,255,.025);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .zo-ucc{border-radius:12px;padding:1.75rem;border:1px solid var(--zw);background:var(--zb3);transition:all .3s;cursor:default;position:relative;overflow:hidden;}
  .zo-ucc::after{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;pointer-events:none;background:linear-gradient(140deg,rgba(245,166,35,.025),transparent 55%);}
  .zo-ucc:hover{border-color:var(--zw2);background:var(--zb4);transform:translateY(-2px);}
  .zo-ucc:hover::after{opacity:1;}
  .zo-ucic{width:36px;height:36px;border-radius:7px;border:1px solid var(--zw2);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center;}
  .zo-dev{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:210px;height:310px;border-radius:5px;
    background:linear-gradient(170deg,#1e2c40 0%,#141e2e 35%,#101620 100%);
    border:1px solid rgba(255,255,255,.12);
    box-shadow:0 0 0 1px rgba(255,255,255,.04),5px 5px 0 rgba(0,0,0,.55),0 28px 72px rgba(0,0,0,.75);
    animation:zo-df 9s ease-in-out infinite;}
  @keyframes zo-df{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-9px)}}
  .zo-rail{position:absolute;left:-10px;right:-10px;height:13px;background:linear-gradient(90deg,#0c111a,#1a2535,#0c111a);border:1px solid rgba(255,255,255,.07);border-radius:2px;}
  .zo-rail::before,.zo-rail::after{content:"";position:absolute;top:50%;transform:translateY(-50%);width:7px;height:7px;border-radius:50%;background:#0c111a;border:1px solid rgba(255,255,255,.1);}
  .zo-rail::before{left:8px;}.zo-rail::after{right:8px;}
  .zo-led{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
  .zo-ledg{background:#22c55e;box-shadow:0 0 6px #22c55e;animation:zo-lg 2.4s ease-in-out infinite;}
  .zo-leda{background:#f5a623;box-shadow:0 0 5px #f5a623;animation:zo-lg 3.1s ease-in-out infinite .9s;}
  .zo-ledb{background:#4a9eff;box-shadow:0 0 5px #4a9eff;}
  @keyframes zo-lg{0%,100%{opacity:1}50%{opacity:.28}}
  .zo-screen{background:#000;border:1px solid rgba(0,212,170,.14);border-radius:3px;overflow:hidden;position:relative;}
  .zo-scbg{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,212,170,.025) 0%,transparent 100%);}
  .zo-scan{position:absolute;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,170,.45),transparent);animation:zo-sc 3s linear infinite;}
  @keyframes zo-sc{0%{top:0;opacity:.8}100%{top:100%;opacity:.1}}
  .zo-portj{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.16);background:#09111e;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);}
  .zo-portj.act{border-color:rgba(245,166,35,.5);box-shadow:0 0 4px rgba(245,166,35,.28),inset 0 1px 0 rgba(255,255,255,.06);}
  .zo-sl{stroke-dasharray:5 9;animation:zo-sf 2.5s linear infinite;}
  .zo-sl2{stroke-dasharray:3 10;animation:zo-sf 3.5s linear infinite .9s;}
  .zo-sl3{stroke-dasharray:4 8;animation:zo-sf 4.2s linear infinite 1.8s;}
  @keyframes zo-sf{to{stroke-dashoffset:-100}}
  .zo-patwrap{border-radius:18px;background:var(--zb3);border:1px solid var(--zw2);border-left:3px solid var(--zc3);padding:4rem;position:relative;overflow:hidden;}
  .zo-patwrap::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(200,210,225,.14),transparent 50%);}
  .zo-kpi{border-radius:8px;padding:1.25rem 1.75rem;border:1px solid var(--zw);background:var(--zb);text-align:center;min-width:110px;}
  .zo-kpiv{font-family:var(--zm);font-size:1.75rem;font-weight:700;color:var(--zc);display:block;line-height:1;}
  .zo-kpil{font-family:var(--zm);font-size:.55rem;font-weight:700;letter-spacing:.12em;color:var(--zc3);text-transform:uppercase;margin-top:.45rem;}
  .zo-cform{background:var(--zb3);border:1px solid var(--zw2);border-top:2px solid rgba(245,166,35,.18);border-radius:18px;padding:2.25rem;}
  .zo-fi,.zo-fsel,.zo-fta{width:100%;background:var(--zb);border:1px solid var(--zw2);border-radius:8px;padding:.7rem .9rem;color:var(--zc);font-family:var(--zm);font-size:.8rem;outline:none;transition:border-color .2s;}
  .zo-fi:focus,.zo-fsel:focus,.zo-fta:focus{border-color:rgba(245,166,35,.35);}
  .zo-fi::placeholder,.zo-fta::placeholder{color:var(--zc3);}
  .zo-fta{resize:vertical;min-height:100px;line-height:1.6;}
  .zo-fsel{appearance:none;cursor:pointer;}
  .zo-hwbadge{position:absolute;background:var(--zb3);border:1px solid var(--zw2);border-radius:8px;padding:.55rem .9rem;white-space:nowrap;}
  .zo-hwbadge .bv{font-family:var(--zm);font-size:.7rem;font-weight:700;display:block;}
  .zo-hwbadge .bl{font-family:var(--zm);font-size:.55rem;color:var(--zc3);letter-spacing:.08em;text-transform:uppercase;margin-top:.1rem;}
  @media(max-width:1024px){
    .zo-psteps{flex-direction:column;gap:1.75rem;}
    .zo-pconn{display:none;}
  }
  @media(max-width:768px){
    .zo-ti{min-width:100%;border-right:none;border-bottom:1px solid var(--zw);}
  }
`;

// Pipeline icons (inline SVG paths)
const PIPE_ICONS = [
  <svg key={0} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22V12m0-10v10M2 12h10M12 12h10"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key={1} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/></svg>,
  <svg key={2} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key={3} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><BnbLogo size={22}/></svg>,
  <svg key={4} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>,
];

const PIPE_DATA = [
  { short:"Energy Source", sub:"Solar / Wind / Hydro", title:"Renewable Energy Source", badge:"PHYSICAL LAYER",
    body:"A solar farm, wind installation, or hydro plant generates physical power. The ZEV hardware validator is installed directly on-site — no intermediary between the source and the signing process." },
  { short:"ZEV Device", sub:"Hardware capture", title:"ZEV Hardware Validation", badge:"HARDWARE LAYER",
    body:"The ZEV device reads raw energy output locally. Its tamper-resistant secure element provides a unique, factory-provisioned device identity that cannot be cloned, spoofed, or remotely compromised." },
  { short:"Secure Signing", sub:"Cryptographic seal", title:"Cryptographic Signing", badge:"CRYPTOGRAPHIC LAYER",
    body:"Energy reading + timestamp + GPS coordinates are cryptographically signed inside the secure element using the device\'s unique private key. This key never leaves the hardware under any condition." },
  { short:"BNB Chain", sub:"On-chain anchoring", title:"BNB Chain Anchoring", badge:"SETTLEMENT LAYER",
    body:"Validated proofs are anchored on-chain via the $ZLN smart contract. Each proof record is immutable, timestamped, and publicly queryable — permanently linked to the originating physical device." },
  { short:"Verification", sub:"Third-party audit", title:"Independent Verification", badge:"AUDIT LAYER",
    body:"Any auditor, enterprise partner, or downstream protocol can independently verify the energy proof using the public contract and the device\'s registered public key. Zero trust in ZelionTech required." },
];

const UC_DATA = [
  { name:"Solar Farm Verification", tag:"CORE", pct:92, col:"zo-pt",
    desc:"Hardware-attested, timestamped proof of solar energy production at large-scale installations. Eliminates self-declared generation figures for institutional reporting." },
  { name:"Battery Storage", tag:"STORAGE", pct:78, col:"zo-pa",
    desc:"Verified proof of stored renewable energy — distinguishing grid-sourced charge from confirmed renewable input. Critical for ESG-compliant energy storage claims." },
  { name:"ESG Compliance", tag:"ESG", pct:85, col:"zo-pt",
    desc:"Enterprise ESG reporting backed by hardware-attested energy data. Enables auditor-ready sustainability disclosures for public companies and fund managers." },
  { name:"Carbon Markets", tag:"CARBON", pct:71, col:"zo-pa",
    desc:"Hardware-rooted energy proofs provide the data layer for carbon credit issuance and retirement, removing reliance on manual audits." },
  { name:"DePIN Integrations", tag:"DEPIN", pct:63, col:"zo-pt",
    desc:"Zelion functions as a composable energy data layer within the DePIN ecosystem, compatible with downstream protocols requiring verified energy proofs." },
  { name:"Infrastructure Monitoring", tag:"MONITORING", pct:47, col:"zo-pa",
    desc:"Continuous cryptographically signed telemetry from physical energy assets provides tamper-proof operational records for compliance audit." },
];

const CONTRACT = "0x9D9c5C7B7BfC398Ed446b7e53a8Ad8d62DCD0181";

// ─── Main Component ────────────────────────────────────────────────────────
const ZevOracle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="zp min-h-screen">
      <style>{pageStyles}</style>
      <Navbar />

      <main style={{ paddingTop: "var(--nh, 64px)" }}>

        {/* ═══ HERO ═══ */}
        <section style={{ minHeight:"100svh", display:"grid", placeItems:"center", position:"relative", overflow:"hidden", background:"var(--zb)" }}>
          <div className="zo-grid"/>
          <div className="zo-ga"/>
          <div className="zo-gb"/>

          <div style={{ position:"relative", zIndex:2, maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}
            className="max-lg:grid-cols-1">

            {/* Left copy */}
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8 }} style={{ padding:"2.5rem 0" }}>
              <div style={{ marginBottom:"2rem" }}>
                <div className="zo-dlabel" style={{ marginBottom:".5rem" }}>
                  <Link to="/" style={{ color:"var(--zc3)", textDecoration:"none", display:"flex", alignItems:"center", gap:".4rem", fontFamily:"var(--zm)", fontSize:".6rem", letterSpacing:".1em", transition:"color .2s" }}
                    onMouseOver={e=>e.currentTarget.style.color="var(--zc2)"}
                    onMouseOut={e=>e.currentTarget.style.color="var(--zc3)"}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>ZelionTech
                  </Link>
                  <span style={{ color:"var(--zc3)" }}>/</span>
                  <span style={{ color:"var(--za)", fontFamily:"var(--zm)", fontSize:".6rem", letterSpacing:".08em" }}>ZEV Oracle</span>
                </div>
                <div className="zo-dlabel" style={{ marginBottom:0 }}>
                  Interactive Energy Validation Platform · BNB Chain · DePIN
                </div>
              </div>

              <h1 style={{ fontFamily:"var(--zs)", fontSize:"clamp(2.8rem,5.2vw,4.8rem)", color:"var(--zc)", marginBottom:"1.5rem", letterSpacing:"-.03em", lineHeight:1.06 }}>
                <span style={{ display:"block" }}>Proof of</span>
                <span style={{ display:"block", fontStyle:"italic", color:"rgba(221,232,240,.48)" }}>Renewable</span>
                <span style={{ display:"block" }}>Energy.</span>
              </h1>

              <p style={{ fontSize:"1rem", lineHeight:1.82, maxWidth:"430px", marginBottom:"2.75rem", color:"var(--zc2)" }}>
                The ZEV Oracle validates, signs, and anchors renewable energy production data from physical devices to BNB Chain — creating independently verifiable proof for any auditor, enterprise, or protocol.
              </p>

              <div style={{ display:"flex", gap:".75rem", flexWrap:"wrap", marginBottom:"3rem" }}>
                <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:".45rem", borderRadius:"8px", fontFamily:"var(--zm)", cursor:"pointer", textDecoration:"none", transition:"all .22s", border:"none", fontSize:".7rem", fontWeight:700, letterSpacing:".09em", textTransform:"uppercase", padding:".88rem 2rem", background:"var(--za)", color:"#080400" }}
                  onMouseOver={e=>{e.currentTarget.style.background="#f9c14e";e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseOut={e=>{e.currentTarget.style.background="var(--za)";e.currentTarget.style.transform="none";}}>
                  Request Demo
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#pipeline" style={{ display:"inline-flex", alignItems:"center", gap:".45rem", borderRadius:"8px", fontFamily:"var(--zm)", cursor:"pointer", textDecoration:"none", transition:"all .22s", fontSize:".7rem", fontWeight:700, letterSpacing:".09em", textTransform:"uppercase", padding:".88rem 2rem", background:"transparent", border:"1px solid var(--zw2)", color:"var(--zc2)" }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="var(--zw3)";e.currentTarget.style.color="var(--zc)";e.currentTarget.style.background="rgba(255,255,255,.03)";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="var(--zw2)";e.currentTarget.style.color="var(--zc2)";e.currentTarget.style.background="transparent";}}>
                  Explore Pipeline
                </a>
              </div>

              {/* Metric strip */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", border:"1px solid var(--zw2)", borderRadius:"12px", overflow:"hidden", background:"var(--zb3)" }}>
                {[["IP67","Hardware Grade"],["CE","IEC 61557"],["BNB","Settlement"],["5G","Connectivity"]].map(([v,l])=>(
                  <div key={l} style={{ padding:"1.1rem .875rem", textAlign:"center", borderRight:"1px solid var(--zw)", transition:"background .2s" }}
                    onMouseOver={e=>e.currentTarget.style.background="var(--zb4)"}
                    onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".95rem", fontWeight:700, color:"var(--zc)", display:"block", letterSpacing:".02em" }}>{v}</span>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".57rem", color:"var(--zc3)", letterSpacing:".12em", textTransform:"uppercase", marginTop:".28rem", display:"block" }}>{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: ZEV hardware device render */}
            <div className="hidden lg:flex" style={{ alignItems:"center", justifyContent:"center", height:"500px", position:"relative" }}>
              <div style={{ position:"relative", width:"360px", height:"440px" }}>
                {/* Orbiting rings */}
                {[["290px","290px","rgba(255,255,255,.045)","25s","normal"],
                  ["380px","380px","rgba(245,166,35,.055)","40s","reverse"],
                  ["460px","460px","rgba(255,255,255,.025)","55s","normal"]].map(([w,h,c,d,dir],i)=>(
                  <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:w, height:h, borderRadius:"50%", border:`1px dashed ${c}`, transform:"translate(-50%,-50%)", animation:`zo-rr ${d} linear infinite ${dir==="reverse"?"reverse":""}` }}/>
                ))}
                <style>{`@keyframes zo-rr{to{transform:translate(-50%,-50%) rotate(360deg)}}`}</style>

                {/* Floating telemetry badges */}
                {[
                  { top:"5%", right:"0%", anim:"zo-hb1 5s ease-in-out infinite", content:<><div className="zo-live" style={{marginBottom:".3rem"}}><div className="zo-live-d"/><span>LIVE</span></div><span className="bv" style={{color:"var(--zt)"}}>1,847.3 kWh</span><span className="bl">Verified Today</span></> },
                  { bottom:"14%", left:"0%", anim:"zo-hb2 6.5s ease-in-out infinite", content:<><span className="bv" style={{color:"var(--zg)"}}>SIG VALID</span><span className="bl">0x4a2f...d8c1</span></> },
                  { top:"40%", left:"0%", anim:"zo-hb1 7.5s ease-in-out infinite .5s", content:<><span className="bv" style={{color:"var(--za)"}}>98.4%</span><span className="bl">Proof Score</span></> },
                ].map((b,i)=>(
                  <div key={i} className="zo-hwbadge" style={{ top:b.top, right:b.right, bottom:b.bottom, left:b.left, animation:b.anim }}>{b.content}</div>
                ))}
                <style>{`@keyframes zo-hb1{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@keyframes zo-hb2{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}`}</style>

                {/* Stream lines */}
                <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible", pointerEvents:"none" }} viewBox="0 0 360 440" fill="none">
                  <path className="zo-sl" d="M310 55 Q360 70 385 95" stroke="rgba(0,212,170,.14)" strokeWidth="1"/>
                  <path className="zo-sl2" d="M90 200 Q45 185 18 205" stroke="rgba(0,212,170,.1)" strokeWidth="1"/>
                  <path className="zo-sl3" d="M90 355 Q45 370 18 360" stroke="rgba(245,166,35,.12)" strokeWidth="1"/>
                </svg>

                {/* ZEV device body */}
                <div className="zo-dev">
                  <div className="zo-rail" style={{ top:"-16px" }}/>
                  <div className="zo-rail" style={{ bottom:"-16px" }}/>
                  {/* Brand strip */}
                  <div style={{ height:"30px", background:"rgba(245,166,35,.06)", borderBottom:"1px solid rgba(245,166,35,.14)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 .875rem" }}>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".22em", color:"rgba(245,166,35,.65)", textTransform:"uppercase" }}>ZEV Pro</span>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".5rem", color:"var(--zc3)", letterSpacing:".1em" }}>v2.4.1</span>
                  </div>
                  {/* LEDs */}
                  <div style={{ display:"flex", alignItems:"center", gap:".625rem", padding:".875rem .875rem .625rem", borderBottom:"1px solid var(--zw)" }}>
                    <div className="zo-led zo-ledg"/><div className="zo-led zo-leda"/><div className="zo-led zo-ledb"/>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".5rem", color:"var(--zc3)", letterSpacing:".08em", textTransform:"uppercase", marginLeft:".3rem" }}>System Online</span>
                  </div>
                  {/* Screen */}
                  <div className="zo-screen" style={{ margin:".625rem .875rem", height:"100px" }}>
                    <div className="zo-scbg"/>
                    <div className="zo-scan"/>
                    <div style={{ position:"relative", zIndex:1, padding:".625rem .75rem", fontFamily:"var(--zm)", fontSize:".58rem", lineHeight:1.75, color:"rgba(0,212,170,.72)" }}>
                      <div>DEVICE_ID: ZEV-0042</div>
                      <div>kWh: <span style={{ color:"var(--za)" }}>1847.3</span> VRFD</div>
                      <div>SIG: 0x4a2f...d8c1</div>
                      <div>STATUS: <span style={{ color:"var(--zg)" }}>VALID ✓</span></div>
                    </div>
                  </div>
                  {/* Ports */}
                  <div style={{ fontFamily:"var(--zm)", fontSize:".5rem", letterSpacing:".15em", color:"var(--zc3)", textTransform:"uppercase", padding:".5rem .875rem .375rem", borderTop:"1px solid var(--zw)" }}>Measurement Inputs</div>
                  <div style={{ display:"flex", gap:".5rem", padding:".375rem .875rem .75rem", flexWrap:"wrap" }}>
                    {[["AC-L1",true],["AC-L2",true],["AC-L3",true],["DC-IN",false],["REF",false],["GND",false]].map(([l,a])=>(
                      <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".25rem" }}>
                        <div className={`zo-portj ${a?"act":""}`}/>
                        <span style={{ fontFamily:"var(--zm)", fontSize:".44rem", color:"var(--zc3)", letterSpacing:".05em" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                  {/* Comms */}
                  <div style={{ margin:".5rem .875rem", padding:".625rem .75rem", background:"rgba(255,255,255,.02)", border:"1px solid var(--zw)", borderRadius:"3px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:".1rem" }}>
                      <span style={{ fontFamily:"var(--zm)", fontSize:".5rem", color:"var(--zc3)", letterSpacing:".1em", textTransform:"uppercase" }}>Network</span>
                      <span style={{ fontFamily:"var(--zm)", fontSize:".62rem", color:"var(--zc2)" }}>5G / WiFi / Ethernet</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:"2px" }}>
                      {[[4],[7],[10],[13,.35]].map(([h,op=1],i)=>(
                        <div key={i} style={{ width:"3px", height:`${h}px`, borderRadius:"1px", background:"var(--zt)", opacity:op }}/>
                      ))}
                    </div>
                  </div>
                  {/* Secure element */}
                  <div style={{ margin:".5rem .875rem", padding:".625rem .75rem", background:"rgba(245,166,35,.035)", border:"1px solid rgba(245,166,35,.13)", borderRadius:"3px", display:"flex", alignItems:"center", gap:".625rem" }}>
                    <div style={{ width:"24px", height:"24px", borderRadius:"3px", background:"rgba(245,166,35,.07)", border:"1px solid rgba(245,166,35,.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--za)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, color:"var(--za)", letterSpacing:".07em", textTransform:"uppercase" }}>Secure Element</div>
                      <div style={{ fontFamily:"var(--zm)", fontSize:".5rem", color:"var(--zc3)", marginTop:".1rem" }}>ATECC608B · Key Protected</div>
                    </div>
                  </div>
                  {/* Serial */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:".5rem .875rem", borderTop:"1px solid var(--zw)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".48rem", color:"var(--zc3)", letterSpacing:".12em" }}>SN: ZEV-042-2024-PRO</span>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".48rem", color:"rgba(34,197,94,.35)", letterSpacing:".06em" }}>CE · IP67 · IEC 61557</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST STRIP ═══ */}
        <div className="zo-sep"/>
        <section style={{ padding:0, background:"var(--zb1)", borderTop:"1px solid var(--zw2)", borderBottom:"1px solid var(--zw2)" }}>
          <div style={{ display:"flex", flexWrap:"wrap" }}>
            {[
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--zt)" strokeWidth="1.5" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label:"Hardware Root of Trust", sub:"ATECC608B secure element" },
              { icon:<BnbLogo size={16}/>, label:"Built on BNB Chain", sub:"BEP-20 · DappBay listed",
                liveDot: <div className="zo-live" style={{gap:".4rem"}}><div className="zo-live-d"/><span style={{fontSize:".55rem"}}>LIVE</span></div> },
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--zc2)" strokeWidth="1.5" width="14" height="14"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, label:"Enterprise Infrastructure", sub:"ESG · RWA · DePIN ready" },
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--zc2)" strokeWidth="1.5" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, label:"Filed Patent Applications", sub:"Proprietary IP protected" },
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="var(--zt)" strokeWidth="1.5" width="14" height="14"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, label:"Renewable Validation", sub:"Cryptographic energy proofs" },
            ].map((t,i)=>(
              <Reveal key={i} delay={i*.06} style={{ flex:1 }}>
                <div className="zo-ti">
                  <div className="zo-tiic">{t.icon}</div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:".625rem" }}>
                      <span style={{ fontFamily:"var(--zm)", fontSize:".65rem", fontWeight:600, color:"var(--zc)", letterSpacing:".04em", display:"block" }}>{t.label}</span>
                      {t.liveDot}
                    </div>
                    <div style={{ fontFamily:"var(--zm)", fontSize:".57rem", color:"var(--zc3)", marginTop:".2rem", letterSpacing:".04em" }}>{t.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <div className="zo-sep"/>

        {/* ═══ TECHNOLOGY ═══ */}
        <section id="technology" style={{ padding:"7rem 0", background:"var(--zb1)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"5fr 6fr", gap:"5rem", alignItems:"center" }} className="max-lg:grid-cols-1">
              {/* Device schematic */}
              <Reveal>
                <div style={{ border:"1px solid var(--zw2)", borderRadius:"18px", overflow:"hidden", background:"var(--zb)", aspectRatio:".88", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 55% at 50% 28%, rgba(245,166,35,.03) 0%, transparent 60%)", pointerEvents:"none" }}/>
                  <svg viewBox="0 0 340 380" fill="none" style={{ width:"78%", maxWidth:"295px" }}>
                    <defs>
                      <linearGradient id="zdg" x1="80" y1="20" x2="260" y2="360" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1e2c40"/><stop offset="100%" stopColor="#111820"/>
                      </linearGradient>
                      <linearGradient id="zsg" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="transparent"/><stop offset="50%" stopColor="#00d4aa"/><stop offset="100%" stopColor="transparent"/>
                      </linearGradient>
                    </defs>
                    <rect x="80" y="20" width="180" height="340" rx="4" fill="url(#zdg)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                    <rect x="88" y="28" width="164" height="324" rx="2" fill="rgba(0,0,0,.28)" stroke="rgba(255,255,255,.04)" strokeWidth=".5"/>
                    <rect x="68" y="22" width="14" height="12" rx="2" fill="#0c111a" stroke="rgba(255,255,255,.07)" strokeWidth=".5"/>
                    <rect x="258" y="22" width="14" height="12" rx="2" fill="#0c111a" stroke="rgba(255,255,255,.07)" strokeWidth=".5"/>
                    <rect x="68" y="326" width="14" height="12" rx="2" fill="#0c111a" stroke="rgba(255,255,255,.07)" strokeWidth=".5"/>
                    <rect x="258" y="326" width="14" height="12" rx="2" fill="#0c111a" stroke="rgba(255,255,255,.07)" strokeWidth=".5"/>
                    <rect x="88" y="28" width="164" height="28" fill="rgba(245,166,35,.055)" rx="2"/>
                    <rect x="88" y="54" width="164" height="1" fill="rgba(245,166,35,.13)"/>
                    <text x="100" y="47" fontFamily="IBM Plex Mono,monospace" fontSize="8" fill="rgba(245,166,35,.62)" letterSpacing="2" fontWeight="600">ZEV PRO</text>
                    <circle cx="234" cy="42" r="4" fill="#22c55e" opacity=".9"/>
                    <circle cx="245" cy="42" r="3" fill="#f5a623" opacity=".8"/>
                    <rect x="98" y="66" width="144" height="86" rx="2" fill="rgba(0,0,0,.7)" stroke="rgba(0,212,170,.13)" strokeWidth=".5"/>
                    <rect x="98" y="66" width="144" height="2" fill="url(#zsg)" opacity=".5">
                      <animateTransform attributeName="transform" type="translate" from="0 0" to="0 86" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    <text x="106" y="84" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(0,212,170,.7)">DEVICE: ZEV-0042</text>
                    <text x="106" y="96" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(0,212,170,.62)">kWh: 1847.3 VRFD</text>
                    <text x="106" y="108" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="rgba(0,212,170,.58)">SIG: 0x4a2f...d8c1</text>
                    <text x="106" y="120" fontFamily="IBM Plex Mono,monospace" fontSize="7" fill="#22c55e">STATUS: VALID ✓</text>
                    <text x="100" y="170" fontFamily="IBM Plex Mono,monospace" fontSize="5.5" fill="rgba(255,255,255,.18)" letterSpacing="1.5">MEASUREMENT INPUTS</text>
                    <rect x="98" y="175" width="164" height=".5" fill="rgba(255,255,255,.05)"/>
                    {[[112,192,true],[132,192,true],[152,192,true],[172,192,false],[192,192,false],[212,192,false]].map(([cx,cy,active],i)=>(
                      <circle key={i} cx={cx} cy={cy} r="7" fill="#09111e" stroke={active?"rgba(245,166,35,.48)":"rgba(255,255,255,.1)"} strokeWidth="1.5"/>
                    ))}
                    <text x="112" y="208" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="4.5" fill="rgba(255,255,255,.2)">AC-L1</text>
                    <text x="132" y="208" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="4.5" fill="rgba(255,255,255,.2)">AC-L2</text>
                    <text x="152" y="208" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="4.5" fill="rgba(255,255,255,.2)">AC-L3</text>
                    <rect x="98" y="218" width="164" height=".5" fill="rgba(255,255,255,.04)"/>
                    <rect x="108" y="228" width="72" height="50" rx="3" fill="rgba(245,166,35,.05)" stroke="rgba(245,166,35,.2)" strokeWidth="1"/>
                    <rect x="116" y="236" width="56" height="34" rx="2" fill="rgba(245,166,35,.03)" stroke="rgba(245,166,35,.11)" strokeWidth=".5"/>
                    <text x="144" y="252" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6" fill="rgba(245,166,35,.55)">SECURE</text>
                    <text x="144" y="262" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6" fill="rgba(245,166,35,.55)">ELEMENT</text>
                    {[234,242,250,258].map((y,i)=>[
                      <line key={`la${i}`} x1="108" y1={y} x2="94" y2={y} stroke="rgba(255,255,255,.07)" strokeWidth="1"/>,
                      <line key={`lb${i}`} x1="180" y1={y} x2="194" y2={y} stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
                    ])}
                    <rect x="190" y="228" width="64" height="50" rx="3" fill="rgba(0,212,170,.03)" stroke="rgba(0,212,170,.11)" strokeWidth=".5"/>
                    <text x="222" y="250" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6" fill="rgba(0,212,170,.42)">5G/WiFi</text>
                    <text x="222" y="260" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="6" fill="rgba(0,212,170,.42)">ONLINE</text>
                    <text x="170" y="344" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="5.5" fill="rgba(255,255,255,.12)" letterSpacing="1.5">SN: ZEV-042-2026-PRO</text>
                    <text x="170" y="354" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="5" fill="rgba(34,197,94,.22)" letterSpacing="1">CE • IP67 • IEC 61557</text>
                  </svg>
                </div>
              </Reveal>
              {/* Text */}
              <Reveal delay={.12}>
                <div className="zo-dlabel">Technology</div>
                <h2 className="zo-sh">Hardware-Based<br/><em>Validation Architecture</em></h2>
                <p style={{ marginBottom:"2rem" }}>The ZEV device sits at the physical energy source. It reads, signs, and transmits verifiable proof of renewable energy production with the signing key permanently sealed inside tamper-resistant silicon.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:".5rem", marginTop:"2.25rem" }}>
                  {[
                    { num:"L1", h:"Physical Sensing", p:"Direct electrical measurement at source. No software intermediary between sensor and signing engine. IEC 61557 certified measurement accuracy.", hl:false },
                    { num:"L2", h:"Secure Element Signing", p:"Reading + timestamp + GPS signed inside the hardware enclave (ATECC608B). Private key never exposed, never exported under any condition.", hl:true },
                    { num:"L3", h:"On-Chain Anchoring", p:"Signed proof anchored on BNB Chain. Immutable, timestamped, independently verifiable without trusting ZelionTech.", hl:false },
                  ].map(l=>(
                    <div key={l.num} className={`zo-lay ${l.hl?"hl":""}`}>
                      <span className="zo-lnum">{l.num}</span>
                      <div className="zo-lb"><h4>{l.h}</h4><p>{l.p}</p></div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ PIPELINE ═══ */}
        <section id="pipeline" style={{ padding:"7rem 0", background:"var(--zb)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <Reveal style={{ textAlign:"center", marginBottom:"5rem" }}>
              <div className="zo-dlabel" style={{ justifyContent:"center" }}>Validation Pipeline</div>
              <h2 className="zo-sh" style={{ textAlign:"center" }}>How <em>ZEV</em> Works</h2>
              <p style={{ textAlign:"center", margin:"0 auto", maxWidth:"520px", fontSize:".95rem" }}>From physical energy production to immutable on-chain proof. Select any stage to explore.</p>
            </Reveal>

            <div className="zo-psteps">
              {PIPE_DATA.map((p,i)=>(
                <div key={i} className={`zo-pstep ${activeStep===i?"act":""}`} onClick={()=>setActiveStep(i)}>
                  {i<4&&<div className="zo-pconn"/>}
                  <div className="zo-pnw">
                    <div className="zo-pnum">
                      {i===3
                        ? <BnbLogo size={26}/>
                        : [
                          <svg key={0} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22V12m0-10v10M2 12h10M12 12h10"/><circle cx="12" cy="12" r="2"/></svg>,
                          <svg key={1} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/></svg>,
                          <svg key={2} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                          null,
                          <svg key={4} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>,
                        ][i]}
                    </div>
                  </div>
                  <div className="zo-plab"><h4>{p.short}</h4><p>{p.sub}</p></div>
                </div>
              ))}
            </div>

            <motion.div className="zo-pdtl" key={activeStep} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:.35 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"2rem", alignItems:"center" }} className="max-lg:grid-cols-1">
                <div>
                  <h3>{PIPE_DATA[activeStep].title}</h3>
                  <p>{PIPE_DATA[activeStep].body}</p>
                </div>
                <span style={{ padding:".35rem .85rem", borderRadius:"4px", background:"rgba(245,166,35,.06)", border:"1px solid rgba(245,166,35,.18)", fontFamily:"var(--zm)", fontSize:".6rem", fontWeight:700, letterSpacing:".12em", color:"var(--za)", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                  {PIPE_DATA[activeStep].badge}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ PRODUCT ═══ */}
        <section id="product" style={{ padding:"7rem 0", background:"var(--zb1)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"end", marginBottom:"3.5rem" }} className="max-lg:grid-cols-1">
              <Reveal><div className="zo-dlabel">Product</div><h2 className="zo-sh">The <em>ZEV</em> Device Family</h2></Reveal>
              <Reveal delay={.1}><p style={{ maxWidth:"380px" }}>Purpose-built hardware validation for renewable energy deployments of any scale — from pilot installations to industrial-grade infrastructure.</p></Reveal>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }} className="max-lg:grid-cols-1">
              {/* ZEV Lite */}
              <Reveal delay={.05}>
                <div className="zo-pcard zo-pcard-lite">
                  <div className="zo-pcard-head">
                    <span className="zo-pbadge zo-bl">ZEV Lite</span>
                    <div className="zo-pname">ZEV Lite</div>
                    <p className="zo-psub">Entry-level hardware validation for smaller renewable installations and pilot programs.</p>
                  </div>
                  <div className="zo-pbody">
                    {["Secure element hardware identity (ATECC608B)","Cryptographic energy reading signature","BNB Chain proof anchoring","Single-phase AC measurement","Dashboard API access","Community support tier"].map(f=>(
                      <div key={f} className="zo-feat">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--zc3)" strokeWidth="2" style={{ flexShrink:0, marginTop:".15rem" }}><polyline points="20 6 9 17 4 12"/></svg>
                        <span className="zo-ft">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              {/* ZEV Pro */}
              <Reveal delay={.12}>
                <div className="zo-pcard zo-pcard-pro">
                  <div className="zo-pcard-head">
                    <span className="zo-pbadge zo-bp">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ZEV Pro
                    </span>
                    <div className="zo-pname">ZEV Pro</div>
                    <p className="zo-psub">Enterprise-grade validation for industrial solar farms, carbon markets, and institutional infrastructure.</p>
                  </div>
                  <div className="zo-pbody">
                    {[
                      { t:<span className="zo-ft"><strong>Everything in ZEV Lite</strong></span> },
                      { t:"Three-phase AC + DC simultaneous multi-meter capture" },
                      { t:"Real-time cryptographically signed data streaming" },
                      { t:"Industrial hardened enclosure — IP67 · IEC 61557 certified" },
                      { t:"5G / WiFi / Ethernet connectivity with BNB Chain mainnet" },
                      { t:"ESG audit export (GHG Protocol, ISO 50001 compatible)" },
                      { t:"Dedicated enterprise SLA · custom protocol integrations" },
                    ].map((f,i)=>(
                      <div key={i} className="zo-feat">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--za)" strokeWidth="2" style={{ flexShrink:0, marginTop:".15rem" }}><polyline points="20 6 9 17 4 12"/></svg>
                        {typeof f.t==="string"?<span className="zo-ft">{f.t}</span>:f.t}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ BNB CHAIN ═══ */}
        <section id="bnb" style={{ padding:"7rem 0", background:"var(--zb)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }} className="max-lg:grid-cols-1">
              <Reveal>
                <div className="zo-dlabel">Settlement Layer</div>
                <h2 className="zo-sh">Built for the<br/><em>BNB Chain</em> Ecosystem</h2>
                <p style={{ marginBottom:"2.25rem" }}>Zelion's coordination and settlement layer runs on BNB Chain, chosen for its throughput, EVM compatibility, institutional ecosystem, and sub-cent transaction costs that make economically viable proof anchoring at scale possible.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
                  {[
                    { t:"BNB Chain Settlement", d:"Low transaction costs enable economically viable proof anchoring at scale — even sub-cent per validation event." },
                    { t:"Immutable Anchoring", d:"Once recorded on BNB Chain, energy proofs cannot be altered or deleted. Creates a permanent, auditable trail." },
                    { t:"EVM Compatibility", d:"Full EVM compatibility enables seamless integration with enterprise tooling, DeFi protocols, and ESG reporting infrastructure." },
                    { t:"Institutional Ecosystem", d:"BNB Chain's established institutional infrastructure, DappBay listing, and large validator network provide enterprise-grade credibility." },
                  ].map(w=>(
                    <div key={w.t} style={{ display:"flex", alignItems:"flex-start", gap:".875rem", padding:"1rem 1.1rem", borderRadius:"8px", border:"1px solid var(--zw)", background:"var(--zb3)", transition:"border-color .2s" }}
                      onMouseOver={e=>e.currentTarget.style.borderColor="var(--zw2)"}
                      onMouseOut={e=>e.currentTarget.style.borderColor="var(--zw)"}>
                      <div style={{ width:"28px", height:"28px", borderRadius:"6px", border:"1px solid var(--zw2)", background:"rgba(255,255,255,.02)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:".05rem" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--zt)" strokeWidth="1.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <h4 style={{ fontFamily:"var(--zm)", fontSize:".68rem", fontWeight:700, color:"var(--zc)", letterSpacing:".04em", marginBottom:".25rem" }}>{w.t}</h4>
                        <p style={{ fontSize:".84rem", margin:0, lineHeight:1.6 }}>{w.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              {/* Contract panel */}
              <Reveal delay={.12}>
                <div className="zo-bnbpanel">
                  <div style={{ display:"flex", alignItems:"center", gap:".875rem", marginBottom:"1.75rem" }}>
                    <div style={{ width:"42px", height:"42px", borderRadius:"9px", background:"rgba(243,186,47,.07)", border:"1px solid rgba(243,186,47,.16)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <BnbLogo size={26}/>
                    </div>
                    <div>
                      <div style={{ fontFamily:"var(--zm)", fontSize:".8rem", fontWeight:700, color:"var(--zc)", letterSpacing:".04em" }}>BNB Chain</div>
                      <div style={{ fontFamily:"var(--zm)", fontSize:".6rem", color:"var(--zc3)", letterSpacing:".06em", marginTop:".15rem" }}>Settlement &amp; coordination layer</div>
                    </div>
                  </div>
                  <div style={{ fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:600, letterSpacing:".14em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".5rem" }}>$ZLN Contract Address — BEP-20</div>
                  <div className="zo-contract">
                    <button onClick={copyContract} style={{ position:"absolute", top:".6rem", right:".6rem", background:"var(--zb3)", border:"1px solid var(--zw2)", borderRadius:"4px", padding:".22rem .55rem", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, color:copied?"var(--zt)":"var(--zc3)", cursor:"pointer", display:"flex", alignItems:"center", gap:".3rem", transition:"all .2s" }}>
                      {copied ? "✓ Done" : "Copy"}
                    </button>
                    {CONTRACT}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".625rem", marginBottom:"1.25rem" }}>
                    <div className="zo-bst"><span className="v">500,000,000</span><span className="l">Fixed Supply</span></div>
                    <div className="zo-bst"><span className="v">BEP-20</span><span className="l">Standard</span></div>
                  </div>
                  <a href={`https://bscscan.com/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer" className="zo-bscan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Verify on BscScan
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ USE CASES ═══ */}
        <section id="usecases" style={{ padding:"7rem 0", background:"var(--zb1)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"end", marginBottom:"3.5rem" }} className="max-lg:grid-cols-1">
              <Reveal><div className="zo-dlabel">Applications</div><h2 className="zo-sh">Enterprise<br/><em>Use Cases</em></h2></Reveal>
              <Reveal delay={.1}><p style={{ maxWidth:"400px" }}>Zelion's validation infrastructure serves enterprise, compliance, and DePIN applications where trusted energy data is foundational.</p></Reveal>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".875rem" }} className="max-lg:grid-cols-1">
              {UC_DATA.map((u,i)=>(
                <Reveal key={i} delay={(i%3)*.08}>
                  <div className="zo-ucc">
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"1.1rem" }}>
                      <div className="zo-ucic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--zc2)" strokeWidth="1.5" width="16" height="16">
                          {i===0&&<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>}
                          {i===1&&<><rect x="3" y="7" width="18" height="11" rx="2"/><path d="M21 11V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/></>}
                          {i===2&&<><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>}
                          {i===3&&<path d="M2 12h20M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/>}
                          {i===4&&<><circle cx="12" cy="12" r="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></>}
                          {i===5&&<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>}
                        </svg>
                      </div>
                      <span style={{ fontFamily:"var(--zm)", fontSize:".62rem", color:"var(--zc3)", letterSpacing:".06em" }}>{u.pct}%</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--zm)", fontSize:".74rem", fontWeight:700, color:"var(--zc)", marginBottom:".5rem", letterSpacing:".05em", textTransform:"uppercase" }}>{u.name}</h3>
                    <p style={{ fontSize:".84rem", lineHeight:1.7 }}>{u.desc}</p>
                    <div style={{ marginTop:"1.1rem" }}>
                      <div className="zo-dbar"><div className="zo-dbar-f" style={{ width:`${u.pct}%`, background:u.col==="zo-pt"?"var(--zt)":"var(--za)" }}/></div>
                      <span className={`zo-pill ${u.col}`} style={{ marginTop:".625rem" }}>
                        <span className="zo-pdot"/>{u.tag}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ PATENT ═══ */}
        <section id="patent" style={{ padding:"5rem 0", background:"var(--zb)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <Reveal>
              <div className="zo-patwrap" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"4rem", alignItems:"center" }}>
                <div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:".55rem", marginBottom:"1.75rem", padding:".4rem .9rem", borderRadius:"4px", border:"1px solid rgba(200,210,225,.1)", background:"rgba(200,210,225,.02)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--zc2)" strokeWidth="1.5" width="12" height="12"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span style={{ fontFamily:"var(--zm)", fontSize:".6rem", fontWeight:700, letterSpacing:".14em", color:"var(--zc2)", textTransform:"uppercase" }}>Intellectual Property</span>
                  </div>
                  <h2 style={{ fontFamily:"var(--zs)", fontSize:"2.4rem", color:"var(--zc)", lineHeight:1.1, letterSpacing:"-.025em", marginBottom:"1.1rem" }}>Protected by Filed<br/>Patent Applications</h2>
                  <p style={{ fontSize:".9rem", color:"var(--zc2)", lineHeight:1.82, maxWidth:"490px" }}>ZelionTech's core hardware validation methodology, secure device identity protocols, and cryptographic energy signing architecture are covered by filed intellectual property, providing defensible infrastructure differentiation for all enterprise and institutional partners.</p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem", flexShrink:0 }}>
                  {[["3+","Core technologies"],["Filed","Patent status"],["HW","Root of trust"]].map(([v,l])=>(
                    <div key={l} className="zo-kpi"><span className="zo-kpiv">{v}</span><div className="zo-kpil">{l}</div></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="zo-sep"/>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" style={{ padding:"7rem 0", background:"var(--zb1)" }}>
          <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }} className="max-lg:grid-cols-1">
              <Reveal>
                <div className="zo-dlabel">Contact</div>
                <h2 className="zo-sh">Partner With<br/><em>ZelionTech</em></h2>
                <p style={{ maxWidth:"380px", marginBottom:"2.25rem" }}>We work with energy asset operators, ESG-focused enterprises, carbon market participants, institutional investors, and Web3 protocol teams.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:".5rem" }}>
                  {[
                    { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email", val:"info@zeliontech.com", href:"mailto:info@zeliontech.com" },
                    { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>, label:"Telegram", val:"@zelionglobal", href:"#" },
                    { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M4 4l16 16M4 20L20 4"/></svg>, label:"X / Twitter", val:"@zelion_tech", href:"#" },
                    { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, label:"GitHub", val:"github.com/zeliontech", href:"https://github.com/zeliontech" },
                  ].map(c=>(
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:"flex", alignItems:"center", gap:".875rem", padding:".9rem 1.1rem", borderRadius:"8px", border:"1px solid var(--zw)", background:"var(--zb3)", textDecoration:"none", color:"var(--zc2)", fontSize:".875rem", transition:"all .22s" }}
                      onMouseOver={e=>{e.currentTarget.style.borderColor="var(--zw2)";e.currentTarget.style.background="var(--zb4)";e.currentTarget.style.color="var(--zc)";}}
                      onMouseOut={e=>{e.currentTarget.style.borderColor="var(--zw)";e.currentTarget.style.background="var(--zb3)";e.currentTarget.style.color="var(--zc2)";}}>
                      <span style={{ color:"var(--zc3)", flexShrink:0 }}>{c.icon}</span>
                      <div>
                        <small style={{ display:"block", fontFamily:"var(--zm)", fontSize:".56rem", textTransform:"uppercase", letterSpacing:".12em", color:"var(--zc3)", marginBottom:".15rem", fontWeight:700 }}>{c.label}</small>
                        <span style={{ fontSize:".875rem" }}>{c.val}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={.12}>
                <div className="zo-cform">
                  <div style={{ fontFamily:"var(--zm)", fontSize:".75rem", fontWeight:700, color:"var(--zc)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"1.5rem" }}>Request a Demo</div>
                  <form onSubmit={sendForm}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".75rem", marginBottom:".85rem" }}>
                      <div><label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>First Name</label><input type="text" className="zo-fi" placeholder="Jane"/></div>
                      <div><label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>Last Name</label><input type="text" className="zo-fi" placeholder="Smith"/></div>
                    </div>
                    <div style={{ marginBottom:".85rem" }}><label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>Work Email</label><input type="email" className="zo-fi" placeholder="jane@company.com"/></div>
                    <div style={{ marginBottom:".85rem" }}><label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>Organization</label><input type="text" className="zo-fi" placeholder="Company or fund name"/></div>
                    <div style={{ marginBottom:".85rem" }}>
                      <label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>Interest Area</label>
                      <select className="zo-fsel zo-fi">
                        <option value="">Select an area...</option>
                        {["Enterprise ESG Verification","Carbon Market Infrastructure","Energy-Backed RWA","DePIN Protocol Integration","Battery Storage Verification","Investment / Partnership","Technical Integration","Other"].map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom:".85rem" }}><label style={{ display:"block", fontFamily:"var(--zm)", fontSize:".58rem", fontWeight:700, letterSpacing:".12em", color:"var(--zc3)", textTransform:"uppercase", marginBottom:".45rem" }}>Message</label><textarea className="zo-fta" placeholder="Tell us about your use case..."/></div>
                    <button type="submit" style={{ width:"100%", padding:".8rem", borderRadius:"8px", background:formSent?"var(--zt)":"var(--za)", color:"#080400", fontFamily:"var(--zm)", fontSize:".7rem", fontWeight:700, letterSpacing:".09em", textTransform:"uppercase", border:"none", cursor:"pointer", transition:"all .22s", display:"flex", alignItems:"center", justifyContent:"center", gap:".45rem" }}>
                      {formSent ? "✓ Message Sent" : <>Send Message <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12h14M12 5l7 7-7 7"/></svg></>}
                    </button>
                    <p style={{ fontFamily:"var(--zm)", fontSize:".58rem", color:"var(--zc3)", textAlign:"center", marginTop:".875rem", lineHeight:1.65, letterSpacing:".04em" }}>By submitting you agree to be contacted by ZelionTech regarding your inquiry.</p>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Product attribution footer ─── */}
      <footer style={{ padding:"2.5rem 0", borderTop:"1px solid var(--zw2)", background:"var(--zb1)" }}>
        <div style={{ maxWidth:"var(--max,1200px)", margin:"0 auto", padding:"0 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"9px", textDecoration:"none" }}>
              <span style={{ fontFamily:"var(--zm)", fontSize:".8rem", fontWeight:600, color:"var(--zc)", letterSpacing:".02em" }}>
                ZEV Oracle
              </span>
            </div>
            <span style={{ color:"var(--zc3)", fontFamily:"var(--zm)", fontSize:".72rem" }}>—</span>
            <span style={{ fontFamily:"var(--zm)", fontSize:".72rem", color:"var(--zc3)" }}>
              A product of{" "}
              <Link to="/" style={{ color:"var(--zc2)", textDecoration:"none" }}>ZelionTech</Link>
            </span>
          </div>
          <div style={{ fontFamily:"var(--zm)", fontSize:".65rem", color:"var(--zc3)", letterSpacing:".04em" }}>
            &copy; 2026 ZelionTech. All rights reserved.
          </div>
        </div>
        <div style={{ maxWidth:"var(--max,1200px)", margin:".875rem auto 0", padding:"0 2.5rem" }}>
          <p style={{ fontFamily:"var(--zm)", fontSize:".6rem", color:"var(--zc3)", lineHeight:1.65, letterSpacing:".025em" }}>
            $ZLN is a utility and coordination token. It does not represent equity, ownership, profit-sharing, or any investment return. This website does not constitute financial or investment advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ZevOracle;
