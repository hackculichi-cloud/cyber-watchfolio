import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { professionalProfiles, type ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import MascotMorph from "./MascotMorph";
import MascotGearPreview from "./MascotGearPreview";
import { mascotGear } from "@/data/mascotGear";
import type { MascotIntent } from "@/lib/mascotIntent";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
type MascotPhase = "standby" | "ready" | "transforming";
const shortNames = ["Cybersecurity", "Software", "Electricity", "Electronics", "Repair", "Customer service"];
// Six equidistant points on a true circle; the square stage preserves symmetry.
const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (-150 + i * 60) * Math.PI / 180;
    return [50 + 35 * Math.cos(angle), 50 + 35 * Math.sin(angle)];
});
const transformDuration = 1100;
/** Shared outfit navigation on Home and all six profiles; never navigate on hover. */
const InteractiveMascot = ({ profile = "home", className }: {
    profile?: ProfileSlug | "home";
    className?: string;
}) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const id = useId();
    const root = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const navigationTimer = useRef<ReturnType<typeof setTimeout>>();
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();
    const locked = useRef(false);
    const skipFocusOpen = useRef(false);
    const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const [phase, setPhase] = useState<MascotPhase>("standby");
    const [open, setOpen] = useState(true);
    const [motionPaused, setMotionPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const [keyboardFocus, setKeyboardFocus] = useState(false);
    const [preview, setPreview] = useState<ProfileSlug | null>(null);
    const [target, setTarget] = useState<ProfileSlug | null>(null);
    const selected = target ?? preview;
    const gearId = `${id}-gear`;
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
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
        if (root.current) observer.observe(root.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: target ?? preview, committing: phase === "transforming" } }));
        return () => { window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: null } })); };
    }, [preview, target, phase]);
    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const change = () => setReduced(query.matches);
        query.addEventListener("change", change);
        return () => query.removeEventListener("change", change);
    }, []);
    useEffect(() => () => { clearTimeout(navigationTimer.current); clearTimeout(closeTimer.current); }, []);
    useEffect(() => {
        if (!open)
            return;
        const outside = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node) && !locked.current) {
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
        if (!locked.current) { setPreview(slug); setPhase("ready"); }
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
        if (reduced)
            navigate(href);
        else
            navigationTimer.current = setTimeout(() => navigate(href), transformDuration);
    };
    return <div className={cn("w-full max-w-[30rem]", className)}><div ref={root} data-interactive-mascot={profile} data-selector-open={open} data-motion-paused={motionPaused || reduced || !inView || keyboardFocus || !!preview || phase === "transforming"} data-phase={phase} data-mascot-renderer="illustration" data-preview-outfit={preview ?? undefined} data-home-mascot={profile === "home" || undefined} className="mascot-selector mascot-orbit relative aspect-square w-full" onFocusCapture={event => { clearTimeout(closeTimer.current); if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }} onPointerDownCapture={event => {
        setKeyboardFocus(false);
        // Touch freezes the choices immediately so the next selection stays put.
        if (event.pointerType === "touch" && !(event.target as Element).closest("[data-orbit-toggle]")) setMotionPaused(true);
    }} onPointerEnter={event => { clearTimeout(closeTimer.current); if (event.pointerType === "mouse" && !locked.current) {
        setOpen(true);
        greet();
    } }} onPointerLeave={() => {
        // Keep the choices visible; leaving only restores the standing outfit.
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            if (!root.current?.matches(":hover") && !root.current?.contains(document.activeElement) && !locked.current) { setPreview(null); setPhase("standby"); }
        }, 200);
    }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { setKeyboardFocus(false); if (!locked.current) { setPreview(null); setPhase("standby"); } }
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
    <button ref={button} type="button" aria-label={t("Greet Culichi and choose an outfit")} aria-expanded={open} aria-controls={open ? id : undefined} aria-disabled={phase === "transforming"} onFocus={() => { if (skipFocusOpen.current) {
        skipFocusOpen.current = false;
        return;
    } if (!locked.current)
        setOpen(true); }} onClick={() => { if (!locked.current) {
        setOpen(true);
        greet();
    } }} className="mascot-orbit-body absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <span data-profile={target ?? preview ?? (profile === "home" ? undefined : profile)} className={cn("relative block", phase === "transforming" && "mascot-transform", preview && !target && "mascot-preparing")}>
        <MascotMorph outfit={selected ?? profile} committing={phase === "transforming"} preview={!!preview} entryScene />
      </span>
    </button>
    {open && <nav id={id} aria-label={t("Choose Culichi's outfit")} data-outfit-selector>
      {professionalProfiles.map((area, i) => <Link key={area.slug} to={area.href} onClick={event => choose(event, area.slug, area.href)} onPointerEnter={event => { if (event.pointerType === "mouse") prepare(area.slug); }} onPointerLeave={event => { if (!locked.current && document.activeElement !== event.currentTarget) setPreview(null); }} onFocus={() => prepare(area.slug)} onBlur={() => { if (!locked.current) setPreview(null); }} aria-disabled={phase === "transforming"} aria-describedby={selected === area.slug ? gearId : undefined} data-profile={area.slug} data-outfit={area.slug} data-active={selected === area.slug} aria-current={profile === area.slug ? "page" : undefined} className="mascot-outfit absolute z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[11px] leading-tight text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-xs" style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }}>
        <span data-orbit-node className="relative grid h-20 w-20 place-items-center">
          <span className={cn("mascot-neon-orb grid h-14 w-14 place-items-center rounded-full border border-primary/80 bg-background/95", profile === area.slug && "bg-primary/20 ring-2 ring-primary/40")}><area.icon className="h-6 w-6" aria-hidden/></span>
          <span className="mascot-orbit-label">{t(shortNames[i])}</span>
          {selected === area.slug && <span data-gear-burst={area.slug} aria-hidden className="pointer-events-none absolute inset-0">
            {mascotGear[area.slug].map(({ label, icon: Icon }, index) => <span key={label} data-gear-slot={index} className="mascot-gear-spark absolute grid h-[22px] w-[22px] place-items-center rounded-full border border-primary/60 bg-background text-primary"><Icon className="h-3.5 w-3.5" /></span>)}
          </span>}
        </span>
      </Link>)}
    </nav>}
    {open && !reduced && <button type="button" data-orbit-toggle aria-pressed={motionPaused} aria-label={t(motionPaused ? "Resume orbital motion" : "Pause orbital motion")} onClick={() => setMotionPaused(value => !value)} className="absolute bottom-0 right-0 z-30 grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-background/90 text-primary outline-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary">
      {motionPaused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
    </button>}
    <span role="status" aria-live="polite" className="sr-only">
      {phase === "transforming" ? t("Changing outfit…") : ""}
    </span>
  </div>{selected && <MascotGearPreview profile={selected} id={gearId} />}</div>;
};
export default InteractiveMascot;
