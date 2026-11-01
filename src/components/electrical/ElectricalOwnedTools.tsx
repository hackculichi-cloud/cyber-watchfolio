import { useRef, useState } from "react";
import { Camera, ZoomIn } from "lucide-react";
import { electricalOwnedTools, type ElectricalOwnedTool } from "@/data/electricalOwnedTools";
import { electricalToolGroups } from "@/data/electrical";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SmartImage from "@/components/shared/SmartImage";

export default function ElectricalOwnedTools() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ElectricalOwnedTool | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  return <div data-owned-electrical-tools>
    <p className="mb-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Camera aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t("Presentation retouched from my photographs: consistent lighting and background.")}</p>
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      {electricalOwnedTools.map(tool => <li key={tool.id} className="min-w-0">
        <button type="button" data-owned-tool={tool.id} onClick={event => { opener.current = event.currentTarget; setActive(tool); }} aria-label={`${t("Open larger preview")}: ${t(tool.title)}`} className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-background/50 text-left hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span className="relative block aspect-square w-full bg-slate-900 sm:aspect-[4/3] sm:max-h-60">
            <img src={tool.thumbnail} srcSet={`${tool.thumbnail} 320w, ${tool.src} 512w`} sizes="(max-width: 767px) 45vw, (max-width: 1023px) 40vw, 26vw" width={512} height={512} loading="lazy" decoding="async" alt={t(tool.alt)} className="h-full w-full object-contain" />
            <span aria-hidden className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-background/85 text-primary"><ZoomIn className="h-4 w-4" /></span>
          </span>
          <span className="block w-full p-3 sm:p-4"><span className="block text-xs font-semibold text-primary">{t(tool.brand)}</span><span className="mt-1 block text-sm font-semibold leading-snug sm:text-base">{t(tool.title)}</span><span className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{t(tool.description)}</span></span>
        </button>
      </li>)}
    </ul>
    <details className="mt-5 rounded-lg border border-border px-4 py-2">
      <summary className="menu-choice min-h-11 cursor-pointer py-3 text-sm font-semibold">{t("Other equipment used in training")}</summary>
      <div className="grid gap-4 py-3 sm:grid-cols-3">{electricalToolGroups.map(group => <div key={group.title}><h3 className="text-sm font-semibold text-primary">{t(group.title)}</h3><ul className="mt-2 space-y-2 text-sm text-muted-foreground">{group.items.map(item => <li key={item}>{t(item)}</li>)}</ul></div>)}</div>
    </details>
    <Dialog open={!!active} onOpenChange={open => { if (!open) setActive(null); }}>
      <DialogContent className="max-w-2xl" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }}>
        {active && <><DialogTitle>{t(active.title)}</DialogTitle><DialogDescription>{active.brand} · {t(active.description)}</DialogDescription><SmartImage src={active.src} alt={active.alt} width={512} height={512} eager className="max-h-[60vh] aspect-square w-full rounded-lg" /><p className="text-xs text-muted-foreground">{t("Presentation retouched from my photographs: consistent lighting and background.")}</p></>}
      </DialogContent>
    </Dialog>
  </div>;
}
