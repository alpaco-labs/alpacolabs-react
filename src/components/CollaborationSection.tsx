import { ClipboardList, Palette, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CollaborationSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: ClipboardList,
      titleKey: "collab.step1.title",
      descriptionKey: "collab.step1.description",
    },
    {
      id: 2,
      icon: Palette,
      titleKey: "collab.step2.title",
      descriptionKey: "collab.step2.description",
    },
    {
      id: 3,
      icon: Rocket,
      titleKey: "collab.step3.title",
      descriptionKey: "collab.step3.description",
    },
  ];

  const closingNotes = [
    "collab.note1",
    "collab.note2",
    "collab.note3",
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("collab.title")}
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
                {t("collab.step")} {step.id}
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

        {/* Closing notes */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-16 text-sm text-muted-foreground">
          {closingNotes.map((noteKey, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {t(noteKey)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
