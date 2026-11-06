import { useId, useState } from "react";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { useLanguage } from "@/i18n/LanguageProvider";
import WorkGrid from "@/components/work/WorkGrid";
import "./ElectricalPracticeGroups.css";

/** Completed cases appear immediately, with one optional row of type filters. */
const ElectricalPracticeGroups = ({ areaId }: { areaId?: string }) => {
  const { t } = useLanguage();
  const resultsId = useId();
  const [category, setCategory] = useState("all");
  const group = electricalPracticeGroups.find(item => item.id === (areaId ?? "residential"));
  if (!group) return null;
  const selected = group.categories.find(item => item.id === category);
  const items = electricalProjects.filter(item => category === "all"
    ? group.categories.some(entry => entry.projectIds.includes(item.id)) && item.status === "Completed"
    : selected?.projectIds.includes(item.id));

  return <div data-electrical-practices className="space-y-5">
    <div data-electrical-category-choices role="group" aria-label={t("Filter by work type")} className="electrical-work-filters">
      <button type="button" data-electrical-all-filter aria-pressed={category === "all"} aria-controls={resultsId} onClick={() => setCategory("all")}>
        {t("All")}
      </button>
      {group.categories.map(item => {
        const count = item.projectIds.filter(id => electricalProjects.some(project => project.id === id && project.status === "Completed")).length;
        return <button key={item.id} type="button" data-electrical-group={`${group.id}-${item.id}`} aria-pressed={category === item.id} aria-controls={resultsId} onClick={() => setCategory(item.id)}>
          <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t(item.title)}</span>
          {count > 0 && <span aria-hidden="true" className="text-xs opacity-70">{count}</span>}
        </button>;
      })}
    </div>
    <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {t("Recorded practices: {count}").replace("{count}", String(items.filter(item => item.status === "Completed").length))}
    </p>
    <div key={`${group.id}-${category}`} id={resultsId} data-electrical-results role="region" aria-label={t(selected?.title ?? "Work & practice")} className="electrical-practice-results">
      <WorkGrid items={items} centered filterable={false} emptyTitle="Evidence pending" emptyDescription="No completed practices documented in this category yet. Training topics are listed with their courses and certificates." />
    </div>
  </div>;
};
export default ElectricalPracticeGroups;
