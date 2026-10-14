import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import SmartphoneRepairCard from "./SmartphoneRepairCard";
import { smartphoneRepairs, plannedSmartphoneRepairs, type SmartphoneBrand, type SmartphoneRepairType } from "@/data/smartphoneRepair";

const RepairGroup = ({ label, group, children, documented = 0, planned = 0 }: { label: string; group: string; children: ReactNode; documented?: number; planned?: number }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <details data-repair-group={group} className="rounded-xl border border-border bg-surface/40" onToggle={event => setOpen(event.currentTarget.open)}>
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1 font-semibold">{t(label)}</span>
        <span className="flex flex-wrap justify-end gap-1.5">
          {documented > 0 && <Tag variant="primary">{t("Documented: {count}").replace("{count}", String(documented))}</Tag>}
          {planned > 0 && <Tag>{t("Planned: {count}").replace("{count}", String(planned))}</Tag>}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden />
      </summary>
      {open && <div className="space-y-3 border-t border-border p-3 sm:p-4">{children}</div>}
    </details>
  );
};

const brands: SmartphoneBrand[] = ["iPhone", "Samsung"];
const repairTypes: { type: SmartphoneRepairType; label: string; key: string }[] = [
  { type: "Screen replacement", label: "Display / Screen", key: "screen" },
  { type: "Battery replacement", label: "Battery", key: "battery" },
];

/** Brand → repair type → model. Future jobs remain separate from documented repairs. */
const SmartphoneRepairGroups = () => {
  const { t } = useLanguage();
  return (
    <div id="smartphone-repair-groups" className="space-y-4">
      {brands.map(brand => {
        const documented = smartphoneRepairs.filter(repair => repair.brand === brand);
        const planned = plannedSmartphoneRepairs.filter(repair => repair.brand === brand);
        return <RepairGroup key={brand} label={brand} group={brand} documented={documented.length} planned={planned.length}>
          {repairTypes.map(({ type, label, key }) => {
            const cases = documented.filter(repair => repair.repairType === type);
            const plans = planned.filter(repair => repair.repairType === type);
            return <RepairGroup key={type} label={label} group={`${brand}-${key}`} documented={cases.length} planned={plans.length}>
              {cases.map(repair => <RepairGroup key={repair.id} label={repair.device} group={repair.id} documented={1}>
                <SmartphoneRepairCard repair={repair} />
              </RepairGroup>)}
              {plans.map(plan => <div key={plan.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium">{plan.device}</p><Tag>{t("Planned")}</Tag>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t("Upcoming repair. Results and photographic evidence will be added after the work is completed.")}</p>
              </div>)}
              {!cases.length && !plans.length && <p className="text-sm text-muted-foreground">{t("No repairs recorded in this category yet.")}</p>}
            </RepairGroup>;
          })}
        </RepairGroup>;
      })}
    </div>
  );
};
export default SmartphoneRepairGroups;
