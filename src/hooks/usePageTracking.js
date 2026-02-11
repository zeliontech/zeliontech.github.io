import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/services/analyticsService";

/**
 * Hook to automatically track page views on route change
 * Uses React Router's useLocation to detect pathname changes
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever pathname changes
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
};

export default usePageTracking;
