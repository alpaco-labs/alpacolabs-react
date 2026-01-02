import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Pripravljen/a na naslednji korak?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Izpolni kratek vprašalnik in takoj vidiš oceno investicije.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/zelim-spletno-stran">
              Izračunaj oceno cene
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
