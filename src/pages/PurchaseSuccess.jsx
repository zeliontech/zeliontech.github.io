import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, ExternalLink } from "lucide-react";

const PurchaseSuccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-silver-light/30 bg-silver-light/10">
                <CheckCircle2 className="h-12 w-12 text-silver-light" />
              </div>
              <div className="absolute inset-0 -z-10 rounded-full bg-silver-light/20 blur-2xl" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Transaction <span className="metal-gradient">Completed</span>
          </h1>

          {/* Description */}
          <div className="glass-card mx-auto mb-8 max-w-lg p-8">
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              Your $ZLN transaction has been submitted to the blockchain.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Confirmation time depends on network conditions.
              You will receive your tokens once the transaction is confirmed.
            </p>
          </div>

          {/* Transaction Details (Mock) */}
          <div className="glass-card mx-auto mb-8 max-w-lg p-6 text-left">
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-silver-light">
              Transaction Hash
            </div>
            <div className="mb-4 break-all font-mono text-sm text-muted-foreground">
              0x{Array.from({ length: 64 }, () => 
                Math.floor(Math.random() * 16).toString(16)
              ).join("")}
            </div>
            <div className="text-xs text-muted-foreground/60">
              Transaction details are available on the blockchain explorer
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <ExternalLink className="mr-2 h-5 w-5" />
                View Transaction
              </a>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-sm text-muted-foreground">
            <p className="mb-2">
              Need assistance? Contact support through official channels.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Always verify transaction details on the blockchain
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
