import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import usePageTracking from "./hooks/usePageTracking";
import useScrollTracking from "./hooks/useScrollTracking";

// Route-level code splitting: each page loads its own chunk so heavy
// dependencies (three.js, Firebase forms, web3) stay off the critical path
// of every other route.
const Index = lazy(() => import("./pages/Index"));
const HowToBuy = lazy(() => import("./pages/HowToBuy"));
const TokenomicsPage = lazy(() => import("./pages/TokenomicsPage"));
const Technology = lazy(() => import("./pages/Technology"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Legal = lazy(() => import("./pages/Legal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const BuyZelion = lazy(() => import("./pages/BuyZelion"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Notify = lazy(() => import("./pages/Notify"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Zevoracle = lazy(() => import("./pages/Zevoracle"));

// App content with hooks (must be inside Router)
const AppContent = () => {
  usePageTracking();
  useScrollTracking();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/how-to-buy" element={<HowToBuy />} /> */}
          <Route path="/tokenomics" element={<TokenomicsPage />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/oracle" element={<Zevoracle />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* <Route path="/buy" element={<BuyZelion />} /> */}
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="/notify" element={<Notify />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  // Initialize Firebase Analytics after mount via dynamic import so the
  // Firebase SDK stays out of the initial bundle / critical path. Skipped
  // entirely when no measurement ID is configured (analytics disabled) —
  // otherwise the SDK fires a broken gtag request with id=undefined.
  useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) return;
    import("./firebase/firebaseConfig").then(({ initAnalytics }) => {
      initAnalytics();
    });
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
