import MetaMaskSDK from '@metamask/sdk';

// Initialize MetaMask SDK
const MMSDK = new MetaMaskSDK({
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

// Export a function to get the provider (ensures it's initialized)
export const getEthereumProvider = () => {
  return MMSDK.getProvider();
};

// Export the SDK instance for advanced usage
export default MMSDK;
