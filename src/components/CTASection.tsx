import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            {t("cta.description")}
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/zelim-spletno-stran">
              {t("cta.button")}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
