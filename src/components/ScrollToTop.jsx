import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't scroll if there's a hash in the URL (for anchor links)
    if (location.hash) {
      // Optional: Scroll to the hash element if it exists
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Scroll to top instantly on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
