import { Shield, Clock, Signal } from "lucide-react";
import type { Playbook } from "@/types/soc";

interface Props {
  playbook: Playbook;
  onOpen: () => void;
}

const PlaybookCard = ({ playbook, onOpen }: Props) => (
  <button
    onClick={onOpen}
    className="panel-glow text-left p-5 md:p-6 w-full transition-all duration-300 hover:scale-[1.01]"
  >
    <div className="flex items-center gap-2 mb-3">
      <Shield className="w-5 h-5 text-primary shrink-0" />
      <h3 className="font-display font-bold text-base text-foreground">{playbook.name}</h3>
    </div>

    <div className="flex flex-wrap gap-1 mb-3">
      {playbook.difficulty && (
        <span className="text-[10px] flex items-center gap-1 border border-primary/30 text-primary rounded px-1.5 py-0.5">
          <Signal className="w-3 h-3" /> {playbook.difficulty}
        </span>
      )}
      {playbook.estimatedTime && (
        <span className="text-[10px] flex items-center gap-1 border border-border text-muted-foreground rounded px-1.5 py-0.5">
          <Clock className="w-3 h-3" /> {playbook.estimatedTime}
        </span>
      )}
      {playbook.tags?.map((t) => (
        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
          {t}
        </span>
      ))}
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed">{playbook.objective}</p>

    <div className="mt-4 text-[10px] font-mono text-primary/70">
      → view full playbook ({playbook.steps.length} steps)
    </div>
  </button>
);

export default PlaybookCard;
