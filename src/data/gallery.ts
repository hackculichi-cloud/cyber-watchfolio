import { softwareScreenshots } from "./softwareScreenshots";
import type { ProfileSlug } from "./profiles";

export type GalleryItem = {
  id: string;
  /** Image URL or imported asset. Use a real photo of your own work. */
  src: string;
  thumbnail?: string;
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
 * Software screenshots come from repository builds; other areas use their own work galleries.
 */
export const galleryItems: GalleryItem[] = softwareScreenshots
  .filter(item => item.projectId === "ronnys-food-truck" || item.projectId === "portfolio" || item.projectId === "worlds-finest-shows")
  .map(item => ({
    id: item.id, src: item.src, thumbnail: item.thumbnail, alt: item.alt,
    title: item.title, date: item.capturedAt, category: item.viewport,
    project: item.projectId === "portfolio" ? "Culichi" : item.projectId === "worlds-finest-shows" ? "World’s Finest Shows" : "Ronny’s Food Truck",
    profile: "development", description: "Actual interface captured from a local repository build.",
  }));

export const galleryFor = (profile: ProfileSlug) => galleryItems.filter((g) => g.profile === profile);
