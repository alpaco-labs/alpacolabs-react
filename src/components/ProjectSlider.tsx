import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Project images
import archStudioImg from "@/assets/projects/arch-studio.png";
import osebniPortfolioImg from "@/assets/projects/osebni-portfolio.png";
import perspektivaImg from "@/assets/projects/perspektiva.png";
import alenkineSlasciceImg from "@/assets/projects/alenkine-slascice.png";
import osebniPortfolio2Img from "@/assets/projects/osebni-portfolio-2.png";

const projects = [{
  id: 1,
  name: "Arch Studio",
  typeKey: "portfolio.package.basic",
  image: archStudioImg
}, {
  id: 2,
  name: "Osebni Portfolio",
  typeKey: "portfolio.package.standard",
  image: osebniPortfolioImg
}, {
  id: 3,
  name: "Perspektiva",
  typeKey: "portfolio.package.advanced",
  image: perspektivaImg
}, {
  id: 4,
  name: "Alenkine Slaščice",
  typeKey: "portfolio.package.standard",
  image: alenkineSlasciceImg
}, {
  id: 5,
  name: "Osebni Portfolio",
  typeKey: "portfolio.package.standard",
  image: osebniPortfolio2Img
}];
const ProjectSlider = () => {
  const {
    t
  } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);
      emblaApi.scrollPrev();
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [emblaApi, isTransitioning]);

  const scrollNext = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);
      emblaApi.scrollNext();
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [emblaApi, isTransitioning]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isAutoPlaying) return;

    const autoplayInterval = setInterval(() => {
      if (!isTransitioning) {
        emblaApi.scrollNext();
      }
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, isAutoPlaying, isTransitioning]);

  // Pause auto-play on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of no interaction
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("pointerDown", handleUserInteraction);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", handleUserInteraction);
    };
  }, [emblaApi, onSelect, handleUserInteraction]);
  const getSlideStyles = (index: number) => {
    if (!emblaApi) return {
      scale: 0.88,
      opacity: 0.5
    };
    const slidesInView = emblaApi.slidesInView();
    const isSelected = index === selectedIndex;

    // Calculate distance from center
    const totalSlides = projects.length;
    let distance = Math.abs(index - selectedIndex);

    // Handle wrap-around for infinite loop
    if (distance > totalSlides / 2) {
      distance = totalSlides - distance;
    }
    if (isSelected) {
      return {
        scale: 1,
        opacity: 1,
        blur: 0
      };
    } else if (distance === 1) {
      return {
        scale: 0.88,
        opacity: 0.6,
        blur: 1
      };
    } else {
      return {
        scale: 0.8,
        opacity: 0.4,
        blur: 2
      };
    }
  };
  return <section id="portfolio" className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/20 overflow-hidden relative">
      {/* Section Title */}
      <div className="container mb-12 md:mb-14">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("portfolio.title")}
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {projects.map((project, index) => {
            const styles = getSlideStyles(index);
            const isSelected = index === selectedIndex;
            return <div key={project.id} className="flex-[0_0_85%] md:flex-[0_0_55%] lg:flex-[0_0_45%] min-w-0 pl-4 md:pl-6">
                  <div className="transition-all duration-500 ease-out" style={{
                transform: `scale(${styles.scale})`,
                opacity: styles.opacity,
                filter: styles.blur ? `blur(${styles.blur}px)` : "none"
              }}>
                    {/* Project Card */}
                    <div className="text-center">
                      {/* Image Container */}
                      <div className={cn("relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-secondary/40", "transition-shadow duration-500", isSelected && "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]")}>
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      </div>

                      {/* Project Info */}
                      <h3 className={cn("font-heading text-lg md:text-xl font-semibold text-foreground mb-1", "transition-all duration-500", !isSelected && "text-muted-foreground")}>
                        {project.name}
                      </h3>
                      <p className={cn("text-sm text-muted-foreground", "transition-opacity duration-500", !isSelected && "opacity-60")}>
                        {t(project.typeKey)}
                      </p>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </div>

        {/* Navigation Arrows - Desktop */}
        <button onClick={scrollPrev} disabled={isTransitioning} className={cn("hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10", "w-12 h-12 items-center justify-center rounded-full", "bg-card/80 backdrop-blur-sm border border-border", "text-foreground/70 hover:text-foreground hover:bg-card", "transition-all duration-300 hover:scale-105", "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100")} aria-label="Previous project">
          <ChevronLeft size={24} />
        </button>

        <button onClick={scrollNext} disabled={isTransitioning} className={cn("hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10", "w-12 h-12 items-center justify-center rounded-full", "bg-card/80 backdrop-blur-sm border border-border", "text-foreground/70 hover:text-foreground hover:bg-card", "transition-all duration-300 hover:scale-105", "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100")} aria-label="Next project">
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", index === selectedIndex ? "bg-foreground w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
      </div>
    </section>;
};
export default ProjectSlider;