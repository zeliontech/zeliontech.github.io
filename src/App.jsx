import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import usePageTracking from "./hooks/usePageTracking";
import useScrollTracking from "./hooks/useScrollTracking";
import { initAnalytics } from "./firebase/firebaseConfig";
import Index from "./pages/Index";
import HowToBuy from "./pages/HowToBuy";
import TokenomicsPage from "./pages/TokenomicsPage";
import Technology from "./pages/Technology";
import Whitepaper from "./pages/Whitepaper";
import Legal from "./pages/Legal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BuyZelion from "./pages/BuyZelion";
import ContactUs from "./pages/ContactUs";
import Notify from "./pages/Notify";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// App content with hooks (must be inside Router)
const AppContent = () => {
  usePageTracking();
  useScrollTracking();
  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-to-buy" element={<HowToBuy />} />
        <Route path="/tokenomics" element={<TokenomicsPage />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/buy" element={<BuyZelion />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  // Initialize Firebase Analytics on app mount
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
