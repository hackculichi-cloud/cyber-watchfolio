import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Award, ArrowUpRight, X } from "lucide-react";
import { isElectricalTrainingHash } from "@/data/electricalNavigation";
import { useLanguage } from "@/i18n/LanguageProvider";

const Certificates = lazy(() => import("./ElectricalTrainingCertificates"));

/** One shared collection, loaded only when requested from the page or a course. */
export default function ElectricalSharedTraining() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const open = isElectricalTrainingHash(hash.slice(1));
  const opener = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  useEffect(() => {
    if (!open && closing.current) {
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
      opener.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open]);
  const close = () => { closing.current = true; navigate({ hash: "#electrical-training" }); };

  return <div id="electrical-training" data-shared-electrical-training className="scroll-mt-48 border-t border-border [&_[data-certificate]]:scroll-mt-48 [&_#certificate]:scroll-mt-48">
    {open ? <>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 pt-6">
        <p className="text-sm font-semibold text-primary">{t("Shared training for all electrical specialties")}</p>
        <button type="button" data-close-electrical-training onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold"><X aria-hidden className="h-4 w-4" />{t("Close training")}</button>
      </div>
      <Suspense fallback={<p role="status" className="container px-4 py-8">{t("Loading page")}</p>}><Certificates targetId={hash.slice(1)} /></Suspense>
      <div className="container mx-auto flex justify-end px-4 pb-6"><button type="button" onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold"><X aria-hidden className="h-4 w-4" />{t("Close training")}</button></div>
    </> : <section id="certificate" className="container mx-auto flex scroll-mt-48 flex-wrap items-center justify-between gap-4 px-4 py-8">
      <div className="min-w-0"><h2 className="flex items-center gap-2 text-xl font-semibold"><Award aria-hidden className="h-5 w-5 shrink-0 text-primary" />{t("Training and certifications")}</h2><p className="reading-copy mt-2 max-w-2xl text-sm text-muted-foreground">{t("One place for my electrical courses, syllabuses and certificates, shared by all three specialties.")}</p></div>
      <button ref={opener} type="button" data-open-electrical-training onClick={() => navigate({ hash: "#certificate" })} aria-expanded={false} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 text-sm font-semibold text-primary">{t("View training and certificates")}<ArrowUpRight aria-hidden className="h-4 w-4" /></button>
    </section>}
  </div>;
}
