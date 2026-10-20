import { electricalProviders } from "@/data/trainingProviders";
import TrainingProviderBadge from "@/components/profile/TrainingProviderBadge";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ElectricalTrainingProviders() {
  const { t } = useLanguage();
  return <div data-training-providers="electrical" className="mb-8">
    <h3 className="mb-3 text-lg font-semibold">{t("Where I study")}</h3>
    <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
      <h4 className="mb-3 text-sm font-bold text-primary">{t("Main training")}</h4>
      <TrainingProviderBadge id="universidad-internacional" detailed />
    </div>
    <h4 className="mb-3 mt-5 text-sm font-semibold text-muted-foreground">{t("Complementary courses")}</h4>
    <div className="grid gap-3 sm:grid-cols-2">{electricalProviders.filter(id => id !== "universidad-internacional").map(id => <TrainingProviderBadge key={id} id={id} detailed />)}</div>
  </div>;
}
