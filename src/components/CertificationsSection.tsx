import { Award, Clock } from "lucide-react";

const certs = [
  { name: "CompTIA Security+", status: "completed", year: "2023" },
  { name: "Certified SOC Analyst (CSA)", status: "completed", year: "2023" },
  { name: "Splunk Core Certified User", status: "completed", year: "2024" },
  { name: "CompTIA CySA+", status: "in-progress", year: "2024" },
  { name: "GIAC Security Essentials (GSEC)", status: "in-progress", year: "2024" },
  { name: "Certified Ethical Hacker (CEH)", status: "planned", year: "2025" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} certifications
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((cert) => (
            <div key={cert.name} className="panel-glow p-4 flex items-start gap-3">
              {cert.status === "completed" ? (
                <Award className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              )}
              <div>
                <h3 className="text-sm text-foreground font-semibold">{cert.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">{cert.year}</span>
                  {cert.status === "in-progress" && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-warning/10 text-warning border border-warning/20">
                      IN PROGRESS
                    </span>
                  )}
                  {cert.status === "planned" && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                      PLANNED
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
