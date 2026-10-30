import { electricalProviders } from "@/data/trainingProviders";
import { TrainingProviderLogo } from "@/components/profile/TrainingProviderBadge";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ElectricalTrainingProviders() {
  const { t } = useLanguage();
  return <div data-training-providers="electrical" className="mb-8">
    <h3 className="text-lg font-semibold">{t("Where I study")}</h3>
    <div className="flex flex-col items-center justify-center gap-x-12 gap-y-4 py-4 md:flex-row md:items-start md:gap-y-6 md:py-6">
      <div data-provider-group="main" className="text-center">
        <h4 className="mb-2 text-sm font-semibold text-primary">{t("Main training")}</h4>
        <TrainingProviderLogo id="universidad-internacional" />
      </div>
      <div data-provider-group="complementary" className="w-full min-w-0 text-center md:w-auto">
        <h4 className="mb-2 text-sm font-semibold text-muted-foreground">{t("Complementary courses")}</h4>
        <div className="mx-auto grid max-w-sm grid-cols-2 items-center gap-3 md:flex md:max-w-none md:flex-wrap md:justify-center md:gap-x-8">{electricalProviders.filter(id => id !== "universidad-internacional").map(id => <TrainingProviderLogo key={id} id={id} />)}</div>
      </div>
    </div>
  </div>;
}
