import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: "Artisan Coffee",
    description: "40% več povpraševanj v prvem mesecu",
    tags: ["Landing"],
  },
  {
    id: 2,
    name: "Studio Lux",
    description: "Moderna predstavitev arhitekturnega studia",
    tags: ["Website"],
  },
  {
    id: 3,
    name: "FitGear Pro",
    description: "E-trgovina z 25% konverzijo",
    tags: ["Trgovina"],
  },
  {
    id: 4,
    name: "TaskFlow",
    description: "MVP aplikacija za upravljanje projektov",
    tags: ["MVP"],
  },
  {
    id: 5,
    name: "Zdravje Plus",
    description: "Rezervacijski sistem za kliniko",
    tags: ["Website"],
  },
  {
    id: 6,
    name: "Urban Eats",
    description: "Platforma za dostavo hrane",
    tags: ["Trgovina", "MVP"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Izbrani projekti
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Vizualizacija</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Primeri so demonstracijski (demo projekti).
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;
