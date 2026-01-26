import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
const PortfolioSection = () => {
  const {
    t
  } = useLanguage();
  const projects = [{
    id: 1,
    name: "Artisan Coffee",
    descriptionKey: "portfolio.project1.description",
    tagKeys: ["portfolio.tag.landing"]
  }, {
    id: 2,
    name: "Studio Lux",
    descriptionKey: "portfolio.project2.description",
    tagKeys: ["portfolio.tag.website"]
  }, {
    id: 3,
    name: "FitGear Pro",
    descriptionKey: "portfolio.project3.description",
    tagKeys: ["portfolio.tag.store"]
  }, {
    id: 4,
    name: "TaskFlow",
    descriptionKey: "portfolio.project4.description",
    tagKeys: ["portfolio.tag.mvp"]
  }, {
    id: 5,
    name: "Zdravje Plus",
    descriptionKey: "portfolio.project5.description",
    tagKeys: ["portfolio.tag.website"]
  }, {
    id: 6,
    name: "Urban Eats",
    descriptionKey: "portfolio.project6.description",
    tagKeys: ["portfolio.tag.store", "portfolio.tag.mvp"]
  }];
  return <section id="portfolio" className="py-16 bg-muted/20 md:py-0">
      <div className="container">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("portfolio.title")}
          </h2>
        </div>

        
      </div>
    </section>;
};
export default PortfolioSection;