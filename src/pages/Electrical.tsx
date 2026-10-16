import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ElectricalAreaPanel from "@/components/electrical/ElectricalAreaPanel";
import { electricalDetailHashes } from "@/data/electricalNavigation";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/shared/Seo";
import SectionHeading from "@/components/shared/SectionHeading";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import ProfileCvBlock from "@/components/profile/ProfileCvBlock";
import { Button } from "@/components/ui/button";
import { profileBySlug } from "@/data/profiles";
import { site } from "@/data/site";

const profile = profileBySlug("electrical");

const Electrical = () => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const [area, setArea] = useState<string | null>(null);
  useEffect(() => {
    const id = hash.slice(1);
    if (["residential", "industrial", "electrical-control"].includes(id)) setArea(id);
    else if (electricalDetailHashes.has(id)) setArea(current => current ?? "residential");
  }, [hash]);

  return (
    <>
      <Seo
        title={t(`Residential & Industrial Electrical Maintenance | ${site.shortName}`)}
        description={t("Electrical maintenance training, float-switch course exercises and real residential client work: outlet, switch and ceiling luminaire replacement.")}
        path="/electrical"
      />
      <ProfileHero profile={profile}>
        <Button asChild>
          <a href="#projects">{t("View projects")}</a>
        </Button>
        <Button asChild variant="outline" className="bg-background/40 backdrop-blur-sm">
          <a href="#certificate">{t("Certifications")}</a>
        </Button>
        <div className="flex w-full flex-wrap gap-4 pt-2 text-sm">
          <Link to="/electronics" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Electronics profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/repair" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">{t("Technical repair profile ")}<ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ProfileHero>
      <ProfileSectionNav sections={profile.sections} contentKey={area} />
      <SpecialtyExplorer profile={profile.slug} activeId={area} onSelect={setArea} renderDetail={id => <ElectricalAreaPanel key={id} area={id} />} />

      <section id="cv" className="scroll-mt-32 border-t border-border bg-surface/40">
        <div className="container mx-auto px-4 py-10">
          <SectionHeading mascot={profile.slug} eyebrow={t("CV")} title={t("CV for this profile")}><ProfileCvBlock cvIds={profile.cvIds} /></SectionHeading>
        </div>
      </section>
    </>
  );
};

export default Electrical;
