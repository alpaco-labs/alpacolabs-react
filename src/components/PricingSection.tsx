import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Package {
  id: number;
  name: string;
  price: string;
  features: string[];
}

const packages: Package[] = [
  {
    id: 1,
    name: "Landing stran",
    price: "Od 300 €",
    features: [
      "Responsive dizajn",
      "Osnovni SEO",
      "GDPR osnove",
      "Hitro nalaganje",
    ],
  },
  {
    id: 2,
    name: "Spletna stran",
    price: "Od 650 €",
    features: [
      "Več podstrani",
      "Responsive dizajn",
      "Osnovni SEO",
      "GDPR osnove",
      "Hitro nalaganje",
    ],
  },
  {
    id: 3,
    name: "Spletna trgovina",
    price: "Od 1.200 €",
    features: [
      "Celotna trgovina",
      "Responsive dizajn",
      "Osnovni SEO",
      "GDPR osnove",
      "Hitro nalaganje",
    ],
  },
  {
    id: 4,
    name: "Web / Mobile MVP",
    price: "Od 1.800 €",
    features: [
      "Po meri razvoj",
      "Responsive dizajn",
      "Osnovni SEO",
      "GDPR osnove",
      "Hitro nalaganje",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="storitve" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Paketi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="bg-card border border-border rounded-lg p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {pkg.name}
              </h3>
              <p className="text-2xl font-heading font-semibold text-foreground mb-6">
                {pkg.price}
              </p>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/zelim-spletno-stran">Izračunaj ceno</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Končna cena je odvisna od obsega in funkcionalnosti.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
