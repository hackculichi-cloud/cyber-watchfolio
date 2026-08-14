import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import { experienceEntries, experienceSummary, transferableImpact } from "@/data/experience";
import { transferableSkills } from "@/data/skills";
import { site } from "@/data/site";

const Experience = () => (
  <>
    <Seo
      title={`Experience | ${site.shortName}`}
      description="5+ years of bilingual customer service experience and how those skills transfer into IT, cybersecurity and software development."
      path="/experience"
    />
    <PageHeader eyebrow="Experience" title={experienceSummary.headline} description={experienceSummary.statement}>
      <div className="grid max-w-lg grid-cols-3 gap-3">
        {experienceSummary.stats.map((s) => (
          <div key={s.label} className="panel text-center">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </PageHeader>

    <section className="container mx-auto px-4 py-16">
      <SectionHeading eyebrow="Transferable value" title="How customer service strengthens my technical work" />
      <div className="grid gap-4 md:grid-cols-3">
        {transferableImpact.map((item) => (
          <div key={item.area} className="panel-glow hover:-translate-y-1">
            <h3 className="text-sm font-semibold text-primary">{item.area}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-4">
        <h3 className="text-sm font-semibold">Core professional skills</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {transferableSkills.map((s) => (
            <Tag key={s} variant="accent">{s}</Tag>
          ))}
        </div>
      </div>
    </section>

    {experienceEntries.length > 0 && (
      <section className="border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow="Timeline" title="Roles" />
          <div className="space-y-4">
            {experienceEntries.map((entry) => (
              <article key={entry.id} className="panel-glow">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{entry.title}</h3>
                  {entry.period && <span className="text-xs text-muted-foreground">{entry.period}</span>}
                </div>
                {entry.organization && <p className="text-sm text-primary">{entry.organization}</p>}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {entry.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    )}
  </>
);

export default Experience;
