import { electricalTraining, trainingTracks } from "@/data/electrical";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { useLanguage } from "@/i18n/LanguageProvider";
import ElectricalCurriculum from "./ElectricalCurriculum";
import Tag from "@/components/shared/Tag";

const moduleIds: Record<string, string[]> = {
  residential: ["module-1", "module-2", "module-3"],
  industrial: ["module-5", "module-6", "module-7", "module-8"],
  "electrical-control": ["module-4", "module-5"],
};

/** Course topics and completed practices keep their actual, distinct contexts. */
export default function ElectricalAreaLearning({ area, onOpen }: { area: string; onOpen: (tab: string) => void }) {
  const { t } = useLanguage();
  const group = electricalPracticeGroups.find(item => item.id === (area === "electrical-control" ? "control" : area));
  const ids = new Set(group?.categories.flatMap(item => item.projectIds));
  const practices = electricalProjects.filter(item => ids.has(item.id) && item.status === "Completed");
  const planned = electricalProjects.filter(item => ids.has(item.id) && item.status === "Planned");
  const courseIds = area === "residential" ? ["electrical", "electrical-linkedin", "electrical-udemy", "electrical-udemy-measurements"] : ["electrical", "electrical-linkedin", "electrical-udemy-measurements"];
  const measurements = trainingTracks.find(item => item.id === "electrical-udemy-measurements");
  return <section data-area-learning={area} className="space-y-5 px-4 pb-6">
    <div data-area-practices className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <h4 className="text-lg font-bold">{t("My documented practice")}</h4>
      {practices.length ? <ul className="mt-3 space-y-3">{practices.map(item => <li key={item.id}>
        <p className="font-semibold text-foreground">{t(item.title)}</p>
        <p className="reading-copy mt-1 text-sm text-foreground/85">{t(item.summary)}</p>
      </li>)}</ul> : <p className="reading-copy mt-3 text-sm text-foreground/85">{t("No completed practices documented in this category yet. Training topics are listed with their courses and certificates.")}</p>}
      {planned.length > 0 && <div className="mt-5 border-t border-border pt-4"><h5 className="font-semibold">{t("Planned practice")}</h5><ul className="mt-3 space-y-3">{planned.map(item => <li key={item.id}>
        <Tag variant="muted">{t("Planned")}</Tag><p className="mt-2 font-semibold">{t(item.title)}</p><p className="reading-copy mt-1 text-sm text-foreground/85">{t(item.summary)}</p>
      </li>)}</ul></div>}
      {practices.length + planned.length > 0 && <button type="button" onClick={() => onOpen("projects")} className="menu-choice mt-4 min-h-11 rounded-lg px-2 font-semibold text-primary underline underline-offset-4">{t("View practices and evidence")}</button>}
    </div>
    <details data-area-syllabus className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Course syllabus")} · {t(electricalTraining.provider)}</summary>
      <div className="mt-4"><ElectricalCurriculum training={electricalTraining} moduleIds={moduleIds[area]} /></div>
    </details>
    <details className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5" data-area-courses>
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Courses behind these skills")}</summary>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">{trainingTracks.filter(course => courseIds.includes(course.id)).map(course => <li key={course.id} className="rounded-lg border border-border p-4">
        <Tag variant={course.status === "Completed" ? "primary" : "muted"}>{t(course.status)}</Tag><h5 className="mt-2 font-semibold">{t(course.title)}</h5>
        <button type="button" onClick={() => onOpen("certificate")} className="menu-choice mt-2 min-h-11 rounded-lg px-2 font-semibold text-primary underline underline-offset-4">{t("View course details")}</button>
      </li>)}</ul>
    </details>
    {area !== "electrical-control" && measurements?.learningObjectives && <details className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Electrical Measurements")} · Udemy</summary>
      <p className="reading-copy mt-3 text-sm text-foreground/85">{t(measurements.description)}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-foreground/85">{measurements.learningObjectives.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>
    </details>}
  </section>;
}
