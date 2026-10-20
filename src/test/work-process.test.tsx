import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { electricalProjects } from "@/data/electricalProjects";
import { smartphoneRepairs } from "@/data/smartphoneRepair";
import { translate } from "@/i18n/translate";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import WorkProcess from "@/components/work/WorkProcess";

afterEach(() => { cleanup(); localStorage.clear(); });

describe("evidence-led work records", () => {
  it("gives every completed electrical job and repair a process, protocol and specific missing documentation", () => {
    for (const item of [...electricalProjects.filter(work => work.status === "Completed"), ...smartphoneRepairs]) {
      expect(item.documentedSteps!.length).toBeGreaterThanOrEqual(2);
      expect(item.protocol!.length).toBeGreaterThanOrEqual(3);
      expect(item.documentationNeeded!.length).toBeGreaterThan(0);
      for (const step of item.documentedSteps!) {
        expect(translate(step.title, "es")).not.toBe(step.title);
        expect(translate(step.description, "es")).not.toBe(step.description);
      }
      for (const entry of item.protocol!) expect(translate(entry, "es")).not.toBe(entry);
      for (const gap of item.documentationNeeded!) {
        expect(translate(gap.title, "es")).not.toBe(gap.title);
        expect(translate(gap.description, "es")).not.toBe(gap.description);
      }
    }
    const planned = electricalProjects.find(item => item.status === "Planned")!;
    for (const work of electricalProjects.filter(item => item.status === "Completed")) {
      expect(work.objective).toBeTruthy();
      expect(work.did!.length).toBeGreaterThan(0);
      expect(work.results!.length).toBeGreaterThan(0);
      for (const text of [work.objective!, ...work.results!]) expect(translate(text, "es")).not.toBe(text);
    }
    expect(planned.documentedSteps).toBeUndefined();
    expect(planned.results).toBeUndefined();
    expect(planned.documentationNeeded!.every(gap => gap.timing === "Next session")).toBe(true);
  });

  it("keeps each original photo in its own case, with no duplicate repair photos or invented readings", () => {
    for (const item of electricalProjects) {
      const originals = new Set(item.images?.map(image => image.src));
      for (const stage of item.documentedSteps ?? []) for (const image of stage.images ?? []) expect(originals.has(image.src)).toBe(true);
    }
    for (const repair of smartphoneRepairs) {
      const staged = repair.documentedSteps!.flatMap(step => step.images?.map(image => image.src) ?? []);
      const originals = repair.photos!.map(image => image.src);
      expect([...staged].sort()).toEqual([...originals].sort());
      expect(new Set(staged).size).toBe(staged.length);
      expect(staged.some(src => /photo-(04|16)\.jpg$/.test(src!))).toBe(false);
    }
    const secondOutlet = electricalProjects.find(item => item.id === "residential-outlet-switch-replacement")!;
    expect(secondOutlet.results?.join(" ") ?? "").not.toContain("119.3");
    expect(electricalProjects.find(item => item.video)?.documentedSteps?.filter(step => step.video)).toHaveLength(1);
  });

  it("distinguishes author-confirmed steps from photos and keeps missing evidence collapsed", () => {
    localStorage.setItem("portfolio-lang", "es");
    const repair = smartphoneRepairs.find(item => item.id === "sr-003")!;
    const { container } = render(<LanguageProvider><WorkProcess documentedSteps={repair.documentedSteps} protocol={repair.protocol} documentationNeeded={repair.documentationNeeded} /></LanguageProvider>);
    expect(container.querySelectorAll('[data-step-source="photos"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-step-source="confirmation"]')).toHaveLength(2);
    const pending = container.querySelector("[data-pending-documentation]")!;
    expect(pending).not.toHaveAttribute("open");
    fireEvent.click(screen.getByText("Documentación por completar"));
    expect(pending).toHaveAttribute("open");
    expect(screen.getByText("Estado exterior y funcionamiento actual")).toBeInTheDocument();
    expect(screen.getByText(/Una foto nueva documenta el estado actual/)).toBeInTheDocument();
  });
});
