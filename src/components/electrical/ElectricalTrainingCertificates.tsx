import ProfileCertificates from "@/components/profile/ProfileCertificates";
import ElectricalCurriculum from "./ElectricalCurriculum";
import MascotScene from "@/components/shared/MascotScene";
import Tag from "@/components/shared/Tag";
import { electricalTraining, trainingTracks } from "@/data/electrical";
import { useLanguage } from "@/i18n/LanguageProvider";
import ElectricalTrainingProviders from "./ElectricalTrainingProviders";
import DeferredDetails from "@/components/shared/DeferredDetails";

/** Each course keeps its description, syllabus and pending document together. */
const ElectricalTrainingCertificates = () => {
  const { t } = useLanguage();
  const content = Object.fromEntries(trainingTracks.filter(track => track.anchor === "electrical").map(track => {
    const recordId = track.id === "electrical" ? "electrical-conocer" : track.id === "electrical-udemy-measurements" ? "electrical-measurements" : track.id;
    return [recordId, <div key={track.id} className="space-y-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">{t(track.description)}</p>
        {track.id === "electrical-udemy-measurements" && <MascotScene profile="electrical" scene="action" className="w-52 shrink-0 sm:w-60" />}
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
          <h4 className="font-semibold"><span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>{t(section.title)}</h4>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">{section.topics.map(topic => <li key={topic}>{t(topic)}</li>)}</ul>
        </li>)}</ol>
      </DeferredDetails>}
      {track.learningObjectives && <details data-course-objectives={track.id}>
        <summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Course learning objectives")}</summary>
        <p className="mt-3 text-xs text-muted-foreground">{t(track.status === "Completed" ? "Learning objectives from my completed course." : "Topics being studied; certificate pending completion.")}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{track.learningObjectives.map(item => <li key={item}>{t(item)}</li>)}</ul>
      </details>}
    </div>];
  }));
  return <div id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40"><ProfileCertificates profile="electrical" featuredId="electrical-conocer" headerContent={<ElectricalTrainingProviders />} courseContent={content} /></div>;
};
export default ElectricalTrainingCertificates;
