import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => setLanguage("sl")}
        className={`transition-colors duration-300 ${
          language === "sl"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        SL
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`transition-colors duration-300 ${
          language === "en"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
