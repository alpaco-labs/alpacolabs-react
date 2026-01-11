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
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("target.title")}
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <ul className="space-y-4">
            {benefits.map((benefitKey, index) => (
              <li
                key={index}
                className="flex items-center gap-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-primary" />
                </div>
                <span className="text-foreground/90 text-base">
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
