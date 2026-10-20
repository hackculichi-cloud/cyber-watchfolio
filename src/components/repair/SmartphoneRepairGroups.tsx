import { useState, type ReactNode } from "react";
import { BatteryCharging, PanelsTopLeft, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import Tag from "@/components/shared/Tag";
import SmartphoneRepairCard from "./SmartphoneRepairCard";
import { smartphoneRepairs, plannedSmartphoneRepairs, type SmartphoneBrand, type SmartphoneRepairType } from "@/data/smartphoneRepair";

const DeviceTile = ({ label, group, visual, selected, onSelect, documented = 0, planned = 0 }: { label: string; group: string; visual: ReactNode; selected: boolean; onSelect: () => void; documented?: number; planned?: number }) => {
  const { t } = useLanguage();
  return (
    <button type="button" data-repair-group={group} aria-expanded={selected} aria-controls={selected ? `repair-panel-${group}` : undefined} onClick={onSelect}
      className={`group overflow-hidden rounded-xl border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? "border-primary bg-primary/10" : "border-border bg-surface/60 hover:border-primary/60 hover:bg-primary/5"}`}>
      <span className="flex h-40 items-center justify-center bg-gradient-to-b from-primary/10 to-transparent px-3 sm:h-48">{visual}</span>
      <span className={`flex min-h-24 flex-col items-center justify-center gap-2 border-t border-border px-3 py-3 ${selected ? "bg-primary/15" : "bg-surface-2/40"}`}>
        <span className="flex items-center justify-center gap-2 font-semibold">{t(label)}<ChevronDown className={`h-4 w-4 shrink-0 ${selected ? "rotate-180" : ""}`} aria-hidden /></span>
        <span className="flex flex-wrap justify-center gap-1.5">
          {documented > 0 && <Tag variant="primary">{t("Documented: {count}").replace("{count}", String(documented))}</Tag>}
          {planned > 0 && <Tag>{t("Planned: {count}").replace("{count}", String(planned))}</Tag>}
        </span>
      </span>
    </button>
  );
};

const modelImages: Record<string, string> = {
  "sr-001": "iphone-12-pro", "sr-002": "iphone-14-pro", "sr-003": "iphone-xr",
  "planned-s21-ultra-screen": "galaxy-s21-ultra", "planned-a35-battery": "galaxy-a35",
};
const brands: SmartphoneBrand[] = ["iPhone", "Samsung"];
const repairTypes: { type: SmartphoneRepairType; label: string; key: string; icon: typeof BatteryCharging }[] = [
  { type: "Screen replacement", label: "Display / Screen", key: "screen", icon: PanelsTopLeft },
  { type: "Battery replacement", label: "Battery", key: "battery", icon: BatteryCharging },
];
const DeviceImage = ({ id }: { id: string }) => <img src={`/images/devices/${modelImages[id]}.svg`} alt="" aria-hidden className="h-full w-full max-w-64 object-contain" />;

/** Visual brand → repair type → model selectors, with one full-width detail panel. */
const SmartphoneRepairGroups = () => {
  const { t } = useLanguage();
  const [brand, setBrand] = useState<SmartphoneBrand | null>(null);
  const [typeKey, setTypeKey] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const documented = smartphoneRepairs.filter(repair => repair.brand === brand);
  const planned = plannedSmartphoneRepairs.filter(repair => repair.brand === brand);
  const type = repairTypes.find(item => item.key === typeKey);
  const cases = documented.filter(repair => repair.repairType === type?.type);
  const plans = planned.filter(repair => repair.repairType === type?.type);
  const selectedRepair = cases.find(repair => repair.id === deviceId);
  const selectedPlan = plans.find(repair => repair.id === deviceId);
  return (
    <div id="smartphone-repair-groups" className="space-y-6">
      <div className="grid max-w-3xl grid-cols-2 gap-3 sm:gap-5">
        {brands.map(item => <DeviceTile key={item} label={item} group={item} selected={brand === item}
          documented={smartphoneRepairs.filter(repair => repair.brand === item).length}
          planned={plannedSmartphoneRepairs.filter(repair => repair.brand === item).length}
          onSelect={() => { setBrand(brand === item ? null : item); setTypeKey(null); setDeviceId(null); }}
          visual={<span className="relative flex h-full w-full justify-center">
            <DeviceImage id={item === "iPhone" ? "sr-002" : "planned-s21-ultra-screen"} />
            <img src={`/images/devices/${item === "iPhone" ? "apple" : "samsung"}-logo.svg`} alt="" aria-hidden className={`absolute left-2 top-3 object-contain ${item === "iPhone" ? "h-6 w-6" : "h-6 w-20"}`} />
          </span>} />)}
      </div>
      {brand && <div id={`repair-panel-${brand}`} className="space-y-5 rounded-xl border border-primary/20 bg-surface/30 p-3 sm:p-5">
        <h4 className="text-lg font-semibold">{brand}</h4>
        <div className="grid max-w-2xl grid-cols-2 gap-3 sm:gap-4">
          {repairTypes.map(({ type: category, label, key, icon: Icon }) => <DeviceTile key={key} label={label} group={`${brand}-${key}`} selected={typeKey === key}
            documented={documented.filter(repair => repair.repairType === category).length}
            planned={planned.filter(repair => repair.repairType === category).length}
            onSelect={() => { setTypeKey(typeKey === key ? null : key); setDeviceId(null); }} visual={<Icon className="h-16 w-16 text-primary" strokeWidth={1.2} aria-hidden />} />)}
        </div>
        {type && <div id={`repair-panel-${brand}-${typeKey}`} className="space-y-5">
          <h5 className="text-base font-semibold text-primary">{t(type.label)}</h5>
          <div className="grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-3">
            {cases.map(repair => <DeviceTile key={repair.id} label={repair.device} group={repair.id} documented={1} selected={deviceId === repair.id}
              onSelect={() => setDeviceId(deviceId === repair.id ? null : repair.id)} visual={<DeviceImage id={repair.id} />} />)}
            {plans.map(plan => <DeviceTile key={plan.id} label={plan.device} group={plan.id} planned={1} selected={deviceId === plan.id}
              onSelect={() => setDeviceId(deviceId === plan.id ? null : plan.id)} visual={<DeviceImage id={plan.id} />} />)}
          </div>
          {selectedRepair && <div id={`repair-panel-${selectedRepair.id}`}><SmartphoneRepairCard key={selectedRepair.id} repair={selectedRepair} /></div>}
          {selectedPlan && <div id={`repair-panel-${selectedPlan.id}`} className="rounded-lg border border-border p-4">
            <p className="font-medium">{selectedPlan.device} · {t("Planned")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("Upcoming repair. Results and photographic evidence will be added after the work is completed.")}</p>
          </div>}
          {!cases.length && !plans.length && <p className="text-sm text-muted-foreground">{t("No repairs recorded in this category yet.")}</p>}
        </div>}
      </div>}
    </div>
  );
};
export default SmartphoneRepairGroups;
