import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import "./CodeExecutionTitle.css";

/** Static lettering for the brand: route/preview changes never run a typing loop. */
export function CodeWordmark() {
  return <span data-code-wordmark className="code-wordmark"><span aria-hidden="true">&lt;</span>Culichi<span aria-hidden="true">/&gt;</span></span>;
}

/** A short code-inspired sequence; the heading remains readable throughout. */
export default function CodeExecutionTitle({ text }: { text: string }) {
  const { t } = useLanguage();
  const element = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) { node.dataset.inView = "true"; return; }
    const observer = new IntersectionObserver(([entry]) => { node.dataset.inView = String(entry.isIntersecting); }, { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const words = text.split(" ");
  const finalWord = words.pop();
  return <div ref={element} data-code-title data-in-view="false" data-motion-paused={paused} className="code-title-console">
    <div className="code-title-toolbar">
      <span aria-hidden="true" className="code-window-dots"><i /><i /><i /></span>
      <span aria-hidden="true" className="code-title-filename">culichi.tsx</span>
      <button type="button" data-code-motion aria-pressed={paused} aria-label={t(paused ? "Resume code animation" : "Pause code animation")} title={t(paused ? "Resume code animation" : "Pause code animation")} onClick={() => setPaused(value => !value)} className="code-motion-button">{paused ? <Play aria-hidden /> : <Pause aria-hidden />}</button>
    </div>
    <div className="code-title-body">
      <span aria-hidden="true" className="code-title-declaration"><span>export</span> <span>default</span></span>
      <h1 className="code-title-heading"><span className="sr-only">{text}</span><span aria-hidden="true" className="code-title-readable"><span className="code-title-bracket">&lt;</span><span>{words.join(" ")}<br /><strong>{finalWord}</strong></span><span className="code-title-bracket">/&gt;</span></span></h1>
      <div aria-hidden="true" className="code-title-command"><span className="code-prompt">❯</span><code>build(<span>"ideas"</span>);</code><span className="code-title-cursor" /></div>
      <div aria-hidden="true" className="code-build-flow"><span className="code-build-step">UI</span><i className="code-build-link" /><span className="code-build-step">API</span><i className="code-build-link" /><span className="code-build-step">APP</span></div>
    </div>
  </div>;
}
