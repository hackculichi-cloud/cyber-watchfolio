import { ReactNode } from "react";

interface SectionBlockProps {
  title: string;
  children: ReactNode;
  /** If false the block renders nothing. Use for auto-hide when data is empty. */
  show?: boolean;
}

const SectionBlock = ({ title, children, show = true }: SectionBlockProps) => {
  if (!show) return null;
  return (
    <section className="space-y-2">
      <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider">
        {">"} {title}
      </h3>
      <div className="w-8 h-px bg-primary/40 mb-2" />
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  );
};

export default SectionBlock;
