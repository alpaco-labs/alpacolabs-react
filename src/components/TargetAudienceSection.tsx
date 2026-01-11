import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TargetAudienceSection = () => {
  const { t } = useLanguage();

  const benefits = [
    "target.benefit1",
    "target.benefit2",
    "target.benefit3",
    "target.benefit4",
  ];

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("target.title")}
          </h2>
        </div>

        {/* Two column on desktop, single on mobile */}
        <div className="max-w-2xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {benefits.map((benefitKey, index) => (
              <li
                key={index}
                className="flex items-center gap-3 animate-slide-up bg-muted/30 rounded-lg px-4 py-3"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-foreground/90 text-sm md:text-base">
                  {t(benefitKey)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
