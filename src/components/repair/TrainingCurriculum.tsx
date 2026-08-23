import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";
import type { TrainingModule } from "@/data/smartphoneRepair";

/** Curriculum timeline with an expandable detailed topic list. */
const TrainingCurriculum = ({ modules }: { modules: TrainingModule[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ol className="relative space-y-4 border-l border-primary/25 pl-6">
        {modules.map((m) => (
          <li key={m.day} className="relative">
            <span className="glow-ring absolute -left-[1.9rem] top-2 grid h-3 w-3 place-items-center rounded-full border border-primary/50 bg-primary/40" />
            <div className="panel-glow transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <Tag variant="primary">{m.day}</Tag>
                <h3 className="text-base font-semibold">{m.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
              <div
                className={cn(
                  "grid transition-all duration-500",
                  open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <ul className="flex flex-wrap gap-1.5 overflow-hidden">
                  {m.topics.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Button
        variant="outline"
        className="mt-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "Hide training details" : "View training details"}
        <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </Button>
    </div>
  );
};

export default TrainingCurriculum;
