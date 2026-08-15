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

const profile = profileBySlug("repair");

const TechnicalRepair = () => {
  const tracks = trainingTracks.filter((t) => t.anchor === "repair");
  const entries = practicalEntries.filter((e) => /repair/i.test(e.track));

  return (
    <>
      <Seo
        title={`Technical Repair | ${site.shortName}`}
        description="Device repair training: smartphone diagnostics, component-level work and testing, with console repair planned."
        path="/repair"
      />
      <ProfileHero profile={profile} />
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Overview"
          title="Hands-on device repair"
          description="Practical repair training documented honestly as learning in progress — diagnostics, disassembly, component replacement and testing."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Smartphone repair", body: "Diagnostics, screens, batteries, boards and reassembly testing.", tag: "In training" },
            { title: "Component-level work", body: "Inspection, measurement and soldering practice on real hardware.", tag: "Learning" },
            { title: "Console repair", body: "Planned future learning track — not started yet.", tag: "Planned" },
          ].map((c) => (
            <div key={c.title} className="panel-glow hover:-translate-y-1">
              <Tag variant="primary">{c.tag}</Tag>
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tracks" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Training" title="Repair learning tracks" />
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

      <section id="work" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow="Repair log"
          title="Documented repairs & diagnostics"
          description="Each entry records the device, the fault, the diagnostic path and the result."
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
            title="Repair entries coming soon"
            description="Add an entry to the practice log data file and it appears here automatically."
          />
        )}
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow="Gallery"
            title="Repair photos"
            description="Before/after documentation of real repairs, components and workshop practice."
          />
          <Gallery
            items={galleryFor("repair")}
            emptyTitle="No repair photos published yet"
            emptyDescription="Add photos to the gallery data file — before/after pairs are supported out of the box."
          />
        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow="Tools" title="Equipment & tooling" />
        <ProfileTools groups={toolsByProfile.repair} />
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

export default TechnicalRepair;
