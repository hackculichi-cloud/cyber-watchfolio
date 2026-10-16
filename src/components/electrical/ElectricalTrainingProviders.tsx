import { electricalProviders } from "@/data/trainingProviders";
import TrainingProviderBadge from "@/components/profile/TrainingProviderBadge";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ElectricalTrainingProviders() {
  const { t } = useLanguage();
  return <div data-training-providers="electrical" className="mb-8">
    <h3 className="mb-3 text-lg font-semibold">{t("Where I study")}</h3>
    <div className="grid gap-3 md:grid-cols-3">{electricalProviders.map(id => <TrainingProviderBadge key={id} id={id} detailed />)}</div>
  </div>;
}
