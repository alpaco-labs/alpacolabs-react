import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Subtle radial glow overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 80%, rgba(139, 92, 246, 0.15), transparent)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight animate-slide-up"
          >
            Spletne strani, ki<br className="hidden sm:block" /> prinašajo povpraševanja.
          </h1>
          
          <p 
            className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Od ideje do online v nekaj dneh. Fokus na jasen dizajn, hitrost in konverzije.
          </p>

          <div 
            className="mt-10 md:mt-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/zelim-spletno-stran">
                Želim spletno stran
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
              <span className="text-sm font-medium">Hitro</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
              <span className="text-sm font-medium">Mobile-first</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full" />
              <span className="text-sm font-medium">SEO osnove</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, hsl(240, 10%, 4%), transparent)',
        }}
      />
    </section>
  );
};

export default HeroSection;