import { certifications } from "@/data/certifications";
import type { ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import EmptyCollectionSection from "@/components/shared/EmptyCollectionSection";
import SectionHeading from "@/components/shared/SectionHeading";
import type { ReactNode } from "react";
import MascotScene from "@/components/shared/MascotScene";
import RelatedTraining from "./RelatedTraining";
import ProfileCertificateCard from "./ProfileCertificateCard";

/** Primary documents and supporting certificates share the same visual cards. */
const ProfileCertificates = ({ profile, courseContent, featuredId }: { profile: ProfileSlug; courseContent?: Record<string, ReactNode>; featuredId?: string }) => {
  const { t } = useLanguage();
  const visual = !!courseContent;
  const records = [...(certifications[profile] ?? [])].sort((a, b) => visual ? Number(!!b.image) - Number(!!a.image) : 0);
  if (!records.length) return <EmptyCollectionSection id={profile === "electrical" ? "certificate" : "certifications"} data-certifications={profile} title="Certifications" description="No certificates provided for this area yet." />;
  return <section id={profile === "electrical" ? "certificate" : "certifications"} className="container mx-auto scroll-mt-32 px-4 py-16" data-certifications={profile}>
    <SectionHeading eyebrow={t("Certifications")} title={t("Diplomas and certificates")} />
    <div className={`image-led-certificate-grid grid items-start gap-6 md:grid-cols-2 ${visual ? "mt-10" : ""}`}>{records.map((record, index) => <ProfileCertificateCard key={record.id} record={record} visual={visual} allowPlaceholder={visual} trainingRole={featuredId ? record.id === featuredId ? "main" : "complementary" : undefined} course={courseContent?.[record.id]} decoration={visual && record.image && index === 0 && profile === "electrical" ? <MascotScene profile="electrical" scene="action" className="pointer-events-none absolute -top-12 right-3 z-10 w-20 sm:-top-16 sm:w-24" /> : undefined} />)}</div>
    <RelatedTraining profile={profile} />
  </section>;
};
export default ProfileCertificates;
