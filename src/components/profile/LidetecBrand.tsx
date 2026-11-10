import { trainingProviders } from "@/data/trainingProviders";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Display the actual seal already present in the supplied certificate. */
export default function LidetecBrand() {
  const { t } = useLanguage();
  return <span data-lidetec-brand className="lidetec-brand">
    <span className="lidetec-seal"><svg data-lidetec-seal viewBox="145 24 260 228" width={64} height={56} role="img" aria-label={t("LIDETEC seal from the supplied certificate")}>
      <image href={trainingProviders.lidetec.certificateLogo} width={1600} height={940} />
    </svg></span>
    <span className="min-w-0"><span className="lidetec-wordmark">LIDETEC</span><span className="lidetec-school-name">Liceo de Tecnología</span></span>
  </span>;
}
