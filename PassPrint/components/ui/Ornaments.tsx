/*
  Engraved ornaments — the traditional furniture of passports, banknotes and
  postal marks. All hand-drawn as SVG line-work: guilloche rosettes struck
  from hypotrochoids, cancellation waves, corner fleurons, engraved rules.
  Line and ink only; no fills of convenience, no gradients.
*/

interface OrnamentProps {
  className?: string;
  color?: string;
}

/**
 * A guilloche rosette — the woven spirograph line found on every passport
 * page and banknote. Generated from a hypotrochoid, so it is genuinely
 * drawn rather than drawn-to-look-drawn.
 */
export function Guilloche({
  className = "",
  color = "var(--color-cobalt)",
  petals = 11,
  rings = 3,
}: OrnamentProps & { petals?: number; rings?: number }) {
  const R = 46;
  const paths: string[] = [];

  for (let k = 0; k < rings; k++) {
    const r = R / petals;
    const d = 15 + k * 5.5;
    const steps = 720;
    let path = "";
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2 * petals;
      const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
      const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
      path += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
    }
    paths.push(path);
  }

  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true" style={{ color }}>
      <g fill="none" stroke="currentColor" strokeWidth="0.45" opacity="0.85">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <circle r="12" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
    </svg>
  );
}

/** Postal cancellation waves — the killer bars struck across a stamp. */
export function PostWaves({ className = "", color = "var(--color-ink)" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      aria-hidden="true"
      style={{ color }}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M4 10 Q 22 2 40 10 T 76 10 T 116 10" opacity="0.9" />
      <path d="M4 20 Q 22 12 40 20 T 76 20 T 116 20" opacity="0.9" />
      <path d="M4 30 Q 22 22 40 30 T 76 30 T 116 30" opacity="0.9" />
    </svg>
  );
}

/** An engraved corner fleuron, for framing document panels. */
export function Fleuron({ className = "", color = "var(--color-ink)" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" style={{ color }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 4 H26 M4 4 V26" />
        <path d="M4 4 C 20 8, 24 14, 22 26" strokeWidth="0.9" />
        <path d="M4 4 C 8 20, 14 24, 26 22" strokeWidth="0.9" />
        <circle cx="22" cy="22" r="2.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** An engraved divider rule with a lozenge at its centre. */
export function EngravedRule({ className = "", color = "var(--color-ink)" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 400 16"
      className={className}
      aria-hidden="true"
      style={{ color }}
      preserveAspectRatio="none"
    >
      <g stroke="currentColor" fill="none">
        <path d="M0 6 H176" strokeWidth="1.4" />
        <path d="M0 10 H176" strokeWidth="0.6" opacity="0.7" />
        <path d="M224 6 H400" strokeWidth="1.4" />
        <path d="M224 10 H400" strokeWidth="0.6" opacity="0.7" />
      </g>
      <path d="M200 1 L210 8 L200 15 L190 8 Z" fill="currentColor" />
      <path d="M182 8 h5 M213 8 h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** A small engraved star, used as a typographic separator. */
export function PrintStar({ className = "", color = "var(--color-vermilion)" }: OrnamentProps) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true" style={{ color }}>
      <path
        fill="currentColor"
        d="M0 -46 L11 -14 L44 -14 L18 6 L28 38 L0 19 L-28 38 L-18 6 L-44 -14 L-11 -14 Z"
      />
    </svg>
  );
}

/** Rotating ink helper: deal the stamp inks out in order. */
export const pressInks = [
  { bg: "var(--color-vermilion)", deep: "var(--color-vermilion-deep)", onDark: true },
  { bg: "var(--color-cobalt)", deep: "var(--color-cobalt-deep)", onDark: true },
  { bg: "var(--color-verde)", deep: "var(--color-verde-deep)", onDark: true },
  { bg: "var(--color-marigold)", deep: "var(--color-marigold-deep)", onDark: false },
  { bg: "var(--color-rosa)", deep: "var(--color-rosa-deep)", onDark: true },
] as const;

export function inkFor(index: number) {
  return pressInks[index % pressInks.length];
}
