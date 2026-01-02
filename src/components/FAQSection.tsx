import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "1",
    question: "Koliko časa traja izdelava spletne strani?",
    answer:
      "Odvisno od obsega projekta. Landing stran je lahko pripravljena v 3–7 dneh, večja spletna stran v 2–4 tednih, trgovina ali MVP pa v 4–8 tednih.",
  },
  {
    id: "2",
    question: "Kaj vse je vključeno v ceno?",
    answer:
      "Vsak paket vključuje responsive dizajn, osnovni SEO, GDPR osnove in hitro nalaganje. Dodatne funkcionalnosti (blog, rezervacije, več jezikov) se zaračunajo posebej.",
  },
  {
    id: "3",
    question: "Koliko popravkov je vključenih?",
    answer:
      "V ceno sta vključeni 2 večji reviziji dizajna. Manjši popravki (besedila, barve) so neomejeni med razvojem.",
  },
  {
    id: "4",
    question: "Ali moram sam pripraviti vsebino?",
    answer:
      "Idealno je, če imaš pripravljeno osnovno vsebino (besedila, slike). Če je nimaš, lahko pomagam pri pripravi za dodatno ceno.",
  },
  {
    id: "5",
    question: "Kaj pa gostovanje in domena?",
    answer:
      "Svetujem pri izbiri gostovanja in domene. Osnovni hosting je možno urediti že od 5 €/mesec. Lahko tudi prevzamem upravljanje za mesečno naročnino.",
  },
  {
    id: "6",
    question: "Kako poteka plačilo?",
    answer:
      "Običajno 50% predplačilo pred začetkom dela, 50% ob zaključku. Za večje projekte je možno dogovoriti plačilo v več obrokih.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Pogosta vprašanja
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
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {faq.answer}
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