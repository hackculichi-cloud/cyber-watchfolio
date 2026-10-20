import { useEffect, useId, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import "./ElectricalTitleCircuit.css";

/** Small AC diagram: a closed line/load/neutral loop, with a finite alternating pulse. */
export default function ElectricalTitleCircuit() {
  const { t } = useLanguage();
  const titleId = useId();
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      element.dataset.inView = "true";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <figure ref={figure} data-title-circuit data-in-view="false" className="electrical-title-circuit">
    <svg viewBox="0 0 360 120" width={360} height={120} role="img" aria-labelledby={titleId}>
      <title id={titleId}>{t("AC circuit: line, load and neutral")}</title>
      <path className="circuit-line-wire" d="M43 42V24H317V42" />
      <path className="circuit-neutral-wire" d="M317 78V96H43V78" />
      <circle className="circuit-source" cx={43} cy={60} r={18} />
      <path className="circuit-source-wave" d="M32 60c4-12 7-12 11 0s7 12 11 0" />
      <circle className="circuit-load" cx={317} cy={60} r={18} />
      <path className="circuit-load-filament" d="m306 49 22 22m0-22-22 22" />
      <circle className="circuit-terminal" cx={43} cy={24} r={2.5} />
      <circle className="circuit-terminal" cx={317} cy={24} r={2.5} />
      <circle className="circuit-neutral-terminal" cx={43} cy={96} r={2.5} />
      <circle className="circuit-neutral-terminal" cx={317} cy={96} r={2.5} />
      <circle className="circuit-charge circuit-line-charge" cx={73} cy={24} r={3.5} />
      <circle className="circuit-charge circuit-neutral-charge" cx={287} cy={96} r={3.5} />
      <text className="circuit-wire-label" x={180} y={15} textAnchor="middle">L · {t("Line")}</text>
      <text className="circuit-wire-label circuit-neutral-label" x={180} y={114} textAnchor="middle">N · {t("Neutral")}</text>
      <text className="circuit-ac-mark" x={180} y={57} textAnchor="middle">{t("AC")}</text>
      <text className="circuit-flow-label" x={180} y={75} textAnchor="middle">{t("Alternating flow")}</text>
      <text className="circuit-load-label" x={317} y={15} textAnchor="middle">{t("Load")}</text>
    </svg>
  </figure>;
}
