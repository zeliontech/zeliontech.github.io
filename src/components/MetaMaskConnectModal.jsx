import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, CheckCircle2, Loader2, Shield, AlertTriangle } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

const MetaMaskConnectModal = ({ open, onOpenChange }) => {
  const { connectMetaMaskWallet, isConnecting, walletAddress } = useWallet();
  const [connectionState, setConnectionState] = useState("idle"); // idle | connecting | connected | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = async () => {
    setConnectionState("connecting");
    setErrorMessage("");
    
    try {
      await connectMetaMaskWallet();
      setConnectionState("connected");
      // Close modal after short delay to show success state
      setTimeout(() => {
        onOpenChange(false);
        setConnectionState("idle");
        setErrorMessage("");
      }, 1500);
    } catch (error) {
      setConnectionState("error");
      setErrorMessage(error.message || "Connection failed. Please try again.");
      console.error("Connection failed:", error);
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md border-silver-mid/20">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            Connect MetaMask Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect your MetaMask wallet to purchase $ZLN using BNB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Error Alert - Only shown after connection attempt fails */}
          {connectionState === "error" && errorMessage && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive whitespace-pre-line">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Wallet Connection Button */}
          <button
            onClick={handleConnect}
            disabled={isConnecting || connectionState === "connected"}
            className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                  <Wallet className="h-6 w-6 text-silver-light" />
                </div>
                <div>
                  <div className="font-heading text-base font-semibold text-foreground">
                    Connect with MetaMask Wallet
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {connectionState === "idle" && "Click to connect"}
                    {connectionState === "connecting" && "Waiting for MetaMask approval..."}
                    {connectionState === "connected" && `Connected: ${truncateAddress(walletAddress)}`}
                    {connectionState === "error" && "Connection failed - Click to retry"}
                  </div>
                </div>
              </div>
              <div>
                {connectionState === "idle" && (
                  <div className="h-6 w-6" />
                )}
                {connectionState === "connecting" && (
                  <Loader2 className="h-6 w-6 animate-spin text-silver-light" />
                )}
                {connectionState === "connected" && (
                  <CheckCircle2 className="h-6 w-6 text-silver-light" />
                )}
                {connectionState === "error" && (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                )}
              </div>
            </div>
          </button>

          {/* Security Notice */}
          <Alert className="border-border/50 bg-muted/30">
            <Shield className="h-4 w-4 text-silver-light" />
            <AlertDescription className="text-sm text-muted-foreground">
              Always verify connection requests inside MetaMask before approving.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetaMaskConnectModal;
