import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CopperConductorTitle from "@/components/electrical/CopperConductorTitle";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const rectangle = (x: number, y: number, width: number, height: number) => ({
  x, y, left: x, top: y, right: x + width, bottom: y + height, width, height, toJSON() {},
}) as DOMRect;

let frames: Map<number, FrameRequestCallback>;
let notifyResize: () => void;
let inkWidth: number;
let lastTop: number;
let font: string;
let fonts: EventTarget & { status: string; ready: Promise<void> };
let readInk: ReturnType<typeof vi.fn>;
let observeVisibility: ReturnType<typeof vi.fn>;
let originalFonts: PropertyDescriptor | undefined;
let originalBBox: PropertyDescriptor | undefined;

const flushFrame = () => {
  const callbacks = [...frames.values()];
  frames.clear();
  act(() => callbacks.forEach(callback => callback(0)));
};

beforeEach(() => {
  frames = new Map();
  let nextFrame = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("ResizeObserver", class {
    constructor(callback: () => void) { notifyResize = callback; }
    observe() {}
    disconnect() {}
  });
  observeVisibility = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    observe = observeVisibility;
    disconnect() {}
  });
  inkWidth = 14;
  lastTop = 0;
  font = "600 20px sans-serif";
  vi.spyOn(window, "getComputedStyle").mockImplementation(() => ({
    font, fontSize: "20px", letterSpacing: "normal", fontFeatureSettings: "normal", fontVariationSettings: "normal",
  }) as CSSStyleDeclaration);
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function () {
    if (this.matches(".copper-conductor-glyph")) {
      const last = this.textContent?.startsWith("B");
      return rectangle(last ? 70 : 50, last ? lastTop : 0, 20, 30);
    }
    return this.matches("[data-copper-title], [data-copper-wordmark]") ? rectangle(0, 0, 200, 80) : rectangle(0, 0, 30, 30);
  });
  originalBBox = Object.getOwnPropertyDescriptor(SVGElement.prototype, "getBBox");
  readInk = vi.fn(() => rectangle(0, 0, inkWidth, 20));
  Object.defineProperty(SVGElement.prototype, "getBBox", { configurable: true, value: readInk });
  originalFonts = Object.getOwnPropertyDescriptor(document, "fonts");
  fonts = Object.assign(new EventTarget(), { status: "loaded", ready: Promise.resolve() });
  Object.defineProperty(document, "fonts", { configurable: true, value: fonts });
});

afterEach(() => {
  cleanup();
  if (originalFonts) Object.defineProperty(document, "fonts", originalFonts);
  else Reflect.deleteProperty(document, "fonts");
  if (originalBBox) Object.defineProperty(SVGElement.prototype, "getBBox", originalBBox);
  else Reflect.deleteProperty(SVGElement.prototype, "getBBox");
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const renderTitle = (variant?: "brand") => render(<LanguageProvider><CopperConductorTitle text="AB" variant={variant} /></LanguageProvider>);
const connections = () => document.querySelector(".copper-connection-core")!.getAttribute("d");

describe("copper circuit layout", () => {
  it("coalesces initial resize notifications and skips repeated glyph reads for an unchanged layout", async () => {
    renderTitle();
    notifyResize();
    notifyResize();
    expect(frames.size).toBe(1);
    expect(readInk).not.toHaveBeenCalled();
    flushFrame();
    expect(readInk).toHaveBeenCalledTimes(2);
    const original = connections();
    notifyResize();
    flushFrame();
    await act(async () => { await fonts.ready; });
    expect(readInk).toHaveBeenCalledTimes(2);
    expect(connections()).toBe(original);
    expect(frames.size).toBe(0);
  });

  it("reconnects wrapped letters and changed font settings even when heading dimensions stay fixed", () => {
    renderTitle();
    flushFrame();
    lastTop = 40;
    notifyResize();
    flushFrame();
    expect(document.querySelector(".copper-conductor-wires")).toHaveAttribute("data-line-connections", "1");
    expect(readInk).toHaveBeenCalledTimes(4);
    font = "600 20px monospace";
    inkWidth = 8;
    const original = connections();
    notifyResize();
    flushFrame();
    expect(readInk).toHaveBeenCalledTimes(6);
    expect(connections()).not.toBe(original);
  });

  it("refreshes changed font ink at readiness and later font loads despite identical layout bounds", async () => {
    let completeFonts: () => void;
    fonts.status = "loading";
    fonts.ready = new Promise(resolve => { completeFonts = resolve; });
    renderTitle();
    flushFrame();
    let previous = connections();
    inkWidth = 10;
    await act(async () => { completeFonts(); await fonts.ready; });
    flushFrame();
    expect(readInk).toHaveBeenCalledTimes(4);
    expect(connections()).not.toBe(previous);
    previous = connections();
    inkWidth = 6;
    fonts.dispatchEvent(new Event("loadingdone"));
    flushFrame();
    expect(readInk).toHaveBeenCalledTimes(6);
    expect(connections()).not.toBe(previous);
  });

  it("keeps the static brand free of visibility observers and cancels pending work on unmount", () => {
    const { unmount } = renderTitle("brand");
    expect(observeVisibility).not.toHaveBeenCalled();
    unmount();
    expect(frames.size).toBe(0);
    expect(readInk).not.toHaveBeenCalled();
  });
});
