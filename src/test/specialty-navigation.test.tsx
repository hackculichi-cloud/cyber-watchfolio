import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import ElectricalAreaLearning from "@/components/electrical/ElectricalAreaLearning";
import ElectricalTrainingCertificates from "@/components/electrical/ElectricalTrainingCertificates";

function HistoryControls() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  return <><output data-testid="hash">{hash}</output><button onClick={() => navigate(-1)}>Back</button></>;
}

beforeEach(() => {
  localStorage.setItem("portfolio-lang", "en");
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, writable: true, value: vi.fn() });
});
afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function renderExplorer(hash = "specialties") {
  return render(<MemoryRouter initialEntries={[`/electrical#${hash}`]}><LanguageProvider>
    <nav className="profile-section-nav" style={{ top: 112 }} />
    <SpecialtyExplorer profile="electrical" renderDetail={id => <p>Details: {id}</p>} />
    <HistoryControls />
  </LanguageProvider></MemoryRouter>);
}

describe("entering a specialty", () => {
  it("closes from either explicit control or the active card and returns focus to the card", async () => {
    renderExplorer("residential");
    const card = document.querySelector<HTMLButtonElement>('[data-specialty="residential"]')!;
    for (const action of ["top", "bottom", "card"]) {
      if (!screen.queryByRole("article")) fireEvent.click(card);
      await waitFor(() => expect(screen.getByRole("article")).toHaveFocus());
      fireEvent.click(action === "card" ? card : document.querySelector(`[data-close-specialty="${action}"]`)!);
      await waitFor(() => expect(screen.queryByRole("article")).not.toBeInTheDocument());
      expect(card).toHaveFocus();
      expect(card).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByTestId("hash")).toHaveTextContent("#specialties");
    }
  });
  it("moves focus and the viewport into each opened panel and preserves back navigation", async () => {
    renderExplorer();
    for (const id of ["residential", "industrial", "electrical-control"]) {
      const card = document.querySelector<HTMLButtonElement>(`[data-specialty="${id}"]`)!;
      fireEvent.click(card);
      const panel = screen.getByRole("article");
      await waitFor(() => expect(panel).toHaveFocus());
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenLastCalledWith({ block: "start", behavior: "instant" });
      expect(card).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByTestId("hash")).toHaveTextContent(`#${id}`);
    }
    fireEvent.click(screen.getByText("Back"));
    await waitFor(() => expect(screen.getByRole("article")).toHaveTextContent("Details: industrial"));
    await waitFor(() => expect(screen.getByRole("article")).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "All specialties" }));
    await waitFor(() => expect(screen.queryByRole("article")).not.toBeInTheDocument());
    expect(screen.getByTestId("hash")).toHaveTextContent("#specialties");
  });

  it("enters a linked specialty immediately without image labels or instructional copy", async () => {
    renderExplorer("industrial");
    await waitFor(() => expect(screen.getByRole("article")).toHaveFocus());
    expect(screen.getByRole("article")).toHaveTextContent("Details: industrial");
    expect(screen.queryByText("Illustrative reference")).not.toBeInTheDocument();
    expect(screen.queryByText(/Choose a specialty/)).not.toBeInTheDocument();
    // Reference context stays in accessible image descriptions.
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", expect.stringContaining("Illustrative reference"));
  });
});

