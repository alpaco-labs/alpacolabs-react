import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  // Step 1
  imePriimek: string;
  podjetje: string;
  email: string;
  telefon: string;
  // Step 2
  kajPotrebujes: string;
  podstrani: string;
  vsebina: string;
  // Step 3
  funkcionalnosti: string[];
  rok: string;
  dodatno: string;
}

const initialFormData: FormData = {
  imePriimek: "",
  podjetje: "",
  email: "",
  telefon: "",
  kajPotrebujes: "",
  podstrani: "",
  vsebina: "",
  funkcionalnosti: [],
  rok: "",
  dodatno: "",
};

// Pricing configuration
const basePrices: Record<string, number> = {
  landing: 300,
  spletna: 650,
  trgovina: 1200,
  mvp: 1800,
};

const podstraniPrices: Record<string, number> = {
  "1": 0,
  "2-5": 150,
  "6-10": 300,
  "10+": 500,
};

const vsebinaPrices: Record<string, number> = {
  da: 0,
  delno: 100,
  ne: 250,
};

const funkcionalnostiPrices: Record<string, number> = {
  kontakt: 0,
  rezervacije: 150,
  blog: 100,
  jeziki: 150,
  newsletter: 100,
  placila: 200,
  login: 300,
};

const rokPrices: Record<string, number> = {
  "2-4": 0,
  "7-10": 150,
  asap: 300,
};

