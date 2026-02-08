import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

// WalletConnect Project ID - Get from https://cloud.walletconnect.com/
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";

// BNB Smart Chain configuration
const BSC_CHAIN_ID = 56;

let walletConnectProvider = null;

/**
 * Initialize WalletConnect provider
 */
export const initWalletConnect = async () => {
  try {
    const provider = await EthereumProvider.init({
      projectId: WALLETCONNECT_PROJECT_ID,
      chains: [BSC_CHAIN_ID],
      showQrModal: false, // We'll handle QR display ourselves
      metadata: {
        name: "Zelion",
        description: "Infrastructure-First Energy Validation Network",
        url: typeof window !== "undefined" ? window.location.origin : "",
        icons: [typeof window !== "undefined" ? `${window.location.origin}/favicon.ico` : ""],
      },
    });

    walletConnectProvider = provider;
    return provider;
  } catch (error) {
    console.error("Failed to initialize WalletConnect:", error);
    throw new Error("Failed to initialize WalletConnect. Please try again.");
  }
};

/**
 * Connect via WalletConnect
 * Returns wallet address and QR code URI
 */
export const connectWalletConnect = async () => {
  try {
    if (!walletConnectProvider) {
      await initWalletConnect();
    }

    // Enable session (triggers QR code generation)
    const accounts = await walletConnectProvider.enable();

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please try again.");
    }

    return {
      address: accounts[0],
      provider: walletConnectProvider,
    };
  } catch (error) {
    if (error.message.includes("User rejected")) {
      throw new Error("Connection request rejected. Please try again.");
    }
    throw error;
  }
};

/**
 * Get WalletConnect URI for QR code
 */
export const getWalletConnectUri = () => {
  if (!walletConnectProvider) {
    throw new Error("WalletConnect provider not initialized");
  }
  return walletConnectProvider.connector?.uri || null;
};

/**
 * Listen for WalletConnect display_uri event
 * This provides the URI for QR code generation
 */
export const onDisplayUri = (callback) => {
  if (walletConnectProvider) {
    walletConnectProvider.on("display_uri", callback);
  }
};

/**
 * Get WalletConnect ethers provider
 */
export const getWalletConnectEthersProvider = () => {
  if (!walletConnectProvider) {
    throw new Error("WalletConnect provider not initialized");
  }
  return new ethers.BrowserProvider(walletConnectProvider);
};

/**
 * Get WalletConnect signer
 */
export const getWalletConnectSigner = async () => {
  const provider = getWalletConnectEthersProvider();
  return await provider.getSigner();
};

/**
 * Get chain ID from WalletConnect
 */
export const getWalletConnectChainId = async () => {
  if (!walletConnectProvider) {
    throw new Error("WalletConnect provider not initialized");
  }
  return walletConnectProvider.chainId;
};

/**
 * Disconnect WalletConnect session
 */
export const disconnectWalletConnect = async () => {
  if (walletConnectProvider) {
    try {
      await walletConnectProvider.disconnect();
      walletConnectProvider = null;
    } catch (error) {
      console.error("Failed to disconnect WalletConnect:", error);
    }
  }
};

/**
 * Listen for WalletConnect events
 */
export const setupWalletConnectListeners = (callbacks) => {
  if (!walletConnectProvider) return;

  const {
    onConnect,
    onDisconnect,
    onAccountsChanged,
    onChainChanged,
  } = callbacks;

  if (onConnect) {
    walletConnectProvider.on("connect", onConnect);
  }

  if (onDisconnect) {
    walletConnectProvider.on("disconnect", onDisconnect);
  }

  if (onAccountsChanged) {
    walletConnectProvider.on("accountsChanged", onAccountsChanged);
  }

  if (onChainChanged) {
    walletConnectProvider.on("chainChanged", onChainChanged);
  }
};

/**
 * Remove WalletConnect event listeners
 */
export const removeWalletConnectListeners = () => {
  if (walletConnectProvider) {
    walletConnectProvider.removeAllListeners();
  }
};

/**
 * Send BNB transaction via WalletConnect
 */
export const sendBNBViaWalletConnect = async (toAddress, amountBNB) => {
  try {
    const signer = await getWalletConnectSigner();
    
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
    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
      throw new Error("Transaction rejected by user.");
    }
    
    if (error.code === "INSUFFICIENT_FUNDS") {
      throw new Error("Insufficient BNB balance to complete transaction.");
    }

    throw new Error(error.message || "Transaction failed. Please try again.");
  }
};
