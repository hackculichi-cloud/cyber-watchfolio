import { Button } from "@/components/ui/button";
import LogBackground from "./LogBackground";
import ThreatLevel from "./ThreatLevel";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <LogBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-6">
          <ThreatLevel />
        </div>
        
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
          // initializing secure connection...
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up delay-100">
          <span className="text-foreground">Christian </span>
          <span className="neon-text">Velasco</span>
        </h1>
        
        <h2 className="font-display text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in-up delay-200">
          Security Operations Analyst
        </h2>
        
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm animate-fade-in-up delay-300">
          Monitoring, detecting, and responding to cyber threats.
          <span className="animate-blink text-primary ml-1">█</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
          <Button variant="neon" size="lg" asChild>
            <a href="#projects">View Incidents</a>
          </Button>
          <Button variant="neon-outline" size="lg" asChild>
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
