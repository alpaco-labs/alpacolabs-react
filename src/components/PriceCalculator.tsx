import { useState, useEffect } from "react";
import { X, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type PackageType = "landing" | "website" | "store" | "mvp";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; priceAdd?: number }[];
  multiSelect?: boolean;
}

interface PriceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  packageType: PackageType;
  isYearly: boolean;
}

const packageQuestions: Record<PackageType, Question[]> = {
  landing: [
    {
      id: "purpose",
      question: "Kakšen je namen landing strani?",
      options: [
        { value: "presentation", label: "Predstavitev storitve", priceAdd: 0 },
        { value: "leads", label: "Zbiranje povpraševanj", priceAdd: 2 },
        { value: "campaign", label: "Test ideje ali kampanja", priceAdd: 0 },
        { value: "other", label: "Drugo", priceAdd: 0 },
      ],
    },
    {
      id: "contact",
      question: "Kontaktni obrazec?",
      options: [
        { value: "yes", label: "Da", priceAdd: 5 },
        { value: "no", label: "Ne", priceAdd: 0 },
      ],
    },
    {
      id: "sections",
      question: "Koliko sekcij približno?",
      options: [
        { value: "4", label: "Do 4", priceAdd: 0 },
        { value: "5-7", label: "5–7", priceAdd: 5 },
        { value: "7+", label: "Več kot 7", priceAdd: 10 },
      ],
    },
    {
      id: "content",
      question: "Besedilo in slike?",
      options: [
        { value: "ready", label: "Imam vse pripravljeno", priceAdd: 0 },
        { value: "partial", label: "Delno", priceAdd: 5 },
        { value: "help", label: "Potrebujem pomoč", priceAdd: 10 },
      ],
    },
    {
      id: "changes",
      question: "Kako pogosto želiš spremembe?",
      options: [
        { value: "rare", label: "Redko", priceAdd: 0 },
        { value: "occasional", label: "Občasno", priceAdd: 5 },
        { value: "frequent", label: "Pogosto", priceAdd: 10 },
      ],
    },
  ],
  website: [
    {
      id: "subpages",
      question: "Koliko podstrani potrebuješ?",
      options: [
        { value: "2-4", label: "2–4", priceAdd: 0 },
        { value: "5-7", label: "5–7", priceAdd: 10 },
        { value: "8+", label: "8+", priceAdd: 20 },
      ],
    },
    {
      id: "features",
      question: "Ali potrebuješ:",
      options: [
        { value: "contact", label: "Kontaktni obrazec", priceAdd: 5 },
        { value: "blog", label: "Blog ali novice", priceAdd: 10 },
        { value: "gallery", label: "Galerijo", priceAdd: 5 },
      ],
      multiSelect: true,
    },
    {
      id: "changes",
      question: "Ali pričakuješ redne spremembe vsebine?",
      options: [
        { value: "no", label: "Ne", priceAdd: 0 },
        { value: "occasional", label: "Občasno", priceAdd: 5 },
        { value: "yes", label: "Da", priceAdd: 10 },
      ],
    },
    {
      id: "upgrade",
      question: "Ali želiš možnost kasnejše nadgradnje?",
      options: [
        { value: "yes", label: "Da", priceAdd: 5 },
        { value: "no", label: "Ne", priceAdd: 0 },
      ],
    },
  ],
  store: [
    {
      id: "purpose",
      question: "Namen spletne strani",
      options: [
        { value: "presentation", label: "Profesionalna predstavitev", priceAdd: 0 },
        { value: "sales", label: "Prodaja storitev", priceAdd: 15 },
        { value: "brand", label: "Gradnja blagovne znamke", priceAdd: 10 },
      ],
    },
    {
      id: "subpages",
      question: "Koliko podstrani?",
      options: [
        { value: "5-7", label: "5–7", priceAdd: 0 },
        { value: "8-12", label: "8–12", priceAdd: 20 },
        { value: "12+", label: "12+", priceAdd: 40 },
      ],
    },
    {
      id: "support",
      question: "Stopnja podpore",
      options: [
        { value: "basic", label: "Osnovna", priceAdd: 0 },
        { value: "regular", label: "Redna", priceAdd: 15 },
        { value: "enhanced", label: "Povečana", priceAdd: 30 },
      ],
    },
    {
      id: "optimization",
      question: "Ali želiš optimizacijo strukture ali UX?",
      options: [
        { value: "yes", label: "Da", priceAdd: 15 },
        { value: "no", label: "Ne", priceAdd: 0 },
      ],
    },
  ],
  mvp: [
    {
      id: "phase",
      question: "V kateri fazi je ideja?",
      options: [
        { value: "concept", label: "Koncept", priceAdd: 0 },
        { value: "mvp", label: "MVP", priceAdd: 30 },
        { value: "live", label: "Že v uporabi", priceAdd: 60 },
      ],
    },
    {
      id: "changes",
      question: "Ali pričakuješ pogoste spremembe?",
      options: [
        { value: "yes", label: "Da", priceAdd: 40 },
        { value: "occasional", label: "Občasno", priceAdd: 20 },
        { value: "no", label: "Ne", priceAdd: 0 },
      ],
    },
    {
      id: "iterative",
      question: "Ali želiš iterativni razvoj?",
      options: [
        { value: "yes", label: "Da", priceAdd: 30 },
        { value: "no", label: "Ne", priceAdd: 0 },
      ],
    },
    {
      id: "collaboration",
      question: "Kako intenzivno sodelovanje želiš?",
      options: [
        { value: "basic", label: "Osnovno", priceAdd: 0 },
        { value: "regular", label: "Redno", priceAdd: 20 },
        { value: "close", label: "Tesno sodelovanje", priceAdd: 50 },
      ],
    },
  ],
};

