import type { ProfileSlug } from "@/data/profiles";
import { profileCapabilities } from "@/data/profileCapabilities";
import { useLanguage } from "@/i18n/LanguageProvider";
import TrainingProviderBadge from "./TrainingProviderBadge";

/** Reuse the confirmed knowledge descriptions instead of inventing experience per tile. */
const capabilityIndices: Record<string, number[]> = {
  soc: [0, 1, 2], linux: [3], windows: [0], networking: [3], "cloud-foundations": [4],
  frontend: [0, 3], backend: [1], "full-stack": [2], "python-automation": [4],
  "basic-electronics": [0, 1, 2, 3], "smartphone-repairs": [0, 1, 2, 3],
};

export default function SpecialtyKnowledge({ profile, specialty }: { profile: ProfileSlug; specialty: string }) {
  const { t } = useLanguage();
  const entries = profileCapabilities[profile]?.filter((_, index) => capabilityIndices[specialty]?.includes(index));
  if (!entries?.length) return null;
  return <section data-specialty-knowledge className="my-6 border-t border-primary/20 pt-5">
    <h4 className="text-lg font-bold">{t("What I know and how I apply it")}</h4>
    <div className="mt-4 grid gap-4 md:grid-cols-2">{entries.map(entry => <div key={entry.title} className="rounded-xl border border-border bg-background/70 p-4">
      <h5 className="font-semibold text-foreground">{t(entry.title)}</h5>
      <p className="reading-copy mt-2 text-base text-foreground/90">{t(entry.body)}</p>
      {entry.providers && <div className="mt-3 flex flex-wrap gap-2">{entry.providers.map(id => <TrainingProviderBadge key={id} id={id} />)}</div>}
    </div>)}</div>
  </section>;
}
