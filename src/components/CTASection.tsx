import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import InquiryFormModal from "@/components/InquiryFormModal";

const CTASection = () => {
  const { t } = useLanguage();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-20 bg-muted/50 dark:bg-secondary/20 relative">
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
            <Button 
              variant="hero" 
              size="xl" 
              className="rounded-full"
              onClick={() => setIsInquiryOpen(true)}
            >
              {t("hero.cta.inquiry")}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <InquiryFormModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
      />
    </>
  );
};

export default CTASection;
