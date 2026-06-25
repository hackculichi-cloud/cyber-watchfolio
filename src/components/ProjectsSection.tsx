import { AlertTriangle, CheckCircle, XCircle, Search, FileSearch, Gavel, ShieldCheck } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-002",
    severity: "medium",
    title: "VPN Unauthorized Access Attempt",
    tools: ["SIEM", "Firewall", "VPN", "MFA"],
    description:
      "Multiple failed login attempts detected from an external IP triggering abnormal MFA (OTP) activity on a VPN account.",
    timeline: [
      { time: "00:00", label: "Alert fired" },
      { time: "00:04", label: "Triage started" },
      { time: "00:18", label: "IP enrichment" },
      { time: "00:31", label: "Verdict reached" },
      { time: "00:42", label: "Response actions" },
    ],
    workflow: {
      detection:
        "SIEM correlation rule triggered on a VPN authentication attempt from an unauthorized country.",
      analysis:
        "Reviewed authentication logs and firewall data — multiple OTP requests and repeated failed authentications from the same external IP.",
      verdict:
        "TRUE POSITIVE — Unauthorized access attempt classified as MFA abuse (no successful login).",
      response:
        "Recommended password reset, session revocation, and source IP flagged for monitoring/block.",
    },
  },
  {
    id: "INC-2024-003",
    severity: "high",
    title: "RDP Brute Force Attack Detected",
    tools: ["SIEM", "RDP", "Windows", "Brute Force", "Threat Intel"],
    description:
      "Multiple failed RDP login attempts detected from a malicious external IP targeting a Windows host using different usernames.",
    timeline: [
      { time: "00:00", label: "Alert fired" },
      { time: "00:03", label: "Log review" },
      { time: "00:11", label: "Threat intel match" },
      { time: "00:22", label: "Verdict reached" },
      { time: "00:29", label: "Containment" },
    ],
    workflow: {
      detection:
        "SIEM alert on repeated failed RDP authentication attempts from a single external IP targeting a Windows host.",
      analysis:
        "Log analysis revealed multiple failures using non-existent usernames — consistent with automated brute force behavior. IP flagged as malicious in threat intel feeds.",
      verdict:
        "TRUE POSITIVE — Brute force attempt confirmed. No successful authentication and no system compromise.",
      response:
        "Source IP blocked at firewall, targeted accounts hardened, endpoint monitored, and detection rule tuned.",
    },
  },
];

const severityConfig = {
  critical: { color: "text-destructive", border: "border-destructive/30", icon: XCircle, label: "CRITICAL" },
  high: { color: "text-destructive", border: "border-destructive/20", icon: AlertTriangle, label: "HIGH" },
  medium: { color: "text-warning", border: "border-warning/20", icon: AlertTriangle, label: "MEDIUM" },
  low: { color: "text-primary", border: "border-primary/20", icon: CheckCircle, label: "LOW" },
} as const;

const workflowSteps = [
  { key: "detection", label: "Detection", icon: Search },
  { key: "analysis", label: "Analysis", icon: FileSearch },
  { key: "verdict", label: "Verdict", icon: Gavel },
  { key: "response", label: "Response", icon: ShieldCheck },
] as const;

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} security_incidents
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="space-y-6">
          {incidents.map((inc) => {
            const sev = severityConfig[inc.severity as keyof typeof severityConfig];
            return (
              <article
                key={inc.id}
                className={`panel-glow border ${sev.border} transition-all duration-300 hover:scale-[1.01] p-5 md:p-6`}
              >
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <sev.icon className={`w-4 h-4 ${sev.color}`} />
                    <span className="text-xs text-muted-foreground font-mono">{inc.id}</span>
                    <span className={`text-xs font-bold tracking-wider ${sev.color}`}>
                      {sev.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      CLOSED
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inc.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </header>

                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{inc.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {inc.description}
                </p>

                {/* Timeline */}
                <div className="mb-5">
                  <span className="text-[10px] text-primary uppercase tracking-wider">
                    Investigation Timeline
                  </span>
                  <div className="mt-3 relative">
                    <div className="absolute left-0 right-0 top-2 h-px bg-border" />
                    <ol className="relative grid grid-cols-5 gap-1">
                      {inc.timeline.map((t, i) => (
                        <li key={i} className="flex flex-col items-center text-center">
                          <span className="w-4 h-4 rounded-full bg-background border-2 border-primary/60 z-10" />
                          <span className="mt-2 text-[10px] font-mono text-primary">+{t.time}</span>
                          <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                            {t.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Workflow: Detection → Analysis → Verdict → Response */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {workflowSteps.map((step, idx) => (
                    <div
                      key={step.key}
                      className="bg-secondary/40 rounded p-3 border border-border relative"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <step.icon className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">
                          {String(idx + 1).padStart(2, "0")} · {step.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {inc.workflow[step.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
