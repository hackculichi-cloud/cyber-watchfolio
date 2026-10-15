import { useEffect, useId, useState, type ReactNode } from "react";
import { Anchor } from "@radix-ui/react-popover";
import { Eye } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import type { ProfileCardData } from "@/data/profiles";
import { specialtiesFor } from "@/data/specialties";
import { profileHeroImage } from "@/data/profileMedia";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";

/** Momentary, read-only preview: release pointer/keyboard to close. */
const ProfileSectionPreview = ({ data, children }: { data: ProfileCardData; children: ReactNode }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const id = useId();
  const specialties = specialtiesFor(data.slug);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("blur", close);
    return () => window.removeEventListener("blur", close);
  }, []);
  return <Popover open={open} onOpenChange={setOpen}>
    <div className="relative h-full" data-profile={data.slug}>
      {children}
      <Anchor asChild><button type="button" data-preview-toggle aria-label={`${t("Preview area")}: ${t(data.title)}`} aria-describedby={open ? id : undefined} aria-pressed={open}
        onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId); setOpen(true); }}
        onPointerUp={() => setOpen(false)} onPointerCancel={() => setOpen(false)} onLostPointerCapture={() => setOpen(false)} onBlur={() => setOpen(false)}
        onKeyDown={event => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); setOpen(true); } if (event.key === "Escape") setOpen(false); }}
        onKeyUp={event => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); setOpen(false); } }}
        onContextMenu={event => event.preventDefault()}
        className="absolute right-3 top-3 grid h-11 w-11 touch-none select-none place-items-center rounded-lg border border-primary/30 bg-background/80 text-primary backdrop-blur-sm transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Eye className="h-4 w-4" aria-hidden /></button></Anchor>
    </div>
    <PopoverContent id={id} role="tooltip" data-profile={data.slug} data-section-preview align="end" side="right" sideOffset={12} collisionPadding={16}
      onOpenAutoFocus={event => event.preventDefault()} onCloseAutoFocus={event => event.preventDefault()}
      className="pointer-events-none max-h-[min(30rem,80dvh)] w-[min(21rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border-primary/30 p-3">
      {specialties.length <= 5 && <img src={profileHeroImage[data.slug]} alt="" aria-hidden className="h-20 w-full rounded-lg object-cover opacity-70" />}
      <h3 className="my-3 text-base font-semibold">{t(data.title)}</h3>
      <p className="mb-3 text-xs text-muted-foreground">{t("Hold to preview; release to close. Open the card to explore.")}</p>
      <ul className="space-y-0.5">{specialties.map(item => <li key={item.id} className="flex items-center gap-2 rounded-lg p-1">
        <item.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden /><span className="min-w-0"><span className="block text-xs font-medium">{t(item.title)}</span><Tag>{t(item.status)}</Tag></span>
      </li>)}</ul>
    </PopoverContent>
  </Popover>;
};
export default ProfileSectionPreview;
