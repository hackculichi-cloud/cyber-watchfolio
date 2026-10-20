import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { copperCircuitGeometry } from "./copperCircuitGeometry";
import "./CopperConductorTitle.css";

/** A slow, pausable dotted current feeds copper letters and returns to the AC supply. */
export default function CopperConductorTitle({ text, variant = "hero" }: { text: string; variant?: "hero" | "brand" }) {
  const compact = variant === "brand";
  const Container = compact ? "span" : "div";
  const Heading = compact ? "span" : "h1";
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const title = useRef<HTMLSpanElement>(null);
  const source = useRef<SVGSVGElement>(null);
  const wires = useRef<SVGSVGElement>(null);
  const haloId = `copper-load-${useId().replace(/:/g, "")}`;
  const glyphCount = Array.from(text.replace(/\s/g, "")).length;
  const words = text.split(/(\s+)/);
  const loadWord = compact ? 0 : words.findIndex(word => word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith("electric"));
  let glyphIndex = 0;

  useLayoutEffect(() => {
    const element = title.current;
    if (!element || !source.current || !wires.current) return;
    let active = true;
    const measure = () => {
      if (!active || !source.current || !wires.current) return;
      const letters = [...element.querySelectorAll<HTMLElement>(".copper-conductor-glyph")];
      if (!letters.length) return;
      const box = element.getBoundingClientRect(), supply = source.current.getBoundingClientRect();
      const font = parseFloat(getComputedStyle(element).fontSize);
      const glyphs = letters.map(letter => {
        const rect = letter.getBoundingClientRect();
        const ink = letter.querySelector<SVGTextElement>(".copper-cable-core")!.getBBox();
        return { left: rect.left - box.left + ink.x, right: rect.left - box.left + ink.x + ink.width,
          top: rect.top - box.top, bottom: rect.bottom - box.top, y: rect.top - box.top + font * .82 };
      });
      const geometry = copperCircuitGeometry(glyphs, { x: supply.right - box.left - supply.width * 4 / 64,
        feedY: supply.top - box.top + supply.height * 20 / 64, returnY: supply.top - box.top + supply.height * 45 / 64 }, box.width, box.height, font);
      wires.current.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      wires.current.dataset.connectionCount = String(Math.max(0, letters.length - 1));
      wires.current.dataset.lineConnections = String(geometry.wraps);
      wires.current.querySelectorAll("[data-feed-path]").forEach(path => path.setAttribute("d", geometry.feed));
      wires.current.querySelectorAll("[data-connection-path]").forEach(path => path.setAttribute("d", geometry.connections));
      wires.current.querySelectorAll("[data-return-path]").forEach(path => path.setAttribute("d", geometry.returning));
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

  return <Container className={compact ? "copper-heading copper-heading--brand" : "copper-heading min-w-0 max-w-4xl"}>
    <Heading className={compact ? undefined : "break-words text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl"}>
    <span ref={title} data-copper-title={compact ? undefined : ""} data-copper-wordmark={compact ? "" : undefined} data-in-view="false" data-motion-paused={compact || paused} className="copper-conductor-title">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" data-copper-source className="copper-conductor-source">
      <svg ref={source} viewBox="0 0 64 64">
        <title>{t("Alternating current supply")}</title>
        <path className="copper-source-lead" d="M50 20h10M50 45h10" />
        <rect className="copper-source-case" x="5" y="5" width="48" height="50" rx="9" />
        <rect className="copper-source-bevel" x="8" y="8" width="42" height="44" rx="7" />
        <circle className="copper-source-rotor" cx="29" cy="28" r="15" />
        <path className="copper-source-wave" d="M18 28c3-10 7-10 11 0s8 10 11 0" />
        <path className="copper-source-vents" d="M19 47h4m4 0h4m4 0h4M29 10v3m0 30v-3M11 28h3m33 0h-3" />
        <g className="copper-source-terminals"><circle cx="60" cy="20" r="2.3" /><circle cx="60" cy="45" r="2.3" /></g>
        <g className="copper-source-screws"><circle cx="12" cy="12" r="1.2" /><circle cx="46" cy="12" r="1.2" /><circle cx="12" cy="48" r="1.2" /><circle cx="46" cy="48" r="1.2" /></g>
      </svg>
      {!compact && <span>{t("AC")}</span>}
    </span>
    <svg ref={wires} aria-hidden="true" className="copper-conductor-wires" preserveAspectRatio="none">
      <g data-copper-feed><path data-feed-path className="copper-wire" /><path data-feed-path className="copper-feed-pulse" /></g>
      <g data-copper-connections><path data-connection-path className="copper-connection-edge" /><path data-connection-path className="copper-connection-core" /><path data-connection-path className="copper-connection-shine" /><path data-connection-path className="copper-connection-pulse" /></g>
      <g data-copper-return><path data-return-path className="copper-wire" /><path data-return-path className="copper-return-pulse" /></g>
    </svg>
    <span key={text} aria-hidden="true" data-electron-flow className="copper-conductor-visual">
      {words.map((word, wordIndex) => /\s/.test(word) ? word : <span key={wordIndex} className="copper-conductor-word">
        {Array.from(word).map((letter, letterIndex) => {
          const index = glyphIndex++;
          const isLoad = wordIndex === loadWord && letter.toLowerCase() === "i" && (!compact || letterIndex === word.length - 1);
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
              <defs><radialGradient id={haloId}><stop stopColor="#ffe695" stopOpacity=".8" /><stop offset="1" stopColor="#ffd14e" stopOpacity="0" /></radialGradient></defs>
              <ellipse className="copper-bulb-halo" cx="12" cy="10" rx="20" ry="21" fill={`url(#${haloId})`} />
              <path data-copper-bulb-rays className="copper-bulb-rays" d="M12-6v-4M0-1l-3-3M24-1l3-3M-3 10h-4m34 0h4M0 21l-3 3m27-3 3 3" />
              <path data-copper-bulb-glow className="copper-bulb-light" d="M12 2a8 8 0 0 0-6 13l2 3v4h8v-4l2-3a8 8 0 0 0-6-13Z" />
              <path className="copper-bulb-outline" d="M12 2a8 8 0 0 0-6 13l2 3v4h8v-4l2-3a8 8 0 0 0-6-13ZM8 25h8m-7 3h6M8 10l4 4 4-4m-4 4v7" />
            </svg></span>}
          </span>;
        })}
      </span>)}
    </span>
    </span>
    </Heading>
    {!compact && <button type="button" data-copper-motion aria-pressed={paused} aria-label={t(paused ? "Resume energy flow" : "Pause energy flow")} title={t(paused ? "Resume energy flow" : "Pause energy flow")} onClick={() => setPaused(value => !value)} className="copper-motion-control">
      <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 11 7-11 7Z" /> : <path d="M8 5v14m8-14v14" />}</svg>
    </button>}
  </Container>;
}
