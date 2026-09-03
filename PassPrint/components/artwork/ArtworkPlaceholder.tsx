/*
  Placeholder artwork — drawn as an engraving.

  Until real photography of the printed works exists, every edition is
  composed as a copperplate-style plate: a hatched sky, a hatched hillside,
  an architectural arch and tower in fine line, a hatched foreground, and a
  ruled plate border. Shading is made of parallel struck lines, the way an
  engraver builds tone — not flat fills.

  TODO: replace with photographs of the actual printed works
  (see /public/artworks/README.txt for naming).
*/

const INKS = [
  "var(--color-cobalt)",
  "var(--color-vermilion)",
  "var(--color-verde)",
  "var(--color-sepia)",
  "var(--color-violet)",
];

interface ArtworkPlaceholderProps {
  seedKey: string;
  title?: string;
  className?: string;
  /** "front" is the plate, "detail" a magnified crop. */
  face?: "front" | "detail";
}

function seeded(seedKey: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seedKey.length; i++) {
    h ^= seedKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

export function ArtworkPlaceholder({
  seedKey,
  title,
  className = "",
  face = "front",
}: ArtworkPlaceholderProps) {
  const rand = seeded(seedKey + face);
  const uid = seedKey.replace(/\W+/g, "") + face;

  const ink = INKS[Math.floor(rand() * INKS.length)];
  const horizon = 118 + rand() * 34;
  const archX = 92 + rand() * 60;
  const archW = 46 + rand() * 26;
  const archH = 40 + rand() * 26;
  const towerX = 40 + rand() * 40;
  const towerH = 52 + rand() * 34;
  const sunX = 186 + rand() * 60;
  const sunY = 46 + rand() * 18;

  const scale = face === "detail" ? 2.3 : 1;
  const shift = face === "detail" ? -archX * 1.3 : 0;

  const ridge = `M0 ${horizon - 6} Q ${44 + rand() * 30} ${horizon - 40 - rand() * 16} ${112 + rand() * 26} ${horizon - 12} T 280 ${horizon - 24} V ${horizon} H 0 Z`;

  return (
    <svg
      viewBox="0 0 280 200"
      role="img"
      aria-label={title ?? `Engraved plate ${seedKey}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* engraver's hatching, three densities */}
        <pattern id={`h1-${uid}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={ink} strokeWidth="0.7" />
        </pattern>
        <pattern id={`h2-${uid}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3" stroke={ink} strokeWidth="0.7" />
        </pattern>
        <pattern id={`h3-${uid}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="3" stroke="var(--color-ink)" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="280" height="200" fill="var(--color-paper)" />

      <g transform={`translate(${shift} 0) translate(140 130) scale(${scale}) translate(-140 -130)`}>
        {/* hatched sky, lighter toward the horizon */}
        <rect width="280" height={horizon - 30} fill={`url(#h1-${uid})`} opacity="0.5" />

        {/* the sun, engraved as a ruled disc */}
        <g stroke={ink} fill="none">
          <circle cx={sunX} cy={sunY} r={17} strokeWidth="1.1" />
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              x1={sunX - 15}
              x2={sunX + 15}
              y1={sunY - 12 + i * 3}
              y2={sunY - 12 + i * 3}
              strokeWidth="0.55"
              opacity={0.3 + i * 0.07}
            />
          ))}
        </g>

        {/* the ridge behind the town */}
        <path d={ridge} fill={`url(#h2-${uid})`} opacity="0.75" />
        <path d={ridge} fill="none" stroke={ink} strokeWidth="1" />

        {/* a minaret / tower in fine line */}
        <g stroke="var(--color-ink)" fill="var(--color-paper)" strokeWidth="1.2" strokeLinejoin="round">
          <rect x={towerX - 5} y={horizon - towerH} width="10" height={towerH} />
          <path d={`M${towerX - 8} ${horizon - towerH} h16 l-8 -12 Z`} />
          <line x1={towerX - 5} y1={horizon - towerH * 0.62} x2={towerX + 5} y2={horizon - towerH * 0.62} strokeWidth="0.9" />
        </g>

        {/* the arch — gate, bridge or doorway, hatched inside */}
        <g strokeLinejoin="round">
          <path
            fill={`url(#h3-${uid})`}
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            d={`M ${archX} ${horizon} v -${archH * 0.5} a ${archW / 2} ${archH * 0.62} 0 0 1 ${archW} 0 v ${archH * 0.5} h -11 v -${archH * 0.38} a ${archW / 2 - 11} ${archH * 0.46} 0 0 0 -${archW - 22} 0 v ${archH * 0.38} Z`}
          />
          {/* keystone */}
          <path
            d={`M ${archX + archW / 2 - 4} ${horizon - archH * 0.98} h 8 l 2 7 h -12 Z`}
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="1"
          />
        </g>

        {/* ground line */}
        <line x1="0" y1={horizon} x2="280" y2={horizon} stroke="var(--color-ink)" strokeWidth="1.8" />

        {/* hatched foreground, densest at the plate's foot */}
        <rect y={horizon} width="280" height={200 - horizon} fill={`url(#h2-${uid})`} opacity="0.55" />
        <g stroke="var(--color-ink)" strokeLinecap="round" opacity="0.7">
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1={10 + rand() * 40}
              x2={190 + rand() * 80}
              y1={horizon + 12 + i * 11}
              y2={horizon + 12 + i * 11}
              strokeWidth={0.7 + i * 0.25}
            />
          ))}
        </g>
      </g>

      {/* the plate border — a ruled frame, as engravings are trimmed */}
      <rect x="6" y="6" width="268" height="188" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
      <rect x="9.5" y="9.5" width="261" height="181" fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.75" />
    </svg>
  );
}
