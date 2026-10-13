import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import SkillOrbit from "@/components/profile/SkillOrbit";
import Tag from "@/components/shared/Tag";
import { site } from "@/data/site";
import { experienceSummary } from "@/data/experience";
import Reveal from "@/components/shared/Reveal";
import ContactPreview from "@/components/shared/ContactPreview";
import logoCulichi from "@/assets/culichi-logo-zorro.png";

const Home = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t(`${site.shortName} | IT, Cybersecurity & Software Development`)}
        description={t("Personal portfolio of Christian Velasco: cybersecurity, software development, electronics and technical training, backed by 5+ years of bilingual customer service.")}
        path="/"
      />

      {/* Hero */}
      <section className="grid-bg relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto grid gap-12 px-4 py-24 md:py-32 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="eyebrow animate-fade-in-up">{t(site.role)}</p>
            <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-bold leading-[1.1] md:text-6xl">
              {t(site.name.split(" ").slice(0, 2).join(" "))}{t(" ")}
              <span className="gradient-text">{t(site.name.split(" ").slice(2).join(" "))}</span>
            </h1>
            <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t(site.tagline)}
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="lift">
                <Link to="/cybersecurity">{t("Explore my work ")}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="lift">
                <Link to="/cv">
                  <Download className="h-4 w-4" />{t(" View CV")}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/contact">{t("Contact")}</Link>
              </Button>
            </div>

            <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <ContactPreview channel="Email" href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> {t(site.email)}
              </ContactPreview>
              <ContactPreview channel="GitHub" href={site.github} external className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Github className="h-4 w-4" /> {t(site.githubHandle)}
              </ContactPreview>
              <ContactPreview channel="LinkedIn" href={site.linkedin} external className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Linkedin className="h-4 w-4" /> {t(site.linkedinHandle)}
              </ContactPreview>
            </div>
          </div>

          {/* Personal brand logo */}
          <Reveal from="scale" delay={120} className="justify-self-center">
            <div className="animate-float-slow relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.22),transparent_70%)] blur-2xl"
              />
              <div className="animate-ring-pulse grid h-56 w-56 place-items-center overflow-hidden rounded-full border border-primary/30 bg-surface/60 backdrop-blur-md transition-transform duration-500 hover:scale-105 md:h-72 md:w-72">
                <img
                  src={logoCulichi}
                  alt={t("Culichi")}
                  width={288}
                  height={288}
                  className="h-44 w-44 object-contain md:h-56 md:w-56"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Professional profile */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow={t("Professional profile")}
          title={t("One profile, several technical fields")}
          description={t(site.intro)}
        />
        <SkillOrbit />
      </section>

      {/* Experience strength */}
      <section className="border-y border-border bg-surface/40">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal from="left">
            <p className="eyebrow">{t("Professional strength")}</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{t(experienceSummary.headline)}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{t(experienceSummary.statement)}</p>
            <Link to="/experience" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">{t("See how it transfers to tech")}{t(" ")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {experienceSummary.stats.map((s, i) => (
              <Reveal key={s.label} from="right" delay={i * 90}>
                <div className="panel lift text-center">
                  <p className="text-2xl font-bold text-primary">{t(s.value)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(s.label)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow={t("Current focus")}
          title={t("What I am working on right now")}
          description={t("An honest snapshot of my learning path — updated as I progress.")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Cybersecurity fundamentals", body: "Networking, Linux, hardening and SOC-oriented monitoring and detection practice.", tag: "In progress" },
            { title: "Software development", body: "Web development, APIs and automation, with everything version controlled on GitHub.", tag: "In progress" },
            { title: "Technical training", body: "Residential electrical maintenance, general electronics and smartphone repair.", tag: "Studying" },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <div className="panel-glow lift h-full">
                <Tag variant="accent">{t(c.tag)}</Tag>
                <h3 className="mt-3 text-base font-semibold">{t(c.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(c.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <Reveal from="scale">
          <div className="panel lift flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">{t("Open to IT, cybersecurity and development opportunities")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
            </div>
            <Button asChild size="lg" className="group">
              <Link to="/contact">{t("Get in touch ")}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
