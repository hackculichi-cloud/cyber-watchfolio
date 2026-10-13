import { useLanguage } from "@/i18n/LanguageProvider";
import { Download, FileText, Lock } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { cvVariants } from "@/data/cvs";
import { site } from "@/data/site";
import CvPreview from "@/components/shared/CvPreview";

const CV = () => {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t(`CV | ${site.shortName}`)}
        description={t("Download Christian Velasco's CV — general, cybersecurity, software development and technical versions.")}
        path="/cv"
      />
      <PageHeader
        eyebrow={t("CV")}
        title={t("Curriculum Vitae")}
        description={t("Role-specific versions of my CV so recruiters can read the profile that matches their opening.")}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {cvVariants.map((cv) => (
            <article key={cv.id} className="panel-glow flex h-full flex-col hover:-translate-y-1">
              <FileText className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="mt-3 text-base font-semibold">{t(cv.title)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(cv.description)}</p>

              <div className="mt-5">
                {cv.available ? (
                  <CvPreview preview={cv.preview} title={t(cv.title)}>
                    <Button asChild variant="outline" size="sm">
                      <a href={cv.file} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />{t(" Download PDF")}</a>
                    </Button>
                  </CvPreview>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />{t(" Available on request")}</span>
                )}
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