describe("course knowledge and documented practice", () => {
  it("shows the residential syllabus and provides actions for courses and evidence", async () => {
    const onOpen = vi.fn();
    render(<LanguageProvider><ElectricalAreaLearning area="residential" onOpen={onOpen} /></LanguageProvider>);
    fireEvent.click(document.querySelector('[data-area-syllabus] summary')!);
    await waitFor(() => expect(document.querySelectorAll('[data-electrical-module]')).toHaveLength(8));
    expect(document.querySelectorAll('[data-related-module="true"]')).toHaveLength(3);
    expect(screen.getByRole("button", { name: /Final Project and Evaluation/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Residential Electrical Installations/ }));
    expect(screen.getByText("Electrical load calculations")).toBeVisible();
    const practice = document.querySelector("[data-area-practices]")! as HTMLElement;
    expect(within(practice).getByText("Residential Outlet Replacement — Photo Record")).toBeInTheDocument();
    const main = document.querySelector('[data-main-electrical-training]')!;
    const complementary = document.querySelector('[data-area-courses]')!;
    expect(main).toHaveTextContent('Universidad Internacional · RED CONOCER');
    expect(main.compareDocumentPosition(complementary) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(complementary).not.toHaveTextContent('Electrical Fundamentals & Industrial Electricity');
    expect(document.querySelector('[data-complementary-course="electrical-linkedin"]')).toHaveTextContent('Completed');
    expect(document.querySelector('[data-complementary-course="electrical-udemy-measurements"]')).toHaveTextContent('Completed');
    fireEvent.click(screen.getAllByText("View course details")[0]);
    expect(onOpen).toHaveBeenLastCalledWith("certificate", "electrical-linkedin");
    fireEvent.click(screen.getByText("View practices and evidence"));
    expect(onOpen).toHaveBeenLastCalledWith("projects");
  });

  it("keeps industrial work undocumented and the contactor exercise planned", () => {
    const { rerender } = render(<LanguageProvider><ElectricalAreaLearning area="industrial" onOpen={() => {}} /></LanguageProvider>);
    expect(document.querySelector("[data-area-practices]")).toHaveTextContent("No completed practices documented");
    expect(screen.queryByText("Residential Outlet Replacement — Photo Record")).not.toBeInTheDocument();
    rerender(<LanguageProvider><ElectricalAreaLearning area="electrical-control" onOpen={() => {}} /></LanguageProvider>);
    const title = screen.getByText("Electrical Control — START/STOP Contactor Practice");
    expect(title.closest("li")).toHaveTextContent("Planned");
    expect(document.querySelector("[data-area-practices]")).toHaveTextContent("Float-switch Control — Course Practice");
  });

  it("publishes the supplied measurements credential without certifying the ongoing programs", () => {
    render(<LanguageProvider><ElectricalTrainingCertificates /></LanguageProvider>);
    const completed = document.querySelector('[data-certificate="electrical-measurements"]')! as HTMLElement;
    expect(within(completed).getByText("Completed", { exact: true })).toBeVisible();
    expect(completed).toHaveTextContent("Christian Velasco Estrada");
    expect(completed).toHaveTextContent("Irving Lopez Hernandez");
    expect(completed).toHaveTextContent("2 hours");
    expect(completed).toHaveTextContent("UC-25442727-a627-4cdc-894e-d93da3bba021");
    expect(completed.querySelector("time")).toHaveAttribute("dateTime", "2026-10-30");
    expect(within(completed).getByRole("link", { name: "View Udemy credential" })).toHaveAttribute("href", "https://www.udemy.com/certificate/UC-25442727-a627-4cdc-894e-d93da3bba021/");
    expect(completed.querySelector("[data-certificate-mockup]")).toBeNull();
    expect(completed.querySelector('[data-certificate-original="electrical-measurements"] img')).toHaveAttribute("src", "/certificates/udemy-mediciones-electricas.webp");
    expect(within(completed).getByRole("link", { name: /^Download PDF$/ })).toHaveAttribute("href", "/certificates/udemy-mediciones-electricas.pdf");
    expect(within(completed).getByRole("link", { name: /^Download PDF$/ })).toHaveAttribute("download");
    for (const id of ["electrical-conocer", "electrical-udemy"]) {
      const ongoing = document.querySelector(`[data-certificate="${id}"]`)! as HTMLElement;
      expect(within(ongoing).getByText("Currently Studying", { exact: true })).toBeVisible();
      expect(ongoing.querySelector("time, [data-certificate-details]")).toBeNull();
    }
    expect(document.querySelectorAll('[data-training-role="main"]')).toHaveLength(1);
    expect(document.querySelector('[data-training-role="main"]')?.closest("article")).toHaveAttribute("data-certificate", "electrical-conocer");
  });
});
