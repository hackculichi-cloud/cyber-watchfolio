import { Github, ExternalLink, Server, Search, Activity, Code2 } from "lucide-react";

const projects = [
  {
    title: "SOC Home Lab",
    icon: Server,
    tech: ["pfSense", "Active Directory", "Sysmon", "ELK", "Kali"],
    description:
      "Self-built enterprise-like SOC lab with segmented networks, domain controller, and full endpoint telemetry pipeline for detection engineering practice.",
    outcomes: [
      "Simulated 15+ attacker TTPs end-to-end",
      "Centralized Windows + Linux logs into ELK",
      "Documented blue-team response runbooks",
    ],
    repo: "https://github.com/ByCulichi",
    status: "ACTIVE",
  },
  {
    title: "Splunk Detection Lab",
    icon: Search,
    tech: ["Splunk", "SPL", "Sysmon", "Atomic Red Team", "Sigma"],
    description:
      "Detection engineering environment using Splunk to ingest endpoint and network telemetry, mapping MITRE ATT&CK techniques to actionable alerts.",
    outcomes: [
      "Authored 25+ correlation searches",
      "Mapped detections to MITRE ATT&CK",
      "Tuned rules to reduce false positives",
    ],
    repo: "https://github.com/ByCulichi",
    status: "ACTIVE",
  },
  {
    title: "Wazuh Monitoring Environment",
    icon: Activity,
    tech: ["Wazuh", "OSSEC", "Suricata", "Filebeat", "Docker"],
    description:
      "Open-source XDR stack deployed on Docker to monitor multiple agents, integrating IDS signatures and file integrity monitoring across endpoints.",
    outcomes: [
      "Real-time alerting on 10+ agents",
      "Integrated Suricata NIDS alerts",
      "Custom rules for unauthorized access",
    ],
    repo: "https://github.com/ByCulichi",
    status: "ACTIVE",
  },
  {
    title: "Python Security Automation",
    icon: Code2,
    tech: ["Python", "Requests", "VirusTotal API", "AbuseIPDB", "Regex"],
    description:
      "Toolkit of Python scripts that automate repetitive SOC tasks: IOC enrichment, log parsing, IP reputation lookups, and alert triage acceleration.",
    outcomes: [
      "Reduced triage time by ~40%",
      "Bulk IOC enrichment via threat intel APIs",
      "Reusable parsers for Windows / firewall logs",
    ],
    repo: "https://github.com/ByCulichi",
    status: "ONGOING",
  },
];

const ProjectsShowcase = () => {
  return (
    <section id="projects-showcase" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-2">
          <h2 className="font-display text-3xl font-bold neon-text">{">"} projects</h2>
          <a
            href="https://github.com/ByCulichi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 border border-border rounded px-3 py-1.5 hover:border-primary/40"
          >
            <Github className="w-3.5 h-3.5" />
            github.com/ByCulichi
          </a>
        </div>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article
              key={p.title}
              className="panel-glow p-5 flex flex-col transition-transform duration-300 hover:scale-[1.02]"
            >
              <header className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <p.icon className="w-5 h-5 text-primary shrink-0" />
                  <h3 className="font-display font-semibold text-foreground truncate">{p.title}</h3>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 tracking-wider shrink-0">
                  {p.status}
                </span>
              </header>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{p.description}</p>

              <div className="mb-4">
                <span className="text-[10px] text-primary uppercase tracking-wider">Key Outcomes</span>
                <ul className="text-xs text-muted-foreground mt-1.5 space-y-1">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="text-primary shrink-0">▸</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">~/repo</span>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group"
                >
                  <Github className="w-3.5 h-3.5" />
                  View on GitHub
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
