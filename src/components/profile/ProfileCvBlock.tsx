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
        <div key={cv.id} className="cv-profile-card grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 rounded-2xl border border-primary/30 bg-card/85 p-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6 sm:p-5">
          {cvAssets(cv, lang).preview && <figure className="min-w-0 pt-1 sm:row-span-3">
            <img src={cvAssets(cv, lang).preview} alt={`${t("First page of the downloadable CV")}: ${t(cv.title)}`} loading="lazy" decoding="async" width={794} height={1123} className="h-auto w-full -rotate-2 rounded border border-primary/40 bg-white shadow-lg" />
            <figcaption className="mt-3 text-center text-xs font-semibold tracking-wide text-primary">PDF · {lang.toUpperCase()}</figcaption>
          </figure>}
          <div className="min-w-0 sm:col-start-2">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
              <h3 className="text-[15px] font-bold leading-snug tracking-tight sm:text-lg">
                {t(cv.title)}
              </h3>
              <Tag className="hidden sm:inline-flex" variant={cv.available ? "primary" : "muted"}>{t(cv.available ? "Available" : "Coming soon")}</Tag>
            </div>
          </div>
          <p className="reading-copy col-span-2 line-clamp-3 text-sm leading-6 text-foreground/75 sm:col-span-1 sm:col-start-2">{t(cv.description)}</p>
          <div className="col-span-2 mt-1 flex flex-wrap gap-2 sm:col-span-1 sm:col-start-2 [&>div]:w-full sm:[&>div]:w-auto [&_a]:min-h-11 [&_a]:flex-1 [&_button]:min-h-11 [&_button]:flex-1 sm:[&_a]:flex-none sm:[&_button]:flex-none">
            <CvActions cv={cv} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCvBlock;
