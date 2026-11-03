import { forwardRef } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

type Props = {
  kind: "tools" | "training";
  icon: LucideIcon;
  title: string;
  detail: string;
  label: string;
  onOpen: () => void;
};

/** The whole compact tile opens the collection, including its title and count. */
const ElectricalCollectionAccess = forwardRef<HTMLButtonElement, Props>(({ kind, icon: Icon, title, detail, label, onOpen }, ref) => (
  <h2 className="h-full">
    <button ref={ref} type="button" {...(kind === "tools" ? { "data-open-electrical-tools": "" } : { "data-open-electrical-training": "" })}
      onClick={onOpen} aria-expanded={false} aria-label={label} aria-describedby={`electrical-${kind}-summary`}
      className="electrical-collection-access group flex min-h-28 w-full items-center gap-4 rounded-xl border border-primary/25 bg-card p-5 text-left transition-colors hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" aria-hidden /></span>
      <span className="min-w-0 flex-1"><span className="block text-lg font-semibold tracking-tight">{title}</span><span id={`electrical-${kind}-summary`} className="mt-1 block text-sm font-normal text-muted-foreground">{detail}</span></span>
      <ChevronRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
    </button>
  </h2>
));
ElectricalCollectionAccess.displayName = "ElectricalCollectionAccess";
export default ElectricalCollectionAccess;
