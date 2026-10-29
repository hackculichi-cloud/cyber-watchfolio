import previews from "@/data/photoPreviews.json";

type PhotoPreview = { srcSet: string; width: number; height: number };
const photoPreviews: Record<string, PhotoPreview> = previews;

/** Opt-in preview sizes. Evidence viewers continue to receive the original source. */
export function photoPreview(src: string, sizes: string) {
  const preview = photoPreviews[src];
  return preview ? { ...preview, src, sizes } : { src };
}
