import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Smartphone, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight animate-slide-up">
            Spletne strani, ki prinašajo povpraševanja.
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Od ideje do online v nekaj dneh. Fokus na jasen dizajn, hitrost in konverzije.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/zelim-spletno-stran">
                Želim spletno stran
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#portfolio">Poglej projekte</a>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap size={18} className="text-foreground" />
              <span className="text-sm font-medium">Hitro</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Smartphone size={18} className="text-foreground" />
              <span className="text-sm font-medium">Mobile-first</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Search size={18} className="text-foreground" />
              <span className="text-sm font-medium">SEO osnove</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
