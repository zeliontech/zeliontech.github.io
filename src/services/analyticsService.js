import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/firebaseConfig";

/**
 * Safely track analytics events
 * @param {string} eventName - Event name in snake_case
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (!analytics) {
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Event skipped (not initialized): ${eventName}`, params);
    }
    return;
  }

  try {
    logEvent(analytics, eventName, params);
    
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Event sent: ${eventName}`, params);
    }
  } catch (error) {
    console.error(`[Analytics] Event failed: ${eventName}`, error);
  }
};

// Pre-defined event tracking functions for consistency

/**
 * Track page view
 * @param {string} pagePath - Current page path
 */
export const trackPageView = (pagePath) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: document.title,
  });
};

/**
 * Track waitlist signup
 * @param {string} source - Source of signup
 */
export const trackWaitlistSignup = (source = "website_prelaunch") => {
  trackEvent("waitlist_signup", {
    source,
  });
};

/**
 * Track contact form submission
 * @param {string} source - Source of contact
 */
export const trackContactSubmit = (source = "contact_page") => {
  trackEvent("contact_submit", {
    source,
  });
};

/**
 * Track CTA clicks
 * @param {string} location - Location of the CTA
 * @param {string} label - CTA button label
 */
export const trackCTAClick = (location, label) => {
  trackEvent("cta_click", {
    location,
    label,
  });
};

/**
 * Track whitepaper download
 */
export const trackWhitepaperDownload = () => {
  trackEvent("whitepaper_download", {
    source: "website",
  });
};

/**
 * Track external link clicks
 * @param {string} url - External URL
 * @param {string} label - Link label
 */
export const trackExternalLink = (url, label) => {
  trackEvent("external_link_click", {
    url,
    label,
  });
};

/**
 * Track scroll depth milestone
 * @param {number} depth - Scroll depth percentage (25, 50, 75, 100)
 * @param {string} pagePath - Current page path
 */
export const trackScrollDepth = (depth, pagePath) => {
  trackEvent("scroll_depth", {
    depth_percentage: depth,
    page_path: pagePath,
  });
};
