import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroDevices from "@/assets/hero-devices.png";
const HeroSection = () => {
  const {
    t
  } = useLanguage();
  return <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 dark:block hidden" style={{
      background: 'linear-gradient(135deg, hsla(220, 20%, 4%, 1) 0%, hsla(220, 20%, 8%, 1) 100%)'
    }} />
      <div className="absolute inset-0 dark:hidden" style={{
      background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)'
    }} />
      
      {/* Content */}
      <div className="relative z-10 container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 py-20 pb-[40px]">
          {/* Text - left aligned */}
          <div className="text-left">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight animate-slide-up text-foreground">
              {t("hero.title1")}<br className="hidden sm:block" /> {t("hero.title2")}
            </h1>
            
            <p className="mt-6 md:mt-8 text-lg md:text-xl max-w-xl animate-slide-up text-muted-foreground" style={{
            animationDelay: "0.1s"
          }}>
              {t("hero.description")}
            </p>

            <div className="mt-10 md:mt-12 animate-slide-up" style={{
            animationDelay: "0.2s"
          }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/zelim-spletno-stran">
                  {t("hero.cta")}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 md:mt-16 flex-wrap gap-6 md:gap-10 animate-slide-up items-start justify-center flex flex-row" style={{
            animationDelay: "0.3s"
          }}>
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
          
          {/* Hero Image - Right Side (Desktop) */}
          <div className="relative animate-slide-up hidden md:flex justify-center items-center" style={{
          animationDelay: "0.2s"
        }}>
            <img src={heroDevices} alt="Primeri spletnih strani na različnih napravah" className="w-full max-w-xl object-contain drop-shadow-2xl" />
          </div>
        </div>
        
        {/* Hero Image - Mobile (below text) */}
        <div className="md:hidden flex justify-center items-center px-4 pb-8 animate-slide-up" style={{
        animationDelay: "0.3s"
      }}>
          <img src={heroDevices} alt="Primeri spletnih strani na različnih napravah" className="w-full max-w-sm object-contain drop-shadow-2xl" />
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
      background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
    }} />
      
      {/* Visual divider transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>;
};
export default HeroSection;