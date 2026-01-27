import { Zap, TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustIndicatorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-16 bg-muted/30 border-b border-border/50">
      <div className="container px-4">
        <div className="flex flex-row justify-around items-center gap-4 md:gap-16 lg:gap-24">
          <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-xs md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.fast")}</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-xs md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.mobile")}</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <span className="text-xs md:text-lg font-medium text-foreground whitespace-nowrap">{t("hero.seo")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;
