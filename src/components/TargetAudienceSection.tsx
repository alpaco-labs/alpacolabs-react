import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import alpacaDark from "@/assets/alpaca-dark.png";

const TargetAudienceSection = () => {
  const { t } = useLanguage();
  const benefits = ["target.benefit1", "target.benefit2", "target.benefit3", "target.benefit4"];
  
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text content - left side */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 md:mb-8 text-center">
                {t("target.title")}
              </h2>

              <ul className="flex-col flex items-start justify-start gap-[10px] px-[29px]">
                {benefits.map((benefitKey, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-3 animate-slide-up py-1.5" 
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

            {/* Alpaca image - right side */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src={alpacaDark} 
                  alt="ALPACO LABS mascot" 
                  className="w-64 md:w-80 lg:w-96 h-auto object-contain" 
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;