import { useLanguage } from "@/i18n/LanguageProvider";

const learning = [
  "Measurement, power supply, diagnosis and repair instruments: multimeter, oscilloscope, thermometer, logic probe, power supply, soldering iron and heat gun.",
  "Understanding, reading and drawing electronic diagrams and symbols.",
  "Diagnostic techniques for electronic circuits.",
  "Physical identification of electronic components, their behavior and validation individually and within a circuit.",
];
const modules = ["Electricity Technology", "Electricity Technology II", "Laboratory I", "Laboratory II", "Metrology I", "Metrology II", "Applied Mathematics I", "Applied Mathematics II"];

/** Owner-provided ETO syllabus; learning objectives, not a claim of graduation. */
const BasicElectronicsSyllabus = () => {
  const { t } = useLanguage();
  return <div className="mt-5 rounded-lg border border-primary/20 bg-background/40 p-4" data-electronics-syllabus>
    <p className="text-sm font-medium text-primary">{t("Basic Electronics in Guadalajara — in progress")}</p>
    <p className="mt-1 text-sm text-muted-foreground">{t("Expected completion: February.")}</p>
    <details className="mt-4">
      <summary className="cursor-pointer rounded text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t("View learning objectives and syllabus")}</summary>
      <p className="mt-3 text-xs text-muted-foreground">{t("Course learning objectives; training is still in progress.")}</p>
      <h4 className="mt-4 text-sm font-semibold">{t("What I am learning")}</h4>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{learning.map(item => <li key={item}>{t(item)}</li>)}</ul>
      <h4 className="mt-5 text-sm font-semibold">{t("Syllabus")}</h4>
      <ul className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{modules.map(item => <li key={item} className="rounded border border-border px-3 py-2">{t(item)}</li>)}</ul>
    </details>
  </div>;
};
export default BasicElectronicsSyllabus;
