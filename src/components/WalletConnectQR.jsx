import { QRCodeSVG } from "qrcode.react";
import { Loader2 } from "lucide-react";

const WalletConnectQR = ({ uri, onBack }) => {
  return (
    <div className="space-y-6 py-4">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Scan with MetaMask
        </h3>
        <p className="text-sm text-muted-foreground">
          Use MetaMask mobile app to scan and connect.
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="glass-card p-6 rounded-lg border border-border/50">
          {uri ? (
            <QRCodeSVG
              value={uri}
              size={256}
              level="M"
              includeMargin={true}
              bgColor="#0a0a0a"
              fgColor="#F1F5F9"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-silver-light" />
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3 text-center text-sm text-muted-foreground">
        <p>1. Open MetaMask app on your phone</p>
        <p>2. Tap the scan icon</p>
        <p>3. Scan this QR code</p>
      </div>

      {/* Don't have MetaMask? */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Don't have MetaMask?
        </p>
        <button
          onClick={onBack}
          className="text-sm text-silver-light hover:text-silver-mid underline transition-colors"
        >
          Get MetaMask
        </button>
      </div>
    </div>
  );
};

export default WalletConnectQR;
