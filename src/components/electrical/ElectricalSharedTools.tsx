import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Wrench, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotScene from "@/components/shared/MascotScene";
import ElectricalOwnedTools from "./ElectricalOwnedTools";

/** One equipment catalog for the whole profile; photos mount only on request. */
export default function ElectricalSharedTools() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const open = hash === "#tools";
  const section = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  useEffect(() => {
    if (open) section.current?.scrollIntoView({ block: "start", behavior: "instant" });
    else if (closing.current) {
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
      opener.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open]);
  const close = () => { closing.current = true; navigate({ hash: "#electrical-tools" }); };
  const closeButton = <button type="button" data-close-electrical-tools onClick={close} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold"><X aria-hidden className="h-4 w-4" />{t("Close tools")}</button>;

  return <section ref={section} id="tools" data-shared-electrical-tools className="scroll-mt-48 border-t border-border">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">{open && <MascotScene profile="electrical" scene="detail" className="w-20 shrink-0 sm:w-24" />}<div className="min-w-0"><h2 className="flex items-center gap-2 text-xl font-semibold sm:text-2xl"><Wrench aria-hidden className="h-5 w-5 shrink-0 text-primary" />{t("My electrical tools")}</h2><p className="reading-copy mt-2 max-w-2xl text-sm text-muted-foreground">{t("A single equipment catalog shared by all electrical specialties.")}</p></div></div>
        {open ? <div className="flex items-center gap-3">{closeButton}</div> : <button ref={opener} type="button" data-open-electrical-tools onClick={() => navigate({ hash: "#tools" })} aria-expanded={false} className="menu-choice inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 text-sm font-semibold text-primary">{t("View tools")}<ArrowUpRight aria-hidden className="h-4 w-4" /></button>}
      </div>
      {open && <div className="mt-6"><ElectricalOwnedTools /><div className="mt-5 flex justify-end">{closeButton}</div></div>}
    </div>
  </section>;
}
