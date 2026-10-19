import { electricalTraining, trainingTracks } from "@/data/electrical";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import ElectricalCurriculum from "./ElectricalCurriculum";

// Select from the owner's existing curriculum and service records; no new claims.
const studyAreas: Record<string, { modules: string[]; courses: string[] }> = {
  residential: { modules: ["module-1", "module-2", "module-3"], courses: ["electrical", "electrical-linkedin", "electrical-udemy", "electrical-udemy-measurements"] },
  industrial: { modules: ["module-5", "module-6", "module-7", "module-8"], courses: ["electrical", "electrical-linkedin", "electrical-udemy-measurements"] },
  "electrical-control": { modules: ["module-4", "module-5"], courses: ["electrical", "electrical-linkedin", "electrical-udemy-measurements"] },
};

export default function ElectricalAreaLearning({ area, onOpen }: { area: string; onOpen: (tab: string) => void }) {
  const { t } = useLanguage();
  const study = studyAreas[area];
  const group = electricalPracticeGroups.find(item => item.id === (area === "electrical-control" ? "control" : area));
  const projectIds = new Set(group?.categories.flatMap(item => item.projectIds));
  const practices = electricalProjects.filter(item => projectIds.has(item.id));

  return <section data-area-learning={area} className="space-y-8 px-1 pb-8 sm:px-4">
    <div>
      <h3 className="text-xl font-semibold">{t("Courses behind these skills")}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {trainingTracks.filter(course => study.courses.includes(course.id)).map(course => <li key={course.id} className="rounded-lg border border-border bg-background/80 p-4">
          <Tag variant={course.status === "Completed" ? "primary" : "muted"}>{t(course.status)}</Tag>
          <h4 className="mt-3 text-base font-semibold">{t(course.title)}</h4>
          <button type="button" onClick={() => onOpen("certificate")} className="mt-3 min-h-11 rounded text-base font-medium text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary">{t("View course details")}</button>
        </li>)}
      </ul>
    </div>
    <div data-area-syllabus>
      <h3 className="text-xl font-semibold">{t("Syllabus for this specialty")}</h3>
      <p className="reading-copy mb-4 mt-3 text-base leading-7 text-foreground/90">{t("Relevant modules from my ongoing Universidad Internacional · RED CONOCER program.")}</p>
      <ElectricalCurriculum training={electricalTraining} moduleIds={study.modules} />
    </div>
    <div data-area-practices>
      <h3 className="text-xl font-semibold">{t("Practice connected to my training")}</h3>
      {practices.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {practices.map(practice => <li key={practice.id} className="rounded-lg border border-border bg-background/80 p-4">
          <Tag variant={practice.status === "Completed" ? "primary" : "muted"}>{t(practice.status ?? "Planned")}</Tag>
          <h4 className="mt-3 text-lg font-semibold">{t(practice.title)}</h4>
          <p className="reading-copy mt-3 text-base leading-7 text-foreground/90">{t(practice.summary)}</p>
        </li>)}
      </ul> : <p className="reading-copy mt-4 rounded-lg border border-dashed border-border p-4 text-base leading-7 text-foreground/90">{t("No completed practices documented in this category yet. Training topics are listed with their courses and certificates.")}</p>}
      {practices.length > 0 && <button type="button" onClick={() => onOpen("projects")} className="mt-4 min-h-11 rounded text-base font-medium text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary">{t("View practices and evidence")}</button>}
    </div>
  </section>;
}
