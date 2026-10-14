import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { professionalProfiles, type ProfileSlug } from "@/data/profiles";
import { useLanguage } from "@/i18n/LanguageProvider";
import greeting from "@/assets/culichi-greeting-frames.webp";
import outfits from "@/assets/culichi-outfit-greetings.webp";
import standingAtlas from "@/assets/culichi-full-body-atlas.webp";
import CulichiBody from "./CulichiBody";
import { cn } from "@/lib/utils";

const rows: Record<ProfileSlug, number> = { cybersecurity: 0, development: 1, electrical: 2, electronics: 3, repair: 4, "customer-service": 5 };
const shortNames = ["Cybersecurity", "Software", "Electricity", "Electronics", "Repair", "Customer service"];
const positions = [[11, 66], [19, 33], [38, 14], [62, 14], [81, 33], [89, 66]];
const waveFrames = [0, 1, 2, 3, 2, 3, 4, 5];

/** A finite greeting, then rest. Only an explicit outfit choice starts navigation. */
const InteractiveMascot = ({ profile = "home", className }: { profile?: ProfileSlug | "home"; className?: string }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const locked = useRef(false);
  const skipFocusOpen = useRef(false);
  const [wave, setWave] = useState(0);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState<"greeting" | "standby" | "ready" | "transforming">("standby");
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<ProfileSlug | null>(null);
  const home = profile === "home";

  useEffect(() => {
    if (home) { const image = new Image(); image.src = standingAtlas; }
  }, [home]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (query.matches && !locked.current) { clearTimeout(timer.current); setFrame(0); setPhase("standby"); }
      setReduced(query.matches);
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (reduced) { setFrame(0); if (!locked.current) setPhase("standby"); return; }
    let cancelled = false;
    let tick: ReturnType<typeof setTimeout>;
    const img = new Image();
    img.src = home ? greeting : outfits;
    img.decode().then(() => {
      if (cancelled || locked.current) return;
      let index = 0;
      setPhase("greeting");
      const advance = () => {
        if (cancelled || locked.current) return;
        setFrame(waveFrames[index++]);
        if (index < waveFrames.length) tick = setTimeout(advance, 140);
        else tick = setTimeout(() => { if (!locked.current) { setFrame(0); setPhase(home && (root.current?.matches(":hover") || root.current?.contains(document.activeElement)) ? "ready" : "standby"); } }, 140);
      };
      advance();
    }).catch(() => { /* The static first frame remains available if decoding fails. */ });
    return () => { cancelled = true; clearTimeout(tick); };
  }, [home, reduced, profile, wave]);

  // Timers must not navigate after leaving this component by another link.
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node) && !locked.current) { setOpen(false); setPhase("standby"); }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  const greet = () => {
    if (locked.current || phase === "greeting") return;
    if (reduced) { setPhase("ready"); return; }
    setPhase("greeting");
    setWave(value => value + 1);
  };
  const choose = (event: MouseEvent<HTMLAnchorElement>, slug: ProfileSlug, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    clearTimeout(timer.current);
    setTarget(slug);
    setPhase("transforming");
    // Reduced motion skips the visual effect while retaining explicit navigation.
    if (reduced) navigate(href);
    else timer.current = setTimeout(() => navigate(href), 900);
  };
  const close = () => { if (!locked.current) { setOpen(false); setPhase(current => current === "greeting" ? current : "standby"); } };
  const spriteStyle = home
    ? { backgroundImage: `url(${greeting})`, backgroundSize: "300% 200%", backgroundPosition: `${frame % 3 * 50}% ${Math.floor(frame / 3) * 100}%` }
    : { backgroundImage: `url(${outfits})`, backgroundSize: "600% 600%", backgroundPosition: `${frame * 20}% ${rows[profile] * 20}%` };

  return <div ref={root} data-interactive-mascot={profile} data-phase={phase} data-home-mascot={home || undefined}
    className={cn(home ? "mascot-selector relative h-72 w-full max-w-[26rem] sm:h-80" : "relative", className)}
    onPointerEnter={event => { if (event.pointerType === "mouse" && home && !locked.current) { setOpen(true); greet(); } }}
    onPointerLeave={() => { if (!root.current?.contains(document.activeElement)) close(); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) close(); }}
    onKeyDown={event => { if (event.key === "Escape" && !locked.current) { event.preventDefault(); event.stopPropagation(); close(); if (document.activeElement !== button.current) skipFocusOpen.current = true; button.current?.focus(); } }}>
    <button ref={button} type="button" aria-label={t(home ? "Greet Culichi and choose an outfit" : "Greet Culichi")}
      aria-expanded={home ? open : undefined} aria-controls={home && open ? id : undefined} aria-disabled={phase === "transforming"}
      onFocus={() => { if (skipFocusOpen.current) { skipFocusOpen.current = false; return; } if (home && !locked.current) setOpen(true); }}
      onClick={() => { if (locked.current) return; if (home) setOpen(true); greet(); }}
      onPointerEnter={event => { if (!home && event.pointerType === "mouse") greet(); }}
      className={cn("group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary", home ? "absolute bottom-6 left-1/2 w-36 -translate-x-1/2 sm:w-40" : "block w-full")}>
      <span className={cn("relative block", phase === "transforming" && "mascot-transform")}>
        <span aria-hidden data-mascot={profile} data-full-body data-mascot-scene="entry" data-scene-profile={profile} data-greeting-frame={frame}
          className="mascot-source block aspect-square w-full bg-no-repeat" style={spriteStyle} />
        {target && <span aria-hidden className="mascot-target absolute inset-0"><CulichiBody profile={target} className="w-full" /></span>}
        {phase === "transforming" && <span aria-hidden className="mascot-flash pointer-events-none absolute inset-0 rounded-full" />}
      </span>
    </button>
    {home && open && <nav id={id} aria-label={t("Choose Culichi's outfit")} data-outfit-selector>
      {professionalProfiles.map((area, i) => <Link key={area.slug} to={area.href} onClick={event => choose(event, area.slug, area.href)} aria-disabled={phase === "transforming"}
        data-outfit={area.slug} className="mascot-outfit absolute z-10 flex w-[4.8rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl px-1 py-2 text-center text-[10px] leading-tight text-foreground outline-none hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary sm:w-[5.6rem] sm:text-xs"
        style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%` }}>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-background/90 shadow-[0_0_12px_hsl(var(--primary)/0.15)]"><area.icon className="h-4 w-4 text-primary" aria-hidden /></span>
        {t(shortNames[i])}
      </Link>)}
    </nav>}
    <p role="status" aria-live="polite" className={cn("text-center text-[10px] text-primary sm:text-xs", home ? "absolute bottom-0 left-0 w-full" : "mt-2")}>
      {phase === "transforming" ? t("Changing outfit…") : t(home ? "Meet Culichi · choose your area" : "Greet Culichi")}
    </p>
  </div>;
};
export default InteractiveMascot;
