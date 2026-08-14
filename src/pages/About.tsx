import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import { site } from "@/data/site";
import { cybersecuritySkills, softwareSkills, transferableSkills } from "@/data/skills";
import { trainingTracks } from "@/data/electrical";

const About = () => (
  <>
    <Seo
      title={`About | ${site.shortName}`}
      description="Christian Velasco: professional story, technical training path and multidisciplinary skills across cybersecurity, software development and electronics."
      path="/about"
    />
    <PageHeader
      eyebrow="About"
      title="A technology career built on curiosity and hands-on practice"
      description={site.intro}
    />

    <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          My professional direction is clear: information technology, cybersecurity and software development. I focus on
          fundamentals first — networking, Linux, system hardening and secure practices — and then apply them in labs and
          personal projects that I document publicly.
        </p>
        <p>
          Alongside that path I am completing complementary technical training in residential electrical maintenance,
          general electronics and smartphone repair. These fields sharpen the same underlying ability: diagnosing a
          system methodically, isolating the fault and repairing it without guesswork.
        </p>
        <p>
          Before technology became my focus, I spent more than five years in bilingual customer service. That experience
          shaped how I work today — communicating clearly under pressure, supporting people who are frustrated, and
          translating technical detail into language anyone can act on.
        </p>
        <p>
          I am currently building experience and looking for opportunities where I can contribute, keep learning and grow
          into a security and development professional.
        </p>
      </div>

      <aside className="space-y-4">
        <div className="panel">
          <p className="eyebrow">Focus</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>IT & Cybersecurity</li>
            <li>Software Development</li>
            <li>Electrical & Electronics (training)</li>
            <li>Technical repair (training)</li>
          </ul>
        </div>
        <div className="panel">
          <p className="eyebrow">Languages</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {site.languages.map((l) => (
              <Tag key={l} variant="primary">{l}</Tag>
            ))}
          </div>
        </div>
      </aside>
    </section>

    <section className="border-t border-border bg-surface/40">
      <div className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="Skills" title="Technical and transferable skills" />
        <div className="grid gap-4 md:grid-cols-3">
          {[...cybersecuritySkills, ...softwareSkills].map((group) => (
            <div key={group.title} className="panel-glow hover:-translate-y-1">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="panel mt-4">
          <h3 className="text-sm font-semibold">Transferable skills</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {transferableSkills.map((s) => (
              <Tag key={s} variant="accent">{s}</Tag>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Training"
        title="Learning tracks in progress"
        description="Everything listed here reflects training I am actively doing or have planned — no completed claims until they are earned."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {trainingTracks.map((t) => (
          <div key={t.id} className="panel-glow hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold">{t.title}</h3>
              <Tag variant={t.status === "Planned" ? "muted" : "accent"}>{t.status}</Tag>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
          </div>
        ))}
      </div>

      <Link to="/experience" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        See professional experience <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </section>
  </>
);

export default About;
