import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-muted/30 border-t border-border/50">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-xl font-semibold tracking-tight text-foreground">
              ZAN LABS
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs leading-relaxed">
              Spletne strani, ki prinašajo povpraševanja. Od ideje do online v nekaj dneh.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">Kontakt</h4>
            <div className="space-y-4">
              <a className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm" href="mailto:zan.pustotnik7@gmail.com">
                <Mail size={16} className="text-foreground/50" />
                zan.pustotnik7@gmail.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-foreground/50" />
                Blagovica, Slovenija
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-5">Družbena omrežja</h4>
            <div className="flex gap-6">
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
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} ZAN LABS. Vse pravice pridržane.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;