import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import WalletConnectModal from "@/components/WalletConnectModal";
import TransactionProcessingModal from "@/components/TransactionProcessingModal";

const BuyZelion = () => {
  const navigate = useNavigate();
  const { walletConnected, walletAddress } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Check wallet connection on mount
  useEffect(() => {
    if (!walletConnected) {
      setShowConnectModal(true);
    }
  }, [walletConnected]);

  const handlePurchase = () => {
    if (!walletConnected) {
      setShowConnectModal(true);
      return;
    }

    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      return;
    }

    setIsProcessing(true);
    setShowProcessingModal(true);
  };

  const handleTransactionComplete = (success) => {
    setShowProcessingModal(false);
    setIsProcessing(false);
    
    if (success) {
      navigate("/purchase-success");
    } else {
      navigate("/purchase-error");
    }
  };

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
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Purchase <span className="metal-gradient">$ZLN</span>
            </h1>
            <p className="mb-2 text-base text-muted-foreground">
              $ZLN is a utility token used for ecosystem coordination and infrastructure participation.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Blockchain transactions require wallet confirmation.
            </p>
          </div>

          {/* Purchase Card */}
          <div className="glass-card p-8 lg:p-10">
            <div className="space-y-6">
              {/* Wallet Address */}
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-sm font-medium text-foreground">
                  Wallet Address
                </Label>
                <Input
                  id="wallet"
                  type="text"
                  value={walletAddress || "Not connected"}
                  readOnly
                  className="font-mono text-sm bg-muted/50 cursor-not-allowed"
                />
              </div>

              {/* Token Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-foreground">
                  Token Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  disabled={!walletConnected || isProcessing}
                  className="text-lg"
                />
                <div className="text-xs text-muted-foreground">
                  Enter the amount of $ZLN tokens you wish to purchase
                </div>
              </div>

              {/* Notice */}
              <Alert className="border-border/50 bg-muted/30">
                <AlertTriangle className="h-4 w-4 text-silver-light" />
                <AlertDescription className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> Blockchain transactions are irreversible once confirmed.
                  Always verify transaction details before proceeding.
                </AlertDescription>
              </Alert>

              {/* CTA Button */}
              <Button
                onClick={handlePurchase}
                disabled={!walletConnected || !tokenAmount || parseFloat(tokenAmount) <= 0 || isProcessing}
                className="w-full"
                variant="hero"
                size="lg"
              >
                Confirm Purchase
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {!walletConnected && (
                <div className="text-center text-sm text-muted-foreground">
                  Please connect your wallet to continue
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help? Visit our{" "}
              <a href="/how-to-buy" className="text-silver-light hover:text-silver-mid underline">
                How to Buy guide
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Modals */}
      <WalletConnectModal
        open={showConnectModal}
        onOpenChange={setShowConnectModal}
      />
      <TransactionProcessingModal
        open={showProcessingModal}
        onOpenChange={setShowProcessingModal}
        onComplete={handleTransactionComplete}
      />
    </div>
  );
};

export default BuyZelion;
