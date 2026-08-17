import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import Gallery from "@/components/shared/Gallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import WorkGrid from "@/components/work/WorkGrid";
import { worksFor } from "@/data/works";
import { practicalEntries, trainingTracks } from "@/data/electrical";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

const profile = profileBySlug("electronics");

const Electronics = () => {
  const tracks = trainingTracks.filter((t) => t.anchor === "electronics");
  const entries = practicalEntries.filter((e) => /electronic/i.test(e.track));

  return (
    <>
      <Seo
        title={`Electronics | ${site.shortName}`}
        description="General electronics training: components, circuits, PCB work, soldering practice and instrument-based diagnostics."
        path="/electronics"
      />
      <ProfileHero profile={profile}>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/electrical" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            Electrical profile <ArrowRight className="h-3.5 w-3.5" />
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
          title="General electronics training"
          description="Components, circuits and measurement instruments — building a methodical troubleshooting approach on real hardware."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Components & circuits", body: "Resistors, capacitors, semiconductors and how circuits behave under load.", tag: "Currently studying" },
            { title: "PCB & soldering", body: "Board inspection, soldering and desoldering practice on training boards.", tag: "Practice" },
            { title: "Instruments", body: "Multimeter and oscilloscope practice for measurement-driven diagnostics.", tag: "Practice" },
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
          <SectionHeading eyebrow="Training" title="Current training" />
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

      <section id="projects" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Projects"
          title="Electronics projects"
          description="Image-first documentation of circuits, PCB work, soldering practice and measurements."
        />
        <WorkGrid
          items={worksFor("electronics")}
          placeholderSlots={6}
          emptyTitle="Real photographs pending"
          emptyDescription="These slots are reserved for my own photos of PCBs, circuits, components, soldering work and measurements."
        />
      </section>

      <section id="diagnostics" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Diagnostics & measurements"
            title="How I troubleshoot"
            description="A consistent method applied to every board: observe, measure, isolate, repair, verify."
          />
          <ol className="grid gap-3 md:grid-cols-5">
            {["Observe", "Measure", "Isolate", "Repair", "Verify"].map((s, i) => (
              <li key={s} className="rounded-lg border border-border bg-surface-2/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-medium">{s}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Learning journal
            </h3>
            {entries.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {entries.map((entry) => (
                  <article key={entry.id} className="panel-glow hover:-translate-y-1">
                    <h4 className="text-base font-semibold">{entry.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{entry.date}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Journal entries coming soon"
                description="Exercises, measurements and findings are published here as the training progresses."
              />
            )}
          </div>
        </div>
      </section>

      <section id="gallery" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="PCBs, components & soldering"
          description="Real photos of boards, components, soldering work, measurements and practical exercises."
        />
        <Gallery
          items={galleryFor("electronics")}
          emptyTitle="No photos published yet"
          emptyDescription="Add photos to the gallery data file — they appear here automatically with filters and a lightbox."
        />
      </section>

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Tools" title="Instruments & tooling" />
          <ProfileTools groups={toolsByProfile.electronics} />
        </div>
      </section>

      <section id="cv" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow="CV" title="CV for this profile" />
        <ProfileCvBlock cvIds={profile.cvIds} />
      </section>
    </>
  );
};

export default Electronics;
