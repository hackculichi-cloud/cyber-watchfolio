import ProfileCertificates from "@/components/profile/ProfileCertificates";
import ElectricalCurriculum from "./ElectricalCurriculum";
import Tag from "@/components/shared/Tag";
import { electricalTraining, trainingTracks } from "@/data/electrical";
import { useLanguage } from "@/i18n/LanguageProvider";
import DeferredDetails from "@/components/shared/DeferredDetails";
import { useEffect } from "react";

/** Each course keeps its description, syllabus and pending document together. */
const ElectricalTrainingCertificates = ({ targetId }: { targetId?: string }) => {
  const { t } = useLanguage();
  useEffect(() => {
    if (!targetId) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(targetId) ?? document.getElementById("certificate");
      if (targetId.startsWith("certificate-")) {
        const information = target?.querySelector<HTMLDetailsElement>("[data-certificate-info]");
        if (information) information.open = true;
        target?.focus({ preventScroll: true });
      }
      target?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [targetId]);
  const content = Object.fromEntries(trainingTracks.filter(track => track.anchor === "electrical").map(track => {
    const recordId = track.id === "electrical" ? "electrical-conocer" : track.id === "electrical-udemy-measurements" ? "electrical-measurements" : track.id;
    return [recordId, <div key={track.id} className="space-y-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">{t(track.description)}</p>
      </div>
      {track.topics.length > 0 && <div className="flex flex-wrap gap-2">{track.topics.map(topic => <Tag key={topic}>{t(topic)}</Tag>)}</div>}
      {track.id === "electrical" && <DeferredDetails data-course-syllabus={track.id}
        summary={<summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Course syllabus")}</summary>}>
        <div className="mt-4"><ElectricalCurriculum training={electricalTraining} /></div>
      </DeferredDetails>}
      {track.syllabus && <DeferredDetails data-confirmed-course-syllabus={track.id}
        summary={<summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Documented course syllabus")}</summary>}>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(track.syllabusNote)}</p>
        <ol className="mt-4 space-y-3">{track.syllabus.map((section, index) => <li key={section.title} data-confirmed-syllabus-section className="rounded-lg border border-border bg-background/40 p-4">
          <h4 className="font-semibold"><span data-syllabus-number className="mr-2 font-mono text-primary">{String(section.number ?? index + 1).padStart(2, "0")}</span>{t(section.title)}</h4>
          {(section.lessonCount !== undefined || section.durationMinutes !== undefined) && <p data-syllabus-summary className="mt-2 text-xs text-muted-foreground">
            {section.lessonCount !== undefined && t("{count} lessons").replace("{count}", String(section.lessonCount))}
            {section.lessonCount !== undefined && section.durationMinutes !== undefined && " · "}
            {section.durationMinutes !== undefined && `${section.durationMinutes} min`}
          </p>}
          {section.topics.length > 0 && <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">{section.topics.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>}
        </li>)}</ol>
      </DeferredDetails>}
      {track.learningObjectives && <details data-course-objectives={track.id}>
        <summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Course learning objectives")}</summary>
        <p className="mt-3 text-xs text-muted-foreground">{t(track.status === "Completed" ? "Learning objectives from my completed course." : "Topics being studied; certificate pending completion.")}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{track.learningObjectives.map(item => <li key={item}>{t(item)}</li>)}</ul>
      </details>}
    </div>];
  }));
  return <div id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40"><ProfileCertificates profile="electrical" featuredId="electrical-conocer" courseContent={content} /></div>;
};
export default ElectricalTrainingCertificates;
