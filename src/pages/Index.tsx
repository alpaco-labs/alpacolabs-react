import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import ProcessSection from "@/components/ProcessSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import CollaborationSection from "@/components/CollaborationSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <TargetAudienceSection />
        <CollaborationSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
