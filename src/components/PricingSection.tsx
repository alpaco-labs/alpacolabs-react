import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();

  const packages = [
    {
      id: 1,
      nameKey: "pricing.landing",
      price: "300 €",
      featureKeys: [
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
    },
    {
      id: 2,
      nameKey: "pricing.website",
      price: "650 €",
      featureKeys: [
        "pricing.feature.subpages",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
    },
    {
      id: 3,
      nameKey: "pricing.store",
      price: "1.200 €",
      featureKeys: [
        "pricing.feature.fullstore",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
    },
    {
      id: 4,
      nameKey: "pricing.mvp",
      price: "1.800 €",
      featureKeys: [
        "pricing.feature.custom",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
    },
  ];

  return (
    <section id="storitve" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("pricing.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="bg-card border border-border rounded-xl p-6 hover-lift border-glow animate-slide-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {t(pkg.nameKey)}
              </h3>
              <p className="text-2xl font-heading font-semibold text-foreground mb-6">
                {t("pricing.from")} {pkg.price}
              </p>
              <ul className="space-y-3 mb-6">
                {pkg.featureKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-foreground/70 mt-0.5 flex-shrink-0" />
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/zelim-spletno-stran">{t("pricing.calculate")}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-12">
          {t("pricing.note")}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
