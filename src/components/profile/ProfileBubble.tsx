import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/cards/ProfileCard";
import { profileHeroImage, profileHeroAlt } from "@/data/profileMedia";
import type { ProfileCardData } from "@/data/profiles";
import { specialtiesFor, specialtyPath } from "@/data/specialties";
import { useLanguage } from "@/i18n/LanguageProvider";

const shortLabels = { cybersecurity: "Cybersecurity", development: "Development", electrical: "Electrical", electronics: "Electronics", repair: "Technical Repair" };

type Props = { compact: boolean; profile: ProfileCardData; open: boolean; onSelect: () => void; onDismiss: () => void };

/** Circular profile card, with an interactive preview available to every input method. */
const ProfileBubble = ({ compact, profile, open, onSelect, onDismiss }: Props) => {
  const { t } = useLanguage();
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const restoreFocus = useRef(false);
  const suppressFocus = useRef(false);
  const keepOpen = () => clearTimeout(closeTimer.current);
  const leave = () => {
    keepOpen();
    closeTimer.current = setTimeout(() => {
      if (document.activeElement !== trigger.current && !content.current?.contains(document.activeElement)) onDismiss();
    }, 200);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const id = `profile-preview-${profile.slug}`;
  return <Popover open={open} onOpenChange={(value) => { keepOpen(); value ? onSelect() : onDismiss(); }}>
    <PopoverTrigger asChild>
      <button ref={trigger} type="button" className="orbit-node" aria-label={t(profile.title)} aria-pressed={open} aria-controls={id}
        onPointerEnter={(event) => { if (event.pointerType !== "touch") { keepOpen(); onSelect(); } }} onPointerLeave={leave}
        onFocus={() => { if (suppressFocus.current) suppressFocus.current = false; else onSelect(); }}
        onClick={(event) => {
          event.preventDefault(); keepOpen(); onSelect();
          requestAnimationFrame(() => content.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true }));
        }}>
        <span className="orbit-photo"><img src={profileHeroImage[profile.slug]} alt={t(profileHeroAlt[profile.slug])} loading="lazy" decoding="async" />
          <span className="orbit-photo-shade" /><profile.icon className="orbit-profile-icon" aria-hidden />
        </span>
        <span className="orbit-caption">{t(shortLabels[profile.slug])}</span>
      </button>
    </PopoverTrigger>
    <PopoverContent ref={content} id={id} data-profile-preview data-profile={profile.slug} side={compact ? "bottom" : "right"} align="center" sideOffset={18} collisionPadding={16}
      aria-label={`${t("Profile preview")}: ${t(profile.title)}`} onPointerEnter={keepOpen} onPointerLeave={leave}
      onOpenAutoFocus={(event) => event.preventDefault()}
      onEscapeKeyDown={() => { restoreFocus.current = true; }}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        if (restoreFocus.current) { restoreFocus.current = false; suppressFocus.current = true; trigger.current?.focus(); }
      }}
      className="max-h-[min(calc(100dvh-2rem),var(--radix-popover-content-available-height))] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border-primary/30 p-3 shadow-2xl">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t("Profile preview")}</p>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label={t("Close preview")} onClick={() => { restoreFocus.current = true; onDismiss(); }}><X className="h-4 w-4" aria-hidden /></Button>
      </div>
      <ProfileCard data={profile} />
      {specialtiesFor(profile.slug).length > 0 && <div className="mt-3 flex flex-wrap gap-2">
        {specialtiesFor(profile.slug).map((item) => <Link key={item.id} to={specialtyPath(item)} className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t(item.title)}</Link>)}
      </div>}
    </PopoverContent>
  </Popover>;
};
export default ProfileBubble;
