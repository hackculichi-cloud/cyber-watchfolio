import { useEffect, useRef, useState } from "react";
import { Activity, FlaskConical, Shield, Wrench } from "lucide-react";

const metrics = [
  { icon: Activity, label: "Security Events Investigated", value: 1240, suffix: "+", accent: "text-primary" },
  { icon: FlaskConical, label: "Labs Completed", value: 38, suffix: "", accent: "text-primary" },
  { icon: Shield, label: "Detection Rules Created", value: 47, suffix: "", accent: "text-primary" },
  { icon: Wrench, label: "Security Tools Used", value: 22, suffix: "+", accent: "text-primary" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

const MetricsDashboard = () => {
  return (
    <section
      aria-label="SOC metrics dashboard"
      className="relative bg-background/85 backdrop-blur-sm border-y border-border/60"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            soc_metrics.live
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
            <span>uptime</span>
            <span className="text-primary">99.98%</span>
            <span className="text-border">|</span>
            <span>last_sync</span>
            <span className="text-primary">just now</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="panel-glow p-4 flex flex-col gap-2 transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="flex items-center justify-between">
                <m.icon className="w-4 h-4 text-primary" />
                <span className="text-[9px] text-muted-foreground tracking-widest">LIVE</span>
              </div>
              <div className={`font-display text-2xl md:text-3xl font-bold ${m.accent}`}>
                <Counter target={m.value} suffix={m.suffix} />
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
