/** Existing deep links open their content panel instead of requiring all sections to be mounted. */
// Legacy overview/skills links now open Projects; those sections are no longer displayed.
export const electricalDetailHashes = new Set(["overview", "projects", "evidence", "skills", "practice"]);

/** Training belongs to the whole electrical profile, independently of the open specialty. */
export const isElectricalTrainingHash = (id: string) => ["certificate", "certifications", "tracks"].includes(id) || id.startsWith("certificate-");

export const isElectricalSharedHash = (id: string) => id === "tools" || isElectricalTrainingHash(id);
