import { useLanguage } from "@/i18n/LanguageProvider";
import { Smartphone, Laptop, Gamepad2 } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
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
import { repairCases, repairDeviceTypes, repairsFor, type RepairDeviceType } from "@/data/repairs";
import { profileBySlug } from "@/data/profiles";
import { galleryFor } from "@/data/gallery";
import { toolsByProfile } from "@/data/tools";
import { site } from "@/data/site";

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

  return (
    <section id={anchors[type]} className="container mx-auto scroll-mt-32 px-4 py-16">
      <div className="mb-8 flex items-start gap-4">
        <span className="glow-ring grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold md:text-3xl">{t(type)}</h2>
            <Tag variant="primary">{t(meta.status)}</Tag>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t(meta.description)}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {meta.scope.map((s) => (
              <Tag key={s}>{t(s)}</Tag>
            ))}
          </div>
        </div>
      </div>

      {type === "Smartphones" && (
        <div className="mb-8 space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-semibold">{t("Smartphone repair training")}</h3>
            <CertificateCard />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t("Repairs by brand and type")}</h3>
            <SmartphoneRepairGroups />
          </div>
        </div>
      )}

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
  return (
    <>
      <Seo
        title={t(`Technical Repair | ${site.shortName}`)}
        description={t("Device repair portfolio: smartphones, laptops and consoles documented as before, diagnosis, repair and after.")}
        path="/repair"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#work">{t("Repair log")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#smartphones">{t("Smartphone repairs")}</a>
        </Button>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} />

      <section id="overview" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Overview")}
          title={t("A documented repair workshop")}
          description={t("Every repair follows the same visual structure so the process — not just the result — is visible.")}
        />
        <ol className="grid gap-3 md:grid-cols-4">
          {[
            { label: "Before", body: "Device received, reported problem and initial state." },
            { label: "Diagnosis", body: "Tests, measurements and the confirmed fault." },
            { label: "Repair", body: "Step-by-step work performed, tools and components." },
            { label: "After", body: "Verification, final result and notes." },
          ].map((s, i) => (
            <li key={s.label} className="glass-panel p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                {t(String(i + 1).padStart(2, "0"))} · {t(s.label)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(s.body)}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="border-y border-border bg-surface/40">
        <DeviceSection type="Smartphones" />
      </div>
      <DeviceSection type="Laptops" />
      <div className="border-y border-border bg-surface/40">
        <DeviceSection type="Consoles" />
      </div>

      <section id="work" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading
          eyebrow={t("Repair log")}
          title={t("Repair projects")}
          description={t("Image-first repair projects with device, work performed, tools, components and results.")}
        />
        <WorkGrid
          items={worksFor("repair")}
          placeholderSlots={6}
          emptyTitle={t("Real repair photos pending")}
          emptyDescription={t(`These slots are reserved for documented repairs${repairCases.length ? "" : " — before, during and after photos of my own work"}.`)}
        />
      </section>

      <section id="gallery" className="scroll-mt-32 border-y border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading
            eyebrow={t("Gallery")}
            title={t("Workshop photos")}
            description={t("Before/after documentation of real repairs, components and workshop practice.")}
          />
          <p className="mb-6 text-sm text-muted-foreground">{t("Photos are organized inside each repair case. This optional gallery contains all 18 photos, including connector close-ups not assigned to a specific device.")}</p>
          <WorkImageGallery title="Workshop photos" images={[...repairPhotos, ...galleryFor("repair")]} compact collapsible />

        </div>
      </section>

      <section id="tools" className="container mx-auto scroll-mt-32 px-4 py-16">
        <SectionHeading eyebrow={t("Tools")} title={t("Equipment & tooling")} />
        <ProfileTools groups={toolsByProfile.repair} />
      </section>

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-16">
          <SectionHeading eyebrow={t("CV")} title={t("CV for this profile")} />
          <ProfileCvBlock cvIds={profile.cvIds} />
        </div>
      </section>
    </>
  );
};

export default TechnicalRepair;
