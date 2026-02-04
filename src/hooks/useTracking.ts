import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { initGooglePixel, trackPageView, trackLead } from "@/lib/tracking";

// Replace with your actual Google Analytics Measurement ID
const GOOGLE_MEASUREMENT_ID = "G-XXXXXXXXXX";

// Replace with your actual Meta Pixel ID if using
// const META_PIXEL_ID = "XXXXXXXXXX";

export const useTracking = () => {
  const { isMarketingAllowed } = useCookieConsent();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only initialize when marketing is allowed and not already initialized
    if (isMarketingAllowed && !hasInitialized.current) {
      // Initialize Google Pixel
      initGooglePixel(GOOGLE_MEASUREMENT_ID);
      
      // Uncomment to enable Meta Pixel
      // initMetaPixel(META_PIXEL_ID);
      
      // Track initial page view
      trackPageView();
      
      hasInitialized.current = true;
    }
  }, [isMarketingAllowed]);

  return {
    isMarketingAllowed,
    trackLead: isMarketingAllowed ? trackLead : () => {},
    trackPageView: isMarketingAllowed ? trackPageView : () => {},
  };
};

export default useTracking;
