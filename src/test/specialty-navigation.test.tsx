import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SpecialtyExplorer from "@/components/profile/SpecialtyExplorer";
import ElectricalAreaLearning from "@/components/electrical/ElectricalAreaLearning";

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
  it("shows the residential syllabus and provides actions for courses and evidence", () => {
    const onOpen = vi.fn();
    render(<LanguageProvider><ElectricalAreaLearning area="residential" onOpen={onOpen} /></LanguageProvider>);
    fireEvent.click(document.querySelector('[data-area-syllabus] summary')!);
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
    expect(document.querySelector('[data-complementary-course="electrical-udemy-measurements"]')).toHaveTextContent('In progress');
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
});
