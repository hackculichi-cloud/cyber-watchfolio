import { AlertTriangle, CheckCircle, XCircle, Clock, Signal } from "lucide-react";
import type { Investigation, Severity } from "@/types/soc";

const severityConfig: Record<Severity, { color: string; border: string; icon: typeof AlertTriangle; label: string }> = {
  critical: { color: "text-destructive", border: "border-destructive/30", icon: XCircle, label: "CRITICAL" },
  high: { color: "text-destructive", border: "border-destructive/20", icon: AlertTriangle, label: "HIGH" },
  medium: { color: "text-warning", border: "border-warning/20", icon: AlertTriangle, label: "MEDIUM" },
  low: { color: "text-primary", border: "border-primary/20", icon: CheckCircle, label: "LOW" },
};

interface Props {
  investigation: Investigation;
  onOpen: () => void;
}

const InvestigationCard = ({ investigation, onOpen }: Props) => {
  const sev = severityConfig[investigation.severity];
  return (
    <button
      onClick={onOpen}
      className={`panel-glow text-left border ${sev.border} transition-all duration-300 hover:scale-[1.01] p-5 md:p-6 w-full`}
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <sev.icon className={`w-4 h-4 ${sev.color}`} />
          <span className="text-xs text-muted-foreground font-mono">{investigation.id}</span>
          <span className={`text-xs font-bold tracking-wider ${sev.color}`}>{sev.label}</span>
          <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            CLOSED
          </span>
          {investigation.difficulty && (
            <span className="text-[10px] flex items-center gap-1 border border-primary/30 text-primary rounded px-1.5 py-0.5">
              <Signal className="w-3 h-3" /> {investigation.difficulty}
            </span>
          )}
          {investigation.estimatedTime && (
            <span className="text-[10px] flex items-center gap-1 border border-border text-muted-foreground rounded px-1.5 py-0.5">
              <Clock className="w-3 h-3" /> {investigation.estimatedTime}
            </span>
          )}
        </div>
        {investigation.tools && (
          <div className="flex flex-wrap gap-1.5">
            {investigation.tools.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <h3 className="font-display font-semibold text-foreground text-lg mb-2">{investigation.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{investigation.shortDescription}</p>

      <div className="mt-4 text-[10px] font-mono text-primary/70">→ view full investigation</div>
    </button>
  );
};

export default InvestigationCard;
