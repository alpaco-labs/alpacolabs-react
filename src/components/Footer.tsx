import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              {/* Dark mode logo (white) */}
              <img src={logoDark} alt="Alpaca Labs" className="hidden dark:block h-8 w-auto" />
              {/* Light mode logo (dark) */}
              <img src={logoLight} alt="Alpaca Labs" className="block dark:hidden h-8 w-auto" />
              <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
                ALPACA LABS
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">{t("footer.contact")}</h4>
            <div className="space-y-4">
              <a className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm" href="mailto:zan.pustotnik7@gmail.com">
                <Mail size={16} className="text-foreground/50" />
                zan.pustotnik7@gmail.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-foreground/50" />
                {t("footer.location")}
              </div>
            </div>
          </div>

          {/* Social & Language */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">{t("footer.social")}</h4>
            <div className="flex gap-6 mb-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                Twitter
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} ALPACA LABS. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
