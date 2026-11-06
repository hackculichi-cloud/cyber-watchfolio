import HomeCharacter from "@/components/shared/HomeCharacter";
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
import { useState } from "react";

const Home = () => {
  const { t } = useLanguage();
  const [skillDetails, setSkillDetails] = useState(false);
  return (
    <>
      <Seo
        title={t(`${site.shortName} | IT, Cybersecurity & Software Development`)}
        description={t("Personal portfolio of Christian Velasco: cybersecurity, software development, electronics and technical training, backed by 7 years of bilingual customer service.")}
        path="/"
      />

      {/* Hero */}
      <section className="home-hero grid-bg relative isolate overflow-clip border-b border-border">
        <img data-home-background src={homeBackground} alt="" aria-hidden width={1536} height={1024} fetchPriority="high" className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-30" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-background/70 md:bg-transparent md:bg-[linear-gradient(90deg,hsl(var(--background)/0.94)_0%,hsl(var(--background)/0.78)_40%,hsl(var(--background)/0.45)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(0deg,hsl(var(--background)),transparent_40%)]" />
        <div data-home-introduction className="container relative mx-auto grid gap-8 px-4 py-10 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-10">
          <div data-home-intro-copy className="min-w-0 max-w-3xl">
            <p className="eyebrow animate-fade-in-up">{t(site.role)}</p>
            <h1 className="animate-fade-in-up delay-100 mt-4 text-4xl font-bold leading-[1.1] md:text-6xl">
              {t(site.name.split(" ").slice(0, 2).join(" "))}{t(" ")}
              <span className="gradient-text">{t(site.name.split(" ").slice(2).join(" "))}</span>
            </h1>
            <p className="reading-copy animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
              {t(site.tagline)}
            </p>

            <div data-home-actions className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
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

            <div data-home-email className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <ContactPreview channel="Email" href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> {t(site.email)}
              </ContactPreview>
            </div>
          </div>
          <div data-home-mascot-zone className="min-w-0 lg:justify-self-end lg:w-full">
            <InteractiveMascot className="mx-auto lg:ml-auto lg:mr-0" />
          </div>
        </div>
      </section>


      {/* Professional profile */}
      <section id="areas" className="relative container mx-auto scroll-mt-28 px-4 py-16">
        <div className="relative mb-8 flex items-center gap-4 pl-20 sm:pl-28 lg:gap-6">
          <div className="min-w-0 flex-1 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:lg:text-4xl"><SectionHeading eyebrow="Christian Velasco · aka Culichi" title={t("These are my skills")} description={t("Practical work, study and experience across my areas. Choose what you need and see the examples behind each skill.")} /></div>
          <HomeCharacter profile="cybersecurity" scene="hanging" className="absolute left-0 top-0 -mt-8 w-20 border-t border-primary/30 sm:w-24" />
        </div>
        <button type="button" aria-expanded={skillDetails} aria-controls="home-skills-grid" onClick={() => setSkillDetails(value => !value)} className="mb-4 inline-flex min-h-11 items-center rounded-lg border border-primary/30 bg-primary/10 px-3 text-sm font-medium text-primary md:hidden">{t(skillDetails ? "Compact view" : "Show skill details")}</button>
        <div id="home-skills-grid" data-mobile-skill-details={skillDetails} className={`grid gap-3 sm:gap-5 ${skillDetails ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"} lg:grid-cols-3`}>
          {professionalProfiles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <ProfileCard data={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Current focus */}
      <section data-home-focus className="relative container mx-auto px-4 py-14">
        <div className="relative mb-10 border-t border-primary/25 pl-24 pt-8 sm:pl-32">
          <div className="min-w-0 flex-1"><SectionHeading eyebrow={t("Current focus")} title={t("What I am working on right now")} description={t("An honest snapshot of my learning path — updated as I progress.")} /></div>
          <HomeCharacter profile="electrical" scene="action" className="absolute left-0 top-0 -mt-6 w-24 sm:w-28" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Cybersecurity fundamentals", body: "Networking, Linux, hardening and SOC-oriented monitoring and detection practice.", tag: "In progress" },
            { title: "Software development", body: "Web development, APIs and automation, with everything version controlled on GitHub.", tag: "In progress" },
            { title: "Technical training", body: "Residential electrical maintenance, general electronics and smartphone repair.", tag: "Studying" },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className={`relative isolate h-full ${i === 2 ? "pt-20 md:pt-0" : ""}`}>
              {i === 2 && <HomeCharacter profile="electronics" scene="electronics-back" className="absolute right-1 top-0 z-0 w-28 md:-top-20 sm:w-32" />}
              <div className="panel-glow lift relative z-10 h-full bg-background">
                <Tag variant="accent">{t(c.tag)}</Tag>
                <h3 className="mt-3 text-base font-semibold">{t(c.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(c.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-home-cta className="container mx-auto px-4 pb-24">
        <Reveal from="scale" className="relative isolate">
          <HomeCharacter profile="repair" scene="repair-peeking" className="absolute right-0 top-6 z-0 w-32 sm:w-36" />
          <div className="relative z-10 mr-16 rounded-xl border border-primary/25 bg-background p-5 sm:mr-24 sm:p-8">
            <h2 className="text-xl font-semibold">{t("Open to IT, cybersecurity and development opportunities")}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("Available for junior roles, internships and collaborative technical projects.")}</p>
            <Button asChild size="lg" className="group mt-6"><Link to="/contact">{t("Get in touch ")}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
