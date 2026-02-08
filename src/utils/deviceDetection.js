/**
 * Device detection utilities for wallet connection
 */

/**
 * Detect if user is on mobile device
 */
export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;

  // Check user agent
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  if (mobileRegex.test(userAgent.toLowerCase())) {
    return true;
  }

  // Fallback: check screen width
  return window.innerWidth <= 768;
};

/**
 * Detect if user is in MetaMask mobile browser
 */
export const isMetaMaskMobile = () => {
  if (typeof window === "undefined") return false;
  
  return Boolean(
    window.ethereum &&
    window.ethereum.isMetaMask &&
    isMobileDevice()
  );
};

/**
 * Detect if MetaMask extension is available (desktop)
 */
export const isMetaMaskExtension = () => {
  if (typeof window === "undefined") return false;
  
  return Boolean(
    window.ethereum &&
    window.ethereum.isMetaMask &&
    !isMobileDevice()
  );
};

/**
 * Get MetaMask deep link for mobile connection
 * @param {string} dappUrl - Your dApp URL
 */
export const getMetaMaskDeepLink = (dappUrl = window.location.href) => {
  const encodedUrl = encodeURIComponent(dappUrl);
  return `https://metamask.app.link/dapp/${encodedUrl}`;
};

/**
 * Open MetaMask app via deep link
 */
export const openMetaMaskApp = () => {
  const deepLink = getMetaMaskDeepLink();
  window.location.href = deepLink;
};

/**
 * Get MetaMask download URLs
 */
export const getMetaMaskDownloadUrls = () => {
  return {
    ios: "https://apps.apple.com/app/metamask/id1438144202",
    android: "https://play.google.com/store/apps/details?id=io.metamask",
    extension: "https://metamask.io/download/",
    universal: "https://metamask.io/download/", // Shows all platforms
  };
};

/**
 * Detect device OS
 */
export const getDeviceOS = () => {
  if (typeof window === "undefined") return "unknown";
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "ios";
  if (/Mac/i.test(userAgent)) return "macos";
  if (/Win/i.test(userAgent)) return "windows";
  if (/Linux/i.test(userAgent)) return "linux";
  
  return "unknown";
};
