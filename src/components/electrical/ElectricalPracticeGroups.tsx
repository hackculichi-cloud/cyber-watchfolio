import { useEffect, useRef, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { useLanguage } from "@/i18n/LanguageProvider";
import WorkGrid from "@/components/work/WorkGrid";

const PracticeTile = ({ id, label, icon: Icon, active, onClick, count }: { id: string; label: string; icon: LucideIcon; active: boolean; onClick: () => void; count: number }) => {
  const { t } = useLanguage();
  return <button type="button" data-electrical-group={id} aria-expanded={active} aria-controls={active ? `electrical-panel-${id}` : undefined} onClick={onClick}
    className={`group overflow-hidden rounded-xl border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${active ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60"}`}>
    <span className="flex h-32 items-center justify-center bg-gradient-to-b from-primary/10 to-transparent sm:h-40"><Icon className="h-16 w-16 text-primary sm:h-20 sm:w-20" strokeWidth={1.2} aria-hidden /></span>
    <span className="flex min-h-24 flex-col items-center justify-center gap-2 border-t border-border px-3 py-3">
      <span className="flex items-center justify-center gap-2 font-semibold">{t(label)}<ChevronDown className={`h-4 w-4 shrink-0 ${active ? "rotate-180" : ""}`} aria-hidden /></span>
      <span className="text-xs text-muted-foreground">{count ? t("Recorded practices: {count}").replace("{count}", String(count)) : t("Evidence pending")}</span>
    </span>
  </button>;
};

/** Area → work type → real cases; collapsed by default, like the repair browser. */
const ElectricalPracticeGroups = ({ areaId }: { areaId?: string }) => {
  const { t } = useLanguage();
  const [area, setArea] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const detail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!category) return;
    const frame = requestAnimationFrame(() => {
      detail.current?.focus({ preventScroll: true });
      detail.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [category]);
  const group = electricalPracticeGroups.find(item => item.id === (areaId ?? area));
  const selected = group?.categories.find(item => item.id === category);
  const items = electricalProjects.filter(item => selected?.projectIds.includes(item.id));
  return <div data-electrical-practices className="space-y-6">
    {!areaId && <div className="grid max-w-4xl grid-cols-1 gap-4 min-[420px]:grid-cols-3">
      {electricalPracticeGroups.map(item => <PracticeTile key={item.id} id={item.id} label={item.title} icon={item.icon} active={area === item.id}
        count={item.categories.flatMap(c => c.projectIds).filter(id => electricalProjects.some(p => p.id === id && p.status === "Completed")).length}
        onClick={() => { setArea(area === item.id ? null : item.id); setCategory(null); }} />)}
    </div>}
    {group && <div id={`electrical-panel-${group.id}`} className="space-y-5 border-t border-primary/25 pt-6">
      <h3 className="text-xl font-semibold">{t(group.title)}</h3>
      <div className="grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
        {group.categories.map(item => <PracticeTile key={item.id} id={`${group.id}-${item.id}`} label={item.title} icon={item.icon} active={category === item.id}
          count={item.projectIds.filter(id => electricalProjects.some(p => p.id === id && p.status === "Completed")).length}
          onClick={() => setCategory(category === item.id ? null : item.id)} />)}
      </div>
      {selected && <div ref={detail} tabIndex={-1} key={`${group.id}-${selected.id}`} id={`electrical-panel-${group.id}-${selected.id}`} className="scroll-mt-80 space-y-4 outline-none">
        <h4 className="text-lg font-semibold text-primary">{t(selected.title)}</h4>
        <WorkGrid items={items} placeholderSlots={0} emptyTitle="Evidence pending" emptyDescription="No completed practices documented in this category yet. Training topics are listed with their courses and certificates." />
      </div>}
    </div>}
  </div>;
};
export default ElectricalPracticeGroups;
