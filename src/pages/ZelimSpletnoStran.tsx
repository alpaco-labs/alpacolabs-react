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
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  imePriimek: string;
  podjetje: string;
  email: string;
  telefon: string;
  kajPotrebujes: string;
  podstrani: string;
  vsebina: string;
  funkcionalnosti: string[];
  rok: string;
  dodatno: string;
  honeypot: string; // Hidden field for bot detection
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
  honeypot: "",
};

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
  const { t } = useLanguage();

  const calculatePrice = () => {
    let total = 0;
    if (formData.kajPotrebujes) {
      total += basePrices[formData.kajPotrebujes] || 0;
    }
    if (formData.podstrani) {
      total += podstraniPrices[formData.podstrani] || 0;
    }
    if (formData.vsebina) {
      total += vsebinaPrices[formData.vsebina] || 0;
    }
    formData.funkcionalnosti.forEach((f) => {
      total += funkcionalnostiPrices[f] || 0;
    });
    if (formData.rok) {
      total += rokPrices[formData.rok] || 0;
    }
    return { min: total, max: total + 200 };
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
      toast({ title: t("form.error"), description: t("form.errorName"), variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({ title: t("form.error"), description: t("form.errorEmail"), variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.kajPotrebujes) {
      toast({ title: t("form.error"), description: t("form.errorWhat"), variant: "destructive" });
      return false;
    }
    if (!formData.podstrani) {
      toast({ title: t("form.error"), description: t("form.errorSubpages"), variant: "destructive" });
      return false;
    }
    if (!formData.vsebina) {
      toast({ title: t("form.error"), description: t("form.errorContent"), variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.rok) {
      toast({ title: t("form.error"), description: t("form.errorDeadline"), variant: "destructive" });
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
    
    // Check honeypot - if filled, silently "succeed" without actually submitting
    if (formData.honeypot) {
      console.log("Honeypot triggered - likely bot");
      setIsSubmitted(true);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("povprasevanja").insert({
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
        if (import.meta.env.DEV) {
          console.error("Database error:", dbError);
        }
        throw new Error("Failed to submit form");
      }
      const { error: emailError } = await supabase.functions.invoke("send-inquiry-email", {
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
          honeypot: formData.honeypot,
        },
      });
      if (emailError && import.meta.env.DEV) {
        console.error("Email error:", emailError);
      }
      setIsSubmitted(true);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Submission error:", error);
      }
      toast({ title: t("form.error"), description: t("form.errorGeneric"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectOptions = [
    { value: "landing", labelKey: "form.landing", priceKey: "form.landingPrice" },
    { value: "spletna", labelKey: "form.website", priceKey: "form.websitePrice" },
    { value: "trgovina", labelKey: "form.store", priceKey: "form.storePrice" },
    { value: "mvp", labelKey: "form.mvp", priceKey: "form.mvpPrice" },
  ];

  const contentOptions = [
    { value: "da", labelKey: "form.contentYes" },
    { value: "delno", labelKey: "form.contentPartly" },
    { value: "ne", labelKey: "form.contentNo" },
  ];

  const featureOptions = [
    { value: "kontakt", labelKey: "form.featureContact" },
    { value: "rezervacije", labelKey: "form.featureBooking" },
    { value: "blog", labelKey: "form.featureBlog" },
    { value: "jeziki", labelKey: "form.featureLanguages" },
    { value: "newsletter", labelKey: "form.featureNewsletter" },
    { value: "placila", labelKey: "form.featurePayments" },
    { value: "login", labelKey: "form.featureLogin" },
  ];

  const deadlineOptions = [
    { value: "2-4", labelKey: "form.deadline2_4" },
    { value: "7-10", labelKey: "form.deadline7_10" },
    { value: "asap", labelKey: "form.deadlineAsap" },
  ];

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
                {t("form.successTitle")}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                {t("form.successDescription")}
              </p>
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft size={16} />
                  {t("form.backHome")}
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
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {t("form.pageTitle")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("form.pageDescription")}
            </p>
          </div>

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
                  <div className={`w-12 h-0.5 ${s < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  {t("form.step1Title")}
                </h2>
                <div className="space-y-4">
                  {/* Honeypot field - hidden from real users, bots will fill it */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => updateField("honeypot", e.target.value)}
                    style={{ 
                      position: 'absolute',
                      left: '-9999px',
                      opacity: 0,
                      height: 0,
                      width: 0,
                      pointerEvents: 'none'
                    }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div>
                    <Label htmlFor="imePriimek">{t("form.nameLabel")}</Label>
                    <Input
                      id="imePriimek"
                      value={formData.imePriimek}
                      onChange={(e) => updateField("imePriimek", e.target.value)}
                      placeholder={t("form.namePlaceholder")}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="podjetje">{t("form.companyLabel")}</Label>
                    <Input
                      id="podjetje"
                      value={formData.podjetje}
                      onChange={(e) => updateField("podjetje", e.target.value)}
                      placeholder={t("form.companyPlaceholder")}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("form.emailLabel")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder={t("form.emailPlaceholder")}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefon">{t("form.phoneLabel")}</Label>
                    <Input
                      id="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => updateField("telefon", e.target.value)}
                      placeholder={t("form.phonePlaceholder")}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  {t("form.step2Title")}
                </h2>
                <div>
                  <Label className="text-base">{t("form.whatNeedLabel")}</Label>
                  <RadioGroup
                    value={formData.kajPotrebujes}
                    onValueChange={(value) => updateField("kajPotrebujes", value)}
                    className="mt-4 space-y-3"
                  >
                    {projectOptions.map((option) => (
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
                            {t(option.labelKey)}
                          </Label>
                        </div>
                        <span className="text-sm text-muted-foreground">{t(option.priceKey)}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base">{t("form.subpagesLabel")}</Label>
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
                  <Label className="text-base">{t("form.contentLabel")}</Label>
                  <RadioGroup
                    value={formData.vsebina}
                    onValueChange={(value) => updateField("vsebina", value)}
                    className="mt-4 space-y-3"
                  >
                    {contentOptions.map((option) => (
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
                            {t(option.labelKey)}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  {t("form.step3Title")}
                </h2>
                <div>
                  <Label className="text-base">{t("form.featuresLabel")}</Label>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {featureOptions.map((option) => (
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
                          <Label className="cursor-pointer font-normal">{t(option.labelKey)}</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base">{t("form.deadlineLabel")}</Label>
                  <RadioGroup
                    value={formData.rok}
                    onValueChange={(value) => updateField("rok", value)}
                    className="mt-4 space-y-3"
                  >
                    {deadlineOptions.map((option) => (
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
                            {t(option.labelKey)}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="dodatno">{t("form.additionalLabel")}</Label>
                  <Textarea
                    id="dodatno"
                    value={formData.dodatno}
                    onChange={(e) => updateField("dodatno", e.target.value)}
                    placeholder={t("form.additionalPlaceholder")}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {hasBaseSelection && (
              <div className="mt-8 p-6 bg-secondary rounded-xl border border-border animate-scale-in">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator size={20} className="text-foreground" />
                  <span className="font-heading font-semibold text-foreground">
                    {t("form.priceEstimate")}
                  </span>
                </div>
                <p className="text-2xl font-heading font-semibold text-foreground">
                  {t("form.priceApprox")} €{price.min} – €{price.max}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("form.priceNote")}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft size={16} />
                  {t("form.back")}
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button variant="hero" onClick={handleNext}>
                  {t("form.next")}
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
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
