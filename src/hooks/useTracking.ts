import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { initGooglePixel, initMetaPixel, trackPageView, trackLead } from "@/lib/tracking";

const GOOGLE_MEASUREMENT_ID = "G-29J2N7NHX0";

const META_PIXEL_ID = "889583790456180";

export const useTracking = () => {
  const { isMarketingAllowed } = useCookieConsent();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only initialize when marketing is allowed and not already initialized
    if (isMarketingAllowed && !hasInitialized.current) {
      // Initialize Google Pixel
      initGooglePixel(GOOGLE_MEASUREMENT_ID);
      
      // Initialize Meta (Facebook) Pixel
      initMetaPixel(META_PIXEL_ID);
      
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
