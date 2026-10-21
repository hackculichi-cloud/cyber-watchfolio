import captures from "./softwareCaptureManifest.json";

/** Captured from the actual repository builds; see the manifest for revisions. */
export const softwareScreenshots = captures;
export const screenshotsForProject = (id: string) => softwareScreenshots.filter(item => item.projectId === id);
