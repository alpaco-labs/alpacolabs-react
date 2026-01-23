import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();
  const [showNumber, setShowNumber] = useState(false);

  const phoneNumber = "+386 70 732 085";
  const phoneLink = "tel:+38670732085";

  return (
    <section className="py-16 md:py-20 bg-muted/50 relative">
      {/* Top visual divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-5">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            {t("cta.description")}
          </p>
          
          {/* Mobile CTA - calls directly */}
          <div className="md:hidden flex flex-col items-center">
            <div className="relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-primary/30 rounded-full text-xs font-medium text-primary whitespace-nowrap z-10 animate-badge-pulse">
                {t("hero.available")}
              </span>
              <Button 
                variant="hero" 
                size="xl" 
                className="rounded-full"
                asChild
              >
                <a href={phoneLink} className="flex items-center justify-center gap-2">
                  <Phone size={18} />
                  {t("cta.callButton")}
                </a>
              </Button>
            </div>
          </div>

          {/* Desktop CTA - shows phone number on click */}
          <div className="hidden md:flex flex-col items-center">
            {!showNumber ? (
              <div className="relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-primary/30 rounded-full text-xs font-medium text-primary whitespace-nowrap z-10 animate-badge-pulse">
                  {t("hero.available")}
                </span>
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="rounded-full"
                  onClick={() => setShowNumber(true)}
                >
                  <Phone size={18} />
                  {t("cta.callButton")}
                </Button>
              </div>
            ) : (
              <div className="relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-primary/30 rounded-full text-xs font-medium text-primary whitespace-nowrap z-10 animate-badge-pulse">
                  {t("hero.available")}
                </span>
                <a 
                  href={phoneLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone size={20} />
                  {phoneNumber}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;