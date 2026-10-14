import { ExternalLink } from "lucide-react";
import { institutions } from "@/data/institutions";
import { useLanguage } from "@/i18n/LanguageProvider";

const InstitutionLink = ({ profile }: { profile: keyof typeof institutions }) => {
  const institution = institutions[profile];
  const { t } = useLanguage();
  return <a href={institution.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-background/60 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`${t("View institution")}: ${institution.name} ${t("(opens in a new tab)")}`}>
    {institution.name}<ExternalLink className="h-4 w-4" aria-hidden />
  </a>;
};
export default InstitutionLink;
