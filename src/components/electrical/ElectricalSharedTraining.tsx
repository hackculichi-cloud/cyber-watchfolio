import { lazy, Suspense, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Award } from "lucide-react";
import { isElectricalTrainingHash } from "@/data/electricalNavigation";
import { useLanguage } from "@/i18n/LanguageProvider";
import CollectionToolbar from "@/components/shared/CollectionToolbar";
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
    {open ? <div className="container mx-auto max-w-6xl px-4 pb-4">
      <CollectionToolbar title={t("Certificates")} icon={Award} headingRef={heading} kind="training" onClose={close} />
      <Suspense fallback={<p role="status" className="px-4 py-8">{t("Loading page")}</p>}><Certificates targetId={hash.slice(1)} /></Suspense>
    </div> : <section id="certificate" className="h-full scroll-mt-48">
      <ElectricalCollectionAccess ref={opener} kind="training" icon={Award} title={t("Certificates")} detail={t("{count} completed courses").replace("{count}", String((certifications.electrical ?? []).filter(record => record.training === "Completed").length))} label={t("View training and certificates")} onOpen={() => navigate({ hash: "#certificate" })} />
    </section>}

  </div>;
}
