import { Shield, Wrench, Terminal } from "lucide-react";

const categories = [
  {
    icon: Shield,
    title: "Security",
    skills: ["SIEM Monitoring", "Threat Detection", "Incident Response", "Threat Hunting", "Malware Analysis", "Forensics"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Wireshark", "Nmap", "Metasploit", "Splunk", "ELK Stack", "Burp Suite"],
  },
  {
    icon: Terminal,
    title: "Technical",
    skills: ["Linux", "Networking (TCP/IP)", "Python", "Bash Scripting", "Regular Expressions", "SQL"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} skills_dashboard
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.title} className="panel-glow p-5">
              <div className="flex items-center gap-2 mb-4">
                <cat.icon className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>
              <div className="space-y-2">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs group">
                    <span className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">▸</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
