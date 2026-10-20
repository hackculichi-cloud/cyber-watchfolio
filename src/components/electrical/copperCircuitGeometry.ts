export type ConductorGlyph = { left: number; right: number; top: number; bottom: number; y: number };
type SupplyPorts = { x: number; feedY: number; returnY: number };

/** Connect every glyph, including word spaces and responsive line breaks. Coordinates are local to the heading. */
export function copperCircuitGeometry(glyphs: ConductorGlyph[], supply: SupplyPorts, width: number, height: number, font: number) {
  if (!glyphs.length) return { feed: "", connections: "", returning: "", wraps: 0 };
  const inset = (glyph: ConductorGlyph) => Math.min(font * .055, (glyph.right - glyph.left) / 4);
  const first = glyphs[0], last = glyphs[glyphs.length - 1];
  const connections: string[] = [];
  let wraps = 0;
  for (let index = 1; index < glyphs.length; index++) {
    const previous = glyphs[index - 1], next = glyphs[index];
    const from = previous.right - inset(previous), to = next.left + inset(next);
    if (Math.abs(next.top - previous.top) < font * .4) {
      connections.push(`M${from} ${previous.y}L${to} ${next.y}`);
    } else {
      wraps++;
      const right = Math.min(width - 1, previous.right + font * .12);
      const left = next.left - font * .12;
      const between = (previous.bottom + next.top) / 2;
      connections.push(`M${from} ${previous.y}H${right}V${between}H${left}V${next.y}H${to}`);
    }
  }
  const start = first.left + inset(first), end = last.right - inset(last);
  const returnRail = supply.x + font * .07;
  return {
    feed: `M${supply.x} ${supply.feedY}H${start}V${first.y}`,
    connections: connections.join(" "),
    returning: `M${end} ${last.y}V${height - 2}H${returnRail}V${supply.returnY}H${supply.x}`,
    wraps,
  };
}
