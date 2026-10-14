import homeBackground from "@/assets/culichi-home-background.webp";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileCard from "@/components/cards/ProfileCard";
import Tag from "@/components/shared/Tag";
import { professionalProfiles } from "@/data/profiles";
import { site } from "@/data/site";
import Reveal from "@/components/shared/Reveal";
import ContactPreview from "@/components/shared/ContactPreview";
import CulichiBody from "@/components/shared/CulichiBody";

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
      <section className="grid-bg relative isolate overflow-hidden border-b border-border">
        <img data-home-background src={homeBackground} alt="" aria-hidden width={1536} height={1024} fetchPriority="high" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-contain object-bottom opacity-90 md:object-cover md:object-right" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-background/70 md:bg-transparent md:bg-[linear-gradient(90deg,hsl(var(--background)/0.98)_0%,hsl(var(--background)/0.88)_42%,hsl(var(--background)/0.32)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(0deg,hsl(var(--background)),transparent_40%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto grid gap-12 px-4 py-20 md:py-24 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
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
            <div className="mt-5 flex items-center gap-2" data-home-mascot-zone>
              <CulichiBody profile="home" interactive className="w-28 sm:w-32" />
              <span className="text-xs text-primary">{t("Greet Culichi")}</span>
            </div>
          </div>

        </div>
      </section>


      {/* Professional profile */}
      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow={t("Professional profile")}
          title={t("Skills and professional areas")}
          description={t(site.intro)}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professionalProfiles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <ProfileCard data={p} />
            </Reveal>
          ))}
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
