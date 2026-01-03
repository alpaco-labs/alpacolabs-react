import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#portfolio", label: "Portfolio" },
    { href: "#storitve", label: "Storitve" },
    { href: "#proces", label: "Proces" },
    { href: "#faq", label: "FAQ" },
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
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            <ThemeToggle />
          </nav>

          {/* CTA Button - Right */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" asChild>
              <Link to="/zelim-spletno-stran">Želim spletno stran</Link>
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-fade-in">
          <nav className="container py-6 flex flex-col gap-4">
            {isHome &&
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground text-base font-medium">Tema</span>
              <ThemeToggle />
            </div>
            <Button variant="hero" size="lg" className="mt-2" asChild>
              <Link to="/zelim-spletno-stran" onClick={() => setIsMobileMenuOpen(false)}>
                Želim spletno stran
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;