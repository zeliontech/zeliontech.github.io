import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getEthereumProvider } from "@/metamask";
import { ethers } from "ethers";

// Treasury address for ZLN purchases
const TREASURY_ADDRESS = import.meta.env.VITE_TREASURY_ADDRESS || "0x0000000000000000000000000000000000000000";

// BNB Smart Chain configuration
const BSC_CHAIN_ID = '0x38'; // 56 in hex
const BSC_CHAIN_CONFIG = {
  chainId: BSC_CHAIN_ID,
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

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

  // Get ethereum provider
  const ethereum = getEthereumProvider();

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!ethereum) return;
      
      try {
        // Check for existing accounts without prompting the user
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          
          // Get chain ID
          const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainIdHex, 16));
          
          // Get balance
          const balance = await getBNBBalance(accounts[0]);
          setBalance(balance);
        }
      } catch (error) {
        // Silently ignore - user just isn't connected yet
        // This is expected behavior
      }
    };
    
    checkConnection();
  }, []);

  // Helper function to get BNB balance
  const getBNBBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "0";
    }
  };

  // Connect MetaMask wallet using SDK
  const connectMetaMaskWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Ensure provider is available
      if (!ethereum) {
        throw new Error("MetaMask SDK not initialized");
      }

      // Request accounts using MetaMask SDK
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }
      
      const address = accounts[0];
      
      // Get chain ID
      const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
      const currentChainId = parseInt(chainIdHex, 16);
      
      // Get balance
      const currentBalance = await getBNBBalance(address);
      
      setWalletAddress(address);
      setChainId(currentChainId);
      setBalance(currentBalance);
      setWalletConnected(true);
      
      return address;
    } catch (err) {
      const errorMessage = err.message || "Connection failed";
      setError(errorMessage);
      setWalletConnected(false);
      setWalletAddress(null);
      throw new Error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  }, [ethereum]);

  // Switch to BSC network
  const switchToBSC = async () => {
    if (!ethereum) {
      throw new Error("MetaMask provider not available");
    }
    
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_CHAIN_ID }],
      });
    } catch (switchError) {
      // Chain hasn't been added to MetaMask
      if (switchError.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_CHAIN_CONFIG],
        });
      } else {
        throw switchError;
      }
    }
  };

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress(null);
    setChainId(null);
    setBalance(null);
    setError(null);
  }, []);

  // Real BNB purchase function
  const purchaseZLNWithBNB = useCallback(async (bnbAmount) => {
    setError(null);
    
    try {
      // Check if wallet is connected
      if (!walletConnected || !walletAddress) {
        throw new Error("Wallet not connected");
      }

      // Ensure provider is available
      if (!ethereum) {
        throw new Error("MetaMask provider not available");
      }

      // Validate chain ID (BSC = 56)
      if (chainId !== 56) {
        // Try to switch to BSC
        await switchToBSC();
        const newChainIdHex = await ethereum.request({ method: 'eth_chainId' });
        const newChainId = parseInt(newChainIdHex, 16);
        setChainId(newChainId);
        
        if (newChainId !== 56) {
          throw new Error("Please switch to BNB Smart Chain");
        }
      }

      // Send BNB transaction
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: TREASURY_ADDRESS,
        value: ethers.parseEther(bnbAmount.toString()),
      });

      // Wait for confirmation
      const receipt = await tx.wait();

      // Update balance after transaction
      const newBalance = await getBNBBalance(walletAddress);
      setBalance(newBalance);

      return {
        success: true,
        txHash: receipt.hash,
        zlnAmount: bnbAmount * 10000, // Conversion rate: 1 BNB = 10000 ZLN
      };
    } catch (err) {
      const errorMessage = err.message || "Transaction failed. Please try again.";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, [walletConnected, walletAddress, chainId, ethereum]);

  // Handle account and chain changes
  useEffect(() => {
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== walletAddress) {
        setWalletAddress(accounts[0]);
        getBNBBalance(accounts[0]).then(setBalance).catch(console.error);
      }
    };

    const handleChainChanged = (chainIdHex) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      
      if (walletAddress) {
        getBNBBalance(walletAddress).then(setBalance).catch(console.error);
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [walletAddress, disconnectWallet]);

  const value = {
    walletConnected,
    walletAddress,
    isConnecting,
    chainId,
    balance,
    error,
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
