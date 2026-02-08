import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getEthereumProvider, resetSDK } from "@/metamask";
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
  const [ensName, setEnsName] = useState(null);
  const [networkName, setNetworkName] = useState(null);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const ethereum = getEthereumProvider();
      if (!ethereum) return;
      
      try {
        // Check for existing accounts without prompting the user
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          
          // Get chain ID
          const chainIdHex = await ethereum.request({ method: 'eth_chainId' });
          const currentChainId = parseInt(chainIdHex, 16);
          setChainId(currentChainId);
          setNetworkName(getNetworkName(currentChainId));
          
          // Get balance
          const balance = await getBNBBalance(accounts[0]);
          setBalance(balance);
          
          // Try to get ENS name if on mainnet
          const ens = await getENSName(accounts[0]);
          setEnsName(ens);
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
      const ethereum = getEthereumProvider();
      const provider = new ethers.BrowserProvider(ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "0";
    }
  };

  // Helper function to get network name
  const getNetworkName = (chainId) => {
    const networks = {
      1: "Ethereum Mainnet",
      56: "BNB Smart Chain",
      97: "BNB Testnet",
      137: "Polygon",
      43114: "Avalanche",
    };
    return networks[chainId] || `Chain ID ${chainId}`;
  };

  // Helper function to get ENS name (only for Ethereum mainnet)
  const getENSName = async (address) => {
    try {
      // ENS only works on Ethereum mainnet
      if (chainId !== 1) return null;
      
      const ethereum = getEthereumProvider();
      const provider = new ethers.BrowserProvider(ethereum);
      const ensName = await provider.lookupAddress(address);
      return ensName;
    } catch (error) {
      // ENS lookup failed or not available
      return null;
    }
  };

  // Connect MetaMask wallet using SDK
  const connectMetaMaskWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // Get fresh provider instance (important after disconnect/reset)
      const ethereum = getEthereumProvider();
      
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
      setNetworkName(getNetworkName(currentChainId));
      setBalance(currentBalance);
      setWalletConnected(true);
      
      // Try to get ENS name if on mainnet
      const ens = await getENSName(address);
      setEnsName(ens);
      
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
  }, []);

  // Switch to BSC network
  const switchToBSC = async () => {
    const ethereum = getEthereumProvider();
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

  const disconnectWallet = useCallback(async () => {
    try {
      // Terminate and reset the MetaMask SDK connection
      await resetSDK();
    } catch (error) {
      console.error("Error terminating SDK:", error);
    }
    
    // Clear all state
    setWalletConnected(false);
    setWalletAddress(null);
    setChainId(null);
    setBalance(null);
    setError(null);
    setEnsName(null);
    setNetworkName(null);
  }, []);

  // Real BNB purchase function
  const purchaseZLNWithBNB = useCallback(async (bnbAmount) => {
    setError(null);
    
    try {
      // Check if wallet is connected
      if (!walletConnected || !walletAddress) {
        throw new Error("Wallet not connected");
      }

      // Get fresh provider instance
      const ethereum = getEthereumProvider();
      
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
  }, [walletConnected, walletAddress, chainId]);

  // Handle account and chain changes
  useEffect(() => {
    const ethereum = getEthereumProvider();
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== walletAddress) {
        setWalletAddress(accounts[0]);
        getBNBBalance(accounts[0]).then(setBalance).catch(console.error);
        getENSName(accounts[0]).then(setEnsName).catch(console.error);
      }
    };

    const handleChainChanged = (chainIdHex) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      setNetworkName(getNetworkName(newChainId));
      
      if (walletAddress) {
        getBNBBalance(walletAddress).then(setBalance).catch(console.error);
        getENSName(walletAddress).then(setEnsName).catch(console.error);
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
    ensName,
    networkName,
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
