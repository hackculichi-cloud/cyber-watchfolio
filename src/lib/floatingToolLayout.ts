export type ToolRect = { x: number; y: number; width: number; height: number };

export const toolRectsOverlap = (a: ToolRect, b: ToolRect, gap = 0) =>
  a.x < b.x + b.width + gap - .05 && a.x + a.width + gap > b.x + .05
  && a.y < b.y + b.height + gap - .05 && a.y + a.height + gap > b.y + .05;

/** Pack three visible objects around the character, never over a navigation target. */
export function floatingToolLayout(width: number, height: number, blocked: ToolRect[]): ToolRect[] {
  if (width <= 0 || height <= 0) return [];
  const compact = width > height * 1.2;
  const ideal = compact ? 32 : Math.min(72, Math.floor(width * .14 / 4) * 4);
  const anchors = [[width * .18, height * .5], [width * .82, height * .5], [width * .5, height * .06]];
  const gap = 8;
  for (let size = ideal; size >= 20; size -= 4) {
    const chosen: ToolRect[] = [];
    for (const [anchorX, anchorY] of anchors) {
      const obstacles = [...blocked, ...chosen];
      // Obstacle edges supply exact fits on phones; a coarse grid fills larger gaps.
      const step = Math.max(8, Math.floor(size / 2));
      const axis = (limit: number, key: "x" | "y", dimension: "width" | "height") => [...new Set([
        0, limit - size,
        ...Array.from({ length: Math.floor(limit / step) }, (_, index) => index * step),
        ...obstacles.flatMap(rect => [rect[key] - gap - size, rect[key] + rect[dimension] + gap]),
      ])].filter(value => value >= 0 && value + size <= limit + .05);
      const xs = axis(width, "x", "width"), ys = axis(height, "y", "height");
      let nearest: ToolRect | undefined;
      let distance = Infinity;
      for (const x of xs) for (const y of ys) {
        const rect = { x, y, width: size, height: size };
        if (obstacles.some(obstacle => toolRectsOverlap(rect, obstacle, gap))) continue;
        const nextDistance = (x + size / 2 - anchorX) ** 2 + (y + size / 2 - anchorY) ** 2;
        if (nextDistance < distance) { nearest = rect; distance = nextDistance; }
      }
      if (!nearest) break;
      chosen.push(nearest);
    }
    if (chosen.length === 3) return chosen;
  }
  return [];
}