const ZelimSpletnoStran = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Calculate price
  const calculatePrice = () => {
    let total = 0;

    // Base price
    if (formData.kajPotrebujes) {
      total += basePrices[formData.kajPotrebujes] || 0;
    }

    // Podstrani
    if (formData.podstrani) {
      total += podstraniPrices[formData.podstrani] || 0;
    }

    // Vsebina
    if (formData.vsebina) {
      total += vsebinaPrices[formData.vsebina] || 0;
    }

    // Funkcionalnosti
    formData.funkcionalnosti.forEach((f) => {
      total += funkcionalnostiPrices[f] || 0;
    });

    // Rok
    if (formData.rok) {
      total += rokPrices[formData.rok] || 0;
    }

    return {
      min: total,
      max: total + 200,
    };
  };

  const price = calculatePrice();
  const hasBaseSelection = formData.kajPotrebujes !== "";

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFunkcionalnost = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      funkcionalnosti: prev.funkcionalnosti.includes(value)
        ? prev.funkcionalnosti.filter((f) => f !== value)
        : [...prev.funkcionalnosti, value],
    }));
  };

  const validateStep1 = () => {
    if (!formData.imePriimek.trim()) {
      toast({
        title: "Napaka",
        description: "Prosim vnesi ime in priimek.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Napaka",
        description: "Prosim vnesi veljaven email naslov.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.kajPotrebujes) {
      toast({
        title: "Napaka",
        description: "Prosim izberi kaj potrebuješ.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.podstrani) {
      toast({
        title: "Napaka",
        description: "Prosim izberi število podstrani.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.vsebina) {
      toast({
        title: "Napaka",
        description: "Prosim izberi ali imaš pripravljeno vsebino.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.rok) {
      toast({
        title: "Napaka",
        description: "Prosim izberi želeni rok.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      // 1. Save to database
      const { error: dbError } = await supabase
        .from("povprasevanja")
        .insert({
          ime_priimek: formData.imePriimek,
          podjetje: formData.podjetje || null,
          email: formData.email,
          telefon: formData.telefon || null,
          kaj_potrebuje: formData.kajPotrebujes,
          podstrani: formData.podstrani,
          vsebina: formData.vsebina,
          funkcionalnosti: formData.funkcionalnosti,
          rok: formData.rok,
          dodatno: formData.dodatno || null,
          cena_min: price.min,
          cena_max: price.max,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Napaka pri shranjevanju.");
      }

      // 2. Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-inquiry-email",
        {
          body: {
            imePriimek: formData.imePriimek,
            podjetje: formData.podjetje,
            email: formData.email,
            telefon: formData.telefon,
            kajPotrebujes: formData.kajPotrebujes,
            podstrani: formData.podstrani,
            vsebina: formData.vsebina,
            funkcionalnosti: formData.funkcionalnosti,
            rok: formData.rok,
            dodatno: formData.dodatno,
            cenaMin: price.min,
            cenaMax: price.max,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - submission was saved, email is secondary
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Napaka",
        description: "Prišlo je do napake. Prosim poskusi ponovno.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container max-w-lg">
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={40} className="text-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-semibold text-foreground mb-4">
                Hvala! Povpraševanje je poslano.
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Odgovorim v 24 urah.
              </p>
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft size={16} />
                  Nazaj na domačo stran
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container max-w-2xl">
          {/* Page Intro */}
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Želim spletno stran
            </h1>
            <p className="text-muted-foreground text-lg">
              Odgovori na nekaj vprašanj (2–3 minute). Na koncu vidiš oceno investicije.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-secondary text-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <Check size={16} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      s < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            {/* Step 1: Osnovno */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Korak 1/3 — Osnovno
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="imePriimek">Ime in priimek *</Label>
                    <Input
                      id="imePriimek"
                      value={formData.imePriimek}
                      onChange={(e) => updateField("imePriimek", e.target.value)}
                      placeholder="Janez Novak"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="podjetje">Podjetje</Label>
                    <Input
                      id="podjetje"
                      value={formData.podjetje}
                      onChange={(e) => updateField("podjetje", e.target.value)}
                      placeholder="Ime podjetja (opcijsko)"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="janez@email.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input
                      id="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => updateField("telefon", e.target.value)}
                      placeholder="+386 40 123 456 (opcijsko)"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Projekt */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Korak 2/3 — Projekt
                </h2>

                <div>
                  <Label className="text-base">Kaj potrebuješ? *</Label>
                  <RadioGroup
                    value={formData.kajPotrebujes}
                    onValueChange={(value) => updateField("kajPotrebujes", value)}
                    className="mt-4 space-y-3"
                  >
                    {[
                      { value: "landing", label: "Landing stran", price: "od 300 €" },
                      { value: "spletna", label: "Spletna stran (več podstrani)", price: "od 650 €" },
                      { value: "trgovina", label: "Spletna trgovina", price: "od 1.200 €" },
                      { value: "mvp", label: "Web / Mobile MVP", price: "od 1.800 €" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.kajPotrebujes === option.value
                            ? "border-foreground bg-muted"
                            : "border-border hover:border-foreground/30"
                        }`}
                        onClick={() => updateField("kajPotrebujes", option.value)}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                        <span className="text-sm text-muted-foreground">{option.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base">Koliko podstrani približno? *</Label>
                  <RadioGroup
                    value={formData.podstrani}
                    onValueChange={(value) => updateField("podstrani", value)}
                    className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {[
                      { value: "1", label: "1" },
                      { value: "2-5", label: "2–5" },
                      { value: "6-10", label: "6–10" },
                      { value: "10+", label: "10+" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.podstrani === option.value
                            ? "border-foreground bg-muted"
                            : "border-border hover:border-foreground/30"
                        }`}
                        onClick={() => updateField("podstrani", option.value)}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={option.value} id={`podstrani-${option.value}`} />
                          <Label htmlFor={`podstrani-${option.value}`} className="cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base">Ali imaš pripravljena besedila in slike? *</Label>
                  <RadioGroup
                    value={formData.vsebina}
                    onValueChange={(value) => updateField("vsebina", value)}
                    className="mt-4 space-y-3"
                  >
                    {[
                      { value: "da", label: "Da" },
                      { value: "delno", label: "Delno" },
                      { value: "ne", label: "Ne" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.vsebina === option.value
                            ? "border-foreground bg-muted"
                            : "border-border hover:border-foreground/30"
                        }`}
                        onClick={() => updateField("vsebina", option.value)}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.value} id={`vsebina-${option.value}`} />
                          <Label htmlFor={`vsebina-${option.value}`} className="cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Funkcionalnosti + rok */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Korak 3/3 — Funkcionalnosti + rok
                </h2>

                <div>
                  <Label className="text-base">Kaj mora stran imeti?</Label>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "kontakt", label: "Kontaktni obrazec" },
                      { value: "rezervacije", label: "Rezervacije / booking" },
                      { value: "blog", label: "Blog" },
                      { value: "jeziki", label: "Več jezikov" },
                      { value: "newsletter", label: "Newsletter" },
                      { value: "placila", label: "Plačila (trgovina)" },
                      { value: "login", label: "Login / uporabniški računi" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.funkcionalnosti.includes(option.value)
                            ? "border-foreground bg-muted"
                            : "border-border hover:border-foreground/30"
                        }`}
                        onClick={() => toggleFunkcionalnost(option.value)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={formData.funkcionalnosti.includes(option.value)}
                            onCheckedChange={() => toggleFunkcionalnost(option.value)}
                          />
                          <Label className="cursor-pointer font-normal">{option.label}</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base">Kdaj želiš stran online? *</Label>
                  <RadioGroup
                    value={formData.rok}
                    onValueChange={(value) => updateField("rok", value)}
                    className="mt-4 space-y-3"
                  >
                    {[
                      { value: "2-4", label: "2–4 tedne" },
                      { value: "7-10", label: "7–10 dni" },
                      { value: "asap", label: "ASAP (3–5 dni)" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.rok === option.value
                            ? "border-foreground bg-muted"
                            : "border-border hover:border-foreground/30"
                        }`}
                        onClick={() => updateField("rok", option.value)}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.value} id={`rok-${option.value}`} />
                          <Label htmlFor={`rok-${option.value}`} className="cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="dodatno">Dodatno</Label>
                  <Textarea
                    id="dodatno"
                    value={formData.dodatno}
                    onChange={(e) => updateField("dodatno", e.target.value)}
                    placeholder="Povej mi še kaj o projektu / linki primerov"
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Price Display */}
            {hasBaseSelection && (
              <div className="mt-8 p-6 bg-secondary rounded-xl border border-border animate-scale-in">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator size={20} className="text-foreground" />
                  <span className="font-heading font-semibold text-foreground">
                    Ocena investicije
                  </span>
                </div>
                <p className="text-2xl font-heading font-semibold text-foreground">
                  Približna cena: €{price.min} – €{price.max}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Končna cena se potrdi po kratkem klicu.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft size={16} />
                  Nazaj
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button variant="hero" onClick={handleNext}>
                  Naprej
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Pošiljam..." : "Pošlji povpraševanje"}
                </Button>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ZelimSpletnoStran;
