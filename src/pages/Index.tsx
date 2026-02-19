import Navbar from "@/components/aldea/Navbar";
import HeroSection from "@/components/aldea/HeroSection";
import PillarsSection from "@/components/aldea/PillarsSection";
import SystemSection from "@/components/aldea/SystemSection";
import ManifestSection from "@/components/aldea/ManifestSection";
import JoinSection from "@/components/aldea/JoinSection";
import Footer from "@/components/aldea/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PillarsSection />
      <SystemSection />
      <ManifestSection />
      <JoinSection />
      <Footer />
    </main>
  );
};

export default Index;
