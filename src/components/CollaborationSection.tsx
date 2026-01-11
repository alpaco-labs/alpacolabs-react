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
    <section id="proces" className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/20 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("collab.title")}
          </h2>
        </div>

        {/* Steps with connecting line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-border via-primary/30 to-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="text-center animate-slide-up relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step number badge */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-primary/70 bg-secondary/80 dark:bg-secondary/60 px-2 py-0.5 rounded-full z-10">
                  {t("collab.step")} {step.id}
                </div>
                
                <div className="w-16 h-16 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm relative z-10">
                  <step.icon size={28} className="text-primary" />
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

        {/* Closing notes */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-8 mt-12 text-sm text-muted-foreground">
          {closingNotes.map((noteKey, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {t(noteKey)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default CollaborationSection;
