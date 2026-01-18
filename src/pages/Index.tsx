import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TrustIndicatorsSection from "@/components/TrustIndicatorsSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
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
        <TrustIndicatorsSection />
        <PortfolioSection />
        <CollaborationSection />
        <TargetAudienceSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
