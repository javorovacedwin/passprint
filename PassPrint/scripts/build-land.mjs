/*
  Regenerates content/land.ts, the coastline the paper globe draws.

  Run from the project root. Neither package is a project dependency — the
  generated file is what ships — so install them just for the run:

    npm i --no-save world-atlas topojson-client
    node scripts/build-land.mjs

  Source: Natural Earth 1:110m land, public domain.
*/

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("./node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(topo, topo.objects.land);
const geoms =
  land.type === "FeatureCollection" ? land.features.map((f) => f.geometry) : [land.geometry];

function rdp(points, eps) {
  if (points.length < 3) return points;
  let maxD = 0;
  let idx = 0;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    // A closed ring has coincident endpoints; fall back to radial distance so
    // the first split lands on the point furthest from the seam.
    const d =
      len === 0
        ? Math.hypot(px - ax, py - ay)
        : Math.abs((px - ax) * dy - (py - ay) * dx) / len;
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= eps) return [points[0], points[points.length - 1]];
  return [...rdp(points.slice(0, idx + 1), eps).slice(0, -1), ...rdp(points.slice(idx), eps)];
}

function area(ring) {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return Math.abs(a / 2);
}

const rings = [];
let seen = 0;
for (const geom of geoms) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  for (const poly of polys) {
    for (const ring of poly) {
      seen++;
      if (area(ring) < 8) continue;
      const simplified = rdp(ring, 0.45).map(([lon, lat]) => [
        Math.round(lon * 10) / 10,
        Math.round(lat * 10) / 10,
      ]);
      if (simplified.length > 3) rings.push(simplified);
    }
  }
}

rings.sort((a, b) => area(b) - area(a));
mkdirSync("./content", { recursive: true });
const body = rings.map((r) => `  ${JSON.stringify(r.flat())},`).join("\n");
const out = `/*
  Coastlines for the paper globe, as flat [lon, lat, lon, lat, …] rings.

  Derived from Natural Earth 1:110m land (public domain) via the world-atlas
  package, simplified with Douglas–Peucker at 0.45° and rounded to 0.1°.
  Rings smaller than 8 square degrees are dropped. Regenerate with
  scripts/build-land.mjs if a finer coast is ever wanted.

  No borders — only coast. The site draws places, never boundaries.
*/

export const landRings: readonly (readonly number[])[] = [
${body}
];
`;
writeFileSync("./content/land.ts", out);
console.log(
  `seen rings: ${seen}, kept: ${rings.length}, points: ${rings.reduce((n, r) => n + r.length, 0)}, bytes: ${out.length}`
);
