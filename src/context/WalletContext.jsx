import { createContext, useContext, useState, useCallback } from "react";

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Mock MetaMask connection - simulates async wallet connection
  const connectMetaMaskWallet = useCallback(async () => {
    setIsConnecting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock wallet address (MetaMask format)
    const mockAddress = "0x" + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    setWalletAddress(mockAddress);
    setWalletConnected(true);
    setIsConnecting(false);
    
    return mockAddress;
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress(null);
  }, []);

  // Mock BNB purchase function - simulates blockchain transaction
  const purchaseZLNWithBNB = useCallback(async (bnbAmount) => {
    // Simulate transaction processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock random success/failure (70% success rate)
    const success = Math.random() > 0.3;
    
    if (success) {
      return {
        success: true,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        zlnAmount: bnbAmount * 10000, // Mock conversion rate: 1 BNB = 10000 ZLN
      };
    } else {
      return {
        success: false,
        error: "Transaction failed. Please try again.",
      };
    }
  }, []);

  const value = {
    walletConnected,
    walletAddress,
    isConnecting,
    connectMetaMaskWallet,
    disconnectWallet,
    purchaseZLNWithBNB,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
