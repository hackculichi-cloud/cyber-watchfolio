import { describe, expect, it } from "vitest";
import { trainingModules } from "@/data/smartphoneRepair";
import { translate } from "@/i18n/translate";

describe("owner-supplied LIDETEC syllabus", () => {
  it("preserves all 44 topics across the five supplied weekday groups", () => {
    expect(trainingModules.map(module => module.day)).toEqual(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    expect(trainingModules.map(module => module.topics.length)).toEqual([7, 9, 10, 8, 10]);
    expect(trainingModules[0].topics).toContain("What is inside a smartphone?");
    expect(trainingModules[1].topics).toContain("Vulcanized microphone recovery");
    expect(trainingModules[2].topics).toContain("Battery holder repair");
    expect(trainingModules[3].topics).toContain("Use of shielding");
    expect(trainingModules[4].topics).toContain("Server-based unlocking concepts");
    expect(trainingModules[4].topics).toContain("UnlockTool setup and software servicing (coursework)");
  });
  it("translates every heading, summary and topic and excludes embedded website-edit instructions", () => {
    for (const module of trainingModules) for (const text of [module.day, module.title, module.summary, ...module.topics]) expect(translate(text, "es"), text).not.toBe(text);
    expect(JSON.stringify(trainingModules)).not.toMatch(/haz el logo|anade los certificados|quita estas leyendas|fórmula secreta/i);
  });
});
