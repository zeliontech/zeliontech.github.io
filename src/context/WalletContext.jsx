import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  connectMetaMask,
  sendBNBTransaction,
  getChainId,
  getBNBBalance,
  isMetaMaskInstalled,
  onAccountsChanged,
  onChainChanged,
  removeListeners,
  switchToBSC,
} from "@/services/web3";
import {
  initWalletConnect,
  connectWalletConnect,
  disconnectWalletConnect,
  sendBNBViaWalletConnect,
  getWalletConnectChainId,
  setupWalletConnectListeners,
  removeWalletConnectListeners,
  getWalletConnectUri,
} from "@/services/walletconnectService";

// Treasury address for ZLN purchases
// Use environment variable or fallback to placeholder for development
const TREASURY_ADDRESS = import.meta.env.VITE_TREASURY_ADDRESS || "0x0000000000000000000000000000000000000000";

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
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [connectionMethod, setConnectionMethod] = useState(null); // 'metamask' | 'walletconnect' | null

  // Real MetaMask connection - follows modern dApp standards
  // Only checks for MetaMask AFTER user clicks connect
  const connectMetaMaskWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Connect to MetaMask
      const address = await connectMetaMask();
      
      // Get chain ID
      const currentChainId = await getChainId();
      
      // Get balance
      const currentBalance = await getBNBBalance(address);
      
      setWalletAddress(address);
      setChainId(currentChainId);
      setBalance(currentBalance);
      setWalletConnected(true);
      setConnectionMethod('metamask');
      
      return address;
    } catch (err) {
      setError(err.message);
      setWalletConnected(false);
      setWalletAddress(null);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // WalletConnect connection
  const connectWalletConnectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Initialize and connect WalletConnect
      await initWalletConnect();
      const { address, provider } = await connectWalletConnect();
      
      // Get chain ID
      const currentChainId = await getWalletConnectChainId();
      
      // Get balance
      const currentBalance = await getBNBBalance(address);
      
      // Get WalletConnect URI for QR code
      const uri = getWalletConnectUri();
      
      setWalletAddress(address);
      setChainId(currentChainId);
      setBalance(currentBalance);
      setWalletConnected(true);
      setConnectionMethod('walletconnect');
      
      return { address, uri };
    } catch (err) {
      setError(err.message);
      setWalletConnected(false);
      setWalletAddress(null);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    if (connectionMethod === 'walletconnect') {
      await disconnectWalletConnect();
    }
    
    setWalletConnected(false);
    setWalletAddress(null);
    setChainId(null);
    setBalance(null);
    setError(null);
    setConnectionMethod(null);
  }, [connectionMethod]);

  // Real BNB purchase function
  const purchaseZLNWithBNB = useCallback(async (bnbAmount) => {
    setError(null);
    
    try {
      // Check if wallet is connected
      if (!walletConnected || !walletAddress) {
        throw new Error("Wallet not connected");
      }

      // Validate chain ID (BSC = 56)
      if (chainId !== 56) {
        // Try to switch to BSC (only works for MetaMask)
        if (connectionMethod === 'metamask') {
          await switchToBSC();
          const newChainId = await getChainId();
          setChainId(newChainId);
          
          if (newChainId !== 56) {
            throw new Error("Please switch MetaMask network to BNB Smart Chain");
          }
        } else {
          throw new Error("Please switch to BNB Smart Chain in your wallet");
        }
      }

      // Send BNB transaction based on connection method
      let result;
      if (connectionMethod === 'metamask') {
        result = await sendBNBTransaction(TREASURY_ADDRESS, bnbAmount);
      } else if (connectionMethod === 'walletconnect') {
        result = await sendBNBViaWalletConnect(TREASURY_ADDRESS, bnbAmount);
      } else {
        throw new Error("No connection method available");
      }

      // Update balance after transaction
      const newBalance = await getBNBBalance(walletAddress);
      setBalance(newBalance);

      return {
        success: true,
        txHash: result.txHash,
        zlnAmount: bnbAmount * 10000, // Mock conversion rate: 1 BNB = 10000 ZLN
      };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        error: err.message || "Transaction failed. Please try again.",
      };
    }
  }, [walletConnected, walletAddress, chainId, connectionMethod]);

  // Handle account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        disconnectWallet();
      } else if (accounts[0] !== walletAddress) {
        // User switched accounts
        setWalletAddress(accounts[0]);
        // Refresh balance
        getBNBBalance(accounts[0]).then(setBalance).catch(console.error);
      }
    };

    const handleChainChanged = (chainIdHex) => {
      // Convert hex chain ID to number
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      
      // Refresh balance if wallet is connected
      if (walletAddress) {
        getBNBBalance(walletAddress).then(setBalance).catch(console.error);
      }
    };

    // Set up listeners based on connection method
    if (connectionMethod === 'metamask' && typeof window !== "undefined" && window.ethereum) {
      onAccountsChanged(handleAccountsChanged);
      onChainChanged(handleChainChanged);
    } else if (connectionMethod === 'walletconnect') {
      setupWalletConnectListeners({
        onConnect: ({ accounts, chainId }) => {
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setChainId(parseInt(chainId, 16));
            getBNBBalance(accounts[0]).then(setBalance).catch(console.error);
          }
        },
        onDisconnect: () => {
          disconnectWallet();
        },
        onAccountsChanged: handleAccountsChanged,
        onChainChanged: (chainId) => {
          handleChainChanged(chainId);
        },
      });
    }

    return () => {
      if (connectionMethod === 'metamask') {
        removeListeners();
      } else if (connectionMethod === 'walletconnect') {
        removeWalletConnectListeners();
      }
    };
  }, [walletAddress, disconnectWallet, connectionMethod]);

  const value = {
    walletConnected,
    walletAddress,
    isConnecting,
    chainId,
    balance,
    error,
    connectionMethod,
    connectMetaMaskWallet,
    connectWalletConnectWallet,
    disconnectWallet,
    purchaseZLNWithBNB,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
