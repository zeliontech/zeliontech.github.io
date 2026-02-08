import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Smartphone, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { isMobileDevice } from "@/utils/deviceDetection";

const MODAL_STATES = {
  CONNECT: "connect",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ERROR: "error",
};

const MetaMaskConnectModal = ({ open, onOpenChange }) => {
  const { connectMetaMaskWallet, walletAddress, isConnecting } = useWallet();
  const [modalState, setModalState] = useState(MODAL_STATES.CONNECT);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset modal state when opened
  useEffect(() => {
    if (open) {
      setModalState(MODAL_STATES.CONNECT);
      setErrorMessage("");
    }
  }, [open]);

  const handleConnect = async () => {
    setModalState(MODAL_STATES.CONNECTING);
    setErrorMessage("");

    try {
      await connectMetaMaskWallet();
      setModalState(MODAL_STATES.CONNECTED);
      
      // Close modal after showing success
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (error) {
      setModalState(MODAL_STATES.ERROR);
      setErrorMessage(error.message || "Connection failed. Please try again.");
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderContent = () => {
    switch (modalState) {
      case MODAL_STATES.CONNECT:
        return (
          <div className="space-y-4 py-4">
            <button
              onClick={handleConnect}
              className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                    {isMobileDevice() ? (
                      <Smartphone className="h-6 w-6 text-silver-light" />
                    ) : (
                      <Wallet className="h-6 w-6 text-silver-light" />
                    )}
                  </div>
                  <div>
                    <div className="font-heading text-base font-semibold text-foreground">
                      {isMobileDevice() ? "Connect MetaMask" : "Connect MetaMask Wallet"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isMobileDevice() 
                        ? "Opens MetaMask app for connection" 
                        : "Connect with MetaMask extension or mobile app"}
                    </div>
                  </div>
                </div>
              </div>
            </button>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                {isMobileDevice() 
                  ? "Make sure you have MetaMask app installed. The app will open automatically when you connect." 
                  : "Don't have MetaMask? Scan the QR code with MetaMask mobile app or install the browser extension."}
              </p>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-silver-light hover:text-silver-mid underline"
              >
                Get MetaMask
              </a>
            </div>
          </div>
        );

      case MODAL_STATES.CONNECTING:
        return (
          <div className="space-y-6 py-8 text-center">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 animate-spin text-silver-light" />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold text-foreground mb-2">
                Connecting...
              </div>
              <div className="text-sm text-muted-foreground">
                {isMobileDevice() 
                  ? "Opening MetaMask app. Please approve the connection." 
                  : "Please approve the connection in MetaMask"}
              </div>
            </div>
          </div>
        );

      case MODAL_STATES.CONNECTED:
        return (
          <div className="space-y-6 py-8 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-silver-light" />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold text-foreground mb-2">
                Connected!
              </div>
              <div className="text-sm text-muted-foreground">
                {truncateAddress(walletAddress)}
              </div>
            </div>
          </div>
        );

      case MODAL_STATES.ERROR:
        return (
          <div className="space-y-6 py-4">
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm text-destructive whitespace-pre-line">
                {errorMessage}
              </AlertDescription>
            </Alert>
            <button
              onClick={handleConnect}
              className="w-full rounded-lg bg-silver-light/10 border border-silver-light/20 px-4 py-3 font-medium text-foreground hover:bg-silver-light/20 transition-colors"
            >
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md border-silver-mid/20">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            {modalState === MODAL_STATES.ERROR && "Connection Failed"}
            {(modalState === MODAL_STATES.CONNECTING || modalState === MODAL_STATES.CONNECTED) && "Connecting..."}
            {modalState === MODAL_STATES.CONNECT && "Connect Wallet"}
          </DialogTitle>
          {modalState === MODAL_STATES.CONNECT && (
            <DialogDescription className="text-muted-foreground">
              Connect your MetaMask wallet to purchase $ZLN using BNB.
            </DialogDescription>
          )}
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default MetaMaskConnectModal;
