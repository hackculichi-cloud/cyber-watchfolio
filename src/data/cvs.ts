import manifests from "./cvManifest.json";
import type { Lang } from "@/i18n/translate";

export type CvVariant = {
  id: string; title: string; description: string; file: string; available: boolean; preview?: string;
  originalFile?: string;
  localized?: Record<Lang, { file: string; preview: string; previews: string[] }>;
  pageCount?: number;
};
const titles: Record<string, string> = {
  general: "General CV — experience, projects & training",
  cybersecurity: "Cybersecurity / IT CV", software: "Software Development CV",
  electrical: "Residential & Industrial Electrical Maintenance CV", electronics: "Electronics CV",
  repair: "Technical Repair CV", "customer-service": "Call Center & Customer Service CV",
};
const generatedCvVariants: CvVariant[] = manifests.map(resume => {
  const assets = (lang: Lang) => ({ file: `/cv/christian-velasco-${resume.id}-${lang}.pdf`, preview: `/cv/previews/christian-velasco-${resume.id}-${lang}.png`, previews: Array.from({ length: resume.pageCount }, (_, index) => `/cv/previews/christian-velasco-${resume.id}-${lang}${index ? `-page-${index + 1}` : ""}.png`) });
  return { id: resume.id, title: titles[resume.id], description: resume.summary, available: true, pageCount: resume.pageCount, ...assets("en"), localized: { en: assets("en"), es: assets("es") } };
});
export const cvAssets = (cv: CvVariant, lang: Lang) => cv.localized?.[lang] ?? { file: cv.file, preview: cv.preview, previews: cv.preview ? [cv.preview] : [] };

/** Preserve the uploaded electrical document separately from the updated ES/EN CVs. */
export const originalElectricalCv: CvVariant = {
  id: "electrical", title: titles.electrical, description: "Original user-provided electrical CV.",
  file: "/cv/christian-velasco-electrical-mascot.pdf",
  originalFile: "/cv/christian-velasco-electrical-original.pdf",
  preview: "/cv/previews/christian-velasco-electrical-mascot.png", available: true,
};

/** Only the current localized CV is published for each area. Uploaded originals stay archived. */
export const cvVariants = generatedCvVariants;
