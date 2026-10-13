import SpecialtySections from "@/components/profile/SpecialtySections";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import Gallery from "@/components/shared/Gallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import WorkGrid from "@/components/work/WorkGrid";
import { worksFor } from "@/data/works";
import { trainingTracks } from "@/data/electrical";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

const profile = profileBySlug("electronics");

const Electronics = () => {
  const { t } = useLanguage();
  const tracks = trainingTracks.filter((entry) => entry.anchor === "electronics");

  return (
    <>
      <Seo
        title={t(`Electronics | ${site.shortName}`)}
        description={t("General electronics training: components, circuits, PCB work, soldering practice and instrument-based diagnostics.")}
        path="/electronics"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#projects">{t("View projects")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#tracks">{t("My training")}</a>
        </Button>
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electrical" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Electrical profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Technical repair profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <SpecialtySections profile="electronics" />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Overview")}
          title={t("General electronics training")}
          description={t("Components, circuits and measurement instruments — building a methodical troubleshooting approach on real hardware.")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Components & circuits", body: "Resistors, capacitors, semiconductors and how circuits behave under load.", tag: "Currently studying" },
            { title: "PCB & soldering", body: "Board inspection, soldering and desoldering practice on training boards.", tag: "Practice" },
            { title: "Instruments", body: "Multimeter and oscilloscope practice for measurement-driven diagnostics.", tag: "Practice" },
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
          <SectionHeading eyebrow={t("Training")} title={t("Current training")} />
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Projects")}
          title={t("Electronics projects")}
          description={t("Image-first documentation of circuits, PCB work, soldering practice and measurements.")}
        />
        <WorkGrid
          items={worksFor("electronics")}
          placeholderSlots={6}
          emptyTitle={t("Real photographs pending")}
          emptyDescription={t("These slots are reserved for my own photos of PCBs, circuits, components, soldering work and measurements.")}
        />
      </section>

      <section id="diagnostics" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Diagnostics & measurements")}
            title={t("How I troubleshoot")}
            description={t("A consistent method applied to every board: observe, measure, isolate, repair, verify.")}
          />
          <ol className="grid gap-3 md:grid-cols-5">
            {["Observe", "Measure", "Isolate", "Repair", "Verify"].map((s, i) => (
              <li key={s} className="rounded-lg border border-border bg-surface-2/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {t(String(i + 1).padStart(2, "0"))}
                </p>
                <p className="mt-2 text-sm font-medium">{t(s)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="gallery" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Gallery")}
          title={t("PCBs, components & soldering")}
          description={t("Real photos of boards, components, soldering work, measurements and practical exercises.")}
        />
        <Gallery
          items={galleryFor("electronics")}
          emptyTitle={t("No photos published yet")}
          emptyDescription={t("Add photos to the gallery data file — they appear here automatically with filters and a lightbox.")}
        />
      </section>

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("Tools")} title={t("Instruments & tooling")} />
          <ProfileTools groups={toolsByProfile.electronics} />
        </div>
      </section>

      <section id="cv" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow={t("CV")} title={t("CV for this profile")} />
        <ProfileCvBlock cvIds={profile.cvIds} />
      </section>
    </>
  );
};

export default Electronics;
