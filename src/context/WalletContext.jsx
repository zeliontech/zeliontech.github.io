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

  // Mock wallet connection - simulates async behavior
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock wallet address
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

  const value = {
    walletConnected,
    walletAddress,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
