import HomeCharacter from "@/components/shared/HomeCharacter";
import CulichiOrigins from "@/components/shared/CulichiOrigins";
import homeBackground from "@/assets/culichi-home-background.webp";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileCard from "@/components/cards/ProfileCard";
import Tag from "@/components/shared/Tag";
import { professionalProfiles } from "@/data/profiles";
import { site } from "@/data/site";
import Reveal from "@/components/shared/Reveal";
import ContactPreview from "@/components/shared/ContactPreview";
import InteractiveMascot from "@/components/shared/InteractiveMascot";

const Home = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t(`${site.shortName} | IT, Cybersecurity & Software Development`)}
        description={t("Personal portfolio of Christian Velasco: cybersecurity, software development, electronics and technical training, backed by 7 years of bilingual customer service.")}
        path="/"
      />

      {/* Hero */}
      <section className="grid-bg relative isolate overflow-clip border-b border-border">
        <img data-home-background src={homeBackground} alt="" aria-hidden width={1536} height={1024} fetchPriority="high" className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full object-cover object-center opacity-30 md:block" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-background/70 md:bg-transparent md:bg-[linear-gradient(90deg,hsl(var(--background)/0.94)_0%,hsl(var(--background)/0.78)_40%,hsl(var(--background)/0.45)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(0deg,hsl(var(--background)),transparent_40%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div data-home-introduction className="container relative mx-auto grid gap-8 px-4 py-10 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
          <div data-home-intro-copy className="min-w-0 max-w-3xl">
            <p className="eyebrow animate-fade-in-up">{t(site.role)}</p>
            <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-bold leading-[1.1] md:text-6xl">
              {t(site.name.split(" ").slice(0, 2).join(" "))}{t(" ")}
              <span className="gradient-text">{t(site.name.split(" ").slice(2).join(" "))}</span>
            </h1>
            <p className="reading-copy animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
              {t(site.tagline)}
            </p>

            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="lift">
                <Link to="/#areas">{t("Choose an area")}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
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
            </div>
          </div>
          <div data-home-mascot-zone className="min-w-0 lg:justify-self-end lg:w-full">
            <InteractiveMascot className="mx-auto lg:ml-auto lg:mr-0" />
            <CulichiOrigins />
          </div>
        </div>
        {/* On phones the group artwork has its own space, never behind the selector. */}
        <div data-home-mobile-art className="relative mx-auto max-w-xl md:hidden">
          <img src={homeBackground} alt="" aria-hidden width={1536} height={1024} className="block h-auto w-full" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent" />
        </div>
      </section>


      {/* Professional profile */}
      <section id="areas" className="container mx-auto scroll-mt-28 px-4 py-16">
        <div className="mb-8 flex items-center gap-4 lg:gap-6">
          <div className="min-w-0 flex-1 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:lg:text-4xl"><SectionHeading eyebrow="Christian Velasco · aka Culichi" title={t("These are my skills")} description={t("Practical work, study and experience in six areas. Choose what you need and see the examples behind each skill.")} /></div>
          <HomeCharacter profile="cybersecurity" scene="hanging" className="w-24 border-t border-primary/30 sm:w-32 lg:-mb-10 lg:-mt-16 lg:w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professionalProfiles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <ProfileCard data={p} />
            </Reveal>
          ))}
        </div>
        <div className="relative mt-8 flex flex-col items-start gap-3 border-b border-primary/30 pb-4 sm:flex-row sm:items-end sm:gap-8" data-home-workbench>
          <HomeCharacter profile="development" scene="practice" className="-mb-6 self-start" />
          <div className="relative z-10 max-w-xl py-4 sm:pb-8">
            <p className="eyebrow">{t("Built through practice")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("This portfolio is one of my software projects: React, TypeScript and a documented workflow, improved one change at a time.")}</p>
            <Link to="/software-development" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{t("Explore software development")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-col items-center gap-6 lg:flex-row">
          <div className="min-w-0 flex-1"><SectionHeading eyebrow={t("Current focus")} title={t("What I am working on right now")} description={t("An honest snapshot of my learning path — updated as I progress.")} /></div>
          <HomeCharacter profile="electrical" scene="action" className="-mb-12 self-start lg:order-first" />
        </div>
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
                {i === 2 && <HomeCharacter profile="electronics" scene="practice" className="-mb-7 ml-auto mt-3 w-40 sm:w-44" />}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <Reveal from="scale">
          <div className="flex flex-col items-start justify-between gap-8 border-t border-border/60 pt-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-semibold">{t("Open to IT, cybersecurity and development opportunities")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
              <Button asChild size="lg" className="group mt-6"><Link to="/contact">{t("Get in touch ")}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link></Button>
            </div>
            <HomeCharacter profile="repair" scene="practice" className="-mb-5 self-end" />
          </div>
        </Reveal>
        <div className="relative mt-14 flex flex-col items-start gap-2 border-t border-primary/25 pt-5 sm:flex-row sm:items-center sm:justify-between" data-home-service>
          <HomeCharacter profile="customer-service" scene="closing" className="-mt-8 self-start sm:order-last" />
          <div className="max-w-2xl">
            <p className="eyebrow">{t("People behind technology")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("Operations supervision, Tier 2 support and technical training connect my customer-service background with the way I investigate problems and explain solutions.")}</p>
            <Link to="/experience#background" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{t("Explore my professional experience")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
