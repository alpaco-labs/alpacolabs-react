import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["portfolio", "storitve", "proces", "faq"];
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }
      
      // If at the very top, no section is active
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#portfolio", labelKey: "nav.portfolio" },
    { href: "#storitve", labelKey: "nav.services" },
    { href: "#proces", labelKey: "nav.process" },
    { href: "#faq", labelKey: "nav.faq" },
  ];

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity duration-300"
          >
            ZAN LABS
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {isHome &&
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-medium transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-left after:transition-transform after:duration-300 ${
                    activeSection === link.href
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            <ThemeToggle />
          </nav>

          {/* CTA Button - Right */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" asChild>
              <Link to="/zelim-spletno-stran">{t("nav.cta")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50">
          <nav className="container py-6 flex flex-col gap-4">
            {isHome &&
              navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-base font-medium py-2 transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-left after:transition-transform after:duration-300 ${
                    activeSection === link.href
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  } ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => handleNavClick(link.href)}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            <div
              className={`flex items-center justify-between py-2 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${navLinks.length * 50}ms` }}
            >
              <span className="text-muted-foreground text-base font-medium">{t("nav.theme")}</span>
              <ThemeToggle />
            </div>
            <Button
              variant="hero"
              size="lg"
              className={`mt-2 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${(navLinks.length + 1) * 50}ms` }}
              asChild
            >
              <Link to="/zelim-spletno-stran" onClick={() => setIsMobileMenuOpen(false)}>
                {t("nav.cta")}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;