import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MatrixRain from "@/components/MatrixRain";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import LabsSection from "@/components/LabsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline relative">
      <MatrixRain />
      <div className="relative z-10">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <LabsSection />
      <CertificationsSection />
      <ContactSection />
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary">©</span> 2024 SOC_ANALYST // All systems monitored
        </p>
      </footer>
      </div>
    </div>
  );
};

export default Index;
