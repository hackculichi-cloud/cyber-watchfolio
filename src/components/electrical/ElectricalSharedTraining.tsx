import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Award, X } from "lucide-react";
import { isElectricalTrainingHash } from "@/data/electricalNavigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import ElectricalCollectionAccess from "./ElectricalCollectionAccess";
import { certifications } from "@/data/certifications";

const Certificates = lazy(() => import("./ElectricalTrainingCertificates"));

/** One shared collection, loaded only when requested from the page or a course. */
export default function ElectricalSharedTraining() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const open = isElectricalTrainingHash(hash.slice(1));
  const opener = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const closing = useRef(false);
  useEffect(() => {
    if (open && !hash.startsWith("#certificate-")) heading.current?.focus({ preventScroll: true });
    if (!open && closing.current) {
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
      opener.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open, hash]);
  const close = () => { closing.current = true; navigate({ hash: "#electrical-training" }); };

  return <div id="electrical-training" data-shared-electrical-training className={`scroll-mt-48 [&_[data-certificate]]:scroll-mt-48 [&_#certificate]:scroll-mt-48 ${open ? "border-t border-border" : hash === "#tools" ? "container mx-auto px-4 py-4" : "min-w-0"}`}>
    {open ? <>
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 pt-6">
        <h2 ref={heading} tabIndex={-1} className="text-lg font-semibold text-primary outline-none">{t("Certificates")}</h2>
        <button type="button" data-close-electrical-training aria-label={t("Close training")} onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border p-2.5 text-sm font-semibold sm:px-3"><X aria-hidden className="h-4 w-4" /><span className="hidden sm:inline">{t("Close")}</span></button>
      </div>
      <Suspense fallback={<p role="status" className="container px-4 py-8">{t("Loading page")}</p>}><Certificates targetId={hash.slice(1)} /></Suspense>
      <div className="container mx-auto flex justify-end px-4 pb-6"><button type="button" aria-label={t("Close training")} onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border p-2.5 text-sm font-semibold sm:px-3"><X aria-hidden className="h-4 w-4" /><span className="hidden sm:inline">{t("Close")}</span></button></div>
    </> : <section id="certificate" className="h-full scroll-mt-48">
      <ElectricalCollectionAccess ref={opener} kind="training" icon={Award} title={t("Certificates")} detail={t("{count} completed courses").replace("{count}", String((certifications.electrical ?? []).filter(record => record.training === "Completed").length))} label={t("View training and certificates")} onOpen={() => navigate({ hash: "#certificate" })} />
    </section>}

  </div>;
}
