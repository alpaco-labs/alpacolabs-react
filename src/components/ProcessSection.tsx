import { MessageSquare, Pencil, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Kratek vprašalnik + cilj",
    description: "Izpolniš obrazec, da razumem tvoje potrebe in cilje projekta.",
  },
  {
    id: 2,
    icon: Pencil,
    title: "Osnutek v 48–72 urah",
    description: "Pripravim prvi osnutek dizajna, ki ga skupaj pregledava.",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Popravki + objava + optimizacija",
    description: "Implementiram popravke, objavim stran in poskrbim za optimizacijo.",
  },
];

const ProcessSection = () => {
  return (
    <section id="proces" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Kako poteka sodelovanje
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon size={28} className="text-foreground" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Korak {step.id}
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
