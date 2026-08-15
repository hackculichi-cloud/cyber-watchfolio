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
import { practicalEntries, trainingTracks } from "@/data/electrical";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

const profile = profileBySlug("electrical");

const ElectricalElectronics = () => {
  const tracks = trainingTracks.filter((t) => t.anchor !== "repair");
  const entries = practicalEntries.filter((e) => !/repair/i.test(e.track));

  return (
    <>
      <Seo
        title={`Electrical & Electronics | ${site.shortName}`}
        description="Complementary technical training in residential electrical maintenance, general electronics and practical diagnostics."
        path="/electrical-electronics"
      />
      <ProfileHero profile={profile} />
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Overview"
          title="Practical technical training"
          description="Residential electrical maintenance and general electronics, documented honestly as learning in progress."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Electrical", body: "Safe practices, residential installations, diagnostics and maintenance.", tag: "Currently studying" },
            { title: "Electronics", body: "Components, circuits, measurement, soldering and troubleshooting.", tag: "Currently studying" },
            { title: "Device repair", body: "Smartphone repair training lives in its own profile.", tag: "In training" },
          ].map((c) => (
            <div key={c.title} className="panel-glow hover:-translate-y-1">
              <Tag variant="primary">{c.tag}</Tag>
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
        <Link to="/repair" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          Open the Technical Repair profile <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <section id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Training" title="Current learning tracks" />
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.id} id={track.anchor} className="panel-glow scroll-mt-32 hover:-translate-y-1">
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

      <section id="practice" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Practice log"
          title="Practical exercises & diagnostics"
          description="Documented practice: what the exercise was, which skills it built and what the result was."
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
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Gallery"
            title="Installations, circuits & measurements"
            description="Photos of real practice: installations, boards, measurements and before/after work."
          />
          <Gallery
            items={galleryFor("electrical")}
            emptyTitle="No photos published yet"
            emptyDescription="Add photos to the gallery data file — title, description, date, category and tags are supported."
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow="Tools" title="Equipment & tooling" />
        <ProfileTools groups={toolsByProfile.electrical} />
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

export default ElectricalElectronics;
