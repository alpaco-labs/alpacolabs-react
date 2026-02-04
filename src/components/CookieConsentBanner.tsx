import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const CookieConsentBanner = () => {
  const { hasConsented, acceptAll, acceptEssential } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to prevent flash on load
    const timer = setTimeout(() => {
      if (!hasConsented) {
        setIsVisible(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [hasConsented]);

  // Hide if already consented
  if (hasConsented || !isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:max-w-md z-50 animate-in slide-in-from-bottom-4 fade-in duration-200"
    >
      <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <h3 className="font-heading text-base font-semibold text-foreground mb-2">
          Uporabljamo piškotke
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Uporabljamo piškotke za izboljšanje uporabniške izkušnje in analitiko.
          Sprejmeš lahko vse ali samo nujne piškotke.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="hero"
            size="sm"
            onClick={acceptAll}
            className="flex-1"
          >
            Sprejmi vse
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={acceptEssential}
            className="flex-1"
          >
            Samo nujni piškotki
          </Button>
        </div>
        
        <a
          href="/politika-zasebnosti"
          className="block mt-3 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors text-center"
        >
          Politika zasebnosti
        </a>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
