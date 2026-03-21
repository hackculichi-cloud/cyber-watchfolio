import { Eye, FileSearch, ShieldAlert } from "lucide-react";

const highlights = [
  { icon: FileSearch, label: "Log Analysis", desc: "Deep-dive analysis of security events across SIEM platforms" },
  { icon: Eye, label: "Threat Detection", desc: "Proactive threat hunting and anomaly identification" },
  { icon: ShieldAlert, label: "Incident Response", desc: "Rapid containment, eradication, and recovery procedures" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} about_me
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed text-sm">
          Dedicated SOC Analyst with expertise in monitoring enterprise networks, 
          analyzing security events, and responding to incidents in real-time. 
          Proficient in SIEM platforms, threat intelligence, and forensic investigation. 
          Passionate about building detection rules, automating response workflows, 
          and strengthening organizational security posture against evolving cyber threats.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div key={item.label} className="panel-glow flex items-start gap-3 p-5 transition-transform duration-300 hover:scale-105">
              <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
