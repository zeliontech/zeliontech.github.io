import { QRCodeSVG } from "qrcode.react";
import { getMetaMaskDownloadUrls, getDeviceOS } from "@/utils/deviceDetection";

const WalletDownloadQR = ({ onBack }) => {
  const downloadUrls = getMetaMaskDownloadUrls();
  const deviceOS = getDeviceOS();
  
  // Get appropriate download URL based on device
  const getDownloadUrl = () => {
    if (deviceOS === "ios") return downloadUrls.ios;
    if (deviceOS === "android") return downloadUrls.android;
    return downloadUrls.universal;
  };

  const downloadUrl = getDownloadUrl();

  return (
    <div className="space-y-6 py-4">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          Get MetaMask
        </h3>
        <p className="text-sm text-muted-foreground">
          Scan with your phone camera to download MetaMask.
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="glass-card p-6 rounded-lg border border-border/50">
          <QRCodeSVG
            value={downloadUrl}
            size={256}
            level="M"
            includeMargin={true}
            bgColor="#0a0a0a"
            fgColor="#F1F5F9"
          />
        </div>
      </div>

      {/* Platform buttons */}
      <div className="space-y-2">
        <a
          href={downloadUrls.ios}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-hover block w-full rounded-lg border border-border/50 p-4 text-center transition-all"
        >
          <div className="font-heading text-sm font-semibold text-foreground">
            Download for iOS
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            App Store
          </div>
        </a>

        <a
          href={downloadUrls.android}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-hover block w-full rounded-lg border border-border/50 p-4 text-center transition-all"
        >
          <div className="font-heading text-sm font-semibold text-foreground">
            Download for Android
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Google Play
          </div>
        </a>

        <a
          href={downloadUrls.extension}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-hover block w-full rounded-lg border border-border/50 p-4 text-center transition-all"
        >
          <div className="font-heading text-sm font-semibold text-foreground">
            Browser Extension
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Chrome, Firefox, Edge
          </div>
        </a>
      </div>

      {/* Back button */}
      <div className="text-center pt-2">
        <button
          onClick={onBack}
          className="text-sm text-silver-light hover:text-silver-mid underline transition-colors"
        >
          Back to connection options
        </button>
      </div>
    </div>
  );
};

export default WalletDownloadQR;
