import { Award, CircleDashed, Loader2 } from "lucide-react";

type Status = "completed" | "in-progress" | "planned";

const certs: { name: string; year: string; status: Status; progress: number; track: string }[] = [
  { name: "CompTIA Security+", year: "2025", status: "in-progress", progress: 70, track: "Foundations" },
  { name: "Certified SOC Analyst (CSA)", year: "2025", status: "in-progress", progress: 55, track: "SOC Operations" },
  { name: "Splunk Core Certified User", year: "2025", status: "in-progress", progress: 60, track: "SIEM" },
  { name: "CompTIA CySA+", year: "2025", status: "in-progress", progress: 35, track: "Blue Team" },
  { name: "GIAC Security Essentials (GSEC)", year: "2025", status: "in-progress", progress: 20, track: "Foundations" },
];

const statusMeta: Record<Status, { label: string; cls: string; icon: typeof Award }> = {
  completed: {
    label: "COMPLETED",
    cls: "bg-primary/10 text-primary border-primary/30",
    icon: Award,
  },
  "in-progress": {
    label: "IN PROGRESS",
    cls: "bg-warning/10 text-warning border-warning/30",
    icon: Loader2,
  },
  planned: {
    label: "PLANNED",
    cls: "bg-secondary text-muted-foreground border-border",
    icon: CircleDashed,
  },
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 relative bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-2 mb-2">
          <h2 className="font-display text-3xl font-bold neon-text">{">"} certifications</h2>
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            roadmap · 2025
          </span>
        </div>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div className="relative panel-glow p-5 md:p-6">
          {/* Vertical timeline rail */}
          <div className="absolute left-6 md:left-7 top-6 bottom-6 w-px bg-border" aria-hidden="true" />

          <ol className="space-y-4">
            {certs.map((c) => {
              const meta = statusMeta[c.status];
              const Icon = meta.icon;
              return (
                <li key={c.name} className="relative pl-10 md:pl-12">
                  {/* Node */}
                  <span
                    className={`absolute left-3 md:left-4 top-3 w-6 h-6 rounded-full bg-background border flex items-center justify-center ${
                      c.status === "in-progress"
                        ? "border-warning/60"
                        : c.status === "completed"
                        ? "border-primary/60"
                        : "border-border"
                    }`}
                  >
                    <Icon
                      className={`w-3 h-3 ${
                        c.status === "in-progress"
                          ? "text-warning animate-spin [animation-duration:3s]"
                          : c.status === "completed"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </span>

                  <div className="bg-secondary/40 border border-border rounded p-3 md:p-4 transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm md:text-base text-foreground font-semibold">
                          {c.name}
                        </h3>
                        <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                          {c.track}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-mono">{c.year}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border tracking-wider ${meta.cls}`}
                        >
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            c.status === "completed"
                              ? "bg-primary"
                              : c.status === "in-progress"
                              ? "bg-warning"
                              : "bg-muted-foreground/40"
                          }`}
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono w-9 text-right">
                        {c.progress}%
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
