// Tracking utilities for Google/Meta Pixel
// These functions only execute if marketing consent is given

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

let isPixelInitialized = false;

// Google Analytics / Google Ads initialization
export const initGooglePixel = (measurementId: string) => {
  if (isPixelInitialized || typeof window === "undefined") return;

  // Load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  isPixelInitialized = true;
  console.log("[Tracking] Google Pixel initialized");
};

// Meta (Facebook) Pixel initialization
export const initMetaPixel = (pixelId: string) => {
  if (typeof window === "undefined" || window.fbq) return;

  // Meta Pixel base code - simplified initialization
  window.fbq = function (...args: unknown[]) {
    (window.fbq as unknown as { queue: unknown[] }).queue.push(args);
  };
  (window.fbq as unknown as { queue: unknown[] }).queue = [];
  
  if (!window._fbq) window._fbq = window.fbq;

  // Load pixel script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
  console.log("[Tracking] Meta Pixel initialized");
};

// Track PageView event
export const trackPageView = () => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", "page_view");
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "PageView");
  }

  console.log("[Tracking] PageView tracked");
};

// Track Lead event (form submission)
export const trackLead = (data?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  // Google Analytics / Ads
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "engagement",
      event_label: "inquiry_form",
      ...data,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq("track", "Lead", data);
  }

  console.log("[Tracking] Lead event tracked", data);
};

// Check if tracking is available
export const isTrackingReady = () => {
  return Boolean(window.gtag || window.fbq);
};
