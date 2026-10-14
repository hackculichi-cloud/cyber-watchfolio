import ProfileCertificates from "@/components/profile/ProfileCertificates";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import ElectricalCurriculum from "@/components/electrical/ElectricalCurriculum";
import ElectricalEvidenceGallery from "@/components/electrical/ElectricalEvidenceGallery";
import { Button } from "@/components/ui/button";
import WorkGrid from "@/components/work/WorkGrid";
import {
  electricalSkills,
  electricalToolGroups,
  electricalTraining,
  practicalEntries,
  trainingTracks,
} from "@/data/electrical";
import { electricalEvidence, electricalProjects } from "@/data/electricalProjects";
import { profileBySlug } from "@/data/profiles";
import { site } from "@/data/site";

const profile = profileBySlug("electrical");

const Electrical = () => {
  const { t } = useLanguage();
  const tracks = trainingTracks.filter((entry) => entry.anchor === "electrical");
  const entries = practicalEntries.filter((e) => /electric/i.test(e.track));
  const documentedPractice = electricalProjects.filter((project) => project.id !== "residential-training-board" && project.status === "Completed");

  return (
    <>
      <Seo
        title={t(`Residential & Industrial Electrical Maintenance | ${site.shortName}`)}
        description={t("Electrical maintenance training, float-switch course exercises and real residential client work: outlet, switch and ceiling luminaire replacement.")}
        path="/electrical"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#projects">{t("View projects")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#tracks">{t("My training")}</a>
        </Button>
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electronics" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Electronics profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Technical repair profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <SpecialtyExplorer profile={profile.slug} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading mascot={profile.slug}
          eyebrow={t("Overview")}
          title={t("Electrical maintenance: training & experience")}
          description={t("Industrial electrical maintenance training, course practice and documented residential client work — each activity identified by its actual setting.")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Float-switch control", body: "Electronivel course exercise documented with a photograph and demonstration video.", tag: "Practical training" },
            { title: "Outlets & switches", body: "Residential client outlet and switch replacement, documented alongside power strips.", tag: "Residential client work" },
            { title: "Lighting maintenance", body: "Two ceiling luminaires replaced at a client's residence, with installation and operating photographs.", tag: "Residential client work" },
          ].map((c) => (
            <div key={c.title} className="glass-panel p-5 transition-transform duration-300 hover:-translate-y-1">
              <Tag variant="primary">{t(c.tag)}</Tag>
              <h3 className="mt-3 text-base font-semibold">{t(c.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(c.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Electrical training")}
            title={t("Electrical Fundamentals & Industrial Electricity")}
            description={t("In progress through RED CONOCER — a structured curriculum spanning theory, installations, control, motors, maintenance, diagnostics and renewable energy.")}
          />
          <ElectricalCurriculum training={electricalTraining} />
          <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-primary">{t("Related learning tracks")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.id} className="panel-glow hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{t(track.title)}</h3>
                  <Tag variant={track.status === "Planned" ? "muted" : "primary"}>{t(track.status)}</Tag>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(track.description)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {track.topics.map((entry) => (
                    <Tag key={entry}>{t(entry)}</Tag>
                  ))}
                </div>
                {track.learningObjectives && <details className="mt-4" data-course-objectives={track.id}>
                  <summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Course learning objectives")}</summary>
                  <p className="mt-3 text-xs text-muted-foreground">{t("Topics being studied; certificate pending completion.")}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{track.learningObjectives.map(item => <li key={item}>{t(item)}</li>)}</ul>
                </details>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProfileCertificates profile={profile.slug} />


      <section id="skills" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Practical skills")}
          title={t("Electrical skills studied and practiced")}
          description={t("Foundation-level measurement, analysis and diagnostic activities developed through training and hands-on exercises.")}
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {electricalSkills.map((skill, index) => (
            <li key={skill} className="panel flex min-h-24 flex-col justify-between p-4">
              <span className="font-mono text-xs text-primary">{t(String(index + 1).padStart(2, "0"))}</span>
              <span className="mt-4 text-sm font-medium">{t(skill)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Projects")}
            title={t("Course practice & residential client work")}
            description={t("Real photographs and video documenting float-switch training, outlet and switch replacement, and two replacement ceiling luminaires.")}
          />
          <WorkGrid
            items={electricalProjects}
            placeholderSlots={0}
            emptyTitle={t("Real photographs pending")}
            emptyDescription={t("Electrical projects will appear here when real photographs and documentation are available.")}
          />
        </div>
      </section>

      <section id="practice" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Practical experience")}
            title={t("Electrical maintenance experience")}
            description={t("Course exercises and residential client maintenance, documented separately with their supporting evidence.")}
          />
          <div className="mb-6 divide-y divide-border">
            {documentedPractice.map((project) => (
              <article key={project.id} className="py-5 first:pt-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{t(project.title)}</h3>
                  <Tag variant="primary">{t(project.category)}</Tag>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(project.summary)}</p>
                <Button asChild variant="link" className="mt-2 h-auto px-0">
                  <a href="#projects">{t("View project evidence ")}<ArrowRight className="ml-1.5 h-3.5 w-3.5" /></a>
                </Button>
              </article>
            ))}
          </div>
          {entries.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {entries.map((entry) => (
                <article key={entry.id} className="panel-glow hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold">{t(entry.title)}</h3>
                    <Tag variant="primary">{t(entry.track)}</Tag>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t(entry.date)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(entry.summary)}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.skills.map((s) => (
                      <Tag key={s}>{t(s)}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : !documentedPractice.length ? (
            <EmptyState
              title={t("Practice entries coming soon")}
              description={t("Exercises and diagnostics will be published here as the training progresses.")}
            />
          ) : null}
        </div>
      </section>

      <section id="evidence" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Practical work / Evidence")}
          title={t("Installations, wiring & measurements")}
          description={t("Real photographs from course practice and residential client maintenance.")}
        />
        <ElectricalEvidenceGallery items={electricalEvidence} />
      </section>

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Tools & equipment")}
            title={t("Equipment used in training and practice")}
            description={t("Measurement, installation, workshop and safety equipment used while developing electrical fundamentals.")}
          />
          <ProfileTools groups={electricalToolGroups} />
        </div>
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")} />
          <ProfileCvBlock cvIds={profile.cvIds} />
        </div>
      </section>
    </>
  );
};

export default Electrical;
