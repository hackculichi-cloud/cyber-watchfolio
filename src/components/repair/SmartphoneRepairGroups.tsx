import { useRef, useState } from "react";
import { ArrowUpRight, Images } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import SmartImage from "@/components/shared/SmartImage";
import { photoPreview } from "@/lib/photoPreview";
import SmartphoneRepairCard from "./SmartphoneRepairCard";
import { smartphoneRepairs, plannedSmartphoneRepairs, type SmartphoneRepair } from "@/data/smartphoneRepair";

// Covers come from the owner's assigned case photos; an internal view is not a claimed final result.
const covers: Record<string, string> = {
  "sr-001": "/images/repair/repair-photo-11.jpg",
  "sr-002": "/images/repair/repair-photo-12.jpg",
  "sr-003": "/images/repair/repair-photo-10.jpg",
};

/** Real jobs are visible immediately. One selection opens photos, with technical details optional. */
export default function SmartphoneRepairGroups() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<SmartphoneRepair | null>(null);
  const [filter, setFilter] = useState("All repairs");
  const trigger = useRef<HTMLButtonElement | null>(null);
  const cases = smartphoneRepairs.filter(repair => filter === "All repairs" || repair.repairType === filter);
  return <div id="smartphone-repair-groups" className="space-y-6">
    <div role="group" aria-label={t("Filter repairs")} className="flex flex-wrap justify-center gap-2">
      {[["All repairs", "All"], ["Battery replacement", "Battery"], ["Screen replacement", "Screen"]].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`min-h-11 rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${filter === value ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/50"}`}>{t(label)}</button>)}
    </div>
    <div data-repair-showcase className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map(repair => {
        const cover = repair.photos?.find(photo => photo.src === covers[repair.id]) ?? repair.photos?.[0];
        return <button key={repair.id} type="button" data-repair-group={repair.id} onClick={event => { trigger.current = event.currentTarget; setSelected(repair); }} aria-label={`${t("View repair")}: ${repair.device}`} className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {cover?.src && <SmartImage {...photoPreview(cover.src, "(min-width:1024px) 380px, (min-width:640px) 44vw, 90vw")} alt={cover.alt} className="aspect-[4/3] w-full" />}
          <span className="flex flex-col items-center gap-2 p-5 text-center">
            <span className="text-lg font-semibold">{repair.device}</span>
            <span className="text-sm text-primary">{t(repair.repairType)}</span>
            <span className="mt-1 flex w-full items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Images className="h-4 w-4" aria-hidden />{t("{count} photos").replace("{count}", String(repair.photos?.length ?? 0))}</span><span className="inline-flex items-center gap-1.5 font-semibold text-foreground">{t("View repair")}<ArrowUpRight className="h-4 w-4" aria-hidden /></span></span>
          </span>
        </button>;
      })}
    </div>
    {plannedSmartphoneRepairs.length > 0 && <details className="mx-auto max-w-3xl rounded-xl border border-border px-4 text-sm text-muted-foreground">
      <summary className="cursor-pointer py-4 font-medium">{t("Upcoming repairs")} ({plannedSmartphoneRepairs.length})</summary>
      <ul className="space-y-3 pb-4">{plannedSmartphoneRepairs.map(plan => <li key={plan.id} data-planned-repair={plan.id}><span className="font-medium text-foreground">{plan.device}</span> · {t(plan.repairType)} · {t("Planned")}</li>)}</ul>
    </details>}
    <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
      <DialogContent data-repair-dialog className="max-h-[92dvh] max-w-5xl overflow-y-auto p-4 sm:p-6" onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }); }}>
        {selected && <>
          <div className="flex items-start gap-3 pr-10"><div className="min-w-0 flex-1"><DialogTitle>{selected.device}</DialogTitle><DialogDescription className="mt-2">{t(selected.repairType)}</DialogDescription></div><LanguageSwitcher compact /></div>
          <SmartphoneRepairCard repair={selected} />
        </>}
      </DialogContent>
    </Dialog>
  </div>;
}
