import { electricalTraining, trainingTracks } from "@/data/electrical";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { useLanguage } from "@/i18n/LanguageProvider";

const moduleIds: Record<string, string[]> = {
  residential: ["module-1", "module-2", "module-3"],
  industrial: ["module-5", "module-6", "module-8"],
  "electrical-control": ["module-4"],
};

/** Course topics and completed practices keep their actual, distinct contexts. */
export default function ElectricalAreaLearning({ area }: { area: string }) {
  const { t } = useLanguage();
  const group = electricalPracticeGroups.find(item => item.id === (area === "electrical-control" ? "control" : area));
  const ids = new Set(group?.categories.flatMap(item => item.projectIds));
  const practices = electricalProjects.filter(item => ids.has(item.id) && item.status === "Completed");
  const modules = electricalTraining.modules.filter(item => moduleIds[area]?.includes(item.id));
  const measurements = trainingTracks.find(item => item.id === "electrical-udemy-measurements");
  return <section data-area-learning={area} className="space-y-5 px-4 pb-6">
    <div className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <h4 className="text-lg font-bold">{t("My documented practice")}</h4>
      {practices.length ? <ul className="mt-3 space-y-3">{practices.map(item => <li key={item.id}>
        <p className="font-semibold text-foreground">{t(item.title)}</p>
        <p className="reading-copy mt-1 text-sm text-foreground/85">{t(item.summary)}</p>
      </li>)}</ul> : <p className="reading-copy mt-3 text-sm text-foreground/85">{t("No completed practices documented in this category yet. Training topics are listed with their courses and certificates.")}</p>}
    </div>
    <details data-area-syllabus className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Course syllabus")} · {t(electricalTraining.provider)}</summary>
      <div className="mt-4 space-y-5">{modules.map(module => <div key={module.id}>
        <h5 className="font-semibold">{t(module.title)}</h5>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-foreground/85">{module.topics.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>
      </div>)}</div>
    </details>
    {area !== "electrical-control" && measurements?.learningObjectives && <details className="rounded-xl border border-primary/20 bg-background/70 p-4 sm:p-5">
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Electrical Measurements")} · Udemy</summary>
      <p className="reading-copy mt-3 text-sm text-foreground/85">{t(measurements.description)}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-foreground/85">{measurements.learningObjectives.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>
    </details>}
  </section>;
}
