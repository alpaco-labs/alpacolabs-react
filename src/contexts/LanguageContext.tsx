import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sl" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  sl: {
    // Header
    "nav.portfolio": "Portfolio",
    "nav.services": "Storitve",
    "nav.process": "Proces",
    "nav.faq": "FAQ",
    "nav.cta": "Želim spletno stran",
    "nav.theme": "Tema",

    // Hero
    "hero.title1": "Spletne strani, ki",
    "hero.title2": "prinašajo povpraševanja.",
    "hero.description": "Od ideje do online v nekaj dneh. Jasen dizajn, hitra stran in jasen poziv k dejanju.",
    "hero.cta": "Želim spletno stran",
    "hero.fast": "Hitro",
    "hero.mobile": "Mobile-first",
    "hero.seo": "SEO osnove",

    // Portfolio
    "portfolio.title": "Izbrani projekti",
    "portfolio.visualization": "Vizualizacija",
    "portfolio.demo": "Primeri so demonstracijski (demo projekti).",
    "portfolio.project1.description": "40% več povpraševanj v prvem mesecu",
    "portfolio.project2.description": "Moderna predstavitev arhitekturnega studia",
    "portfolio.project3.description": "E-trgovina z 25% konverzijo",
    "portfolio.project4.description": "MVP aplikacija za upravljanje projektov",
    "portfolio.project5.description": "Rezervacijski sistem za kliniko",
    "portfolio.project6.description": "Platforma za dostavo hrane",
    "portfolio.tag.landing": "Landing",
    "portfolio.tag.website": "Website",
    "portfolio.tag.store": "Trgovina",
    "portfolio.tag.mvp": "MVP",

    // Pricing / Services
    "pricing.title": "Paketi",
    "pricing.from": "Od",
    "pricing.calculate": "Izračunaj ceno",
    "pricing.note": "Končna cena je odvisna od obsega in funkcionalnosti.",
    "pricing.landing": "Landing stran",
    "pricing.website": "Spletna stran",
    "pricing.store": "Spletna trgovina",
    "pricing.mvp": "Web / Mobile MVP",
    "pricing.feature.responsive": "Responsive dizajn",
    "pricing.feature.seo": "Osnovni SEO",
    "pricing.feature.gdpr": "GDPR osnove",
    "pricing.feature.fast": "Hitro nalaganje",
    "pricing.feature.subpages": "Več podstrani",
    "pricing.feature.fullstore": "Celotna trgovina",
    "pricing.feature.custom": "Po meri razvoj",

    // Process
    "process.title": "Kako poteka sodelovanje",
    "process.step": "Korak",
    "process.step1.title": "Kratek vprašalnik + cilj",
    "process.step1.description": "Izpolniš obrazec, da razumem tvoje potrebe in cilje projekta.",
    "process.step2.title": "Osnutek v 48–72 urah",
    "process.step2.description": "Pripravim prvi osnutek dizajna, ki ga skupaj pregledava.",
    "process.step3.title": "Popravki + objava + optimizacija",
    "process.step3.description": "Implementiram popravke, objavim stran in poskrbim za optimizacijo.",

    // FAQ
    "faq.title": "Pogosta vprašanja",
    "faq.q1": "Koliko časa traja izdelava spletne strani?",
    "faq.a1": "Odvisno od obsega projekta. Landing stran je lahko pripravljena v 3–7 dneh, večja spletna stran v 2–4 tednih, trgovina ali MVP pa v 4–8 tednih.",
    "faq.q2": "Kaj vse je vključeno v ceno?",
    "faq.a2": "Vsak paket vključuje responsive dizajn, osnovni SEO, GDPR osnove in hitro nalaganje. Dodatne funkcionalnosti (blog, rezervacije, več jezikov) se zaračunajo posebej.",
    "faq.q3": "Koliko popravkov je vključenih?",
    "faq.a3": "V ceno sta vključeni 2 večji reviziji dizajna. Manjši popravki (besedila, barve) so neomejeni med razvojem.",
    "faq.q4": "Ali moram sam pripraviti vsebino?",
    "faq.a4": "Idealno je, če imaš pripravljeno osnovno vsebino (besedila, slike). Če je nimaš, lahko pomagam pri pripravi za dodatno ceno.",
    "faq.q5": "Kaj pa gostovanje in domena?",
    "faq.a5": "Svetujem pri izbiri gostovanja in domene. Osnovni hosting je možno urediti že od 5 €/mesec. Lahko tudi prevzamem upravljanje za mesečno naročnino.",
    "faq.q6": "Kako poteka plačilo?",
    "faq.a6": "Običajno 50% predplačilo pred začetkom dela, 50% ob zaključku. Za večje projekte je možno dogovoriti plačilo v več obrokih.",

    // CTA
    "cta.title": "Pripravljen/a na naslednji korak?",
    "cta.description": "Izpolni kratek vprašalnik in takoj vidiš oceno investicije.",
    "cta.button": "Izračunaj oceno cene",

    // Footer
    "footer.description": "Spletne strani, ki prinašajo povpraševanja. Od ideje do online v nekaj dneh.",
    "footer.contact": "Kontakt",
    "footer.social": "Družbena omrežja",
    "footer.rights": "Vse pravice pridržane.",
    "footer.location": "Blagovica, Slovenija",
  },
  en: {
    // Header
    "nav.portfolio": "Portfolio",
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.faq": "FAQ",
    "nav.cta": "I want a website",
    "nav.theme": "Theme",

    // Hero
    "hero.title1": "Websites that",
    "hero.title2": "generate leads.",
    "hero.description": "From idea to online in a few days. Clean design, fast loading, and clear call to action.",
    "hero.cta": "I want a website",
    "hero.fast": "Fast",
    "hero.mobile": "Mobile-first",
    "hero.seo": "SEO basics",

    // Portfolio
    "portfolio.title": "Selected projects",
    "portfolio.visualization": "Visualization",
    "portfolio.demo": "Examples are demonstration (demo projects).",
    "portfolio.project1.description": "40% more inquiries in the first month",
    "portfolio.project2.description": "Modern presentation of an architecture studio",
    "portfolio.project3.description": "E-commerce with 25% conversion",
    "portfolio.project4.description": "MVP app for project management",
    "portfolio.project5.description": "Booking system for a clinic",
    "portfolio.project6.description": "Food delivery platform",
    "portfolio.tag.landing": "Landing",
    "portfolio.tag.website": "Website",
    "portfolio.tag.store": "Store",
    "portfolio.tag.mvp": "MVP",

    // Pricing / Services
    "pricing.title": "Packages",
    "pricing.from": "From",
    "pricing.calculate": "Calculate price",
    "pricing.note": "Final price depends on scope and functionality.",
    "pricing.landing": "Landing page",
    "pricing.website": "Website",
    "pricing.store": "E-commerce",
    "pricing.mvp": "Web / Mobile MVP",
    "pricing.feature.responsive": "Responsive design",
    "pricing.feature.seo": "Basic SEO",
    "pricing.feature.gdpr": "GDPR basics",
    "pricing.feature.fast": "Fast loading",
    "pricing.feature.subpages": "Multiple subpages",
    "pricing.feature.fullstore": "Full store",
    "pricing.feature.custom": "Custom development",

    // Process
    "process.title": "How collaboration works",
    "process.step": "Step",
    "process.step1.title": "Short questionnaire + goal",
    "process.step1.description": "Fill out the form so I understand your needs and project goals.",
    "process.step2.title": "Draft in 48–72 hours",
    "process.step2.description": "I prepare the first design draft, which we review together.",
    "process.step3.title": "Revisions + launch + optimization",
    "process.step3.description": "I implement revisions, launch the site, and take care of optimization.",

    // FAQ
    "faq.title": "Frequently asked questions",
    "faq.q1": "How long does it take to build a website?",
    "faq.a1": "It depends on the project scope. A landing page can be ready in 3–7 days, a larger website in 2–4 weeks, and a store or MVP in 4–8 weeks.",
    "faq.q2": "What is included in the price?",
    "faq.a2": "Each package includes responsive design, basic SEO, GDPR basics, and fast loading. Additional features (blog, reservations, multilingual) are charged separately.",
    "faq.q3": "How many revisions are included?",
    "faq.a3": "2 major design revisions are included in the price. Minor changes (text, colors) are unlimited during development.",
    "faq.q4": "Do I need to prepare the content myself?",
    "faq.a4": "Ideally, you have the basic content ready (text, images). If not, I can help with preparation for an additional fee.",
    "faq.q5": "What about hosting and domain?",
    "faq.a5": "I advise on hosting and domain selection. Basic hosting can be arranged from €5/month. I can also take over management for a monthly fee.",
    "faq.q6": "How does payment work?",
    "faq.a6": "Usually 50% upfront before starting, 50% upon completion. For larger projects, payment in installments is possible.",

    // CTA
    "cta.title": "Ready for the next step?",
    "cta.description": "Fill out a short questionnaire and see the investment estimate immediately.",
    "cta.button": "Calculate price estimate",

    // Footer
    "footer.description": "Websites that generate leads. From idea to online in a few days.",
    "footer.contact": "Contact",
    "footer.social": "Social Media",
    "footer.rights": "All rights reserved.",
    "footer.location": "Blagovica, Slovenia",
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
