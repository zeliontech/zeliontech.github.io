import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import CursorSpotlight from "./components/CursorSpotlight";
import usePageTracking from "./hooks/usePageTracking";
import useScrollTracking from "./hooks/useScrollTracking";

// Route-level code splitting: each page loads its own chunk so heavy
// dependencies (three.js, Firebase forms, web3) stay off the critical path
// of every other route.
const Index = lazy(() => import("./pages/Index"));
const TokenomicsPage = lazy(() => import("./pages/TokenomicsPage"));
const Technology = lazy(() => import("./pages/Technology"));
const CarbonCredits = lazy(() => import("./pages/CarbonCredits"));
const About = lazy(() => import("./pages/About"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Legal = lazy(() => import("./pages/Legal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

// App content with hooks (must be inside Router)
const AppContent = () => {
  usePageTracking();
  useScrollTracking();

  return (
    <>
      <ScrollToTop />
      <CursorSpotlight />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tokenomics" element={<TokenomicsPage />} />
          {/* /zev is the canonical product page; /technology is kept as an
              alias so older links and the previous navigation still resolve. */}
          <Route path="/zev" element={<Technology />} />
          <Route path="/technology" element={<Technology />} />
          {/* The previous site had a Partners page; the approved navigation
              folds that story into About, so old links land there. */}
          <Route path="/partners" element={<Navigate to="/about" replace />} />
          <Route path="/carbon" element={<CarbonCredits />} />
          <Route path="/about" element={<About />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
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
