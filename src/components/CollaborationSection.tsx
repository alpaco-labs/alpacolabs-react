import { ClipboardList, Palette, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const CollaborationSection = () => {
  const {
    t
  } = useLanguage();
  const steps = [{
    id: 1,
    icon: ClipboardList,
    titleKey: "collab.step1.title",
    descriptionKey: "collab.step1.description"
  }, {
    id: 2,
    icon: Palette,
    titleKey: "collab.step2.title",
    descriptionKey: "collab.step2.description"
  }, {
    id: 3,
    icon: Rocket,
    titleKey: "collab.step3.title",
    descriptionKey: "collab.step3.description"
  }];
  return <section id="proces" className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/20 relative">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => <div key={step.id} className="text-center animate-slide-up relative flex flex-col items-center" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                {/* Step number badge - positioned above icon */}
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-3">
                  {t("collab.step")} {step.id}
                </div>
                
                {/* Icon with connecting line */}
                <div className="relative flex items-center justify-center mb-5">
                  {/* Icon container */}
                  <div className="w-16 h-16 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-sm relative z-10 md:transition-all md:duration-200 md:ease-out md:hover:scale-[1.03] md:hover:brightness-110 md:hover:shadow-lg md:hover:shadow-primary/10 md:hover:border-primary/40 group">
                    <step.icon size={28} className="text-primary md:transition-transform md:duration-200 md:group-hover:scale-105" />
                  </div>
                  
                  {/* Right connecting line - only show on steps 1 and 2 */}
                  {index < 2}
                </div>
                
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {t(step.descriptionKey)}
                </p>
              </div>)}
          </div>
        </div>

      </div>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>;
};
export default CollaborationSection;