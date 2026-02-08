import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, CheckCircle2, Loader2, Shield } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

const WalletConnectModal = ({ open, onOpenChange }) => {
  const { connectWallet, isConnecting, walletAddress } = useWallet();
  const [connectionState, setConnectionState] = useState("idle"); // idle | connecting | connected

  const handleConnect = async () => {
    setConnectionState("connecting");
    try {
      await connectWallet();
      setConnectionState("connected");
      // Close modal after short delay to show success state
      setTimeout(() => {
        onOpenChange(false);
        setConnectionState("idle");
      }, 1500);
    } catch (error) {
      setConnectionState("idle");
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
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect your Web3 wallet to continue.
            <br />
            Wallet connection is required to access the $ZLN purchase interface.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Wallet Option Button */}
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
                    MetaMask
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {connectionState === "idle" && "Click to connect"}
                    {connectionState === "connecting" && "Connecting..."}
                    {connectionState === "connected" && `Connected: ${truncateAddress(walletAddress)}`}
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
              </div>
            </div>
          </button>

          {/* Security Notice */}
          <Alert className="border-border/50 bg-muted/30">
            <Shield className="h-4 w-4 text-silver-light" />
            <AlertDescription className="text-sm text-muted-foreground">
              Always verify wallet requests before approving connections.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
