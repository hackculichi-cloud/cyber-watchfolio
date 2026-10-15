import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import type { ToolGroup } from "@/data/tools";
import type { ProfileSlug } from "@/data/profiles";
import { toolPhotos, type ToolPhoto } from "@/data/toolPhotos";
import { Camera, Gauge, Wrench, ShieldCheck, Cpu, Flame, ZoomIn, MoveHorizontal } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SmartImage from "@/components/shared/SmartImage";

const ProfileTools = ({ groups, profile }: { groups: ToolGroup[]; profile?: ProfileSlug }) => {
  const { t } = useLanguage();
  const [active, setActive] = useState<ToolPhoto | null>(null);
  const publishedGroups = groups.map(group => ({ ...group, items: group.items.filter(item => !item.startsWith("Add your ")) }));
  const physicalTools = profile && ["electrical", "electronics", "repair"].includes(profile);

  if (physicalTools) return <div data-tool-catalog={profile}>
    <p className="mb-2 flex items-center justify-between gap-2 text-xs text-muted-foreground sm:hidden">{t("Swipe to browse equipment")}<MoveHorizontal className="h-4 w-4 text-primary" aria-hidden /></p>
    <div tabIndex={0} role="region" aria-label={t("Equipment catalog")} className="tool-wall flex snap-x snap-mandatory scroll-p-3 gap-3 overflow-x-auto rounded-xl border border-primary/20 p-3 [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:p-5">
      {publishedGroups.map(group => {
        const Icon = /Measurement|Diagnostics/.test(group.title) ? Gauge : /safety|Safety/.test(group.title) ? ShieldCheck : /Rework|Workshop/.test(group.title) ? Flame : /Prototyping/.test(group.title) ? Cpu : Wrench;
        return <div key={group.title} className="w-52 min-w-0 shrink-0 snap-start sm:w-auto">
          <h3 className="mb-3 text-xs font-semibold text-primary">{t(group.title)}</h3>
          <ul className="grid gap-2">
            {group.items.map(tool => {
              const photo = toolPhotos.find(entry => entry.profile === profile && entry.tool === tool);
              const content = <>
                {photo ? <img src={photo.src} alt={t(photo.alt)} loading="lazy" decoding="async" className="h-12 w-12 rounded object-contain" /> : <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/20 bg-background/75 text-primary sm:h-10 sm:w-10"><Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden /></span>}
                <span className="min-w-0 text-xs leading-relaxed [overflow-wrap:anywhere]">{t(tool)}{photo?.model && <span className="reading-copy block text-muted-foreground">{t(photo.model)}</span>}</span>
                {photo && <ZoomIn className="ml-auto h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />}
              </>;
              return <li key={tool}>{photo ? <button type="button" onClick={() => setActive(photo)} aria-label={`${t("Open larger preview")}: ${t(tool)}`} className="flex min-h-16 w-full items-center gap-2 rounded-lg border border-border bg-background/85 p-2 text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-3">{content}</button> : <div className="flex min-h-16 items-center gap-2 rounded-lg border border-border/70 bg-background/85 p-2 sm:gap-3">{content}</div>}</li>;
            })}
          </ul>
        </div>;
      })}
    </div>
    <p className="reading-copy mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground"><Camera className="h-3.5 w-3.5 shrink-0" aria-hidden />{t("Illustrated equipment. Original tool photos will be added as they are documented.")}</p>
    <Dialog open={!!active} onOpenChange={open => !open && setActive(null)}>
      <DialogContent className="max-w-3xl">
        {active && <><DialogTitle>{t(active.tool)}</DialogTitle><DialogDescription>{t(active.model ?? active.alt)}</DialogDescription><SmartImage src={active.src} alt={active.alt} eager className="h-[60vh] rounded-lg" /></>}
      </DialogContent>
    </Dialog>
  </div>;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {publishedGroups.map((group) => (
        <div key={group.title} className="panel-glow hover:-translate-y-1">
          <h3 className="text-sm font-semibold">{t(group.title)}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.items.map((entry) => (
              <Tag key={entry}>{t(entry)}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileTools;
