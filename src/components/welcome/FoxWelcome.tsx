import { useCallback, useEffect, useRef, useState } from "react";
import { Play, ArrowRight, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import "./FoxWelcome.css";

const SEEN_KEY = "culichi-welcome-seen";
const ART = "/images/welcome/culichi-electrical-sprite.webp";
const MOBILE_ART = "/images/welcome/culichi-electrical-sprite-mobile.webp";
const FALLBACK = "/images/mascot-scenes/electrical-leaning.webp";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const seenWelcome = () => { try { return localStorage.getItem(SEEN_KEY) === "1"; } catch { return false; } };

/** A short, replayable first-visit greeting; all artwork is decorative, not repair evidence. */
export default function FoxWelcome() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const [open, setOpen] = useState(() => !hash && !seenWelcome());
  const [reduced, setReduced] = useState(reducedMotion);
  const [stage, setStage] = useState<"measuring" | "welcome">(() => reducedMotion() ? "welcome" : "measuring");
  const [ready, setReady] = useState(false);
  const [artFailed, setArtFailed] = useState(false);
  const [artSrc, setArtSrc] = useState("");
  const [connected, setConnected] = useState(false);
  const replay = useRef<HTMLButtonElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const returnToReplay = useRef(false);
  const previousHash = useRef(hash);

  const finish = useCallback(() => {
    try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* The current visit remains usable if storage is unavailable. */ }
    setOpen(false);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { setReduced(preference.matches); if (preference.matches) setStage("welcome"); };
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    const changed = hash !== previousHash.current;
    previousHash.current = hash;
    // An intentional replay is also available after following a Home deep link.
    if (changed && open) finish();
  }, [hash, open, finish]);
  useEffect(() => {
    if (!open || !ready || reduced) return;
    const measurement = window.setTimeout(() => setConnected(true), 1700);
    const greeting = window.setTimeout(() => setStage("welcome"), 2600);
    const complete = window.setTimeout(finish, 4800);
    return () => { window.clearTimeout(measurement); window.clearTimeout(greeting); window.clearTimeout(complete); };
  }, [open, ready, reduced, finish]);

  const repeat = () => {
    returnToReplay.current = true;
    setStage(reduced ? "welcome" : "measuring");
    setConnected(false);
    setOpen(true);
  };

  return <>
    <button ref={replay} type="button" onClick={repeat} className="welcome-replay inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Play className="h-4 w-4" aria-hidden />{t("Replay welcome")}</button>
    <Dialog open={open} onOpenChange={value => { if (!value) finish(); }}>
      <DialogContent data-fox-welcome data-profile="electrical" data-stage={stage} data-ready={String(ready)} data-reduced-motion={String(reduced)} data-measurement={connected || stage === "welcome" ? "complete" : "pending"} className="fox-welcome" onPointerDownOutside={event => event.preventDefault()} onInteractOutside={event => event.preventDefault()} onOpenAutoFocus={event => { event.preventDefault(); skip.current?.focus({ preventScroll: true }); }} onCloseAutoFocus={event => { event.preventDefault(); if (returnToReplay.current) replay.current?.focus({ preventScroll: true }); returnToReplay.current = false; }}>
        <DialogTitle className="sr-only">{t("Culichi welcomes you")}</DialogTitle>
        <DialogDescription className="sr-only">{t("Culichi measures a practice circuit, then welcomes you to his portfolio.")}</DialogDescription>
        <div className="welcome-topline"><span>CULICHI <span aria-hidden> / </span>{t("The workshop")}</span><button ref={skip} type="button" onClick={finish} className="welcome-skip"><X className="h-4 w-4" aria-hidden />{t("Skip welcome")}</button></div>
        <div className="welcome-scene" aria-hidden="true">
          <div className="welcome-halo" />
          <div className="welcome-circuit-lines"><span /><span /><span /></div>
          <div className="welcome-fox-position">
            {artFailed ? <img src={FALLBACK} alt="" className="welcome-fallback" /> : <div className="welcome-fox-sprite" style={{ backgroundImage: artSrc ? `url(${artSrc})` : undefined }} />}
            <picture className="welcome-art-loader"><source media="(max-width:639px)" srcSet={MOBILE_ART} /><img src={ART} alt="" width={1} height={1} decoding="async" fetchPriority="high" onLoad={event => { setArtSrc(event.currentTarget.currentSrc); setReady(true); }} onError={() => { setArtFailed(true); setReady(true); }} /></picture>
          </div>
          <div className="welcome-bench">
            <div className="welcome-meter"><span className="welcome-meter-label">DC <span>V</span></span><span className="welcome-reading">{connected || stage === "welcome" ? "9.02" : "0.00"}</span></div>

            <div className="welcome-board"><span className="welcome-board-trace" /><span className="welcome-testpoint welcome-testpoint-red" /><span className="welcome-testpoint welcome-testpoint-black" /><span className="welcome-battery">9V <i>+</i></span><span className="welcome-led" /></div>
          </div>
          <div className="welcome-stage-floor" />
        </div>
        <div className="welcome-copy" role="status" aria-live="polite" aria-atomic="true">
          <p className="welcome-kicker">{t(stage === "measuring" ? "A moment in the workshop…" : "Everything starts with curiosity")}</p>
          <p className="welcome-headline">{t(stage === "measuring" ? "Making a connection." : "Welcome!")}</p>
          <p className="welcome-message">{t(stage === "measuring" ? "A measurement, a little curiosity…" : "I’m Culichi. Come see what I build.")}</p>
        </div>
        <button type="button" className="welcome-enter" onClick={finish}>{t("Enter portfolio")}<ArrowRight className="h-4 w-4" aria-hidden /></button>
      </DialogContent>
    </Dialog>
  </>;
}
