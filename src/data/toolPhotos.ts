import type { ProfileSlug } from "./profiles";

export type ToolPhoto = {
  profile: ProfileSlug;
  /** Match the existing equipment name in its profile's ToolGroup. */
  tool: string;
  src: string;
  alt: string;
  model?: string;
};

/** Add original equipment photographs here when supplied; no stock equipment is presented as owned. */
export const toolPhotos: ToolPhoto[] = [];
