import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle, Home, RotateCcw, AlertTriangle } from "lucide-react";

const PurchaseError = () => {
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
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-destructive/30 bg-destructive/10">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <div className="absolute inset-0 -z-10 rounded-full bg-destructive/20 blur-2xl" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Transaction <span className="text-destructive">Not Completed</span>
          </h1>

          {/* Description */}
          <div className="glass-card mx-auto mb-8 max-w-lg p-8">
            <p className="mb-4 text-base leading-relaxed text-muted-foreground">
              The transaction was not completed.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Please review transaction details and try again.
              If the issue persists, contact support.
            </p>
          </div>

          {/* Possible Reasons */}
          <Alert className="mx-auto mb-8 max-w-lg border-border/50 bg-muted/30 text-left">
            <AlertTriangle className="h-4 w-4 text-silver-light" />
            <AlertDescription className="text-sm text-muted-foreground">
              <strong className="text-foreground">Common issues:</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Transaction rejected in wallet</li>
                <li>• Insufficient network fees</li>
                <li>• Network congestion or timeout</li>
                <li>• Invalid transaction parameters</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/buy">
                <RotateCcw className="mr-2 h-5 w-5" />
                Try Again
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 space-y-4 text-sm text-muted-foreground">
            <p>
              Need help? Visit our{" "}
              <Link to="/how-to-buy" className="text-silver-light hover:text-silver-mid underline">
                How to Buy guide
              </Link>
            </p>
            <p className="text-xs text-muted-foreground/60">
              Ensure your wallet has sufficient funds for both tokens and network fees
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchaseError;
