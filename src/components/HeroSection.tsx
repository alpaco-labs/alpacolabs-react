import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Multiple glow orbs for more life */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139, 92, 246, 0.2), transparent)',
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse 40% 30% at 30% 60%, rgba(236, 72, 153, 0.1), transparent)',
          animationDuration: '4s',
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse 50% 35% at 70% 40%, rgba(59, 130, 246, 0.1), transparent)',
          animationDuration: '5s',
          animationDelay: '1s',
        }}
      />
      
      {/* Content - centered */}
      <div className="relative z-10 container flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight animate-slide-up"
          >
            Spletne strani, ki<br /> prinašajo povpraševanja.
          </h1>
          
          <p 
            className="mt-8 md:mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            Od ideje do online v nekaj dneh. Fokus na jasen dizajn, hitrost in konverzije.
          </p>

          <div 
            className="mt-12 md:mt-14 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl" asChild className="group">
              <Link to="/zelim-spletno-stran">
                Želim spletno stran
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-20 md:mt-24 flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-slide-up"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="flex items-center gap-2.5 text-muted-foreground/80 hover:text-foreground transition-colors">
              <div className="w-2 h-2 bg-violet-500/70 rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-wide">Hitro</span>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground/80 hover:text-foreground transition-colors">
              <div className="w-2 h-2 bg-blue-500/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm font-medium tracking-wide">Mobile-first</span>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground/80 hover:text-foreground transition-colors">
              <div className="w-2 h-2 bg-pink-500/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm font-medium tracking-wide">SEO osnove</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)), transparent)',
        }}
      />
    </section>
  );
};

export default HeroSection;