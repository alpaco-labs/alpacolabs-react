import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import InquiryFormModal from "@/components/InquiryFormModal";

const CTASection = () => {
  const { t } = useLanguage();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
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
          
          {/* Mobile CTAs - stacked with equal width */}
          <div className="md:hidden flex flex-col items-center gap-5 px-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full rounded-full"
              onClick={() => setIsInquiryOpen(true)}
            >
              {t("inquiry.submit")}
            </Button>
            <div className="relative w-full">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-primary/30 rounded-full text-xs font-medium text-primary whitespace-nowrap z-10 animate-badge-pulse">
                {t("hero.available")}
              </span>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full rounded-full border-border/50 bg-transparent hover:bg-muted/50"
                asChild
              >
                <a href={phoneLink} className="flex items-center justify-center gap-2">
                  <Phone size={18} />
                  {t("cta.callButton")}
                </a>
              </Button>
            </div>
          </div>

          {/* Desktop CTAs - side by side */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="rounded-full"
              onClick={() => setIsInquiryOpen(true)}
            >
              {t("inquiry.submit")}
            </Button>
            <div className="relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-background border border-primary/30 rounded-full text-xs font-medium text-primary whitespace-nowrap z-10 animate-badge-pulse">
                {t("hero.available")}
              </span>
              <Button 
                variant="outline" 
                size="xl" 
                className="rounded-full border-border/50 bg-transparent hover:bg-muted/50"
                onClick={() => setShowNumber(true)}
              >
                <Phone size={18} />
                {showNumber ? phoneNumber : t("cta.callButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <InquiryFormModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />
    </section>
  );
};

export default CTASection;
