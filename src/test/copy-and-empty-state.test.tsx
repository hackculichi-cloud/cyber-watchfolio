import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { es } from "@/i18n/es";
import { translate } from "@/i18n/translate";
import WorkGrid from "@/components/work/WorkGrid";

afterEach(() => { cleanup(); localStorage.clear(); });

describe("reviewed portfolio copy", () => {
  it("publishes plain text without encoded HTML entities", () => {
    for (const [source, translated] of Object.entries(es)) expect(translated, source).not.toMatch(/&(?:[a-zA-Z]+|#\d+|#x[a-fA-F0-9]+);/);
  });
  it("preserves evidence identifiers when translating surrounding prose", () => {
    const tokens = ['vendor-support[.]co', 'vendor-support.com', 'cdn-metrics[.]top', 'invoice_8842.zip', 'invoice_8842.js', 'j.perez', 'srv-app-04', 'wks-mgomez-04', 'powershell.exe', '6f2c1a09b7...9e', '198.51.100.77', '203.0.113.44', 'hxxps://cdn-metrics[.]top/upd'];
    for (const [source, translated] of Object.entries(es)) for (const token of tokens) if (source.includes(token)) expect(translated, source).toContain(token);
    expect(translate('index=security EventCode=4625', 'es')).toBe('index=security EventCode=4625');
  });
  it("corrects technical meaning across security, electronics, repair and software", () => {
    const terms = { 'Security projects & write-ups': 'Proyectos e informes de seguridad', 'Current measurement': 'Medición de corriente', 'Post-Repair Testing': 'Pruebas posteriores a la reparación', 'Stack & practices': 'Tecnologías y prácticas', 'PCB work': 'Trabajo con PCB' };
    for (const [source, expected] of Object.entries(terms)) expect(translate(source, 'es')).toBe(expected);
  });
  it("renders an unpublished work collection as one honest row without image skeletons", () => {
    render(<LanguageProvider><WorkGrid items={[]} emptyTitle="Evidence pending" emptyDescription="Documented work and original photos will appear here when available." /></LanguageProvider>);
    expect(screen.getByText('Evidencia pendiente')).toBeInTheDocument();
    expect(document.querySelectorAll('[data-empty-state]')).toHaveLength(1);
    expect(document.querySelectorAll('[role="img"], img, article')).toHaveLength(0);
    expect(document.body).not.toHaveTextContent('archivo de datos');
  });
});
