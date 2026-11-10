import ProfileCapabilities from "@/components/profile/ProfileCapabilities";
import MascotScene from "@/components/shared/MascotScene";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Smartphone, Laptop, Gamepad2 } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import EmptyCollectionSection from "@/components/shared/EmptyCollectionSection";
import WorkImageGallery from "@/components/shared/WorkImageGallery";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileTools from "@/components/profile/ProfileTools";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import WorkGrid from "@/components/work/WorkGrid";
import RepairCaseCard from "@/components/repair/RepairCaseCard";
import CertificateCard from "@/components/repair/CertificateCard";
import SmartphoneRepairGroups from "@/components/repair/SmartphoneRepairGroups";
import { smartphoneRepairs } from "@/data/smartphoneRepair";
import { repairPhotos } from "@/data/repairPhotos";
import { worksFor } from "@/data/works";
import { repairDeviceTypes, repairsFor, type RepairDeviceType } from "@/data/repairs";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const profile = profileBySlug("repair");

const icons = { Smartphones: Smartphone, Laptops: Laptop, Consoles: Gamepad2 } as const;
const anchors: Record<RepairDeviceType, string> = {
  Smartphones: "smartphones",
  Laptops: "laptops",
  Consoles: "consoles",
};

const DeviceSection = ({ type }: { type: RepairDeviceType }) => {
  const { t } = useLanguage();
  const meta = repairDeviceTypes.find((d) => d.type === type)!;
  const Icon = icons[type];
  const cases = repairsFor(type);
  if (type !== "Smartphones" && !cases.length) return <EmptyCollectionSection id={anchors[type]} title={type} description={meta.description} status={<Tag variant="muted">{t(meta.status)}</Tag>} />;

  return (
    <section id={anchors[type]} className="container mx-auto scroll-mt-32 px-4 py-16">
      <div className="mb-8 flex items-start gap-4">
        <span className="glow-ring grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold md:text-3xl">{t(type)}</h2>
            <Tag variant="primary">{t(meta.status)}</Tag>
          </div>
          {type !== "Smartphones" && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(meta.description)}</p>}

        </div>
        {type === "Smartphones" && <MascotScene profile="repair" scene="action" className="w-24 sm:w-44" />}
      </div>

      {type === "Smartphones" && <SmartphoneRepairGroups />}

      {cases.length ? (
        <div className="space-y-6">
          {cases.map((r) => (
            <RepairCaseCard key={r.id} repair={r} />
          ))}
        </div>
      ) : type !== "Smartphones" || !smartphoneRepairs.length ? (
        <EmptyState
          title={t(`No ${type.toLowerCase()} cases published yet`)}
          description={t("Each published case documents before, diagnosis, repair and after with real photos.")}
        />
      ) : null}
    </section>
  );
};

const TechnicalRepair = () => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const [otherOpen, setOtherOpen] = useState(false);
  useEffect(() => { if (["#other-repairs", "#laptops", "#consoles", "#work"].includes(hash)) setOtherOpen(true); }, [hash]);
  return (
    <>
      <Seo
        title={t(`Technical Repair | ${site.shortName}`)}
        description={t("Device repair portfolio: smartphones, laptops and consoles documented as before, diagnosis, repair and after.")}
        path="/repair"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#smartphones">{t("View repairs")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#certifications">{t("Certifications")}</a>
        </Button>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />
      <section id="certifications" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading title={t("Smartphone repair training")} />
        <CertificateCard />
      </section>
      <div className="border-y border-border bg-surface/40">
        <DeviceSection type="Smartphones" />
      </div>
      <details id="other-repairs" data-other-repair-categories open={otherOpen} onToggle={event => setOtherOpen(event.currentTarget.open)} className="container mx-auto my-6 scroll-mt-40 rounded-xl border border-primary/25 px-4">
      <summary className="min-h-11 cursor-pointer py-4 font-semibold text-primary">{t("Other repair areas")}</summary>
      <DeviceSection type="Laptops" />
      <div className="border-y border-border bg-surface/40">
        <DeviceSection type="Consoles" />
      </div>

      {worksFor("repair").length ? <section id="work" className="container mx-auto scroll-mt-32 px-4 py-10"><SectionHeading title={t("Other repair projects")} /><WorkGrid items={worksFor("repair")} /></section> : <EmptyCollectionSection id="work" title="Other repair projects" description="Additional documented repairs will appear here." />}
      </details>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Gallery")}
            title={t("Workshop photos")}
            description={t("Original photographs of repairs, components and workshop practice.")}
          />
          <details className="rounded-xl border border-border p-4"><summary className="cursor-pointer py-2 font-semibold text-primary">{t("View workshop photo collection")} ({repairPhotos.length + galleryFor("repair").length})</summary><div className="mt-4"><WorkImageGallery title="Workshop photos" images={[...repairPhotos, ...galleryFor("repair")]} presentation /></div></details>

        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-10">
        <SectionHeading mascot={profile.slug} mascotScene="detail" eyebrow={t("Tools")} title={t("Equipment & tooling")}><ProfileTools groups={toolsByProfile.repair} profile={profile.slug} /></SectionHeading>
      </section>

      <SpecialtyExplorer profile={profile.slug} />
      <ProfileCapabilities profile={profile.slug} />
      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("Professional résumé")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
        </div>
      </section>
    </>
  );
};

export default TechnicalRepair;