const packageConfig: Record<PackageType, { name: string; basePrice: number; maxPrice: number }> = {
  landing: { name: "Landing Start", basePrice: 7.9, maxPrice: 24.9 },
  website: { name: "Spletna stran", basePrice: 14.9, maxPrice: 49.9 },
  store: { name: "Spletna trgovina", basePrice: 29.9, maxPrice: 99.9 },
  mvp: { name: "Web / Mobile MVP", basePrice: 49.9, maxPrice: 169.9 },
};

const upgradePackage: Record<PackageType, PackageType | null> = {
  landing: "website",
  website: "store",
  store: "mvp",
  mvp: null,
};

export const PriceCalculator = ({ isOpen, onClose, packageType, isYearly }: PriceCalculatorProps) => {
  const questions = packageQuestions[packageType];
  const config = packageConfig[packageType];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [paymentType, setPaymentType] = useState<"monthly" | "yearly">(isYearly ? "yearly" : "monthly");

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setShowResult(false);
      setPaymentType(isYearly ? "yearly" : "monthly");
    }
  }, [isOpen, isYearly]);

  const calculatePrice = () => {
    let price = config.basePrice;
    
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        if (q.multiSelect && Array.isArray(answer)) {
          answer.forEach((val) => {
            const option = q.options.find((o) => o.value === val);
            if (option?.priceAdd) price += option.priceAdd;
          });
        } else if (typeof answer === "string") {
          const option = q.options.find((o) => o.value === answer);
          if (option?.priceAdd) price += option.priceAdd;
        }
      }
    });

    return price;
  };

  const monthlyPrice = calculatePrice();
  const yearlyPrice = monthlyPrice * 10;
  const exceedsMax = monthlyPrice > config.maxPrice;
  const suggestedPackage = exceedsMax ? upgradePackage[packageType] : null;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-foreground">
            {showResult ? "Tvoja ponudba" : config.name}
          </DialogTitle>
        </DialogHeader>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {!showResult ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    idx <= currentStep ? "bg-foreground" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">{currentQuestion.question}</p>

              {currentQuestion.multiSelect ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <Checkbox
                        id={option.value}
                        checked={(currentAnswer as string[] | undefined)?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const current = (currentAnswer as string[]) || [];
                          if (checked) {
                            handleAnswer(currentQuestion.id, [...current, option.value]);
                          } else {
                            handleAnswer(
                              currentQuestion.id,
                              current.filter((v) => v !== option.value)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={option.value} className="text-sm text-foreground cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup
                  value={currentAnswer as string}
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-sm text-foreground cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nazaj
              </Button>
              <Button onClick={handleNext} disabled={!canProceed}>
                {currentStep === questions.length - 1 ? "Izračunaj" : "Naprej"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {exceedsMax && suggestedPackage ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-200">
                  Ta konfiguracija spada v višji paket. Priporočamo{" "}
                  <span className="font-semibold">{packageConfig[suggestedPackage].name}</span>.
                </p>
              </div>
            ) : null}

            {/* Package info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-emerald-500" />
                Priporočen paket: <span className="text-foreground font-medium">{config.name}</span>
              </div>

              {/* Payment toggle */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <button
                  onClick={() => setPaymentType("monthly")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    paymentType === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Mesečno
                </button>
                <button
                  onClick={() => setPaymentType("yearly")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    paymentType === "yearly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Letno
                </button>
              </div>

              {/* Price */}
              <div className="text-center py-4">
                <p className="text-3xl font-heading font-semibold text-foreground">
                  {paymentType === "monthly"
                    ? `${monthlyPrice.toFixed(2).replace(".", ",")} €`
                    : `${yearlyPrice.toFixed(0)} €`}
                  <span className="text-base font-normal text-muted-foreground">
                    {paymentType === "monthly" ? " / mesec" : " / leto"}
                  </span>
                </p>
                {paymentType === "yearly" && (
                  <p className="text-sm text-emerald-500 mt-1">2 meseca gratis</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <a href="/zelim-spletno-stran">Začni z izbranim paketom</a>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Brez obveznosti. Brez skritih stroškov.
              </p>
            </div>

            <Button variant="ghost" onClick={handleBack} className="w-full text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazaj na vprašanja
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
