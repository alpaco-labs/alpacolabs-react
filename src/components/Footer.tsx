import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoDark from "@/assets/logo-dark.png";
import footerAlpacaDark from "@/assets/footer-alpaca-dark.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto items-start">
          {/* Brand with Alpaca */}
          <div className="flex items-start gap-4">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <img src={logoDark} alt="Alpaca Labs" className="h-8 w-auto" />
                <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  ALPACA LABS
                </span>
              </Link>
              <p className="mt-4 text-muted-foreground text-sm max-w-xs leading-relaxed">
                Spletne strani, ki prinašajo povpraševanja. Od ideje do online v nekaj dneh.
              </p>
            </div>
            {/* Alpaca mascot */}
            <div className="flex-shrink-0">
              <img 
                src={footerAlpacaDark} 
                alt="Alpaco Labs mascot" 
                className="w-24 h-auto object-contain"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                }}
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <a className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm" href="mailto:info@alpacolabs.com">
                <Mail size={16} className="text-foreground/50" />
                info@alpacolabs.com
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-foreground/50 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+38670732085" className="hover:text-foreground transition-colors">+386 70 732 085 – Andraž</a>
                  <a href="tel:+38670595044" className="hover:text-foreground transition-colors">+386 70 595 044 – Žan</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-foreground/50" />
                Ljubljana, Slovenija
              </div>
            </div>
          </div>

          {/* Social & Language */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">{t("footer.social")}</h4>
            <div className="flex gap-6 mb-6">
              <a href="https://www.instagram.com/alpacolabs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                Instagram
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587378269518" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                Facebook
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} ALPACO LABS. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;