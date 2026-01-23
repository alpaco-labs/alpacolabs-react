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

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

export const InquiryFormModal = ({ isOpen, onClose, packageName }: InquiryFormModalProps) => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", company: "", phone: "", email: "", message: "" });
    setErrors({});
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-border bg-card">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              {t("inquiry.successTitle")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("inquiry.successDescription")}
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