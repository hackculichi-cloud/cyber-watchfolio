import type { ProfileSlug } from "./profiles";

export type WorkStatus = "Completed" | "In progress" | "Training" | "Planned";

export type WorkImage = {
  /** Real photo/screenshot URL. Leave empty to render a marked placeholder. */
  src?: string;
  alt: string;
  caption?: string;
};

/**
 * Image-first project / work entry, shared by every professional profile.
 * Add an object here and the visual card + detail view render automatically.
 */
export type WorkItem = {
  id: string;
  profile: ProfileSlug;
  title: string;
  summary: string;
  category: string;
  status: WorkStatus;
  date?: string;
  /** Difficulty, environment and other optional metadata (labs, write-ups). */
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  environment?: string;
  tools?: string[];
  technologies?: string[];
  objective?: string;
  did?: string[];
  learned?: string[];
  results?: string[];
  /** Cover image shown on the card. */
  cover?: WorkImage;
  /** Additional images shown in the detail view gallery. */
  images?: WorkImage[];
  before?: WorkImage;
  after?: WorkImage;
  repo?: string;
  demo?: string;
  writeup?: string;
};

/**
 * Nothing is invented: real work is published by adding objects here.
 * Until then, each profile shows a clearly marked "photo pending" placeholder grid.
 */
export const works: WorkItem[] = [];

export const worksFor = (profile: ProfileSlug) => works.filter((w) => w.profile === profile);
