import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import ProfileCertificates from "@/components/profile/ProfileCertificates";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight, CircuitBoard, Camera } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Gallery from "@/components/shared/Gallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import WorkGrid from "@/components/work/WorkGrid";
import { worksFor } from "@/data/works";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

const profile = profileBySlug("electronics");

const Electronics = () => {
  const { t } = useLanguage();
  const works = worksFor("electronics");
  const photos = galleryFor("electronics");

  return (
    <>
      <Seo
        title={t(`Electronics | ${site.shortName}`)}
        description={t("General electronics training: components, circuits, PCB work, soldering practice and instrument-based diagnostics.")}
        path="/electronics"
      />
      <ProfileHero profile={profile}>
        <Button asChild><a href="#specialties">{t("Explore my training")}</a></Button>
        <Button asChild variant="outline"><a href="#overview">{t("What I am learning")}</a></Button>
        {works.length > 0 && <Button asChild variant="outline"><a href="#projects">{t("View projects")}</a></Button>}
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electrical" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Electrical profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Technical repair profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <SpecialtyExplorer profile={profile.slug} />

      <ProfileCapabilities profile={profile.slug} />

      {works.length ? <section id="projects" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading
          eyebrow={t("Projects")}
          title={t("Electronics projects")}
          description={t("Image-first documentation of circuits, PCB work, soldering practice and measurements.")}
        />
        <WorkGrid
          items={works}
          emptyTitle={t("Real photographs pending")}
          emptyDescription={t("These slots are reserved for my own photos of PCBs, circuits, components, soldering work and measurements.")}
        />
      </section> : <section id="projects" data-compact-pending="projects" className="container mx-auto scroll-mt-32 px-4">
        <div className="electronics-pending-row"><CircuitBoard aria-hidden="true" /><div><h2 className="text-base font-semibold">{t("Electronics projects")}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("I will add my documented circuit and soldering practice here as I complete it.")}</p></div></div>
      </section>}

      <section id="diagnostics" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-8">
          <SectionHeading
            eyebrow={t("Diagnostics & measurements")}
            title={t("How I troubleshoot")}
            description={t("The diagnostic method I am learning: observe, measure, isolate, repair and verify.")}
          />
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {["Observe", "Measure", "Isolate", "Repair", "Verify"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-lg border border-border bg-surface-2/40 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {t(String(i + 1).padStart(2, "0"))}
                </p>
                <p className="text-sm font-medium">{t(s)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {photos.length ? <section id="gallery" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading
          eyebrow={t("Gallery")}
          title={t("PCBs, components & soldering")}
          description={t("Real photos of boards, components, soldering work, measurements and practical exercises.")}
        />
        <Gallery
          items={photos}
          emptyTitle={t("No photos published yet")}
          emptyDescription={t("Add photos to the gallery data file — they appear here automatically with filters and a lightbox.")}
        />
      </section> : <section id="gallery" data-compact-pending="gallery" className="container mx-auto scroll-mt-32 px-4">
        <div className="electronics-pending-row"><Camera aria-hidden="true" /><div><h2 className="text-base font-semibold">{t("PCBs, components & soldering")}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("My original laboratory photos will appear here when available.")}</p></div></div>
      </section>}

      <section id="tools" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} mascotScene="detail" eyebrow={t("Tools")} title={t("Instruments & tooling")}><ProfileTools groups={toolsByProfile.electronics} profile={profile.slug} /></SectionHeading>
        </div>
      </section>

      <ProfileCertificates profile={profile.slug} />
      <section id="cv" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
      </section>
    </>
  );
};

export default Electronics;
