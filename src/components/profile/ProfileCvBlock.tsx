import { FileText } from "lucide-react";
import Tag from "@/components/shared/Tag";
import { cvAssets, cvVariants } from "@/data/cvs";
import CvActions from "@/components/shared/CvActions";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Profile-scoped CV block: shows the most relevant CV variants for this profile. */
const ProfileCvBlock = ({ cvIds }: { cvIds: string[] }) => {
  const variants = cvVariants.filter((cv) => cvIds.includes(cv.id));
  const { t, lang } = useLanguage();

  return (
    <div data-profile-cv className="grid gap-4">
      {variants.map((cv) => (
        <div key={cv.id} className="panel-glow flow-root">
          {cvAssets(cv, lang).preview && <figure className="float-right mb-3 ml-4 w-16 sm:float-left sm:mb-0 sm:ml-0 sm:mr-5 sm:w-24">
            <img src={cvAssets(cv, lang).preview} alt={`${t("First page of the downloadable CV")}: ${t(cv.title)}`} loading="lazy" decoding="async" width={794} height={1123} className="h-auto w-full rounded border border-primary/25 bg-white shadow-lg" />
            <figcaption className="mt-2 text-center text-[10px] font-medium text-muted-foreground">PDF · {lang.toUpperCase()}</figcaption>
          </figure>}
          <div className="min-w-0">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
            <h3 className="text-sm font-semibold sm:text-base">
              <FileText className="mr-1 inline h-4 w-4 text-primary" aria-hidden /> {t(cv.title)}
            </h3>
            <Tag className="hidden sm:inline-flex" variant={cv.available ? "primary" : "muted"}>{t(cv.available ? "Available" : "Coming soon")}</Tag>
          </div>
          <p className="reading-copy mt-2 text-sm leading-relaxed text-muted-foreground">{t(cv.description)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CvActions cv={cv} />
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCvBlock;
