import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo(0, 0);

    // Also reset any inner scroll containers (main content areas)
    const scrollContainers = document.querySelectorAll('[data-scroll-container], main, .overflow-auto, .overflow-y-auto');
    scrollContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
