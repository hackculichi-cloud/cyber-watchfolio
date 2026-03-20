import { useEffect, useState } from "react";

const levels = [
  { label: "LOW", color: "bg-primary", textColor: "text-primary" },
  { label: "MEDIUM", color: "bg-warning", textColor: "text-warning" },
  { label: "HIGH", color: "bg-destructive", textColor: "text-destructive" },
] as const;

const ThreatLevel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % levels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const level = levels[current];

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded border border-border bg-secondary/50 text-xs">
      <span className="text-muted-foreground uppercase tracking-wider">Threat Level:</span>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${level.color} animate-pulse-glow`} />
        <span className={`font-bold tracking-wider ${level.textColor}`}>{level.label}</span>
      </div>
      <div className="flex gap-0.5 ml-2">
        {levels.map((_, i) => (
          <div
            key={i}
            className={`w-4 h-1.5 rounded-sm transition-colors duration-500 ${
              i <= current ? level.color : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreatLevel;
