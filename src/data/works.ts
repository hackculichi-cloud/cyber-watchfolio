import type { ProfileSlug } from "./profiles";

export type WorkStatus = "Completed" | "In progress" | "Training" | "Planned";

export type WorkImage = {
  /** Real photo/screenshot URL. Leave empty to render a marked placeholder. */
  src?: string;
  alt: string;
  caption?: string;
};

export type WorkStep = {
  title: string;
  description: string;
  images?: WorkImage[];
  /** Explicit author confirmation, used when no photo or recording was supplied. */
  confirmed?: boolean;
  /** Render the supplied recording at this stage, without autoplay. */
  video?: boolean;
};

export type DocumentationGap = {
  title: string;
  description: string;
  timing: "Current condition" | "Original record" | "Next session";
};

export type WorkProcessRecord = {
  /** Stages actually documented or confirmed by the author, never planned actions. */
  documentedSteps?: WorkStep[];
  /** Reference checklist, distinct from actions recorded as performed. */
  protocol?: string[];
  documentationNeeded?: DocumentationGap[];
};

/**
 * Image-first project / work entry, shared by every professional profile.
 * Add an object here and the visual card + detail view render automatically.
 */
export type WorkItem = WorkProcessRecord & {
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
  skills?: string[];
  tools?: string[];
  technologies?: string[];
  objective?: string;
  components?: string[];
  /** Only document steps actually performed; future work stays Planned. */
  procedure?: string[];
  technicalExplanation?: string;
  did?: string[];
  learned?: string[];
  results?: string[];
  /** Cover image shown on the card. */
  cover?: WorkImage;
  /** Additional images shown in the detail view gallery. */
  images?: WorkImage[];
  /** Real footage associated with this work; playback is opt-in. */
  video?: { src: string; title: string; poster?: string; webmSrc?: string };
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
