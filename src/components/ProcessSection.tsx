import { MessageSquare, Pencil, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      titleKey: "process.step1.title",
      descriptionKey: "process.step1.description",
    },
    {
      id: 2,
      icon: Pencil,
      titleKey: "process.step2.title",
      descriptionKey: "process.step2.description",
    },
    {
      id: 3,
      icon: Rocket,
      titleKey: "process.step3.title",
      descriptionKey: "process.step3.description",
    },
  ];

  return (
    <section id="proces" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("process.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-secondary/50 border border-border rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon size={26} className="text-foreground/80" />
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {t("process.step")} {step.id}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {t(step.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
