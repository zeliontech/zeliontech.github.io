import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContractAddressDisplay from "@/components/ContractAddressDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowRight, RefreshCw, Wallet, Info } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { useZlnConversion } from "@/hooks/useZlnConversion";
import MetaMaskModal from "@/components/MetaMaskModal";
import TransactionProcessingModal from "@/components/TransactionProcessingModal";

// Contract address from environment variable
const ZLN_CONTRACT_ADDRESS = import.meta.env.VITE_ZLN_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

const BuyZelion = () => {
  const navigate = useNavigate();
  const { 
    walletConnected, 
    walletAddress, 
    chainId, 
    balance, 
    error, 
    isConnecting,
    connectMetaMaskWallet,
    purchaseZLNWithBNB 
  } = useWallet();
  
  // Use conversion hook
  const {
    bnbAmount,
    zlnAmount,
    handleBnbChange,
    handleZlnChange,
    zlnRate,
  } = useZlnConversion();
  
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [connectionAttempted, setConnectionAttempted] = useState(false);

  // Check wallet connection on mount
  useEffect(() => {
    if (!walletConnected) {
      setConnectionAttempted(true);
    }
  }, [walletConnected]);

  // Retry connection handler
  const handleRetryConnection = async () => {
    try {
      setConnectionAttempted(false);
      await connectMetaMaskWallet();
    } catch (err) {
      setConnectionAttempted(true);
      console.error("Connection failed:", err);
    }
  };

  // Check if on correct network (BSC = 56)
  const isCorrectNetwork = chainId === 56;

  // Validation for buy button
  const isBuyDisabled = !walletConnected || 
                        !bnbAmount || 
                        parseFloat(bnbAmount) <= 0 || 
                        isProcessing || 
                        !isCorrectNetwork ||
                        (balance && parseFloat(bnbAmount) > parseFloat(balance));

  const handlePurchase = async () => {
    if (!walletConnected) {
      setShowConnectModal(true);
      return;
    }

    const bnbValue = parseFloat(bnbAmount);
    
    if (!bnbAmount || bnbValue <= 0) {
      setPurchaseError("Please enter a valid BNB amount");
      return;
    }

    // Check if amount exceeds balance
    if (balance && bnbValue > parseFloat(balance)) {
      setPurchaseError("Insufficient BNB balance");
      return;
    }

    setPurchaseError("");
    setIsProcessing(true);
    setShowProcessingModal(true);

    // Call real purchase function (still uses BNB only)
    const result = await purchaseZLNWithBNB(bnbValue);
    
    setShowProcessingModal(false);
    setIsProcessing(false);
    
    if (result.success) {
      navigate("/purchase-success", { 
        state: { 
          txHash: result.txHash, 
          zlnAmount: result.zlnAmount, 
          bnbAmount: bnbValue 
        } 
      });
    } else {
      setPurchaseError(result.error || "Transaction failed");
      navigate("/purchase-error", { state: { error: result.error } });
    }
  };

  // Calculate estimated ZLN (mock conversion rate: 1 BNB = 10000 ZLN)
  const estimatedZLN = bnbAmount ? (parseFloat(bnbAmount) * 10000).toLocaleString() : "0";

  // Connection failure state
  if (error && connectionAttempted && !walletConnected) {
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
            <div className="glass-card p-8 lg:p-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-destructive/10 p-4">
                  <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
              </div>
              
              <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
                Connection Failed
              </h1>
              
              <p className="mb-6 text-base text-muted-foreground">
                We could not connect to your wallet. Please check MetaMask permissions and try again.
              </p>
              
              {error && (
                <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-mono">{error}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleRetryConnection}
                  variant="hero"
                  size="lg"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Retry Connection
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="lg"
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Wallet not connected - connection required gate
  if (!walletConnected) {
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
            <div className="glass-card p-8 lg:p-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-muted p-4 border border-border">
                  <Wallet className="h-12 w-12 text-silver-light" />
                </div>
              </div>
              
              <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">
                Wallet Connection Required
              </h1>
              
              <p className="mb-6 text-base text-muted-foreground">
                Please connect your wallet to purchase $ZLN tokens.
              </p>
              
              <Button
                onClick={() => setShowConnectModal(true)}
                variant="hero"
                size="lg"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </div>
          </motion.div>
        </main>
        
        <Footer />
        
        <MetaMaskModal
          open={showConnectModal}
          onOpenChange={setShowConnectModal}
        />
      </div>
    );
  }

  // Main purchase UI (wallet connected)
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
              {/* Network Warning */}
              {walletConnected && !isCorrectNetwork && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-sm text-destructive">
                    <strong>Wrong Network:</strong> Please switch MetaMask to BNB Smart Chain (Chain ID: 56)
                  </AlertDescription>
                </Alert>
              )}

              {/* Wallet Context Error */}
              {error && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-sm text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Purchase Error */}
              {purchaseError && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-sm text-destructive">
                    {purchaseError}
                  </AlertDescription>
                </Alert>
              )}

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

              {/* Balance Display */}
              {balance && walletConnected && (
                <div className="glass-card p-3 bg-muted/20">
                  <div className="text-xs text-muted-foreground">Available Balance</div>
                  <div className="font-heading text-lg font-bold text-foreground">
                    {parseFloat(balance).toFixed(4)} <span className="text-sm text-muted-foreground">BNB</span>
                  </div>
                </div>
              )}

              {/* Network Info */}
              {chainId && (
                <div className="text-xs text-muted-foreground">
                  Network: {chainId === 56 ? "BNB Smart Chain" : `Chain ID ${chainId}`}
                  {chainId === 56 && " ✓"}
                </div>
              )}

              {/* Smart Contract Address */}
              <ContractAddressDisplay contractAddress={ZLN_CONTRACT_ADDRESS} />

              {/* Conversion Info Banner */}
              <Alert className="border-silver-light/20 bg-silver-light/5">
                <Info className="h-4 w-4 text-silver-light" />
                <AlertDescription className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Auto-conversion:</strong> Values update automatically based on current rate (1 BNB = {zlnRate.toLocaleString()} ZLN)
                </AlertDescription>
              </Alert>

              {/* BNB Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="bnbAmount" className="text-sm font-medium text-foreground">
                  BNB Amount
                </Label>
                <Input
                  id="bnbAmount"
                  type="number"
                  min="0"
                  step="0.000001"
                  placeholder="0.00"
                  value={bnbAmount}
                  onChange={(e) => handleBnbChange(e.target.value)}
                  disabled={!walletConnected || isProcessing || !isCorrectNetwork}
                  className="text-lg"
                />
                <div className="text-xs text-muted-foreground">
                  Enter the amount of BNB you wish to spend
                </div>
              </div>

              {/* ZLN Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="zlnAmount" className="text-sm font-medium text-foreground">
                  ZLN Amount
                </Label>
                <Input
                  id="zlnAmount"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0.00"
                  value={zlnAmount}
                  onChange={(e) => handleZlnChange(e.target.value)}
                  disabled={!walletConnected || isProcessing || !isCorrectNetwork}
                  className="text-lg"
                />
                <div className="text-xs text-muted-foreground">
                  Enter the amount of ZLN you want to receive
                </div>
              </div>

              {/* Estimated ZLN Output - Keep for clarity */}
              {bnbAmount && zlnAmount && (
                <div className="glass-card p-4 bg-muted/20">
                  <div className="text-sm text-muted-foreground mb-1">
                    Transaction Summary
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">You Send:</span>
                    <span className="font-heading text-lg font-bold text-foreground">
                      {parseFloat(bnbAmount).toFixed(6)} BNB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You Receive:</span>
                    <span className="font-heading text-lg font-bold text-foreground">
                      {parseFloat(zlnAmount).toLocaleString()} $ZLN
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Rate: 1 BNB = {zlnRate.toLocaleString()} ZLN
                  </div>
                </div>
              )}

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
                disabled={isBuyDisabled}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {!isCorrectNetwork && walletConnected ? "Wrong Network" : "Buy $ZLN with BNB"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {!walletConnected && (
                <div className="text-center text-sm text-muted-foreground">
                  Please connect your MetaMask wallet to continue
                </div>
              )}

              {walletConnected && !isCorrectNetwork && (
                <div className="text-center text-sm text-destructive">
                  Please switch to BNB Smart Chain in MetaMask
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
      <MetaMaskModal
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
