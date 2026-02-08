import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, LogOut, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const UserWalletMenu = ({ open, onClose }) => {
  const { walletAddress, ensName, networkName, balance, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  // Shortened wallet address
  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Copy address to clipboard
  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    await disconnectWallet();
    onClose();
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-2 w-80 glass-card border border-border/50 p-4 shadow-xl z-50"
        >
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-border/50">
            <div className="font-heading text-sm font-semibold text-foreground mb-1">
              {ensName || shortenAddress(walletAddress)}
            </div>
            {ensName && (
              <div className="text-xs text-muted-foreground font-mono">
                {shortenAddress(walletAddress)}
              </div>
            )}
          </div>

          {/* Wallet Info */}
          <div className="space-y-3 mb-4">
            {/* Wallet Address */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Wallet Address</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-silver-light hover:text-silver-mid transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Network */}
            {networkName && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Network</span>
                <span className="text-xs text-foreground font-medium">{networkName}</span>
              </div>
            )}

            {/* BNB Balance */}
            {balance && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">BNB Balance</span>
                <span className="text-xs text-foreground font-medium">
                  {parseFloat(balance).toFixed(4)} BNB
                </span>
              </div>
            )}

            {/* ZLN Balance - Placeholder for future implementation */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">ZLN Balance</span>
              <span className="text-xs text-muted-foreground/60">Not available</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 my-4"></div>

          {/* Actions */}
          <div className="space-y-2">
            {/* View on BscScan */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full justify-between"
            >
              <a
                href={`https://bscscan.com/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <span>View on BscScan</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {/* Disconnect */}
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              size="sm"
              className="w-full justify-between"
            >
              <span>Disconnect Wallet</span>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserWalletMenu;
