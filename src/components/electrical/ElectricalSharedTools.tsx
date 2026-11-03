import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrench, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotScene from "@/components/shared/MascotScene";
import ElectricalOwnedTools from "./ElectricalOwnedTools";
import ElectricalCollectionAccess from "./ElectricalCollectionAccess";
import { electricalOwnedTools } from "@/data/electricalOwnedTools";
import { isElectricalTrainingHash } from "@/data/electricalNavigation";

/** One equipment catalog for the whole profile; photos mount only on request. */
export default function ElectricalSharedTools() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const open = hash === "#tools";
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  useEffect(() => {
    if (open) {
      heading.current?.focus({ preventScroll: true });
      section.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    else if (closing.current) {
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
      opener.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open]);
  const close = () => { closing.current = true; navigate({ hash: "#electrical-tools" }); };
  const closeButton = <button type="button" data-close-electrical-tools aria-label={t("Close tools")} onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border p-2.5 text-sm font-semibold sm:px-3"><X aria-hidden className="h-4 w-4" /><span className="hidden sm:inline">{t("Close")}</span></button>;

  return <section ref={section} id="tools" data-shared-electrical-tools className={open ? "scroll-mt-48 border-t border-border" : `scroll-mt-48 min-w-0 ${isElectricalTrainingHash(hash.slice(1)) ? "container mx-auto px-4 py-4" : ""}`}>
    <div className={open ? "container mx-auto px-4 py-8" : undefined}>
      {open ? <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3"><MascotScene profile="electrical" scene="detail" className="w-16 shrink-0 sm:w-24" /><h2 ref={heading} tabIndex={-1} className="flex items-center gap-2 text-lg font-semibold outline-none sm:text-2xl"><Wrench aria-hidden className="h-5 w-5 shrink-0 text-primary" />{t("Tools")}</h2></div>
        {closeButton}
      </div> : <ElectricalCollectionAccess ref={opener} kind="tools" icon={Wrench} title={t("Tools")} detail={t("{count} photos").replace("{count}", String(electricalOwnedTools.length))} label={t("View tools")} onOpen={() => navigate({ hash: "#tools" })} />}
      {open && <div className="mt-6"><ElectricalOwnedTools /><div className="mt-5 flex justify-end">{closeButton}</div></div>}
    </div>
  </section>;
}
