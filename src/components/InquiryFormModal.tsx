import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useTracking from "@/hooks/useTracking";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgozjvo";

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

export const InquiryFormModal = ({ isOpen, onClose, packageName }: InquiryFormModalProps) => {
  const { t } = useLanguage();
  const { trackLead } = useTracking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
    website: "", // honeypot field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t("inquiry.errorName");
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t("inquiry.errorPhone");
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("inquiry.errorEmail");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Honeypot check - if filled, silently "succeed"
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name.trim(),
          company: formData.company.trim() || "",
          phone: formData.phone.trim() || "",
          email: formData.email.trim(),
          message: formData.message.trim() || "",
          package: packageName || "Brez paketa",
          page_url: window.location.href,
        }),
      });

      if (response.ok) {
        // Track Lead event for successful form submission
        trackLead({
          package: packageName || "Brez paketa",
          source: "inquiry_form",
        });
        
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        console.error('Formspree error:', response.status);
        setSubmitError("Prišlo je do napake. Poskusi znova ali nas pokliči.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError("Prišlo je do napake. Poskusi znova ali nas pokliči.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", company: "", phone: "", email: "", message: "", website: "" });
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-border bg-card">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Hvala za povpraševanje!
            </h3>
            <p className="text-muted-foreground mb-6">
              Slišimo se v najkrajšem možnem času.
            </p>
            <Button onClick={handleClose} variant="outline">
              {t("inquiry.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-semibold text-foreground">
            {packageName ? `Povpraševanje – ${packageName}` : t("inquiry.title")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              {t("inquiry.nameLabel")} *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t("inquiry.namePlaceholder")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">
              {t("inquiry.companyLabel")}
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder={t("inquiry.companyPlaceholder")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              {t("inquiry.phoneLabel")} *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t("inquiry.phonePlaceholder")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              {t("inquiry.emailLabel")} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t("inquiry.emailPlaceholder")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              {t("inquiry.messageLabel")}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t("inquiry.messagePlaceholder")}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="absolute -left-[9999px] opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
          />

          {submitError && (
            <p className="text-sm text-destructive text-center">{submitError}</p>
          )}
          
          <Button 
            type="submit" 
            variant="hero" 
            className="w-full mt-6 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("inquiry.submitting") : t("inquiry.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryFormModal;