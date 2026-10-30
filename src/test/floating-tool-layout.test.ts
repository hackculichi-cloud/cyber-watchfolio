import { describe, expect, it } from "vitest";
import { floatingToolLayout, toolRectsOverlap, type ToolRect } from "@/lib/floatingToolLayout";

function expectClear(width: number, height: number, blocked: ToolRect[]) {
  const tools = floatingToolLayout(width, height, blocked);
  expect(tools).toHaveLength(3);
  for (const tool of tools) {
    expect(tool.width).toBeGreaterThanOrEqual(24);
    expect(tool.x).toBeGreaterThanOrEqual(0);
    expect(tool.y).toBeGreaterThanOrEqual(0);
    expect(tool.x + tool.width).toBeLessThanOrEqual(width + .05);
    expect(tool.y + tool.height).toBeLessThanOrEqual(height + .05);
    for (const obstacle of blocked) expect(toolRectsOverlap(tool, obstacle, 8)).toBe(false);
  }
  for (let i = 0; i < tools.length; i++) for (let j = i + 1; j < tools.length; j++) expect(toolRectsOverlap(tools[i], tools[j], 8)).toBe(false);
}

describe("floating tool placement", () => {
  it("fits three visible objects above the character on a narrow phone without covering seven choices", () => {
    const width = 288, height = 192;
    const controls = [[.135, .17], [.865, .17], [.15, .5], [.85, .5], [.15, .83], [.85, .83], [.5, .93]].map(([x, y]) => ({ x: width * x - 41, y: height * y - 29, width: 82, height: 58 }));
    const body = { x: (width - width * .42) / 2, y: height * .43 + 18 - width * .42 / 2, width: width * .42, height: width * .42 };
    expectClear(width, height, [...controls, body]);
  });
  it("uses gaps around the character and moving-orbit controls on desktop", () => {
    const width = 560, height = 560;
    for (const rotation of [0, 13, 47, 83, 137]) {
      const controls = Array.from({ length: 7 }, (_, i) => {
        const angle = (-150 + rotation + i * 360 / 7) * Math.PI / 180;
        return { x: width * (.5 + .35 * Math.cos(angle)) - 40, y: height * (.5 + .35 * Math.sin(angle)) - 40, width: 80, height: 80 };
      });
      expectClear(width, height, [...controls, { x: 140, y: 140, width: 280, height: 280 }, { x: 516, y: 516, width: 44, height: 44 }]);
    }
  });
  it("does not invent positions when every visible point is blocked", () => {
    expect(floatingToolLayout(120, 120, [{ x: 0, y: 0, width: 120, height: 120 }])).toEqual([]);
  });
});
