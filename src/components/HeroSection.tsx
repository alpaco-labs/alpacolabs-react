import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroDevices from "@/assets/hero-devices.png";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 dark:block hidden" 
        style={{
          background: 'linear-gradient(135deg, hsla(220, 20%, 4%, 1) 0%, hsla(220, 20%, 8%, 1) 100%)'
        }} 
      />
      <div 
        className="absolute inset-0 dark:hidden" 
        style={{
          background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)'
        }} 
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container">
        {/* Badge - below header */}
        <div className="flex justify-center md:justify-start px-4 pt-4 md:pt-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Stroške razvoja krijemo mi.</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center px-4 py-8 md:py-16 md:pb-[40px]">
          {/* Text - left aligned */}
          <div className="text-center md:text-left">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight animate-slide-up text-foreground">
              {t("hero.title1")}
              <br className="hidden sm:block" /> 
              <span className="text-primary">{t("hero.title2")}</span>
            </h1>
            
            <p 
              className="mt-4 md:mt-8 text-xl md:text-2xl font-medium animate-slide-up text-muted-foreground" 
              style={{ animationDelay: "0.1s" }}
            >
              {t("hero.description")}
            </p>

            <div 
              className="mt-8 md:mt-12 animate-slide-up" 
              style={{ animationDelay: "0.2s" }}
            >
              <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/zelim-spletno-stran">
                  {t("hero.cta")}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            {/* Trust indicators - improved for mobile */}
            <div 
              className="mt-8 md:mt-16 grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-10 animate-slide-up" 
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 md:mb-0 md:w-auto md:h-auto md:bg-transparent">
                  <Zap className="w-5 h-5 md:w-4 md:h-4 text-primary md:hidden" />
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs md:text-sm font-medium text-center md:text-left">{t("hero.fast")}</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 md:mb-0 md:w-auto md:h-auto md:bg-transparent">
                  <TrendingUp className="w-5 h-5 md:w-4 md:h-4 text-primary md:hidden" />
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs md:text-sm font-medium text-center md:text-left">{t("hero.mobile")}</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 md:mb-0 md:w-auto md:h-auto md:bg-transparent">
                  <Sparkles className="w-5 h-5 md:w-4 md:h-4 text-primary md:hidden" />
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs md:text-sm font-medium text-center md:text-left">{t("hero.seo")}</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image - Right Side (Desktop) */}
          <div 
            className="relative animate-slide-up hidden md:flex justify-center items-center" 
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl scale-110" />
            <img 
              src={heroDevices} 
              alt="Primeri spletnih strani na različnih napravah" 
              className="w-full max-w-xl object-contain drop-shadow-2xl relative z-10" 
            />
          </div>
        </div>
        
        {/* Hero Image - Mobile (below text) */}
        <div 
          className="md:hidden flex justify-center items-center px-4 pb-8 animate-slide-up relative" 
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
          <img 
            src={heroDevices} 
            alt="Primeri spletnih strani na različnih napravah" 
            className="w-full max-w-md object-contain drop-shadow-2xl relative z-10" 
          />
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