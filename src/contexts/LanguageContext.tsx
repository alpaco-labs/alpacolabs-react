import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sl" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  sl: {
    // Footer
    "footer.description": "Spletne strani, ki prinašajo povpraševanja. Od ideje do online v nekaj dneh.",
    "footer.contact": "Kontakt",
    "footer.social": "Družbena omrežja",
    "footer.rights": "Vse pravice pridržane.",
    "footer.location": "Blagovica, Slovenija",
    // Header
    "nav.portfolio": "Portfolio",
    "nav.services": "Storitve",
    "nav.process": "Proces",
    "nav.faq": "FAQ",
    "nav.cta": "Želim spletno stran",
    "nav.theme": "Tema",
  },
  en: {
    // Footer
    "footer.description": "Websites that generate leads. From idea to online in a few days.",
    "footer.contact": "Contact",
    "footer.social": "Social Media",
    "footer.rights": "All rights reserved.",
    "footer.location": "Blagovica, Slovenia",
    // Header
    "nav.portfolio": "Portfolio",
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.faq": "FAQ",
    "nav.cta": "I want a website",
    "nav.theme": "Theme",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("sl");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
