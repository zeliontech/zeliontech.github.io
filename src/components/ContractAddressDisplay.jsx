import { useState } from "react";
import { Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContractAddressDisplay = ({ contractAddress }) => {
  const [copied, setCopied] = useState(false);

  // Shorten address for display
  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (contractAddress) {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // BscScan link
  const bscScanUrl = `https://bscscan.com/address/${contractAddress}`;

  return (
    <div className="space-y-2">
      <Label htmlFor="contract" className="text-sm font-medium text-foreground">
        Zelion Smart Contract Address
      </Label>
      <div className="flex gap-2">
        <Input
          id="contract"
          type="text"
          value={contractAddress ? shortenAddress(contractAddress) : "Not configured"}
          readOnly
          className="font-mono text-sm bg-muted/50 cursor-not-allowed flex-1"
        />
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex-shrink-0"
          disabled={!contractAddress}
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-shrink-0"
          disabled={!contractAddress}
        >
          <a
            href={bscScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            BscScan
          </a>
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        ZLN token contract on BNB Smart Chain
      </div>
    </div>
  );
};

export default ContractAddressDisplay;
