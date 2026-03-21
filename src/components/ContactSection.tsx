import { useState, useEffect } from "react";

const commands = [
  { cmd: 'contact --email', response: 'christian@culichi.lat', href: 'mailto:christian@culichi.lat' },
  { cmd: 'contact --github', response: 'github.com/ByCulichi', href: 'https://github.com/ByCulichi/ByCulichi' },
  { cmd: 'contact --linkedin', response: 'linkedin.com/in/culichi', href: 'https://www.linkedin.com/in/culichi/?locale=es_ES' },
  { cmd: 'whoami', response: 'culichi@security-ops ~ $', href: null },
];

const ContactSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleLines(count);
            if (count >= commands.length) clearInterval(interval);
          }, 600);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("contact-terminal");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold mb-2 neon-text">
          {">"} contact
        </h2>
        <div className="w-16 h-0.5 bg-primary/40 mb-8" />

        <div
          id="contact-terminal"
          className="max-w-2xl mx-auto panel-glow p-6 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-warning/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-2">terminal — contact.sh</span>
          </div>

          <div className="space-y-3">
            {commands.map((item, i) => (
              <div key={i} className={`transition-opacity duration-500 ${i < visibleLines ? "opacity-100" : "opacity-0"}`}>
                <div className="text-muted-foreground">
                  <span className="text-primary">$</span> {item.cmd}
                </div>
                <div className="text-foreground ml-4 mt-0.5">→ {item.response}</div>
              </div>
            ))}
            <div className="text-muted-foreground">
              <span className="text-primary">$</span>{" "}
              <span className="animate-blink text-primary">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
