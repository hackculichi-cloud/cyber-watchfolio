import { Shield } from "lucide-react";

const playbooks = [
  {
    title: "VPN Unauthorized Access Investigation",
    description:
      "Step-by-step process to investigate suspicious VPN logins from unauthorized locations, including IP analysis, authentication review, MFA validation, and incident classification.",
    tags: ["SIEM", "VPN", "MFA", "Authentication", "Threat Analysis"],
  },
  {
    title: "RDP Brute Force Detection & Response",
    description:
      "Operational workflow to detect and analyze RDP brute force attacks by reviewing authentication logs, identifying multiple failed login attempts, analyzing attacker IP reputation, and determining impact.",
    tags: ["SIEM", "RDP", "Windows", "Brute Force", "Threat Intel"],
  },
];

const LabsSection = () => {
  return (
    <section id="labs" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} detection_playbooks
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid md:grid-cols-2 gap-4">
          {playbooks.map((pb) => (
            <div key={pb.title} className="panel-glow p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <h3 className="font-display font-semibold text-sm text-foreground">{pb.title}</h3>
              </div>

              <p className="text-xs text-muted-foreground mb-4 flex-grow">{pb.description}</p>

              <div className="flex flex-wrap gap-1 mt-auto">
                {pb.tags.map((tag) => (
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
