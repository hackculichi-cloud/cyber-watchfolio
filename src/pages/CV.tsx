import CulichiBody from "@/components/shared/CulichiBody";
import type { ProfileSlug } from "@/data/profiles";
import background from "@/assets/culichi-home-background.webp";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FileText } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import { cvVariants } from "@/data/cvs";
import { site } from "@/data/site";
import CvActions from "@/components/shared/CvActions";

const CV = () => {
  const { t } = useLanguage();
  const profiles: Record<string, ProfileSlug> = { cybersecurity: "cybersecurity", software: "development", electrical: "electrical", electronics: "electronics", repair: "repair", "customer-service": "customer-service" };
  const colors: Record<string, string> = { cybersecurity: "#0891b2", software: "#15803d", electrical: "#ca8a04", electronics: "#c2410c", repair: "#7c3aed", "customer-service": "#0f766e" };
  return (
    <>
      <Seo
        title={t(`CV | ${site.shortName}`)}
        description={t("Download Christian Velasco's CV — general, cybersecurity, software development and technical versions.")}
        path="/cv"
      />
      <div className="relative isolate overflow-hidden">
      <img src={background} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover object-right opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <PageHeader
        eyebrow={t("CV")}
        title={t("Curriculum Vitae")}
        description={t("Role-specific versions of my CV so recruiters can read the profile that matches their opening.")}
      />

      </div>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {cvVariants.map((cv) => (
            <article key={cv.id} className="panel-glow relative isolate flex h-full flex-col overflow-hidden hover:-translate-y-1" data-cv-theme={cv.id} style={{ borderTopColor: colors[cv.id], borderTopWidth: 3, backgroundImage: `radial-gradient(ellipse at top right,${colors[cv.id]}28,transparent 75%),linear-gradient(135deg,#101827,#0b1120)` }}>
              <div className="pointer-events-none absolute right-2 top-4 -z-10 opacity-25"><CulichiBody profile={profiles[cv.id]} className="w-24 sm:w-28" /></div>
              <FileText className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="mt-3 max-w-[80%] text-base font-semibold">{t(cv.title)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(cv.description)}</p>

              <div className="mt-5">
                <CvActions cv={cv} />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">{t("Need a specific version now? Email")}{t(" ")}
          <a href={`mailto:${site.email}`} className="text-primary hover:underline">
            {t(site.email)}
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default CV;
