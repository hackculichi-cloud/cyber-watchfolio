import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Eye, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { ProfileCardData } from "@/data/profiles";
import { specialtiesFor } from "@/data/specialties";
import { profileHeroImage } from "@/data/profileMedia";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";

/** Preview opens only through its explicit keyboard/touch trigger. */
const ProfileSectionPreview = ({ data, children }: { data: ProfileCardData; children: ReactNode }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  return <Popover open={open} onOpenChange={setOpen}>
    <div className="relative h-full" data-profile={data.slug}>
      {children}
      <PopoverTrigger asChild><button type="button" data-preview-toggle aria-label={`${t("Preview area")}: ${t(data.title)}`} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-background/80 text-primary backdrop-blur-sm transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Eye className="h-4 w-4" aria-hidden /></button></PopoverTrigger>
    </div>
    <PopoverContent ref={content} data-profile={data.slug} data-section-preview align="end" side="right" sideOffset={12} collisionPadding={16}
      onOpenAutoFocus={event => { event.preventDefault(); content.current?.querySelector<HTMLAnchorElement>("a")?.focus(); }}
      aria-label={`${t("Preview area")}: ${t(data.title)}`} className="max-h-[min(30rem,80dvh)] w-[min(21rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border-primary/30 p-3">
      <img src={profileHeroImage[data.slug]} alt="" aria-hidden className="h-20 w-full rounded-lg object-cover opacity-70" />
      <h3 className="my-3 text-base font-semibold">{t(data.title)}</h3>
      <ul className="space-y-1">{specialtiesFor(data.slug).map(item => <li key={item.id}><Link to={`${data.href}#${item.id}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg p-2 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <item.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden /><span className="min-w-0"><span className="block text-sm font-medium">{t(item.title)}</span><Tag>{t(item.status)}</Tag></span>
      </Link></li>)}</ul>
      <Link to={data.href} onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-2 rounded p-2 text-sm font-semibold text-primary focus-visible:ring-2 focus-visible:ring-primary">{t("Explore Profile")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
    </PopoverContent>
  </Popover>;
};
export default ProfileSectionPreview;
