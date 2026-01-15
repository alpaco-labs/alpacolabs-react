import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroLlama from "@/assets/hero-llama.png";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Mobile: position llama to right-bottom, Desktop: right center */}
      <style>{`
        .hero-bg-responsive {
          background-position: 75% 85% !important;
          background-size: auto 85% !important;
        }
        @media (min-width: 768px) {
          .hero-bg-responsive {
            background-position: right center !important;
            background-size: cover !important;
          }
        }
      `}</style>
      
      {/* Full hero background image - responsive positioning */}
      <div 
        className="absolute inset-0 bg-no-repeat hero-bg-responsive"
        style={{
          backgroundImage: `url(${heroLlama})`,
        }}
      />
      
      {/* Dark overlay for text readability - desktop */}
      <div 
        className="absolute inset-0 hidden dark:md:block"
        style={{
          background: 'linear-gradient(to right, hsla(220, 20%, 4%, 0.95) 0%, hsla(220, 20%, 4%, 0.85) 30%, hsla(220, 20%, 4%, 0.5) 60%, hsla(220, 20%, 4%, 0.3) 100%)'
        }}
      />
      {/* Dark overlay - mobile (vertical gradient) */}
      <div 
        className="absolute inset-0 hidden dark:block dark:md:hidden"
        style={{
          background: 'linear-gradient(to bottom, hsla(220, 20%, 4%, 0.92) 0%, hsla(220, 20%, 4%, 0.75) 50%, hsla(220, 20%, 4%, 0.4) 100%)'
        }}
      />
      
      {/* Light mode overlay - desktop */}
      <div 
        className="absolute inset-0 dark:hidden hidden md:block"
        style={{
          background: 'linear-gradient(to right, hsla(210, 40%, 98%, 0.95) 0%, hsla(210, 40%, 98%, 0.8) 40%, hsla(210, 40%, 98%, 0.4) 70%, transparent 100%)'
        }}
      />
      {/* Light mode overlay - mobile */}
      <div 
        className="absolute inset-0 dark:hidden md:hidden"
        style={{
          background: 'linear-gradient(to bottom, hsla(210, 40%, 98%, 0.95) 0%, hsla(210, 40%, 98%, 0.85) 50%, hsla(210, 40%, 98%, 0.5) 100%)'
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
