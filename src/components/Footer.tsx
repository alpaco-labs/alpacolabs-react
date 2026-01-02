import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-heading text-xl font-semibold tracking-tight text-foreground"
            >
              ZAN LABS
            </Link>
            <p className="mt-3 text-muted-foreground text-sm max-w-xs">
              Spletne strani, ki prinašajo povpraševanja. Od ideje do online v nekaj dneh.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Kontakt</h4>
            <div className="space-y-3">
              <a
                href="mailto:zan@email.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Mail size={16} />
                zan@email.com
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                Slovenija
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Družbena omrežja</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} ZAN LABS. Vse pravice pridržane.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
