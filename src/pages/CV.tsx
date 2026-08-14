import { Download, FileText, Lock } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { cvVariants } from "@/data/cvs";
import { site } from "@/data/site";

const CV = () => (
  <>
    <Seo
      title={`CV | ${site.shortName}`}
      description="Download Christian Velasco's CV — general, cybersecurity, software development and technical versions."
      path="/cv"
    />
    <PageHeader
      eyebrow="CV"
      title="Curriculum Vitae"
      description="Role-specific versions of my CV so recruiters can read the profile that matches their opening."
    />

    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-4 md:grid-cols-2">
        {cvVariants.map((cv) => (
          <article key={cv.id} className="panel-glow flex h-full flex-col hover:-translate-y-1">
            <FileText className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="mt-3 text-base font-semibold">{cv.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{cv.description}</p>

            <div className="mt-5">
              {cv.available ? (
                <Button asChild variant="outline" size="sm">
                  <a href={cv.file} download>
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </Button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Available on request
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Need a specific version now? Email{" "}
        <a href={`mailto:${site.email}`} className="text-primary hover:underline">
          {site.email}
        </a>
        .
      </p>
    </section>
  </>
);

export default CV;
