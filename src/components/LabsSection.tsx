import { BookOpen, ExternalLink } from "lucide-react";

const labs = [
  {
    title: "Active Directory Penetration Testing",
    platform: "TryHackMe",
    difficulty: "Hard",
    date: "2024-02-15",
    summary: "Exploited Kerberoasting, AS-REP Roasting, and DCSync attacks in a simulated AD environment. Documented full attack chain from initial foothold to domain admin.",
    tags: ["Active Directory", "Kerberos", "Mimikatz", "BloodHound"],
  },
  {
    title: "Web Application Security Assessment",
    platform: "Hack The Box",
    difficulty: "Medium",
    date: "2024-01-28",
    summary: "Identified and exploited SQL injection, XSS, and SSRF vulnerabilities in a multi-tier web application. Created custom Python exploit scripts.",
    tags: ["SQLi", "XSS", "SSRF", "Python"],
  },
  {
    title: "Malware Analysis: Emotet Variant",
    platform: "Personal Lab",
    difficulty: "Hard",
    date: "2024-03-05",
    summary: "Performed static and dynamic analysis of an Emotet variant using sandbox environments. Extracted IOCs and developed YARA detection rules.",
    tags: ["Malware", "YARA", "Reverse Engineering", "IOC"],
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "text-primary",
  Medium: "text-warning",
  Hard: "text-destructive",
};

const LabsSection = () => {
  return (
    <section id="labs" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} labs_writeups
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid md:grid-cols-3 gap-4">
          {labs.map((lab) => (
            <div key={lab.title} className="panel-glow p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-muted-foreground">{lab.date}</span>
                <span className={`text-[10px] font-bold ${difficultyColor[lab.difficulty]}`}>
                  {lab.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                <h3 className="font-display font-semibold text-sm text-foreground">{lab.title}</h3>
              </div>

              <span className="text-[10px] text-primary mb-3 border border-primary/20 rounded px-2 py-0.5 self-start">
                {lab.platform}
              </span>

              <p className="text-xs text-muted-foreground mb-4 flex-grow">{lab.summary}</p>

              <div className="flex flex-wrap gap-1 mt-auto">
                {lab.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
