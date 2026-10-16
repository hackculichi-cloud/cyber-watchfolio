export type TrainingProviderId = "udemy" | "linkedin-learning" | "universidad-internacional";
export const trainingProviders: Record<TrainingProviderId, { name: string; url: string; logo?: string; monogram?: string; detail: string }> = {
  udemy: { name: "Udemy", url: "https://www.udemy.com/", logo: "/images/providers/udemy.svg", detail: "Electrical installations and measurements" },
  "linkedin-learning": { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/", logo: "/images/providers/linkedin.svg", detail: "Electrical drawings and schematics" },
  "universidad-internacional": { name: "Universidad Internacional", url: "https://www.facebook.com/uinternacionaloficial/?locale=es_LA", monogram: "UI", detail: "Electrical training · RED CONOCER" },
};
export const electricalProviders: TrainingProviderId[] = ["universidad-internacional", "udemy", "linkedin-learning"];
