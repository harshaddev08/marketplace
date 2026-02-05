import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { CTASection } from "@/components/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Home;
