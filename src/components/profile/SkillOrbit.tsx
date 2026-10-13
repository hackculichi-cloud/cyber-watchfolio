import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { professionalProfiles } from "@/data/profiles";
import { Button } from "@/components/ui/button";
import ProfileBubble from "./ProfileBubble";
import logo from "@/assets/culichi-logo-zorro.png";
import { useLanguage } from "@/i18n/LanguageProvider";

const subscribeToMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const subscribeToCompact = (callback: () => void) => {
  const media = window.matchMedia("(max-width: 639px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getCompact = () => window.matchMedia("(max-width: 639px)").matches;
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SkillOrbit = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const compact = useSyncExternalStore(subscribeToCompact, getCompact, () => true);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, () => true);
  return <div className="skill-orbit" data-paused={paused || reducedMotion || activeIndex !== null}>
    <div className="orbit-stage mx-auto" role="group" aria-label={t("Explore technical fields")}>
      <div className="orbit-track" aria-hidden /><div className="orbit-track orbit-track-inner" aria-hidden />
      <div className="orbit-center" aria-hidden>
        <img src={logo} alt="" width={112} height={112} className="h-16 w-16 object-contain sm:h-28 sm:w-28" />
      </div>
      {professionalProfiles.map((profile, index) => <div key={profile.slug} className="orbit-arm" style={{ "--orbit-angle": `${index * 360 / professionalProfiles.length}deg` } as CSSProperties}>
        <div className="orbit-counter" data-profile={profile.slug}>
          <ProfileBubble compact={compact} profile={profile} open={activeIndex === index} onSelect={() => setActiveIndex(index)} onDismiss={() => setActiveIndex((current) => current === index ? null : current)} />
        </div>
      </div>)}
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
      <Button className="orbit-motion-control" type="button" variant="outline" size="sm" onClick={() => setPaused((value) => !value)} disabled={reducedMotion} aria-pressed={paused || reducedMotion}>
        {paused || reducedMotion ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
        {t(reducedMotion ? "Reduced motion enabled" : paused ? "Resume rotation" : "Pause rotation")}
      </Button>
      <p className="text-center text-xs text-muted-foreground">{t("Hover, focus or tap an icon to preview its area.")}</p>
    </div>
  </div>;
};
export default SkillOrbit;
