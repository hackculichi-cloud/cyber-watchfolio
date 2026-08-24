import type { ProfileSlug } from "./profiles";

export type GalleryItem = {
  id: string;
  /** Image URL or imported asset. Use a real photo of your own work. */
  src: string;
  alt: string;
  title: string;
  description?: string;
  date?: string;
  category: string;
  project?: string;
  profile: ProfileSlug;
  tags?: string[];
  /** Optional companion image for before/after documentation. */
  beforeSrc?: string;
};

/**
 * Add a new object here and it appears automatically in the matching profile gallery.
 * Nothing is invented — the galleries stay empty until you publish real photos.
 */
export const galleryItems: GalleryItem[] = [];

export const galleryFor = (profile: ProfileSlug) => galleryItems.filter((g) => g.profile === profile);
