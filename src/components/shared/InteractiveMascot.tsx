import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { professionalProfiles, type ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import CulichiBody from "./CulichiBody";
import { cn } from "@/lib/utils";
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
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState<ProfileSlug | null>(null);
    const [target, setTarget] = useState<ProfileSlug | null>(null);
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: target ?? preview } }));
        return () => { window.dispatchEvent(new CustomEvent("culichi:outfit-preview", { detail: { profile: null } })); };
    }, [preview, target]);
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
    return <div ref={root} data-interactive-mascot={profile} data-selector-open={open} data-phase={phase} data-mascot-renderer="illustration" data-preview-outfit={preview ?? undefined} data-home-mascot={profile === "home" || undefined} className={cn("mascot-selector mascot-orbit relative aspect-square w-full max-w-[30rem]", className)} onFocusCapture={() => clearTimeout(closeTimer.current)} onPointerEnter={event => { clearTimeout(closeTimer.current); if (event.pointerType === "mouse" && !locked.current) {
        setOpen(true);
        greet();
    } }} onPointerLeave={() => {
        // Leave time to reach a selector after scrolling a tall mascot into view.
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            if (!root.current?.matches(":hover") && !root.current?.contains(document.activeElement)) close();
        }, 200);
    }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node))
        close(); }} onKeyDown={event => { if (event.key === "Escape" && !locked.current) {
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
      {positions.map(([x, y], i) => <path key={i} d={`M ${50 + (x - 50) * .78} ${50 + (y - 50) * .78} L ${x} ${y}`} stroke="currentColor" strokeWidth=".3" />)}
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
        <span aria-hidden className="mascot-aura pointer-events-none absolute inset-6 rounded-full border border-primary/50" />
        <span className="mascot-source block w-full">
          <CulichiBody profile={profile} className="w-full" />
        </span>
        {(target ?? preview) && <span key={target ?? preview} aria-hidden data-outfit-preview={target ?? preview} className={cn("pointer-events-none absolute inset-0", target ? "mascot-target" : "mascot-preview")}><CulichiBody profile={(target ?? preview)!} scene={false} className="w-full" /></span>}
      </span>
    </button>
    {open && <nav id={id} aria-label={t("Choose Culichi's outfit")} data-outfit-selector>
      {professionalProfiles.map((area, i) => <Link key={area.slug} to={area.href} onClick={event => choose(event, area.slug, area.href)} onPointerEnter={event => { if (event.pointerType === "mouse") prepare(area.slug); }} onPointerLeave={event => { if (!locked.current && document.activeElement !== event.currentTarget) setPreview(null); }} onFocus={() => prepare(area.slug)} onBlur={() => { if (!locked.current) setPreview(null); }} aria-disabled={phase === "transforming"} data-profile={area.slug} data-outfit={area.slug} aria-current={profile === area.slug ? "page" : undefined} className="mascot-outfit absolute z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[10px] leading-tight text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-xs" style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }}>
        <span className={cn("grid h-10 w-10 place-items-center rounded-full border border-primary/60 bg-background/90 shadow-[0_0_12px_hsl(var(--primary)/0.2)]", profile === area.slug && "bg-primary/20 ring-2 ring-primary/40")}><area.icon className="h-4 w-4" aria-hidden/></span>
        <span className="mascot-orbit-label">{t(shortNames[i])}</span>
      </Link>)}
    </nav>}
    <span role="status" aria-live="polite" className="sr-only">
      {phase === "transforming" ? t("Changing outfit…") : ""}
    </span>
  </div>;
};
export default InteractiveMascot;
