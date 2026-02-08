import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Index from "./pages/Index";
import HowToBuy from "./pages/HowToBuy";
import TokenomicsPage from "./pages/TokenomicsPage";
import Technology from "./pages/Technology";
import Whitepaper from "./pages/Whitepaper";
import Legal from "./pages/Legal";
import BuyZelion from "./pages/BuyZelion";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseError from "./pages/PurchaseError";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-to-buy" element={<HowToBuy />} />
            <Route path="/tokenomics" element={<TokenomicsPage />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/buy" element={<BuyZelion />} />
            <Route path="/purchase-success" element={<PurchaseSuccess />} />
            <Route path="/purchase-error" element={<PurchaseError />} />
            <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
