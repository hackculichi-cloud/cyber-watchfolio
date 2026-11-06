import { preloadProfile } from "@/lib/preloadProfile";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { professionalProfiles, type ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotMorph from "./MascotMorph";
import MascotToolField from "./MascotToolField";
import type { MascotIntent } from "@/lib/mascotIntent";
import { cn } from "@/lib/utils";
type MascotPhase = "standby" | "ready" | "transforming";
// Fixed positions adapt when a new discipline is added.
const positions = professionalProfiles.map((_, i) => {
    const angle = (-150 + i * 360 / professionalProfiles.length) * Math.PI / 180;
    return [50 + 35 * Math.cos(angle), 50 + 35 * Math.sin(angle)];
});
/** Home outfit navigation; profiles welcome visitors in their own static workspace. */
const InteractiveMascot = ({ profile = "home", className }: {
    profile?: ProfileSlug | "home";
    className?: string;
}) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const id = useId();
    const widget = useRef<HTMLDivElement>(null);
    const root = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();
    const locked = useRef(false);
    const skipFocusOpen = useRef(false);
    const [phase, setPhase] = useState<MascotPhase>("standby");
    const [open, setOpen] = useState(true);
    const [preview, setPreview] = useState<ProfileSlug | null>(null);
    const [target, setTarget] = useState<ProfileSlug | null>(null);
    const selected = target ?? preview;
    useEffect(() => {
        const phone = window.matchMedia("(max-width: 767px)");
        const showChoices = () => { if (phone.matches && !locked.current) setOpen(true); };
        phone.addEventListener("change", showChoices);
        return () => phone.removeEventListener("change", showChoices);
    }, []);
    useEffect(() => {
        const intent = (event: Event) => {
            if (locked.current) return;
            const { profile: area } = (event as CustomEvent<MascotIntent>).detail;
            setPreview(area);
            setPhase(area ? "ready" : "standby");
            if (area) setOpen(true);
        };
        window.addEventListener("culichi:area-intent", intent);
        return () => window.removeEventListener("culichi:area-intent", intent);
    }, []);
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: target ?? preview, committing: phase === "transforming" } }));
    }, [preview, target, phase]);
    useEffect(() => () => { window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: null } })); }, []);
    useEffect(() => () => { clearTimeout(closeTimer.current); }, []);
    useEffect(() => {
        if (!open)
            return;
        const outside = (event: PointerEvent) => {
            // Touch scrolling must not hide choices that cannot be reopened by hover.
            if (window.matchMedia("(max-width: 767px)").matches || event.pointerType === "touch") return;
            if (!widget.current?.contains(event.target as Node) && !locked.current) {
                setOpen(false);
                setPreview(null);
                setPhase("standby");
            }
        };
        document.addEventListener("pointerdown", outside);
        return () => document.removeEventListener("pointerdown", outside);
    }, [open]);
    const greet = () => { if (!locked.current) setPhase("ready"); };
    const close = () => { if (!locked.current) {
        setOpen(false);
        setPreview(null);
        setPhase("standby");
    } };
    const prepare = (slug: ProfileSlug) => {
        if (!locked.current) { const area = professionalProfiles.find(item => item.slug === slug); if (area) preloadProfile(area.href); setPreview(slug); setPhase("ready"); }
    };
    const choose = (event: MouseEvent<HTMLAnchorElement>, slug: ProfileSlug, href: string) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
            return;
        event.preventDefault();
        if (locked.current)
            return;
        if (slug === profile) {
            close();
            greet();
            return;
        }
        locked.current = true;
        setTarget(slug);
        setPhase("transforming");
        navigate(href);
    };
    return <div ref={widget} className={cn("home-mascot-widget relative w-full max-w-[35rem]", className)} onPointerEnter={event => { clearTimeout(closeTimer.current); if (event.pointerType === "mouse" && !locked.current) {
        setOpen(true);
        greet();
    } }} onPointerLeave={() => {
        // Floating objects belong to the same preview as their outfit controls.
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            if (!widget.current?.matches(":hover") && !widget.current?.contains(document.activeElement) && !locked.current) { setPreview(null); setPhase("standby"); }
        }, 200);
    }}><div ref={root} data-interactive-mascot={profile} data-selector-open={open} data-phase={phase} data-mascot-renderer="illustration" data-preview-outfit={preview ?? undefined} data-home-mascot={profile === "home" || undefined} className="mascot-selector mascot-orbit relative aspect-square w-full" onFocusCapture={() => { clearTimeout(closeTimer.current); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { if (!locked.current && !widget.current?.matches(":hover")) { setPreview(null); setPhase("standby"); } }
    }} onKeyDown={event => { if (event.key === "Escape" && !locked.current) {
        event.preventDefault();
        event.stopPropagation();
        close();
        if (document.activeElement !== button.current)
            skipFocusOpen.current = true;
        button.current?.focus();
    } }}>
    {open && <svg aria-hidden viewBox="0 0 100 100" className="mascot-orbit-guide pointer-events-none absolute inset-0 h-full w-full fill-none text-primary/30">
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth=".25" strokeDasharray="1 2" />
      <circle cx="50" cy="50" r="27" stroke="currentColor" strokeWidth=".15" />
    </svg>}
    <span aria-hidden className="mascot-orbit-body pointer-events-none absolute left-1/2 top-1/2 z-20 w-[86%] -translate-x-1/2 -translate-y-1/2">
      <span data-profile={target ?? preview ?? (profile === "home" ? undefined : profile)} className={cn("relative block", phase === "transforming" && "mascot-transform", preview && !target && "mascot-preparing")}>
        <MascotMorph outfit={selected ?? profile} committing={phase === "transforming"} preview={!!preview} entryScene />
      </span>
    </span>
    <button ref={button} type="button" aria-label={t("Greet Culichi and choose an outfit")} aria-expanded={open} aria-controls={open ? id : undefined} aria-disabled={phase === "transforming"} onFocus={() => { if (skipFocusOpen.current) {
        skipFocusOpen.current = false;
        return;
    } if (!locked.current)
        setOpen(true); }} onClick={() => { if (!locked.current) {
        setOpen(true);
        greet();
    } }} className="absolute left-1/2 top-1/2 z-30 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full [clip-path:circle(50%)] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" />
    {selected && <MascotToolField key={selected} profile={selected} committing={phase === "transforming"} stage={root} />}
    {open && <nav id={id} className="z-10" aria-label={t("Choose Culichi's outfit")} data-outfit-selector>
      {professionalProfiles.map((area, i) => <Link key={area.slug} to={area.href} onPointerDown={() => preloadProfile(area.href)} onClick={event => choose(event, area.slug, area.href)} onPointerEnter={event => { if (event.pointerType === "mouse") prepare(area.slug); }} onFocus={() => prepare(area.slug)} onBlur={() => { if (!locked.current && !widget.current?.matches(":hover")) setPreview(null); }} aria-disabled={phase === "transforming"} data-profile={area.slug} data-outfit={area.slug} data-active={selected === area.slug} aria-current={profile === area.slug ? "page" : undefined} className="mascot-outfit absolute z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[11px] leading-tight text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-xs" style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }}>
        <span data-orbit-node className="relative grid h-20 w-20 place-items-center">
          <span className={cn("mascot-neon-orb flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border border-primary/80 bg-background/95", profile === area.slug && "bg-primary/20 ring-2 ring-primary/40")}><area.icon className="h-6 w-6 shrink-0" aria-hidden/><span className="mascot-orbit-label">{t(area.shortTitle ?? area.title)}</span></span>
        </span>
      </Link>)}
    </nav>}
    <span role="status" aria-live="polite" className="sr-only">
      {phase === "transforming" ? t("Changing outfit…") : ""}
    </span>
  </div></div>;
};
export default InteractiveMascot;
