import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQSection = () => {
  const { t } = useLanguage();

  // Updated FAQ list - removed payment, price calculator, and scope overflow questions
  const faqs = [
    { id: "1", questionKey: "faq.q1", answerKey: "faq.a1" },
    { id: "2", questionKey: "faq.q2", answerKey: "faq.a2" },
    { id: "3", questionKey: "faq.q3", answerKey: "faq.a3" },
    { id: "4", questionKey: "faq.q4", answerKey: "faq.a4" },
    { id: "5", questionKey: "faq.q5", answerKey: "faq.a5" },
    { id: "6", questionKey: "faq.q9", answerKey: "faq.a9" },
    { id: "7", questionKey: "faq.q10", answerKey: "faq.a10" },
  ];

  return (
    <section id="faq" className="py-14 md:py-20 bg-background relative">
      {/* Top visual anchor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {t("faq.title")}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-xl px-5 bg-card/50 data-[state=open]:bg-card data-[state=open]:shadow-sm transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline py-4 text-[15px]">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
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