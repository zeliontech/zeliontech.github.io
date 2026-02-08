import MetaMaskSDK from '@metamask/sdk';

let sdkInstance = null;

// Function to initialize or get existing SDK instance
const getSDKInstance = () => {
  if (!sdkInstance) {
    sdkInstance = new MetaMaskSDK({
      dappMetadata: {
        name: 'Zelion Grid',
        url: window.location.origin,
      },
      // Logging and analytics
      enableAnalytics: false,
      // Don't auto-connect or open deep links without user action
      checkInstallationImmediately: false,
      checkInstallationOnAllCalls: false,
    });
  }
  return sdkInstance;
};

// Export a function to get the provider (ensures it's initialized)
export const getEthereumProvider = () => {
  const sdk = getSDKInstance();
  return sdk.getProvider();
};

// Export function to reset SDK (for disconnect)
export const resetSDK = async () => {
  if (sdkInstance) {
    try {
      await sdkInstance.terminate();
    } catch (error) {
      console.error("Error terminating SDK:", error);
    }
    sdkInstance = null;
  }
};

// Export the SDK instance for advanced usage
export default getSDKInstance();
