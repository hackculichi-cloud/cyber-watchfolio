import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Photo collections stay unmounted until explicitly requested. */
const PhotoDisclosure = ({ title, count, children }: { title: string; count: number; children: ReactNode }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!count) return null;
  const label = t(open ? "Hide photos" : "View photos");
  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" className="h-auto min-h-10 max-w-full whitespace-normal text-left" aria-expanded={open} aria-controls={id} aria-label={`${label}: ${t(title)}`} onClick={() => setOpen(value => !value)}>
        {label} ({count})
        <ChevronDown className={`ml-2 h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden />
      </Button>
      <div id={id} hidden={!open}>{open && children}</div>
    </div>
  );
};
export default PhotoDisclosure;
