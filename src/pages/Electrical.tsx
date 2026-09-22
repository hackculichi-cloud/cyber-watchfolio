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
import ElectricalCredential from "@/components/electrical/ElectricalCredential";
import ElectricalEvidenceGallery from "@/components/electrical/ElectricalEvidenceGallery";
import { Button } from "@/components/ui/button";
import WorkGrid from "@/components/work/WorkGrid";
import {
  electricalCredential,
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
  const tracks = trainingTracks.filter((t) => t.anchor === "electrical");
  const entries = practicalEntries.filter((e) => /electric/i.test(e.track));

  return (
    <>
      <Seo
        title={`Electrical | ${site.shortName}`}
        description="Residential electrical maintenance training: installations, wiring, panels, measurements and diagnostics documented as learning in progress."
        path="/electrical"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#projects">View projects</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#tracks">My training</a>
        </Button>
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electronics" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            Electronics profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            Technical repair profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Overview"
          title="Entering the electrical environment"
          description="Formal training in residential electrical maintenance — safe practices first, then installations, measurements and diagnostics."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Installations & wiring", body: "Residential circuits, wiring runs, outlets, switches and panel work.", tag: "Currently studying" },
            { title: "Measurements", body: "Voltage, continuity and load checks with a multimeter and safe procedures.", tag: "Practice" },
            { title: "Diagnostics", body: "Fault-finding methodology: isolate, measure, verify, document.", tag: "Practice" },
          ].map((c) => (
            <div key={c.title} className="glass-panel p-5 transition-transform duration-300 hover:-translate-y-1">
              <Tag variant="primary">{c.tag}</Tag>
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Electrical training"
            title="Electrical Fundamentals & Industrial Electricity"
            description="Completed through RED CONOCER — a structured foundation spanning theory, installations, control, motors, maintenance, diagnostics and renewable energy."
          />
          <ElectricalCurriculum training={electricalTraining} />
          <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Related learning tracks</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.id} className="panel-glow hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{track.title}</h3>
                  <Tag variant={track.status === "Planned" ? "muted" : "primary"}>{track.status}</Tag>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{track.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {track.topics.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Practical skills"
          title="Electrical skills studied and practiced"
          description="Foundation-level measurement, analysis and diagnostic activities developed through training and hands-on exercises."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {electricalSkills.map((skill, index) => (
            <li key={skill} className="panel flex min-h-24 flex-col justify-between p-4">
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-4 text-sm font-medium">{skill}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Projects"
            title="Electrical work & practice projects"
            description="Real, image-first documentation of the work performed, tools used, skills practiced and lessons learned."
          />
          <WorkGrid
            items={electricalProjects}
            placeholderSlots={0}
            emptyTitle="Real photographs pending"
            emptyDescription="Electrical projects will appear here when real photographs and documentation are available."
          />
        </div>
      </section>

      <section id="practice" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Practical experience"
            title="Practice log"
            description="Documented exercises: what the exercise was, which skills it built and what the result was."
          />
          {entries.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {entries.map((entry) => (
                <article key={entry.id} className="panel-glow hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold">{entry.title}</h3>
                    <Tag variant="primary">{entry.track}</Tag>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{entry.date}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Practice entries coming soon"
              description="Exercises and diagnostics will be published here as the training progresses."
            />
          )}
        </div>
      </section>

      <section id="evidence" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Practical work / Evidence"
          title="Installations, wiring & measurements"
          description="Real photographs from practical electrical training. Select any image to inspect it at a larger size."
        />
        <ElectricalEvidenceGallery items={electricalEvidence} />
      </section>

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Tools & equipment"
            title="Equipment used in training and practice"
            description="Measurement, installation, workshop and safety equipment used while developing electrical fundamentals."
          />
          <ProfileTools groups={electricalToolGroups} />
        </div>
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="CV" title="CV for this profile" />
          <ProfileCvBlock cvIds={profile.cvIds} />
        </div>
      </section>
    </>
  );
};

export default Electrical;
