import { Zap, TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustIndicatorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.fast")}</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.mobile")}</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="text-base md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.seo")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
