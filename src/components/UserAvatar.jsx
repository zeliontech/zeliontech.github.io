import { useWallet } from "@/context/WalletContext";
import { User } from "lucide-react";

const UserAvatar = ({ onClick }) => {
  const { walletAddress, ensName } = useWallet();

  // Get first 2 characters from address or ENS
  const getInitials = () => {
    if (ensName) {
      return ensName.substring(0, 2).toUpperCase();
    }
    if (walletAddress) {
      return walletAddress.substring(2, 4).toUpperCase();
    }
    return "??";
  };

  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-all hover:border-silver-light/50 hover:bg-silver-light/10"
      aria-label="User wallet menu"
    >
      {walletAddress ? (
        <span className="font-heading text-sm font-bold">
          {getInitials()}
        </span>
      ) : (
        <User className="h-5 w-5" />
      )}
    </button>
  );
};

export default UserAvatar;
