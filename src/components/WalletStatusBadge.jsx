import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WalletStatusBadge = () => {
  const { walletConnected, walletAddress, disconnectWallet } = useWallet();

  if (!walletConnected || !walletAddress) {
    return null;
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="metal" size="sm" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            Connected: {truncateAddress(walletAddress)}
          </span>
          <span className="sm:hidden">
            {truncateAddress(walletAddress)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card w-56 border-border/50">
        <DropdownMenuLabel className="font-heading text-foreground">
          Wallet
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <div className="px-2 py-2">
          <div className="text-xs text-muted-foreground mb-1">Address</div>
          <div className="font-mono text-sm text-foreground break-all">
            {walletAddress}
          </div>
        </div>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem
          onClick={disconnectWallet}
          className="cursor-pointer text-muted-foreground hover:text-foreground focus:text-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletStatusBadge;
