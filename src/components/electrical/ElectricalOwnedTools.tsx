import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
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
    <p className="mb-3 text-center text-xs text-muted-foreground">{t("Tap a photo to enlarge")}</p>
    <ul className="compact-tool-grid">
      {electricalOwnedTools.map(tool => <li key={tool.id} className="min-w-0">
        <figure data-owned-tool-entry={tool.id} className="h-full rounded-xl border border-primary/20 bg-surface/60 p-3 text-center">
          <button type="button" data-owned-tool={tool.id} onClick={event => { opener.current = event.currentTarget; setActive(tool); }} aria-haspopup="dialog" aria-label={`${t("Open larger preview")}: ${t(tool.title)}`} aria-describedby={`tool-description-${tool.id}`} className="group relative mx-auto block aspect-square w-full max-w-24 sm:max-w-32 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            <img src={tool.thumbnail} srcSet={`${tool.thumbnail} 320w, ${tool.src} 512w`} sizes="(max-width: 639px) 96px, 128px" width={512} height={512} loading="lazy" decoding="async" alt={t(tool.alt)} className="h-full w-full object-contain" />
            <span aria-hidden className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-background/85 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground"><ZoomIn className="h-4 w-4" /></span>
          </button>
          <figcaption className="mx-auto max-w-64 pt-2">
            <p className="text-[11px] font-semibold text-primary">{t(tool.brand)}</p>
            <h3 className="mt-1 text-xs font-semibold leading-4 sm:text-sm">{t(tool.title)}</h3>
            <p id={`tool-description-${tool.id}`} data-owned-tool-description className="mt-1 line-clamp-2 text-xs leading-4 text-muted-foreground">{t(tool.description)}</p>
          </figcaption>
        </figure>
      </li>)}
    </ul>
    <details className="mt-5 rounded-lg border border-border px-4 py-2">
      <summary className="menu-choice min-h-11 cursor-pointer py-3 text-sm font-semibold">{t("Other equipment used in training")}</summary>
      <div className="grid gap-4 py-3 sm:grid-cols-3">{electricalToolGroups.map(group => <div key={group.title}><h3 className="text-sm font-semibold text-primary">{t(group.title)}</h3><ul className="mt-2 space-y-2 text-sm text-muted-foreground">{group.items.map(item => <li key={item}>{t(item)}</li>)}</ul></div>)}</div>
    </details>
    <Dialog open={!!active} onOpenChange={open => { if (!open) setActive(null); }}>
      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto" onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }}>
        {active && <><DialogTitle>{t(active.title)}</DialogTitle><DialogDescription>{t(active.brand)} · {t(active.description)}</DialogDescription><SmartImage src={active.src} alt={active.alt} width={512} height={512} eager className="max-h-[60vh] aspect-square w-full rounded-lg" /></>}
      </DialogContent>
    </Dialog>
  </div>;
}
