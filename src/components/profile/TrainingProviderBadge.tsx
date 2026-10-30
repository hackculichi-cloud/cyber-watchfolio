import { ArrowUpRight } from "lucide-react";
import { trainingProviders, type TrainingProviderId } from "@/data/trainingProviders";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ProviderMark({ id, className = "h-9 w-9" }: { id: TrainingProviderId; className?: string }) {
  const provider = trainingProviders[id];
  return <span aria-hidden className={`grid shrink-0 place-items-center rounded-lg bg-white p-2 text-sm font-bold tracking-tight text-slate-900 ${className}`}>
    {provider.logo ? <img src={provider.logo} width={32} height={32} alt="" className="h-full w-full object-contain" loading="lazy" /> : provider.monogram}
  </span>;
}

/** A free-standing, illuminated brand for the training-centers directory. */
export function TrainingProviderLogo({ id }: { id: TrainingProviderId }) {
  const { t } = useLanguage();
  const provider = trainingProviders[id];
  const label = `${provider.name} · ${t(provider.detail)}`;
  return <a data-training-provider={id} data-provider-logo href={provider.url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="training-provider-logo">
    <span aria-hidden className="training-provider-logo-art">
      {provider.logo
        ? <img src={provider.logo} width={40} height={40} alt="" loading="lazy" decoding="async" className="training-provider-logo-symbol" />
        : <span className="training-provider-logo-monogram">{provider.monogram}</span>}
      {id === "universidad-internacional"
        ? <span className="training-provider-logo-school">Universidad<span>Internacional</span></span>
        : id === "linkedin-learning"
          ? <span className="training-provider-logo-name">LinkedIn<span className="training-provider-logo-learning">Learning</span></span>
          : <span className="training-provider-logo-name">{provider.name}</span>}
    </span>
  </a>;
}

export default function TrainingProviderBadge({ id, detailed = false }: { id: TrainingProviderId; detailed?: boolean }) {
  const { t } = useLanguage();
  const provider = trainingProviders[id];
  return <a data-training-provider={id} href={provider.url} target="_blank" rel="noopener noreferrer" className={`group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background/60 text-sm transition-colors hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary ${detailed ? "w-full gap-3 p-4" : "px-2 py-1.5"}`}>
    <ProviderMark id={id} className={detailed ? "h-11 w-11" : "h-7 w-7"} />
    <span className="min-w-0 flex-1"><span className="block font-semibold text-foreground">{provider.name}</span>{detailed && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{t(provider.detail)}</span>}</span>
    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
  </a>;
}
