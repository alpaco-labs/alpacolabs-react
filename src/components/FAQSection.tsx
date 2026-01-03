import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    { id: "1", questionKey: "faq.q1", answerKey: "faq.a1" },
    { id: "2", questionKey: "faq.q2", answerKey: "faq.a2" },
    { id: "3", questionKey: "faq.q3", answerKey: "faq.a3" },
    { id: "4", questionKey: "faq.q4", answerKey: "faq.a4" },
    { id: "5", questionKey: "faq.q5", answerKey: "faq.a5" },
    { id: "6", questionKey: "faq.q6", answerKey: "faq.a6" },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("faq.title")}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-xl px-6 bg-card/50 data-[state=open]:bg-card transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline py-5 text-[15px]">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {t(faq.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
