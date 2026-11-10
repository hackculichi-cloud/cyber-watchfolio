import { useLanguage } from "@/i18n/LanguageProvider";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tag from "@/components/shared/Tag";
import { cn } from "@/lib/utils";
import type { TrainingModule } from "@/data/smartphoneRepair";

/** Curriculum timeline with an expandable detailed topic list. */
const TrainingCurriculum = ({ modules }: { modules: TrainingModule[] }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const topicsId = useId();

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        className="min-h-11"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={topicsId}
      >
        {t(open ? "Hide training details" : "View training details")}
        <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </Button>
      <ol id={topicsId} className="relative space-y-4 border-l border-primary/25 pl-6">
        {modules.map((m) => (
          <li key={m.day} className="relative">
            <span className="glow-ring absolute -left-[1.9rem] top-2 grid h-3 w-3 place-items-center rounded-full border border-primary/50 bg-primary/40" />
            <div className="panel-glow transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <Tag variant="primary">{t(m.day)}</Tag>
                <h3 className="text-base font-semibold">{t(m.title)}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(m.summary)}</p>
              {open && <ul data-training-topics={m.day} className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                {m.topics.map(entry => <li key={entry} className="flex gap-2"><span className="text-primary" aria-hidden>·</span><span>{t(entry)}</span></li>)}
              </ul>}
            </div>
          </li>
        ))}
      </ol>

    </div>
  );
};

export default TrainingCurriculum;
