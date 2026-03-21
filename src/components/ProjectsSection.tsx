import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-002",
    severity: "medium",
    title: "VPN Unauthorized Access Attempt",
    tools: ["SIEM", "Firewall", "VPN", "MFA"],
    description:
      "Multiple failed login attempts detected from an external IP triggering abnormal MFA (OTP) activity on a VPN account.",
    detection:
      "SIEM alert triggered due to login attempt from an unauthorized country. Analysis of authentication logs and firewall data revealed multiple OTP requests and repeated failed authentication attempts from the same IP address.",
    outcome:
      "No successful authentication was achieved. Activity was identified as an unauthorized access attempt (MFA abuse). No system impact observed.",
  },
  {
    id: "INC-2024-003",
    severity: "high",
    title: "RDP Brute Force Attack Detected",
    tools: ["SIEM", "RDP", "Windows", "Brute Force", "Threat Intel"],
    description:
      "Multiple failed RDP login attempts detected from a malicious external IP targeting a Windows host using different usernames.",
    detection:
      "SIEM alert triggered due to repeated failed RDP authentication attempts from a single external IP. Log analysis revealed multiple login failures using different non-existent usernames, consistent with brute force behavior.",
    outcome:
      "No successful authentication was observed. Activity was identified as a brute force attack attempt from a known malicious IP. No system compromise detected.",
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
    <section id="projects" className="py-20 relative bg-background/80 backdrop-blur-sm">
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
