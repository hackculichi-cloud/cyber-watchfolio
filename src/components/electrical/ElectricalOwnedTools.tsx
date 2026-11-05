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
    <p className="mb-5 text-xs text-muted-foreground">{t("Tap a photo to enlarge")}</p>
    <ul className="image-led-tool-grid">
      {electricalOwnedTools.map(tool => <li key={tool.id} className="min-w-0">
        <figure data-owned-tool-entry={tool.id}>
          <button type="button" data-owned-tool={tool.id} onClick={event => { opener.current = event.currentTarget; setActive(tool); }} aria-haspopup="dialog" aria-label={`${t("Open larger preview")}: ${t(tool.title)}`} aria-describedby={`tool-description-${tool.id}`} className="group relative mx-auto block aspect-square w-full max-w-72 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            <img src={tool.thumbnail} srcSet={`${tool.thumbnail} 320w, ${tool.src} 512w`} sizes="(max-width: 639px) calc(50vw - 24px), 288px" width={512} height={512} loading="lazy" decoding="async" alt={t(tool.alt)} className="h-full w-full object-contain" />
            <span aria-hidden className="absolute bottom-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground"><ZoomIn className="h-5 w-5" /></span>
          </button>
          <figcaption className="mx-auto max-w-72 pt-4">
            <p className="text-xs font-semibold text-primary">{t(tool.brand)}</p>
            <h3 className="mt-1 text-sm font-semibold leading-snug sm:text-base">{t(tool.title)}</h3>
            <p id={`tool-description-${tool.id}`} data-owned-tool-description className="mt-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">{t(tool.description)}</p>
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
