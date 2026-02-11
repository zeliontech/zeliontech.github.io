import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackScrollDepth } from "@/services/analyticsService";

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 * Tracks each milestone only once per page session
 */
const useScrollTracking = () => {
  const location = useLocation();
  const milestonesReached = useRef(new Set());

  useEffect(() => {
    // Reset milestones when page changes
    milestonesReached.current = new Set();

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || window.pageYOffset;
          
          // Calculate scroll percentage
          const scrollableHeight = documentHeight - windowHeight;
          const scrollPercentage = (scrollTop / scrollableHeight) * 100;

          // Define milestones
          const milestones = [25, 50, 75, 100];

          // Check and track milestones
          milestones.forEach((milestone) => {
            if (
              scrollPercentage >= milestone &&
              !milestonesReached.current.has(milestone)
            ) {
              milestonesReached.current.add(milestone);
              trackScrollDepth(milestone, location.pathname);
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup on unmount or route change
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
};

export default useScrollTracking;
