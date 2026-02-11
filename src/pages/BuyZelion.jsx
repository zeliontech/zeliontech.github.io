import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotifySignup from "@/components/NotifySignup";
import { Rocket } from "lucide-react";

const BuyZelion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-silver-light/10 p-6">
                <Rocket className="h-16 w-16 text-silver-light" />
              </div>
            </div>
            
            <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              <span className="metal-gradient">ZLN Token</span> Not Yet Released
            </h1>
          </div>

          {/* Notify Signup */}
          <NotifySignup />

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-silver-light hover:text-silver-mid underline transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyZelion;
