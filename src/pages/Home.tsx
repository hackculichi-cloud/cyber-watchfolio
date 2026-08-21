import { Link } from "react-router-dom";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileCard from "@/components/cards/ProfileCard";
import Tag from "@/components/shared/Tag";
import { professionalProfiles } from "@/data/profiles";
import { site } from "@/data/site";
import { experienceSummary } from "@/data/experience";
import Reveal from "@/components/shared/Reveal";
import logoCv from "@/assets/logo-cv.png";

const Home = () => (
  <>
    <Seo
      title={`${site.shortName} | IT, Cybersecurity & Software Development`}
      description="Personal portfolio of Christian Velasco: cybersecurity, software development, electronics and technical training, backed by 5+ years of bilingual customer service."
      path="/"
    />

    {/* Hero */}
    <section className="grid-bg relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative mx-auto grid gap-12 px-4 py-24 md:py-32 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-in-up">{site.role}</p>
          <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-bold leading-[1.1] md:text-6xl">
            {site.name.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="gradient-text">{site.name.split(" ").slice(2).join(" ")}</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>

          <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="lift">
              <Link to="/cybersecurity">
                Explore my work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="lift">
              <Link to="/cv">
                <Download className="h-4 w-4" /> View CV
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <Github className="h-4 w-4" /> {site.githubHandle}
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <Linkedin className="h-4 w-4" /> {site.linkedinHandle}
            </a>
          </div>
        </div>

        {/* Brand / portrait slot — replace logo-cv.png with a real photo when available */}
        <Reveal from="scale" delay={120} className="justify-self-center">
          <div className="animate-float-slow relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.22),transparent_70%)] blur-2xl"
            />
            <div className="animate-ring-pulse grid h-56 w-56 place-items-center overflow-hidden rounded-full border border-primary/30 bg-surface/60 backdrop-blur-md transition-transform duration-500 hover:scale-105 md:h-72 md:w-72">
              <img
                src={logoCv}
                alt="Logotipo personal CV de Christian Armando Velasco Estrada"
                width={288}
                height={288}
                className="h-32 w-32 object-contain md:h-40 md:w-40"
              />
            </div>
            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Personal brand · photo slot
            </p>
          </div>
        </Reveal>
      </div>
    </section>


    {/* Professional profile */}
    <section className="container mx-auto px-4 py-20">
      <SectionHeading
        eyebrow="Professional profile"
        title="One profile, several technical fields"
        description={site.intro}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {professionalProfiles.map((p, i) => (
          <Reveal key={p.title} delay={i * 90} className="h-full">
            <ProfileCard data={p} />
          </Reveal>
        ))}
      </div>
    </section>

    {/* Experience strength */}
    <section className="border-y border-border bg-surface/40">
      <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">Professional strength</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{experienceSummary.headline}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{experienceSummary.statement}</p>
          <Link to="/experience" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            See how it transfers to tech <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {experienceSummary.stats.map((s) => (
            <div key={s.label} className="panel text-center">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Current focus */}
    <section className="container mx-auto px-4 py-20">
      <SectionHeading
        eyebrow="Current focus"
        title="What I am working on right now"
        description="An honest snapshot of my learning path — updated as I progress."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Cybersecurity fundamentals", body: "Networking, Linux, hardening and SOC-oriented monitoring and detection practice.", tag: "In progress" },
          { title: "Software development", body: "Web development, APIs and automation, with everything version controlled on GitHub.", tag: "In progress" },
          { title: "Technical training", body: "Residential electrical maintenance, general electronics and smartphone repair.", tag: "Studying" },
        ].map((c) => (
          <div key={c.title} className="panel-glow hover:-translate-y-1">
            <Tag variant="accent">{c.tag}</Tag>
            <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4 pb-24">
      <div className="panel flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Open to IT, cybersecurity and development opportunities</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Available for junior roles, internships and collaborative technical projects.
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/contact">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  </>
);

export default Home;
