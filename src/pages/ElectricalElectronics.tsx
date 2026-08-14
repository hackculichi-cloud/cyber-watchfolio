import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import { practicalEntries, trainingTracks } from "@/data/electrical";
import { site } from "@/data/site";

const ElectricalElectronics = () => (
  <>
    <Seo
      title={`Electrical & Electronics | ${site.shortName}`}
      description="Complementary technical training in residential electrical maintenance, general electronics and smartphone repair."
      path="/electrical-electronics"
    />
    <PageHeader
      eyebrow="Technical training"
      title="Electrical & Electronics"
      description="Complementary technical training presented honestly as learning in progress — not as professional experience."
    />

    <section className="container mx-auto px-4 py-16">
      <SectionHeading eyebrow="Tracks" title="Current learning tracks" />
      <div className="grid gap-4 md:grid-cols-2">
        {trainingTracks.map((track) => (
          <article key={track.id} id={track.anchor} className="panel-glow scroll-mt-24 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold">{track.title}</h3>
              <Tag variant={track.status === "Planned" ? "muted" : "accent"}>{track.status}</Tag>
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
    </section>

    <section className="border-t border-border bg-surface/40">
      <div className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="Practice log"
          title="Practical exercises & diagnostics"
          description="Documented practice: what the exercise was, which skills it built and what the result was."
        />
        {practicalEntries.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {practicalEntries.map((entry) => (
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
  </>
);

export default ElectricalElectronics;
