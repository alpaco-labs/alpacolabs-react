import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8 -ml-2">
              <ArrowLeft size={18} />
              Nazaj na domačo stran
            </Button>
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politika zasebnosti
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-foreground/80">
              Zadnja posodobitev: {new Date().toLocaleDateString("sl-SI")}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">1. Uvod</h2>
              <p>
                ALPACO LABS (v nadaljevanju "mi", "nas" ali "naše") spoštuje vašo zasebnost in se zavezuje k 
                varovanju vaših osebnih podatkov. Ta politika zasebnosti pojasnjuje, kako zbiramo, uporabljamo 
                in varujemo vaše podatke, ko obiščete našo spletno stran.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">2. Kateri podatki se zbirajo</h2>
              <p>Na naši spletni strani lahko zbiramo naslednje vrste podatkov:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Kontaktni podatki:</strong> ime in priimek, e-poštni naslov, 
                  telefonska številka in ime podjetja, ki jih posredujete prek obrazca za povpraševanje.
                </li>
                <li>
                  <strong className="text-foreground">Tehnični podatki:</strong> IP naslov, vrsta brskalnika, 
                  operacijski sistem in podatki o obisku strani (če ste sprejeli marketinške piškotke).
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">3. Namen zbiranja podatkov</h2>
              <p>Vaše podatke uporabljamo za:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Odgovarjanje na vaša povpraševanja in komunikacijo z vami</li>
                <li>Izboljšanje uporabniške izkušnje na naši spletni strani</li>
                <li>Analitiko obiska (le s vašim soglasjem za marketinške piškotke)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">4. Piškotki</h2>
              <p>Naša spletna stran uporablja piškotke. Ločimo med:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Nujni piškotki:</strong> potrebni za delovanje spletne strani 
                  in shranjevanje vaših preferenc (npr. soglasje za piškotke).
                </li>
                <li>
                  <strong className="text-foreground">Analitični/marketinški piškotki:</strong> uporabljamo jih le, 
                  če nam to izrecno dovolite. Ti piškotki nam pomagajo razumeti, kako obiskovalci uporabljajo našo stran.
                </li>
              </ul>
              <p>
                Ob prvem obisku lahko izberete, ali sprejemate vse piškotke ali le nujne. Svojo izbiro lahko 
                kadarkoli spremenite z brisanjem piškotkov v brskalniku.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">5. Varovanje podatkov</h2>
              <p>
                Vaše osebne podatke varujemo z ustreznimi tehničnimi in organizacijskimi ukrepi. Podatke hranimo 
                le toliko časa, kolikor je potrebno za izpolnitev namena, za katerega so bili zbrani.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">6. Vaše pravice</h2>
              <p>V skladu z Uredbo GDPR imate pravico do:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dostopa do vaših osebnih podatkov</li>
                <li>Popravka netočnih podatkov</li>
                <li>Izbrisa vaših podatkov ("pravica do pozabe")</li>
                <li>Omejitve obdelave</li>
                <li>Prenosljivosti podatkov</li>
                <li>Ugovora obdelavi</li>
              </ul>
              <p>
                Za uveljavljanje teh pravic nas kontaktirajte na{" "}
                <a href="mailto:info@alpacolabs.com" className="text-primary hover:underline">
                  info@alpacolabs.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">7. Tretje strani</h2>
              <p>
                Za obdelavo obrazcev uporabljamo storitev Formspree. Za analitiko lahko uporabljamo Google Analytics 
                ali podobne storitve (le s vašim soglasjem). Te storitve imajo lastne politike zasebnosti.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">8. Spremembe politike</h2>
              <p>
                To politiko zasebnosti lahko občasno posodobimo. O bistvenih spremembah vas bomo obvestili 
                z objavo nove različice na tej strani.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mt-8">9. Kontakt</h2>
              <p>
                Za vsa vprašanja glede zasebnosti nas lahko kontaktirate na:
              </p>
              <p className="text-foreground">
                E-pošta:{" "}
                <a href="mailto:info@alpacolabs.com" className="text-primary hover:underline">
                  info@alpacolabs.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
