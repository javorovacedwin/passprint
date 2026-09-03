/**
 * Static fallback for the globe: the same idea drawn once as SVG.
 * Shown while the 3D bundle loads and wherever WebGL is unavailable, so it
 * carries the same two cities and the same flown route — only engraved flat,
 * with no coastline (that data rides with the 3D chunk, not the first paint).
 */
export function GlobeFallback() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="h-full w-full"
      role="img"
      aria-label="A drawn globe with the route from Antwerpen to Novi Pazar, the first collection"
    >
      <circle cx="150" cy="150" r="128" fill="var(--color-paper-deep)" stroke="var(--color-navy)" strokeWidth="1.4" />
      <g fill="none" stroke="var(--color-navy)" strokeWidth="0.7" opacity="0.35">
        <ellipse cx="150" cy="150" rx="128" ry="45" />
        <ellipse cx="150" cy="150" rx="128" ry="90" />
        <ellipse cx="150" cy="150" rx="45" ry="128" />
        <ellipse cx="150" cy="150" rx="90" ry="128" />
        <line x1="22" y1="150" x2="278" y2="150" />
        <line x1="150" y1="22" x2="150" y2="278" />
      </g>

      {/* the flown route, Antwerpen to Novi Pazar */}
      <path d="M 104 104 Q 145 74 186 122" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
      {/* the plane, mid-flight */}
      <path
        d="M 152 84 l 9 4 -7 2 -1 5 -3 -6 -6 1 z"
        fill="var(--color-accent)"
      />

      {/* origin: the press */}
      <g fill="none" stroke="var(--color-navy)" strokeWidth="1">
        <circle cx="104" cy="104" r="8" />
      </g>
      <circle cx="104" cy="104" r="2.6" fill="var(--color-navy)" />

      {/* destination: the current collection */}
      <circle cx="186" cy="122" r="4" fill="var(--color-accent)" />
      <circle cx="186" cy="122" r="10.5" fill="none" stroke="var(--color-accent)" strokeWidth="1.1" />

      <text x="62" y="92" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill="var(--color-pencil)">
        ANTWERPEN
      </text>
      <text x="200" y="118" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--color-ink)">
        NOVI PAZAR
      </text>
      <text x="200" y="129" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="var(--color-pencil)">
        COLLECTION 01
      </text>
    </svg>
  );
}
