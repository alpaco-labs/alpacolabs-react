import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type ConsentType = "all" | "essential" | null;

interface CookieConsentContextType {
  consent: ConsentType;
  hasConsented: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
  isMarketingAllowed: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = "cookie_consent";

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentType>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "all" || stored === "essential") {
      setConsent(stored);
    }
  }, []);

  const acceptAll = useCallback(() => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "all");
    setConsent("all");
  }, []);

  const acceptEssential = useCallback(() => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "essential");
    setConsent("essential");
  }, []);

  const hasConsented = consent !== null;
  const isMarketingAllowed = consent === "all";

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented,
        acceptAll,
        acceptEssential,
        isMarketingAllowed,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
};
