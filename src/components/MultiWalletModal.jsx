import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, QrCode, Smartphone, Download, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { isMetaMaskExtension, isMobileDevice } from "@/utils/deviceDetection";
import WalletConnectQR from "./WalletConnectQR";
import WalletDownloadQR from "./WalletDownloadQR";

const MODAL_STATES = {
  CONNECT_OPTIONS: "connect_options",
  SCAN_QR: "scan_qr",
  GET_METAMASK: "get_metamask",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ERROR: "error",
};

const MultiWalletModal = ({ open, onOpenChange }) => {
  const {
    connectMetaMaskWallet,
    connectWalletConnectWallet,
    walletAddress,
    isConnecting,
  } = useWallet();

  const [modalState, setModalState] = useState(MODAL_STATES.CONNECT_OPTIONS);
  const [errorMessage, setErrorMessage] = useState("");
  const [wcUri, setWcUri] = useState("");

  // Reset modal state when opened
  useEffect(() => {
    if (open) {
      setModalState(MODAL_STATES.CONNECT_OPTIONS);
      setErrorMessage("");
      setWcUri("");
    }
  }, [open]);

  const handleMetaMaskConnect = async () => {
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
      // Handle mobile redirect
      if (error.message === "MOBILE_REDIRECT") {
        setModalState(MODAL_STATES.CONNECTING);
        setErrorMessage("Opening MetaMask app...");
        return;
      }

      setModalState(MODAL_STATES.ERROR);
      setErrorMessage(error.message || "Connection failed. Please try again.");
    }
  };

  const handleWalletConnectScan = async () => {
    setModalState(MODAL_STATES.SCAN_QR);
    setErrorMessage("");

    try {
      const { uri } = await connectWalletConnectWallet();
      setWcUri(uri);
    } catch (error) {
      setModalState(MODAL_STATES.ERROR);
      setErrorMessage(error.message || "Failed to generate QR code. Please try again.");
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderContent = () => {
    switch (modalState) {
      case MODAL_STATES.CONNECT_OPTIONS:
        return (
          <div className="space-y-4 py-4">
            {/* MetaMask Extension (Desktop only) */}
            {isMetaMaskExtension() && (
              <button
                onClick={handleMetaMaskConnect}
                className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                      <Wallet className="h-6 w-6 text-silver-light" />
                    </div>
                    <div>
                      <div className="font-heading text-base font-semibold text-foreground">
                        MetaMask Extension
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Connect with browser extension
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* MetaMask Mobile (Mobile only) */}
            {isMobileDevice() && (
              <button
                onClick={handleMetaMaskConnect}
                className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                      <Smartphone className="h-6 w-6 text-silver-light" />
                    </div>
                    <div>
                      <div className="font-heading text-base font-semibold text-foreground">
                        Connect with MetaMask
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Open in MetaMask app
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* WalletConnect QR (Desktop without extension) */}
            {!isMobileDevice() && !isMetaMaskExtension() && (
              <button
                onClick={handleWalletConnectScan}
                className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                      <QrCode className="h-6 w-6 text-silver-light" />
                    </div>
                    <div>
                      <div className="font-heading text-base font-semibold text-foreground">
                        Scan with MetaMask
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Use mobile app to scan QR code
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Get MetaMask */}
            <button
              onClick={() => setModalState(MODAL_STATES.GET_METAMASK)}
              className="glass-card-hover relative w-full overflow-hidden p-6 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
                    <Download className="h-6 w-6 text-silver-light" />
                  </div>
                  <div>
                    <div className="font-heading text-base font-semibold text-foreground">
                      Get MetaMask
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Download for mobile or desktop
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        );

      case MODAL_STATES.SCAN_QR:
        return (
          <WalletConnectQR
            uri={wcUri}
            onBack={() => setModalState(MODAL_STATES.GET_METAMASK)}
          />
        );

      case MODAL_STATES.GET_METAMASK:
        return (
          <WalletDownloadQR
            onBack={() => setModalState(MODAL_STATES.CONNECT_OPTIONS)}
          />
        );

      case MODAL_STATES.CONNECTING:
        return (
          <div className="space-y-6 py-8 text-center">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 animate-spin text-silver-light" />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold text-foreground mb-2">
                Waiting for approval...
              </div>
              <div className="text-sm text-muted-foreground">
                {errorMessage || "Please approve the connection in MetaMask"}
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
              onClick={() => setModalState(MODAL_STATES.CONNECT_OPTIONS)}
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
            {modalState === MODAL_STATES.SCAN_QR && "Scan QR Code"}
            {modalState === MODAL_STATES.GET_METAMASK && "Get MetaMask"}
            {(modalState === MODAL_STATES.CONNECT_OPTIONS || modalState === MODAL_STATES.ERROR) && "Connect Wallet"}
            {(modalState === MODAL_STATES.CONNECTING || modalState === MODAL_STATES.CONNECTED) && "Connecting..."}
          </DialogTitle>
          {modalState === MODAL_STATES.CONNECT_OPTIONS && (
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

export default MultiWalletModal;
