/** Existing deep links open their content panel instead of requiring all sections to be mounted. */
export const electricalDetailHashes = new Set(["overview", "projects", "evidence", "skills", "practice", "tools"]);

/** Training belongs to the whole electrical profile, independently of the open specialty. */
export const isElectricalTrainingHash = (id: string) => ["certificate", "certifications", "tracks"].includes(id) || id.startsWith("certificate-");
