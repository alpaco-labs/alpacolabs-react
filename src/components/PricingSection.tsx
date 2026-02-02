import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInquiryModal } from "@/contexts/InquiryModalContext";

interface Package {
  id: number;
  name: string;
  subtitle: string;
  originalPrice: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: 1,
    name: "Osnovni paket",
    subtitle: "Za enostavno spletno prisotnost",
    originalPrice: "15 €",
    price: "10 €",
    features: [
      "Enostavna spletna stran ali landing page",
      "Razvoj spletne strani vključen",
      "Vodenje in vzdrževanje",
      "Gostovanje in osnovna podpora",
      "Brezplačen posvet",
    ],
  },
  {
    id: 2,
    name: "Standardni paket",
    subtitle: "Za večino malih podjetij",
    originalPrice: "35 €",
    price: "25 €",
    features: [
      "Večstranska spletna stran",
      "Prilagojena struktura",
      "Razvoj spletne strani vključen",
      "Redne posodobitve in vodenje",
      "Gostovanje in podpora",
      "Brezplačen posvet",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Napredni paket",
    subtitle: "Za zahtevnejše projekte",
    originalPrice: "50 €",
    price: "35 €",
    features: [
      "Večja ali bolj prilagojena spletna stran",
      "Dodatne funkcionalnosti po dogovoru",
      "Razvoj spletne strani vključen",
      "Prednostna podpora in vzdrževanje",
      "Brezplačen posvet",
    ],
  },
];

const PricingSection = () => {
  const { t } = useLanguage();
  const { openInquiryModal } = useInquiryModal();

  return (
    <section id="storitve" className="py-16 md:py-24 bg-muted/30 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("pricing.title")}
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative border rounded-2xl p-6 md:p-8 hover-lift animate-slide-up transition-all duration-200 flex flex-col shadow-lg ${
                pkg.popular 
                  ? "bg-card border-primary/40 border-2" 
                  : "bg-card border-border/60 border-[1.5px]"
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">
                    <Star size={12} className="fill-current" />
                    Najbolj priljubljen
                  </div>
                </div>
              )}

              {/* Package name & subtitle */}
              <div className={pkg.popular ? "mt-2" : ""}>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg text-muted-foreground line-through">
                    {pkg.originalPrice}
                  </span>
                  <span className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground">/ mesec</span>
                </div>
              </div>

              {/* Features section */}
              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant="hero"
                className="w-full rounded-full"
                onClick={() => openInquiryModal(pkg.name)}
              >
                {t("nav.cta.inquiry")}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default PricingSection;
