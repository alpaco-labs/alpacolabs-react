import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark base layer */}
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, hsl(220, 20%, 4%) 0%, hsl(220, 25%, 6%) 40%, hsl(210, 30%, 8%) 70%, hsl(200, 35%, 10%) 100%)'
    }} />
      
      {/* Wave glow - main cyan/blue glow */}
      <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 120% 50% at 50% 105%, hsla(195, 100%, 50%, 0.35) 0%, hsla(200, 100%, 45%, 0.2) 30%, transparent 70%)'
    }} />
      
      {/* Wave glow - electric blue accent */}
      <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 80% 35% at 40% 100%, hsla(210, 100%, 55%, 0.25) 0%, transparent 60%)'
    }} />
      
      {/* Wave glow - light cyan highlight */}
      <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 60% 25% at 60% 100%, hsla(185, 100%, 60%, 0.2) 0%, transparent 50%)'
    }} />
      
      {/* Subtle center glow for depth */}
      <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 100% 60% at 50% 95%, hsla(200, 80%, 50%, 0.08) 0%, transparent 60%)'
    }} />
      
      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight animate-slide-up">
            Spletne strani, ki<br className="hidden sm:block" /> prinašajo povpraševanja.
          </h1>
          
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{
          animationDelay: "0.1s"
        }}>Od ideje do online v nekaj dneh. Jasen dizajn, hitra stran in jasen poziv k dejanju.</p>

          <div className="mt-10 md:mt-12 animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/zelim-spletno-stran">
                Želim spletno stran
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-slide-up" style={{
          animationDelay: "0.3s"
        }}>
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
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{
      background: 'linear-gradient(to top, hsl(220, 20%, 4%), transparent)'
    }} />
    </section>;
};
export default HeroSection;