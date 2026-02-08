import { ethers } from "ethers";
import { isMobileDevice, isMetaMaskMobile, openMetaMaskApp } from "@/utils/deviceDetection";

// BNB Smart Chain configuration
const BSC_CHAIN_ID = 56;
const BSC_CHAIN_ID_HEX = "0x38";

/**
 * Check if MetaMask is installed
 */
export const isMetaMaskInstalled = () => {
  return typeof window !== "undefined" && Boolean(window.ethereum && window.ethereum.isMetaMask);
};

/**
 * Get ethers provider from MetaMask
 * Note: Should only be called after checking MetaMask is installed
 */
export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not detected. Please install MetaMask from https://metamask.io/download/");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

/**
 * Get signer from provider
 */
export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

/**
 * Get current network chain ID
 */
export const getChainId = async () => {
  const provider = getProvider();
  const network = await provider.getNetwork();
  return Number(network.chainId);
};

/**
 * Validate that the user is on BNB Smart Chain
 */
export const validateBSCNetwork = async () => {
  const chainId = await getChainId();
  if (chainId !== BSC_CHAIN_ID) {
    throw new Error("Please switch MetaMask network to BNB Smart Chain.");
  }
  return true;
};

/**
 * Request to switch to BNB Smart Chain
 */
export const switchToBSC = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BSC_CHAIN_ID_HEX }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: BSC_CHAIN_ID_HEX,
              chainName: "BNB Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });
        return true;
      } catch (addError) {
        throw new Error("Failed to add BNB Smart Chain to MetaMask.");
      }
    }
    throw new Error("Failed to switch to BNB Smart Chain.");
  }
};

/**
 * Connect to MetaMask wallet using modern dApp standards
 * Supports both desktop extension and mobile deep linking
 * 
 * Returns the connected wallet address
 * 
 * Flow:
 * - Mobile: Direct connection or deep link to MetaMask app
 * - Desktop: MetaMask extension connection
 * 
 * Only shows "install MetaMask" error if MetaMask is not detected
 */
export const connectMetaMask = async () => {
  try {
    // Mobile device handling
    if (isMobileDevice()) {
      // If in MetaMask mobile browser, connect directly
      if (isMetaMaskMobile()) {
        const accounts = await window.ethereum.request({ 
          method: "eth_requestAccounts" 
        });
        
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found. Please unlock MetaMask and try again.");
        }

        const walletAddress = accounts[0];
        await validateBSCNetwork();
        return walletAddress;
      }
      
      // Not in MetaMask browser - open MetaMask app via deep link
      // The app will redirect back to our dApp
      openMetaMaskApp();
      
      // Return special status to indicate deep link redirect
      throw new Error("MOBILE_REDIRECT");
    }

    // Desktop handling - Check if MetaMask extension is available
    if (!window.ethereum) {
      throw new Error(
        "MetaMask extension not detected.\n\nPlease install MetaMask extension or use WalletConnect to scan QR code."
      );
    }

    // Request account access using modern eth_requestAccounts
    // This will trigger MetaMask popup automatically
    const accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts" 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask and try again.");
    }

    const walletAddress = accounts[0];

    // Validate network after connection
    await validateBSCNetwork();

    return walletAddress;
  } catch (error) {
    // Handle mobile redirect (not an error)
    if (error.message === "MOBILE_REDIRECT") {
      throw error;
    }
    
    // Handle user rejection
    if (error.code === 4001) {
      throw new Error("Connection request rejected. Please approve the connection in MetaMask.");
    }
    
    // Handle already processing request
    if (error.code === -32002) {
      throw new Error("Connection request already pending. Please check MetaMask.");
    }
    
    // Pass through other errors
    throw error;
  }
};

/**
 * Send BNB transaction
 * @param {string} toAddress - Recipient address
 * @param {string} amountBNB - Amount in BNB (e.g., "0.1")
 * @returns {Object} Transaction receipt
 */
export const sendBNBTransaction = async (toAddress, amountBNB) => {
  try {
    // Validate network first
    await validateBSCNetwork();

    // Get signer
    const signer = await getSigner();

    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amountBNB.toString());

    // Prepare transaction
    const tx = {
      to: toAddress,
      value: amountWei,
    };

    // Send transaction
    const transactionResponse = await signer.sendTransaction(tx);

    // Wait for confirmation
    const receipt = await transactionResponse.wait();

    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
    };
  } catch (error) {
    // Handle specific errors
    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
      throw new Error("Transaction rejected by user.");
    }
    
    if (error.code === "INSUFFICIENT_FUNDS") {
      throw new Error("Insufficient BNB balance to complete transaction.");
    }

    if (error.message.includes("network")) {
      throw new Error("Network error. Please check your connection.");
    }

    // Generic error
    throw new Error(error.message || "Transaction failed. Please try again.");
  }
};

/**
 * Get wallet BNB balance
 * @param {string} address - Wallet address
 * @returns {string} Balance in BNB
 */
export const getBNBBalance = async (address) => {
  try {
    const provider = getProvider();
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    throw new Error("Failed to fetch balance.");
  }
};

/**
 * Listen for account changes
 */
export const onAccountsChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
};

/**
 * Listen for chain changes
 */
export const onChainChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", callback);
  }
};

/**
 * Remove listeners
 */
export const removeListeners = () => {
  if (window.ethereum) {
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
  }
};
