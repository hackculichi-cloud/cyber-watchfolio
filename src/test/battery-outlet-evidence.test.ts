import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import evidence from "../../docs/battery-and-outlet-photo-sources.json";
import { smartphoneRepairs, completedRepairsAwaitingPhotos, plannedSmartphoneRepairs } from "@/data/smartphoneRepair";
import { electricalProjects } from "@/data/electricalProjects";
import { electricalPracticeGroups } from "@/data/electricalPracticeGroups";
import { repairPhotos } from "@/data/repairPhotos";
import previews from "@/data/photoPreviews.json";
import resumes from "@/data/resumes.json";
import { translate } from "@/i18n/translate";

const phone = smartphoneRepairs.find(item => item.id === "sr-004")!;
const outlet = electricalProjects.find(item => item.id === "residential-outlet-switch-white-plate")!;

describe("uploaded battery and outlet work", () => {
  it("retains the exact bytes of all 24 assigned originals and supplies responsive previews", () => {
    expect(evidence.photos).toHaveLength(24);
    expect(new Set(evidence.photos.map(photo => photo.sha256)).size).toBe(24);
    for (const photo of evidence.photos) {
      const original = readFileSync(`public${photo.asset}`);
      expect(createHash("sha256").update(original).digest("hex")).toBe(photo.sha256);
      expect(previews[photo.asset as keyof typeof previews].srcSet).toContain("-320.webp");
      expect(previews[photo.asset as keyof typeof previews].srcSet).toContain("-768.webp");
    }
  });
  it("promotes the iPhone 13 from awaiting photographs without borrowing older functional checks", () => {
    expect(phone.device).toBe("iPhone 13");
    expect(phone.photos?.map(photo => photo.src)).toEqual(evidence.photos.filter(photo => photo.case === phone.id).map(photo => photo.asset));
    expect(phone.photos).toHaveLength(11);
    expect(phone.tests ?? []).toEqual([]);
    expect(phone.date).toBeUndefined();
    expect(phone.issue).toBeUndefined();
    expect(phone.diagnosis).toBeUndefined();
    expect(phone.notes).toContain("final functional test results have not been supplied");
    expect(completedRepairsAwaitingPhotos.map(item => item.device)).toEqual(["Samsung Galaxy S21 Ultra", "Samsung Galaxy A35"]);
    expect(plannedSmartphoneRepairs.map(item => item.device)).toEqual(["iPhone X"]);
    expect(repairPhotos).toHaveLength(29);
  });
  it("keeps the 124.4 V outlet record and its thirteen photos separate from other cases", () => {
    expect(outlet.images?.map(photo => photo.src)).toEqual(evidence.photos.filter(photo => photo.case === outlet.id).map(photo => photo.asset));
    expect(outlet.images).toHaveLength(13);
    expect(outlet.results?.join(" ")).toContain("124.4 V AC");
    expect(outlet.results?.join(" ")).not.toMatch(/119\.3|122\.0|confirmed polarity|earth verified/i);
    expect(outlet.date).toBeUndefined();
    expect(electricalPracticeGroups.find(group => group.id === "residential")?.categories.find(category => category.id === "outlets")?.projectIds).toContain(outlet.id);
  });
  it("translates new captions and evidence text and includes the jobs in their profile CVs", () => {
    const text = [...(phone.photos ?? []).flatMap(photo => [photo.alt, photo.caption!]), phone.result!, phone.notes!, ...phone.tools!, ...phone.components!, ...phone.documentedSteps!.flatMap(step => [step.title, step.description]), outlet.title, outlet.summary, ...outlet.images!.map(photo => photo.caption!), ...outlet.did!, ...outlet.results!, ...outlet.documentedSteps!.flatMap(step => [step.title, step.description])];
    for (const item of text) expect(translate(item, "es"), item).not.toBe(item);
    const repairCv = resumes.resumes.find(resume => resume.id === "repair")!;
    const electricalCv = resumes.resumes.find(resume => resume.id === "electrical")!;
    for (const lang of ["en", "es"] as const) {
      expect(JSON.stringify(repairCv[lang])).toContain("iPhone 13");
      expect(JSON.stringify(electricalCv[lang])).toContain("124.4");
    }
  });
});
