import type { ProfileSlug } from "./profiles";
import type { TrainingProviderId } from "./trainingProviders";

export type CertificationRecord = { id: string; title: string; provider: string; providerId?: TrainingProviderId; training: string; document: string; href?: string };
export const certifications: Partial<Record<ProfileSlug, CertificationRecord[]>> = {
  electrical: [
    { id: "electrical-linkedin", title: "Electrical Systems: Reading Drawings and Schematics", provider: "LinkedIn Learning", providerId: "linkedin-learning", training: "Completed", document: "Certificate confirmed; file pending upload." },
    { id: "electrical-conocer", title: "Electrical Fundamentals & Industrial Electricity", provider: "Universidad Internacional · RED CONOCER", providerId: "universidad-internacional", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
    { id: "electrical-udemy", title: "Basic Electrical Installations", provider: "Udemy", providerId: "udemy", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
    { id: "electrical-measurements", title: "Electrical Measurements", provider: "Udemy", providerId: "udemy", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
  ],
  electronics: [
    { id: "eto-basic", title: "Basic Electronics", provider: "Escuela Tecnológica de Occidente", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
  ],
  cybersecurity: [
    { id: "aws-preparation", title: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", training: "In preparation", document: "Preparing for the certification exam. Exam not passed; credential not yet obtained." },
    { id: "linux-diploma", title: "Linux diploma program", provider: "Institution not specified", training: "Currently Studying", document: "Training in progress; certificate pending completion." },
  ],
  development: [
    { id: "aws-preparation", title: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", training: "In preparation", document: "Preparing for the certification exam. Exam not passed; credential not yet obtained." },
    { id: "academlo", title: "Frontend / Backend / Full Stack", provider: "Academlo", training: "Incomplete studies", document: "Incomplete studies; no graduation certificate claimed." },
  ],
  repair: [
    { id: "lidetec", title: "Smartphone Repair", provider: "LIDETEC", training: "Course participation", document: "Participation certificate available.", href: "#repair-certification" },
  ],
};
