import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroLlama from "@/assets/hero-llama.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Full hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroLlama})`,
          backgroundPosition: 'right center',
        }}
      />
      
      {/* Dark overlay for text readability - stronger on left */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, hsla(220, 20%, 4%, 0.9) 0%, hsla(220, 20%, 4%, 0.7) 40%, hsla(220, 20%, 4%, 0.3) 70%, transparent 100%)'
        }}
      />
      
      {/* Light mode overlay */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: 'linear-gradient(to right, hsla(210, 40%, 98%, 0.95) 0%, hsla(210, 40%, 98%, 0.8) 40%, hsla(210, 40%, 98%, 0.4) 70%, transparent 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-2xl px-4 py-20">
          {/* Text - left aligned */}
          <div className="text-left">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight animate-slide-up text-foreground">
              {t("hero.title1")}<br className="hidden sm:block" /> {t("hero.title2")}
            </h1>
            
            <p 
              className="mt-6 md:mt-8 text-lg md:text-xl max-w-xl animate-slide-up text-muted-foreground" 
              style={{ animationDelay: "0.1s" }}
            >
              {t("hero.description")}
            </p>

            <div 
              className="mt-10 md:mt-12 animate-slide-up" 
              style={{ animationDelay: "0.2s" }}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/zelim-spletno-stran">
                  {t("hero.cta")}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div 
              className="mt-16 md:mt-20 flex flex-wrap items-center gap-8 md:gap-12 animate-slide-up" 
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-sm font-medium">{t("hero.fast")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-sm font-medium">{t("hero.mobile")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-sm font-medium">{t("hero.seo")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32" 
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
        }} 
      />
      
      {/* Visual divider transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
