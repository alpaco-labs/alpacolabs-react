import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      name: "Artisan Coffee",
      descriptionKey: "portfolio.project1.description",
      tagKeys: ["portfolio.tag.landing"],
    },
    {
      id: 2,
      name: "Studio Lux",
      descriptionKey: "portfolio.project2.description",
      tagKeys: ["portfolio.tag.website"],
    },
    {
      id: 3,
      name: "FitGear Pro",
      descriptionKey: "portfolio.project3.description",
      tagKeys: ["portfolio.tag.store"],
    },
    {
      id: 4,
      name: "TaskFlow",
      descriptionKey: "portfolio.project4.description",
      tagKeys: ["portfolio.tag.mvp"],
    },
    {
      id: 5,
      name: "Zdravje Plus",
      descriptionKey: "portfolio.project5.description",
      tagKeys: ["portfolio.tag.website"],
    },
    {
      id: 6,
      name: "Urban Eats",
      descriptionKey: "portfolio.project6.description",
      tagKeys: ["portfolio.tag.store", "portfolio.tag.mvp"],
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("portfolio.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover-lift animate-slide-up shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="aspect-video bg-secondary/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">{t("portfolio.visualization")}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tagKeys.map((tagKey) => (
                    <Badge
                      key={tagKey}
                      variant="secondary"
                      className="text-xs font-medium bg-secondary/80 text-secondary-foreground border-0"
                    >
                      {t(tagKey)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
