import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { translate } from "@/i18n/translate";
import SmartImage from "@/components/shared/SmartImage";
import InvestigationDetail from "@/components/investigations/InvestigationDetail";
import Seo from "@/components/shared/Seo";
import { investigations } from "@/data/investigations";
import { site } from "@/data/site";
import { electricalProjects } from "@/data/electricalProjects";

afterEach(() => { cleanup(); localStorage.clear(); });

function LanguageButtons() {
  const { setLang } = useLanguage();
  return <><button onClick={() => setLang("es")}>ES</button><button onClick={() => setLang("en")}>EN</button></>;
}

describe("portfolio localization", () => {
  it("updates mounted investigation content and returns to English without stale nodes", () => {
    render(<LanguageProvider><LanguageButtons /><InvestigationDetail data={investigations[0]} /></LanguageProvider>);
    expect(screen.getByText("12 VPN auth failures for j.perez from 203.0.113.44")).toBeInTheDocument();
    fireEvent.click(screen.getByText("ES"));
    expect(screen.getByText("12 fallos de autenticación VPN para j.perez desde 203.0.113.44")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("es");
    fireEvent.click(screen.getByText("EN"));
    expect(screen.getByText("12 VPN auth failures for j.perez from 203.0.113.44")).toBeInTheDocument();
  });

  it("translates metadata and serves practical evidence from the portfolio domain", () => {
    render(<LanguageProvider><LanguageButtons /><Seo title="Cybersecurity | Christian Velasco" description="View investigations" path="/cybersecurity" /></LanguageProvider>);
    fireEvent.click(screen.getByText("ES"));
    expect(document.title).toBe("Ciberseguridad | Christian Velasco");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "Ver investigaciones");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://culichi.lat/cybersecurity");
    expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute("content", "es_MX");
    expect(electricalProjects.find(item => item.video)?.video.src).toMatch(/^\/media\/portfolio\//);
    expect(new URL(electricalProjects.find(item => item.video)?.video.src ?? "", site.url).origin).toBe(site.url);
  });

  it("handles whitespace, interpolation and technical identifiers", () => {
    expect(translate(" Contact ", "es")).toBe(" Contacto ");
    expect(translate("→ view full playbook (6 steps)", "es")).toBe("→ ver Playbook completo (6 pasos)");
    expect(translate("Before — Electrical diagrams", "es")).toBe("Antes — Diagramas eléctricos");
    for (const technical of ["T1110", "203.0.113.44", "j.perez", "index=security EventCode=4625"]) expect(translate(technical, "es")).toBe(technical);
  });
});

it("recovers from an image error when the source changes", () => {
  const { rerender } = render(<LanguageProvider><SmartImage src="/broken.jpg" alt="First photo" /></LanguageProvider>);
  fireEvent.error(screen.getByAltText("First photo"));
  expect(screen.getByText("Image unavailable")).toBeInTheDocument();
  rerender(<LanguageProvider><SmartImage src="/valid.jpg" alt="Second photo" /></LanguageProvider>);
  expect(screen.getByAltText("Second photo")).toBeInTheDocument();
  fireEvent.load(screen.getByAltText("Second photo"));
  expect(screen.queryByText("Image unavailable")).not.toBeInTheDocument();
});
