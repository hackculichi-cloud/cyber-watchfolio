import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-001",
    severity: "critical",
    title: "Ransomware Outbreak Containment",
    tools: ["Splunk", "CrowdStrike", "Wireshark"],
    description: "Detected lateral movement and ransomware deployment across 15 endpoints in the finance department.",
    detection: "SIEM correlation rule triggered on multiple failed SMB auth attempts followed by rapid file encryption patterns.",
    outcome: "Contained within 45 minutes. Zero data loss. Identified initial access vector via phishing email.",
  },
  {
    id: "INC-2024-002",
    severity: "high",
    title: "Insider Threat Data Exfiltration",
    tools: ["ELK Stack", "DLP", "Python"],
    description: "Anomalous data transfer detected — employee uploading sensitive files to unauthorized cloud storage.",
    detection: "Custom Python script flagged DNS query volume anomaly. DLP alert confirmed sensitive document transfer.",
    outcome: "User account suspended. Forensic image captured. Evidence preserved for HR/legal proceedings.",
  },
  {
    id: "INC-2024-003",
    severity: "medium",
    title: "Supply Chain Compromise Investigation",
    tools: ["YARA", "VirusTotal", "Nmap"],
    description: "Third-party software update contained a backdoor trojan. Investigated scope and impact across the network.",
    detection: "Threat intel feed matched hash of updated binary. YARA rules confirmed presence on 3 systems.",
    outcome: "Affected systems isolated and reimaged. Vendor notified. Detection rules deployed network-wide.",
  },
  {
    id: "INC-2024-004",
    severity: "low",
    title: "Phishing Campaign Analysis",
    tools: ["PhishTool", "Splunk", "Regex"],
    description: "Coordinated spear-phishing targeting C-suite executives with credential harvesting links.",
    detection: "Email gateway flagged suspicious sender domain. URL analysis revealed typosquatted login page.",
    outcome: "Blocked sender domain. Deployed org-wide awareness alert. Updated email filtering rules.",
  },
];

const severityConfig = {
  critical: { color: "text-destructive", border: "border-destructive/30", icon: XCircle, label: "CRITICAL" },
  high: { color: "text-destructive", border: "border-destructive/20", icon: AlertTriangle, label: "HIGH" },
  medium: { color: "text-warning", border: "border-warning/20", icon: AlertTriangle, label: "MEDIUM" },
  low: { color: "text-primary", border: "border-primary/20", icon: CheckCircle, label: "LOW" },
} as const;

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} security_incidents
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="space-y-4">
          {incidents.map((inc) => {
            const sev = severityConfig[inc.severity as keyof typeof severityConfig];
            return (
              <div
                key={inc.id}
                className={`panel-glow border ${sev.border} transition-all duration-300`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <sev.icon className={`w-4 h-4 ${sev.color}`} />
                    <span className="text-xs text-muted-foreground font-mono">{inc.id}</span>
                    <span className={`text-xs font-bold tracking-wider ${sev.color}`}>{sev.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inc.tools.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-foreground mb-2">{inc.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{inc.description}</p>

                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-secondary/50 rounded p-3 border border-border">
                    <span className="text-primary font-semibold text-[10px] uppercase tracking-wider">Detection</span>
                    <p className="text-muted-foreground mt-1">{inc.detection}</p>
                  </div>
                  <div className="bg-secondary/50 rounded p-3 border border-border">
                    <span className="text-primary font-semibold text-[10px] uppercase tracking-wider">Outcome</span>
                    <p className="text-muted-foreground mt-1">{inc.outcome}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
