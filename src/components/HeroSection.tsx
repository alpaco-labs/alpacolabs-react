import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroDevices from "@/assets/hero-devices.png";

const HeroSection = () => {
  const { t } = useLanguage();
  const [showNumber, setShowNumber] = useState(false);
  
  const phoneNumber = "+386 70 732 085";
  const phoneLink = "tel:+38670732085";

  const handleDesktopClick = () => {
    setShowNumber(true);
  };

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Background gradient - dark only */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsla(220, 20%, 4%, 1) 0%, hsla(220, 20%, 8%, 1) 100%)'
      }} />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center px-4 md:pb-[40px] md:py-[20px] py-[10px] pt-0 pb-[15px]">
          {/* Text - left aligned */}
          <div className="text-center md:text-left">
            {/* Badge - properly positioned below header */}
            <div className="flex justify-center md:justify-start mb-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 max-w-full">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-primary whitespace-normal">Stroške razvoja krijemo mi.</span>
              </div>
            </div>
            
            {/* Fixed headline for mobile - proper word spacing */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight animate-slide-up text-foreground">
              <span className="inline">{t("hero.title1")}</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="text-primary">{t("hero.title2")}</span>
            </h1>
            
            <p className="mt-4 md:mt-8 text-xl md:text-2xl font-medium animate-slide-up text-muted-foreground" style={{
              animationDelay: "0.1s"
            }}>
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 md:mt-12 animate-slide-up" style={{
              animationDelay: "0.2s"
            }}>
              {/* Availability text */}
              <p className="text-sm text-muted-foreground mb-3">{t("hero.available")}</p>
              
              {/* Mobile CTA - calls directly */}
              <div className="md:hidden">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full sm:w-auto rounded-full"
                  asChild
                >
                  <a href={phoneLink} className="flex items-center justify-center gap-2">
                    <Phone size={18} />
                    {t("cta.callButton")}
                  </a>
                </Button>
              </div>

              {/* Desktop CTA - shows phone number on click */}
              <div className="hidden md:block">
                {!showNumber ? (
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="rounded-full"
                    onClick={handleDesktopClick}
                  >
                    <Phone size={18} />
                    {t("cta.callButton")}
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <a 
                      href={phoneLink}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
                    >
                      <Phone size={18} />
                      {phoneNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
          
          {/* Hero Image - Right Side (Desktop) */}
          <div className="relative animate-slide-up hidden md:flex justify-center items-center" style={{
            animationDelay: "0.2s"
          }}>
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl scale-110" />
            <img src={heroDevices} alt="Primeri spletnih strani na različnih napravah" className="w-full max-w-xl object-contain drop-shadow-2xl relative z-10" />
          </div>
        </div>
        
        {/* Hero Image - Mobile (below text) */}
        <div className="md:hidden flex justify-center items-center px-4 pb-6 animate-slide-up relative" style={{
          animationDelay: "0.3s"
        }}>
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
          <img src={heroDevices} alt="Primeri spletnih strani na različnih napravah" className="w-full max-w-md object-contain drop-shadow-2xl relative z-10" />
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
      }} />
      
      {/* Visual divider transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
};

export default HeroSection;