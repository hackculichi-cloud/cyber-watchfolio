import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, GraduationCap, Layers3 } from "lucide-react";
import { electricalSkills, electricalTraining, trainingTracks } from "@/data/electrical";
import { electricalKnowledge, electricalOverviewAreas } from "@/data/electricalOverview";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { electricalProjects } from "@/data/electricalProjects";
import { trainingProviders, type TrainingProviderId } from "@/data/trainingProviders";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProviderMark } from "@/components/profile/TrainingProviderBadge";
import MascotScene from "@/components/shared/MascotScene";
import ElectricalCurriculum from "./ElectricalCurriculum";
import Tag from "@/components/shared/Tag";

const complementaryProviders: Record<string, TrainingProviderId> = {
  "electrical-linkedin": "linkedin-learning", "electrical-udemy": "udemy", "electrical-udemy-measurements": "udemy",
};

/** Main program → applied knowledge → documented work → complementary courses. */
export default function ElectricalAreaLearning({ area, onOpen }: { area: string; onOpen: (tab: string, courseId?: string) => void }) {
  const { t } = useLanguage();
  const config = electricalOverviewAreas[area];
  if (!config) return null;
  const group = electricalPracticeGroups.find(item => item.id === (area === "electrical-control" ? "control" : area));
  const ids = new Set(group?.categories.flatMap(item => item.projectIds));
  const practices = electricalProjects.filter(item => ids.has(item.id) && item.status === "Completed");
  const planned = electricalProjects.filter(item => ids.has(item.id) && item.status === "Planned");
  const university = trainingProviders["universidad-internacional"];

  return <section id="overview" data-area-learning={area} className="space-y-6 px-0 py-5 sm:px-4 sm:py-6">
    <header>
      <div className="flex w-full items-center justify-between gap-3">
        <div><p className="eyebrow">{t("Knowledge & applied practice")}</p><h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t("What I know and how I apply it")}</h2></div>
        <MascotScene profile="electrical" scene="practice" className="w-14 shrink-0 sm:w-20" />
      </div>
    </header>

    <article data-main-electrical-training className="overflow-hidden rounded-xl border border-primary/40 bg-background/60">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3"><ProviderMark id="universidad-internacional" className="h-12 w-12" /><div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{t("Main training")}</p>
            <h3 className="mt-1 text-lg font-bold leading-snug">Universidad Internacional <span className="inline-block text-primary">· RED CONOCER</span></h3>
          </div></div>
          <Tag variant="primary">{t(electricalTraining.status === "Completed" ? "Completed" : "In progress")}</Tag>
        </div>
        <p className="mt-4 text-base font-semibold">{t(electricalTraining.title)}</p>
        <p className="reading-copy mt-2 max-w-3xl text-sm text-foreground/85">{t("The core of my electrical training. I connect the program's theory with course practice and documented residential work.")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2 text-sm text-foreground/90"><GraduationCap className="h-4 w-4 text-primary" aria-hidden />{t("Theory and practical training")}</span>
          <a data-training-provider="universidad-internacional" href={university.url} target="_blank" rel="noopener noreferrer" className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-primary">{t("Visit the training center")}<ArrowUpRight className="h-4 w-4" aria-hidden /></a>
        </div>
      </div>
      <details data-area-syllabus className="border-t border-primary/20 bg-background/40 p-4 sm:px-5">
        <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold text-primary">{t("Course syllabus")} <span className="font-normal text-foreground/75">· {t("Topics for this area")}</span></summary>
        <div className="mt-4"><ElectricalCurriculum training={electricalTraining} moduleIds={config.modules} /></div>
      </details>
    </article>

    <div data-electrical-knowledge className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-bold"><Layers3 className="h-5 w-5 text-primary" aria-hidden />{t("Skills I am developing")}</h3>
      <div className={`grid gap-3 ${config.knowledge.length === 4 ? "md:grid-cols-2" : "lg:grid-cols-3"}`}>
        {config.knowledge.map(index => { const item = electricalKnowledge[index]; return <article key={item.title} className="rounded-xl border border-border bg-background/55 p-4">
          <item.icon className="mb-3 h-7 w-7 text-primary" aria-hidden /><h4 className="font-bold">{t(item.title)}</h4>
          <ul className="mt-3 space-y-2">{item.points.map(point => <li key={point} className="reading-copy flex gap-2 text-sm text-foreground/90"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />{t(point)}</li>)}</ul>
        </article>; })}
      </div>
    </div>

    <div data-area-practices className="rounded-xl border border-primary/20 bg-background/60 p-4 sm:p-5">
      <h3 className="flex items-center gap-2 text-lg font-bold"><CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />{t("My documented practice")}</h3>
      {practices.length ? <ul className="mt-4 grid gap-3 md:grid-cols-2">{practices.map((item, index) => <li key={item.id} className="flex gap-3 rounded-lg border border-border p-3">
        <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
        <div><p className="text-sm font-semibold text-foreground">{t(item.title)}</p><p className="reading-copy mt-1 line-clamp-2 text-sm text-foreground/75">{t(item.summary)}</p></div>
      </li>)}</ul> : <p className="reading-copy mt-3 text-sm text-foreground/85">{t("No completed practices documented in this category yet. Training topics are listed with their courses and certificates.")}</p>}
      {planned.length > 0 && <div className="mt-4 border-t border-border pt-4"><h4 className="font-semibold">{t("Planned practice")}</h4><ul className="mt-2 space-y-3">{planned.map(item => <li key={item.id}>
        <Tag variant="muted">{t("Planned")}</Tag><p className="mt-2 font-semibold">{t(item.title)}</p><p className="reading-copy mt-1 text-sm text-foreground/85">{t(item.summary)}</p>
      </li>)}</ul></div>}
      {practices.length + planned.length > 0 && <button type="button" onClick={() => onOpen("projects")} className="menu-choice mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold text-primary">{t("View practices and evidence")}<ArrowRight className="h-4 w-4" aria-hidden /></button>}
    </div>

    <section data-area-courses className="space-y-3">
      <div><h3 className="flex items-center gap-2 text-lg font-bold"><BookOpen className="h-5 w-5 text-primary" aria-hidden />{t("Complementary courses")}</h3><p className="reading-copy mt-1 text-sm text-foreground/75">{t("Udemy and LinkedIn Learning reinforce specific topics from my main training.")}</p></div>
      <ul className="grid gap-3 lg:grid-cols-3">{trainingTracks.filter(course => complementaryProviders[course.id]).map(course => { const providerId = complementaryProviders[course.id], provider = trainingProviders[providerId]; return <li key={course.id} data-complementary-course={course.id} className="flex min-w-0 flex-col rounded-xl border border-border bg-background/50 p-4">
        <div className="mb-3 flex items-center gap-2"><ProviderMark id={providerId} className="h-8 w-8" /><span className="text-sm font-semibold">{provider.name}</span></div>
        <Tag variant={course.status === "Completed" ? "primary" : "muted"} className="self-start">{t(course.status === "Completed" ? "Completed" : "In progress")}</Tag>
        <h4 className="mt-3 font-bold">{t(course.title)}</h4>
        {course.learningObjectives && <details className="mt-3">
          <summary className="menu-choice cursor-pointer rounded-lg py-2 text-sm font-semibold text-primary">{t("What I study in this course")}</summary>
          <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-foreground/85">{course.learningObjectives.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>
        </details>}
        <button type="button" onClick={() => onOpen("certificate", course.id === "electrical-udemy-measurements" ? "electrical-measurements" : course.id)} className="menu-choice mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 pt-3 text-sm font-semibold text-primary">{t("View course details")}<ArrowRight className="h-4 w-4" aria-hidden /></button>
      </li>; })}</ul>
    </section>

    <details id="skills" className="scroll-mt-32 rounded-xl border border-border px-4 py-3">
      <summary className="menu-choice cursor-pointer rounded-lg py-2 font-semibold">{t("Electrical skills studied and practiced")}</summary>
      <ul className="mt-3 flex flex-wrap gap-2">{electricalSkills.map(skill => <li key={skill} className="rounded-md border border-primary/20 bg-background/70 px-3 py-2 text-sm">{t(skill)}</li>)}</ul>
    </details>
  </section>;
}
