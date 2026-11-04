import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrench } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotScene from "@/components/shared/MascotScene";
import CollectionToolbar from "@/components/shared/CollectionToolbar";
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


  return <section ref={section} id="tools" data-shared-electrical-tools className={open ? "collection-anchor border-t border-border" : `scroll-mt-48 min-w-0 ${isElectricalTrainingHash(hash.slice(1)) ? "container mx-auto px-4 py-4" : ""}`}>
    <div className={open ? "container mx-auto max-w-5xl px-4 pb-5" : undefined}>
      {open ? <CollectionToolbar title={t("Tools")} icon={Wrench} headingRef={heading} kind="tools" onClose={close}><MascotScene profile="electrical" scene="detail" className="hidden w-10 shrink-0 sm:block sm:w-12" /></CollectionToolbar> : <ElectricalCollectionAccess ref={opener} kind="tools" icon={Wrench} title={t("Tools")} detail={t("{count} photos").replace("{count}", String(electricalOwnedTools.length))} label={t("View tools")} onOpen={() => navigate({ hash: "#tools" })} />}
      {open && <div className="mt-3"><ElectricalOwnedTools /></div>}
    </div>
  </section>;
}
