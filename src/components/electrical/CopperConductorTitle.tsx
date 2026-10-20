import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import "./CopperConductorTitle.css";

/** A slow, pausable dotted current feeds copper letters and returns to the AC supply. */
export default function CopperConductorTitle({ text }: { text: string }) {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const title = useRef<HTMLSpanElement>(null);
  const source = useRef<SVGSVGElement>(null);
  const wires = useRef<SVGSVGElement>(null);
  const glyphCount = Array.from(text.replace(/\s/g, "")).length;
  const words = text.split(/(\s+)/);
  const loadWord = words.findIndex(word => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith("electric"));
  let glyphIndex = 0;

  useLayoutEffect(() => {
    const element = title.current;
    if (!element || !source.current || !wires.current) return;
    let active = true;
    const measure = () => {
      if (!active || !source.current || !wires.current) return;
      const first = element.querySelector<HTMLElement>(".copper-conductor-glyph");
      const last = element.querySelector<HTMLElement>("[data-electron-terminal]")?.parentElement;
      if (!first || !last) return;
      const box = element.getBoundingClientRect(), start = first.getBoundingClientRect(), end = last.getBoundingClientRect(), supply = source.current.getBoundingClientRect();
      const font = parseFloat(getComputedStyle(element).fontSize);
      const sourceY = supply.top - box.top + supply.height / 2;
      const sourceLeft = supply.left - box.left + supply.width / 8;
      const sourceRight = supply.left - box.left + supply.width * 7 / 8;
      const startX = start.left - box.left + Math.min(2, start.width / 6);
      const startY = start.top - box.top + font * .65;
      const endX = end.left - box.left + end.width / 2, endY = end.top - box.top + font * .9;
      const bottom = box.height - 2, left = 1, radius = Math.min(4, font * .12);
      const feed = `M${sourceRight} ${sourceY}H${startX}V${startY}`;
      const returning = `M${endX} ${endY}V${bottom - radius}Q${endX} ${bottom} ${endX - radius} ${bottom}H${left + radius}Q${left} ${bottom} ${left} ${bottom - radius}V${sourceY}H${sourceLeft}`;
      wires.current.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      wires.current.querySelectorAll("[data-feed-path]").forEach(path => path.setAttribute("d", feed));
      wires.current.querySelectorAll("[data-return-path]").forEach(path => path.setAttribute("d", returning));
    };
    measure();
    const observer = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    observer?.observe(element);
    const last = element.querySelector("[data-electron-terminal]")?.parentElement;
    if (last) observer?.observe(last);
    window.addEventListener("resize", measure, { passive: true });
    void document.fonts?.ready.then(measure);
    return () => { active = false; observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, [text]);

  useEffect(() => {
    const element = title.current;
    if (!element) return;
    element.dataset.inView = "false";
    if (!("IntersectionObserver" in window)) {
      element.dataset.inView = "true";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  return <div className="copper-heading min-w-0 max-w-4xl">
    <h1 className="break-words text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl">
    <span ref={title} data-copper-title data-in-view="false" data-motion-paused={paused} className="copper-conductor-title">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" data-copper-source className="copper-conductor-source">
      <svg ref={source} viewBox="0 0 40 40">
        <rect className="copper-source-disc" x="3" y="3" width="34" height="34" rx="6" />
        <path d="M5 20h5m20 0h5M12 9c6 0 6 7 0 7 6 0 6 8 0 8 6 0 6 7 0 7M28 9c-6 0-6 7 0 7-6 0-6 8 0 8-6 0-6 7 0 7M19 9v22m3-22v22" />
      </svg>
      <span>{t("AC")}</span>
    </span>
    <svg ref={wires} aria-hidden="true" className="copper-conductor-wires" preserveAspectRatio="none">
      <g data-copper-feed><path data-feed-path className="copper-wire" /><path data-feed-path className="copper-feed-pulse" /></g>
      <g data-copper-return><path data-return-path className="copper-wire" /><path data-return-path className="copper-return-pulse" /></g>
    </svg>
    <span key={text} aria-hidden="true" data-electron-flow className="copper-conductor-visual">
      {words.map((word, wordIndex) => /\s/.test(word) ? word : <span key={wordIndex} className="copper-conductor-word">
        {Array.from(word).map((letter, letterIndex) => {
          const index = glyphIndex++;
          const isLoad = wordIndex === loadWord && letter.toLowerCase() === "i";
          const glyph = isLoad ? "ı" : letter;
          const style = { "--electron-delay": `${600 + Math.round(index * 6000 / Math.max(1, glyphCount - 1))}ms` } as CSSProperties;
          return <span key={letterIndex} className="copper-conductor-glyph" style={style}>
            {glyph}<svg className="copper-glyph-strands" aria-hidden="true">
              <text x="0" y="1em" className="copper-cable-edge">{glyph}</text>
              <text x="0" y="1em" className="copper-cable-core">{glyph}</text>
              <text x="0" y="1em" className="copper-cable-shine">{glyph}</text>
              <text x="0" y="1em" className="copper-electron" data-electron-terminal={index === glyphCount - 1 ? "true" : undefined}>{glyph}</text>
            </svg>
            {isLoad && <span data-copper-load className="copper-conductor-load"><svg viewBox="0 0 24 32">
              <path data-copper-bulb-glow className="copper-bulb-light" d="M12 2a8 8 0 0 0-6 13l2 3v4h8v-4l2-3a8 8 0 0 0-6-13Z" />
              <path className="copper-bulb-outline" d="M12 2a8 8 0 0 0-6 13l2 3v4h8v-4l2-3a8 8 0 0 0-6-13ZM8 25h8m-7 3h6M8 10l4 4 4-4m-4 4v7" />
            </svg></span>}
          </span>;
        })}
      </span>)}
    </span>
    </span>
    </h1>
    <button type="button" data-copper-motion aria-pressed={paused} aria-label={t(paused ? "Resume energy flow" : "Pause energy flow")} title={t(paused ? "Resume energy flow" : "Pause energy flow")} onClick={() => setPaused(value => !value)} className="copper-motion-control">
      <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 11 7-11 7Z" /> : <path d="M8 5v14m8-14v14" />}</svg>
    </button>
  </div>;
}
