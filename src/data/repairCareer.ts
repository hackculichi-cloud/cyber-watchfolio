import { experienceEntries, experienceSummary } from "./experience";

/** Professional support is separate from the hands-on repair evidence. */
export const repairSupportExperience = ["ttec-tier2", "tcs-operations", "tcs-support"].map(id => experienceEntries.find(entry => entry.id === id)!);
export const repairServiceHeadline = experienceSummary.headline;
export const repairProfessionalSummary = "I combine Tier 2 mobile-device support at TTEC and incident follow-up at TCS with documented iPhone battery and display replacements. Seven years of bilingual customer service, LIDETEC repair coursework and ongoing electronics studies support my next step in device service.";
export const repairDevelopmentGoals = ["Apple-device diagnostics", "macOS support fundamentals", "Safe device-service procedures", "Apple technical training and certification preparation"];
