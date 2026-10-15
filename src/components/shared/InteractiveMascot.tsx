import { lazy, Suspense, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { professionalProfiles, type ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import CulichiBody from "./CulichiBody";
import { cn } from "@/lib/utils";
import type { FoxPhase } from "@/components/mascot/Fox3D";
const Fox3D = lazy(() => import("@/components/mascot/Fox3D"));
const shortNames = ["Cybersecurity", "Software", "Electricity", "Electronics", "Repair", "Customer service"];
const positions = [[11, 69], [19, 39], [38, 17], [62, 17], [81, 39], [89, 69]];
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
    const locked = useRef(false);
    const skipFocusOpen = useRef(false);
    const [wave, setWave] = useState(0);
    const [renderMode, setRenderMode] = useState("loading");
    const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const [phase, setPhase] = useState<FoxPhase>("standby");
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState<ProfileSlug | null>(null);
    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const change = () => setReduced(query.matches);
        query.addEventListener("change", change);
        return () => query.removeEventListener("change", change);
    }, []);
    useEffect(() => {
        if (locked.current)
            return;
        if (reduced || renderMode !== "3d") {
            setPhase("standby");
            return;
        }
        setPhase("greeting");
        const timer = setTimeout(() => {
            if (!locked.current)
                setPhase(root.current?.matches(":hover") || root.current?.contains(document.activeElement) ? "ready" : "standby");
        }, 1350);
        return () => clearTimeout(timer);
    }, [renderMode, wave, reduced, profile]);
    useEffect(() => () => clearTimeout(navigationTimer.current), []);
    useEffect(() => {
        if (!open)
            return;
        const outside = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node) && !locked.current)
                setOpen(false);
        };
        document.addEventListener("pointerdown", outside);
        return () => document.removeEventListener("pointerdown", outside);
    }, [open]);
    const greet = () => {
        if (locked.current || phase === "greeting")
            return;
        if (reduced || renderMode !== "3d") {
            setPhase("ready");
            return;
        }
        setWave(value => value + 1);
    };
    const close = () => { if (!locked.current) {
        setOpen(false);
        setPhase(current => current === "greeting" ? current : "standby");
    } };
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
    return <div ref={root} data-interactive-mascot={profile} data-phase={phase} data-home-mascot={profile === "home" || undefined} className={cn("mascot-selector relative h-80 w-full max-w-[26rem] sm:h-96", className)} onPointerEnter={event => { if (event.pointerType === "mouse" && !locked.current) {
        setOpen(true);
        greet();
    } }} onPointerLeave={() => { if (!root.current?.contains(document.activeElement))
        close(); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node))
        close(); }} onKeyDown={event => { if (event.key === "Escape" && !locked.current) {
        event.preventDefault();
        event.stopPropagation();
        close();
        if (document.activeElement !== button.current)
            skipFocusOpen.current = true;
        button.current?.focus();
    } }}>
    <button ref={button} type="button" aria-label={t("Greet Culichi and choose an outfit")} aria-expanded={open} aria-controls={open ? id : undefined} aria-disabled={phase === "transforming"} onFocus={() => { if (skipFocusOpen.current) {
        skipFocusOpen.current = false;
        return;
    } if (!locked.current)
        setOpen(true); }} onClick={() => { if (!locked.current) {
        setOpen(true);
        greet();
    } }} className="absolute bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-72">
      <span className={cn("relative block", renderMode !== "3d" && phase === "transforming" && "mascot-transform")}>
        <span className="mascot-source block w-full">
          <Suspense fallback={<CulichiBody profile={profile} className="w-full"/>}>
            <Fox3D profile={profile} phase={phase} target={target} wave={wave} reduced={reduced} onReady={() => setRenderMode("3d")} onUnavailable={() => setRenderMode("fallback")}/>
          </Suspense>
        </span>
        {target && renderMode !== "3d" && <span aria-hidden className="mascot-target absolute inset-0"><CulichiBody profile={target} className="w-full"/></span>}
      </span>
    </button>
    {open && <nav id={id} aria-label={t("Choose Culichi's outfit")} data-outfit-selector>
      {professionalProfiles.map((area, i) => <Link key={area.slug} to={area.href} onClick={event => choose(event, area.slug, area.href)} aria-disabled={phase === "transforming"} data-profile={area.slug} data-outfit={area.slug} aria-current={profile === area.slug ? "page" : undefined} className="mascot-outfit absolute z-10 flex w-[4.8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl px-1 py-2 text-center text-[10px] leading-tight text-primary outline-none hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary sm:w-[5.6rem] sm:text-xs" style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }}>
        <span className={cn("grid h-9 w-9 place-items-center rounded-full border border-primary/60 bg-background/90 shadow-[0_0_12px_hsl(var(--primary)/0.2)]", profile === area.slug && "bg-primary/20 ring-2 ring-primary/40")}><area.icon className="h-4 w-4" aria-hidden/></span>
        {t(shortNames[i])}
      </Link>)}
    </nav>}
    <p role="status" aria-live="polite" className="absolute bottom-0 left-0 w-full text-center text-[10px] text-primary sm:text-xs">
      {phase === "transforming" ? t("Changing outfit…") : t("Meet Culichi · choose your area")}
    </p>
  </div>;
};
export default InteractiveMascot;
