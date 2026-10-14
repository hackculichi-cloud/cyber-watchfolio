import electricalPdf from "@/assets/christian-velasco-electrical.pdf.asset.json";
import electricalPreview from "@/assets/electrical-cv-preview.jpg.asset.json";
import manifests from "./cvManifest.json";
import { site } from "./site";
import type { Lang } from "@/i18n/translate";

export type CvVariant = {
  id: string; title: string; description: string; file: string; available: boolean; preview?: string;
  localized?: Record<Lang, { file: string; preview: string }>;
};
const titles: Record<string, string> = {
  cybersecurity: "Cybersecurity / IT CV", software: "Software Development CV",
  electrical: "Residential & Industrial Electrical Maintenance CV", electronics: "Electronics CV",
  repair: "Technical Repair CV", "customer-service": "Call Center & Customer Service CV",
};
export const cvVariants: CvVariant[] = manifests.map(resume => {
  const assets = (lang: Lang) => ({ file: `/cv/christian-velasco-${resume.id}-${lang}.pdf`, preview: `/cv/previews/christian-velasco-${resume.id}-${lang}.png` });
  return { id: resume.id, title: titles[resume.id], description: resume.summary, available: true, ...assets("en"), localized: { en: assets("en"), es: assets("es") } };
});
export const cvAssets = (cv: CvVariant, lang: Lang) => cv.localized?.[lang] ?? { file: cv.file, preview: cv.preview };

/** Preserve the original user-provided electrical document as an additional reference. */
export const originalElectricalCv: CvVariant = {
  id: "electrical-original", title: "Previous electrical CV", description: "Original user-provided electrical CV.",
  file: new URL(electricalPdf.url, site.assetOrigin).href,
  preview: new URL(electricalPreview.url, site.assetOrigin).href, available: true,
};
