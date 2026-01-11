import { MessageSquare, Pencil, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const ProcessSection = () => {
  const {
    t
  } = useLanguage();
  const steps = [{
    id: 1,
    icon: MessageSquare,
    titleKey: "process.step1.title",
    descriptionKey: "process.step1.description"
  }, {
    id: 2,
    icon: Pencil,
    titleKey: "process.step2.title",
    descriptionKey: "process.step2.description"
  }, {
    id: 3,
    icon: Rocket,
    titleKey: "process.step3.title",
    descriptionKey: "process.step3.description"
  }];
  return;
};
export default ProcessSection;