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
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="max-w-xl mx-auto">
          {/* Title left-aligned */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 md:mb-8">
            {t("target.title")}
          </h2>

          {/* Single column list aligned with title */}
          <ul className="flex flex-col gap-2.5">
            {benefits.map((benefitKey, index) => (
              <li
                key={index}
                className="flex items-center gap-3 animate-slide-up bg-muted/30 rounded-lg px-4 py-2.5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-primary" />
                </div>
                <span className="text-foreground/90 text-sm md:text-base leading-snug">
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
