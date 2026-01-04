import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PricingSection = () => {
  const { t } = useLanguage();
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const monthlyPackages = [
    {
      id: 1,
      nameKey: "pricing.landing",
      price: "6,99 €",
      period: "/ mesec",
      featureKeys: [
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.landing.monthly",
      buttonKey: "pricing.button.monthly",
    },
    {
      id: 2,
      nameKey: "pricing.website",
      price: "16,99 €",
      period: "/ mesec",
      featureKeys: [
        "pricing.feature.subpages",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.website.monthly",
      buttonKey: "pricing.button.monthly",
    },
    {
      id: 3,
      nameKey: "pricing.store",
      price: "59,99 €",
      period: "/ mesec",
      featureKeys: [
        "pricing.feature.fullstore",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.store.monthly",
      buttonKey: "pricing.button.monthly",
    },
    {
      id: 4,
      nameKey: "pricing.mvp",
      price: "119,99 €",
      period: "/ mesec",
      featureKeys: [
        "pricing.feature.custom",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.mvp.monthly",
      buttonKey: "pricing.button.monthly",
    },
  ];

  const onetimePackages = [
    {
      id: 1,
      nameKey: "pricing.landing",
      price: "Od 300 €",
      period: "",
      featureKeys: [
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.landing.onetime",
      buttonKey: "pricing.calculate",
    },
    {
      id: 2,
      nameKey: "pricing.website",
      price: "Od 650 €",
      period: "",
      featureKeys: [
        "pricing.feature.subpages",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.website.onetime",
      buttonKey: "pricing.calculate",
    },
    {
      id: 3,
      nameKey: "pricing.store",
      price: "Od 1.200 €",
      period: "",
      featureKeys: [
        "pricing.feature.fullstore",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.store.onetime",
      buttonKey: "pricing.calculate",
    },
    {
      id: 4,
      nameKey: "pricing.mvp",
      price: "Od 1.800 €",
      period: "",
      featureKeys: [
        "pricing.feature.custom",
        "pricing.feature.responsive",
        "pricing.feature.seo",
        "pricing.feature.gdpr",
        "pricing.feature.fast",
      ],
      tooltipKey: "pricing.tooltip.mvp.onetime",
      buttonKey: "pricing.calculate",
    },
  ];

  const packages = isMonthly ? monthlyPackages : onetimePackages;

  return (
    <TooltipProvider>
      <section id="storitve" className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
              {t("pricing.title")}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm md:text-base">
              {t("pricing.subtitle")}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <span className="text-sm text-muted-foreground">
              {t("pricing.toggleLabel")}
            </span>
            <div className="flex items-center gap-0 bg-muted rounded-full p-1">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isMonthly
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.monthly")}
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isMonthly
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.onetime")}
              </button>
            </div>
          </div>

          {/* Badge and subtitle text */}
          <div className="text-center mb-8">
            {!isMonthly && (
              <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
                {t("pricing.recommended")}
              </span>
            )}
            <p className="text-sm text-muted-foreground">
              {isMonthly ? t("pricing.monthlyNote") : t("pricing.onetimeNote")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative border border-border rounded-xl p-6 hover-lift border-glow animate-slide-up transition-colors duration-150 ease-out ${
                  activeTooltip === pkg.id ? 'bg-foreground/[0.03]' : 'bg-card'
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Tooltip icon */}
                <Tooltip 
                  delayDuration={0}
                  onOpenChange={(open) => setActiveTooltip(open ? pkg.id : null)}
                >
                  <TooltipTrigger asChild>
                    <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
                      <Info size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    align="end"
                    sideOffset={10}
                    className="max-w-[250px] text-sm z-50 animate-fade-in"
                  >
                    {t(pkg.tooltipKey)}
                  </TooltipContent>
                </Tooltip>

                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 pr-6">
                  {t(pkg.nameKey)}
                </h3>
                <p className="text-2xl font-heading font-semibold text-foreground mb-6">
                  {pkg.price}
                  {isMonthly && (
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      {pkg.period}
                    </span>
                  )}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.featureKeys.map((featureKey) => (
                    <li
                      key={featureKey}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check
                        size={16}
                        className="text-foreground/70 mt-0.5 flex-shrink-0"
                      />
                      {t(featureKey)}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/zelim-spletno-stran">{t(pkg.buttonKey)}</Link>
                </Button>
              </div>
            ))}
          </div>

          {!isMonthly && (
            <p className="text-center text-muted-foreground text-sm mt-12">
              {t("pricing.onetimeFooter")}
            </p>
          )}
        </div>
      </section>
    </TooltipProvider>
  );
};

export default PricingSection;
