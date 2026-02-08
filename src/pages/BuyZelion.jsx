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
import MetaMaskConnectModal from "@/components/MetaMaskConnectModal";
import TransactionProcessingModal from "@/components/TransactionProcessingModal";

const BuyZelion = () => {
  const navigate = useNavigate();
  const { walletConnected, walletAddress, purchaseZLNWithBNB } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [bnbAmount, setBnbAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Check wallet connection on mount
  useEffect(() => {
    if (!walletConnected) {
      setShowConnectModal(true);
    }
  }, [walletConnected]);

  const handlePurchase = async () => {
    if (!walletConnected) {
      setShowConnectModal(true);
      return;
    }

    if (!bnbAmount || parseFloat(bnbAmount) <= 0) {
      return;
    }

    setIsProcessing(true);
    setShowProcessingModal(true);

    // Call mock purchase function
    const result = await purchaseZLNWithBNB(parseFloat(bnbAmount));
    
    setShowProcessingModal(false);
    setIsProcessing(false);
    
    if (result.success) {
      navigate("/purchase-success", { state: { txHash: result.txHash, zlnAmount: result.zlnAmount } });
    } else {
      navigate("/purchase-error");
    }
  };

  // Calculate estimated ZLN (mock conversion rate: 1 BNB = 10000 ZLN)
  const estimatedZLN = bnbAmount ? (parseFloat(bnbAmount) * 10000).toLocaleString() : "0";

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
              Purchase <span className="metal-gradient">$ZLN with BNB</span>
            </h1>
            <p className="mb-2 text-base text-muted-foreground">
              $ZLN is a utility token used for ecosystem coordination and infrastructure participation.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Purchases are processed using BNB only. Transactions require MetaMask confirmation.
            </p>
          </div>

          {/* Purchase Card */}
          <div className="glass-card p-8 lg:p-10">
            <div className="space-y-6">
              {/* Wallet Address */}
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-sm font-medium text-foreground">
                  Connected Wallet Address
                </Label>
                <Input
                  id="wallet"
                  type="text"
                  value={walletAddress || "Not connected"}
                  readOnly
                  className="font-mono text-sm bg-muted/50 cursor-not-allowed"
                />
              </div>

              {/* BNB Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="bnbAmount" className="text-sm font-medium text-foreground">
                  BNB Amount
                </Label>
                <Input
                  id="bnbAmount"
                  type="number"
                  min="0"
                  step="0.001"
                  placeholder="0.00"
                  value={bnbAmount}
                  onChange={(e) => setBnbAmount(e.target.value)}
                  disabled={!walletConnected || isProcessing}
                  className="text-lg"
                />
                <div className="text-xs text-muted-foreground">
                  Enter the amount of BNB you wish to spend
                </div>
              </div>

              {/* Estimated ZLN Output */}
              <div className="glass-card p-4 bg-muted/20">
                <div className="text-sm text-muted-foreground mb-1">
                  Estimated ZLN Received
                </div>
                <div className="font-heading text-2xl font-bold text-foreground">
                  {estimatedZLN} <span className="text-base text-muted-foreground">$ZLN</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Rate: 1 BNB = 10,000 ZLN
                </div>
              </div>

              {/* Notice */}
              <Alert className="border-border/50 bg-muted/30">
                <AlertTriangle className="h-4 w-4 text-silver-light" />
                <AlertDescription className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> Purchases are processed using BNB only. 
                  Blockchain transactions are irreversible once confirmed.
                </AlertDescription>
              </Alert>

              {/* CTA Button */}
              <Button
                onClick={handlePurchase}
                disabled={!walletConnected || !bnbAmount || parseFloat(bnbAmount) <= 0 || isProcessing}
                className="w-full"
                variant="hero"
                size="lg"
              >
                Buy $ZLN with BNB
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
      <MetaMaskConnectModal
        open={showConnectModal}
        onOpenChange={setShowConnectModal}
      />
      <TransactionProcessingModal
        open={showProcessingModal}
        onOpenChange={setShowProcessingModal}
      />
    </div>
  );
};

export default BuyZelion;
