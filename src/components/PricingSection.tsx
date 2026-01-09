import { useState, useCallback } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InteractiveTooltip } from "@/components/InteractiveTooltip";
import { PriceCalculator } from "@/components/PriceCalculator";

type PackageType = "landing" | "website" | "store" | "mvp";

interface Package {
  id: number;
  type: PackageType;
  name: string;
  tooltip: React.ReactNode;
  features: string[];
  monthlyPrice: string;
  yearlyPrice: string;
}

const packages: Package[] = [
  {
    id: 1,
    type: "landing",
    name: "Landing Start",
    tooltip: (
      <div className="space-y-2">
        <p className="font-medium">Za enostavne strani z jasnim ciljem.</p>
        <p className="text-muted-foreground">Primeren, če potrebuješ:</p>
        <ul className="text-muted-foreground space-y-1 ml-2">
          <li>• predstavitveno stran za storitev ali produkt</li>
          <li>• stran za zbiranje povpraševanj</li>
          <li>• promocijsko ali kampanjsko stran</li>
          <li>• stran za testiranje ideje ali oglase</li>
        </ul>
      </div>
    ),
    features: [
      "1 landing stran",
      "gostovanje in osnovno vzdrževanje",
      "prilagojen prikaz za vse naprave",
      "osnovni SEO",
      "manjše vsebinske popravke (tekst, slike)",
      "osnovno podporo",
    ],
    monthlyPrice: "7,90 € – 24,90 €",
    yearlyPrice: "79 € – 249 €",
  },
  {
    id: 2,
    type: "website",
    name: "Spletna stran",
    tooltip: (
      <div className="space-y-2">
        <p className="font-medium">Za klasične spletne strani z več vsebine.</p>
        <p className="text-muted-foreground">Primeren, če potrebuješ:</p>
        <ul className="text-muted-foreground space-y-1 ml-2">
          <li>• spletno stran podjetja</li>
          <li>• osebno ali poslovno predstavitev</li>
          <li>• spletno stran za storitveno dejavnost</li>
          <li>• informativno spletno stran z več podstranmi</li>
        </ul>
      </div>
    ),
    features: [
      "več podstrani",
      "jasno navigacijo",
      "kontaktni obrazec",
      "stabilno strukturo strani",
      "manjše mesečne popravke",
      "redno podporo",
    ],
    monthlyPrice: "14,90 € – 49,90 €",
    yearlyPrice: "149 € – 499 €",
  },
  {
    id: 3,
    type: "store",
    name: "Spletna trgovina",
    tooltip: (
      <div className="space-y-2">
        <p className="font-medium">Za prodajo izdelkov in storitev na spletu.</p>
        <p className="text-muted-foreground">Primeren, če potrebuješ:</p>
        <ul className="text-muted-foreground space-y-1 ml-2">
          <li>• spletno prodajo izdelkov</li>
          <li>• digitalne ali fizične produkte</li>
          <li>• enostavno upravljanje naročil</li>
          <li>• razširljivo trgovino</li>
        </ul>
      </div>
    ),
    features: [
      "celotno spletno trgovino",
      "upravljanje izdelkov",
      "nakupni proces (košarica in naročilo)",
      "prilagojen prikaz za vse naprave",
      "osnovni SEO",
      "GDPR osnove",
    ],
    monthlyPrice: "29,90 € – 99,90 €",
    yearlyPrice: "299 € – 999 €",
  },
  {
    id: 4,
    type: "mvp",
    name: "Web / Mobile MVP",
    tooltip: (
      <div className="space-y-2">
        <p className="font-medium">Za produkte, platforme in razvoj ideje.</p>
        <p className="text-muted-foreground">Primeren, če potrebuješ:</p>
        <ul className="text-muted-foreground space-y-1 ml-2">
          <li>• MVP ali testno verzijo produkta</li>
          <li>• platformo ali aplikacijo</li>
          <li>• digitalni produkt v razvoju</li>
          <li>• rešitev, ki se bo pogosto spreminjala</li>
        </ul>
      </div>
    ),
    features: [
      "razvoj po meri",
      "pripravljeno za testiranje ideje",
      "prilagodljiv dizajn",
      "podpora pri razvoju",
      "osnova za rast in nadgradnje",
    ],
    monthlyPrice: "49,90 € – 169,90 €",
    yearlyPrice: "499 € – 1.699 €",
  },
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState<PackageType | null>(null);

  const handleTooltipChange = useCallback((id: number, open: boolean) => {
    if (open) {
      setActiveTooltip(id);
    } else if (activeTooltip === id) {
      setActiveTooltip(null);
    }
  }, [activeTooltip]);

  return (
    <section id="storitve" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Paketi
          </h2>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-muted-foreground">Choose your payment option</p>
        </div>

        {/* Payment Switch */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Mesečno
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                Letno
              </span>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                2 meseca gratis
              </span>
            </div>
          </div>
        </div>

        {/* Helper text */}
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground">
            Letna naročnina = plačaš 10 mesecev.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative border border-border rounded-xl p-6 hover-lift border-glow animate-slide-up transition-colors duration-150 ease-out flex flex-col ${
                activeTooltip === pkg.id ? "bg-foreground/[0.03]" : "bg-card"
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Tooltip icon */}
              <InteractiveTooltip
                content={pkg.tooltip}
                isOpen={activeTooltip === pkg.id}
                onOpenChange={(open) => handleTooltipChange(pkg.id, open)}
                side="bottom"
                align="end"
                sideOffset={10}
                className="max-w-[280px] text-sm z-50 animate-fade-in"
              >
                <Info size={16} />
              </InteractiveTooltip>

              {/* Package name */}
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 pr-6">
                {pkg.name}
              </h3>

              {/* Features section */}
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-3">Kaj vključuje</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-foreground/70 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="mb-6 mt-auto">
                <p className="text-xl font-heading font-semibold text-foreground">
                  {isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isYearly ? "/ leto" : "/ mesec"}
                </p>
                {isYearly && (
                  <p className="text-xs text-emerald-500 mt-1">(2 meseca gratis)</p>
                )}
              </div>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCalculatorOpen(pkg.type)}
              >
                Izračunaj točno ceno
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Price Calculator Modal */}
      {calculatorOpen && (
        <PriceCalculator
          isOpen={!!calculatorOpen}
          onClose={() => setCalculatorOpen(null)}
          packageType={calculatorOpen}
          isYearly={isYearly}
        />
      )}
    </section>
  );
};

export default PricingSection;
