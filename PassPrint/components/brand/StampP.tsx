/*
  The house emblem: a postage stamp with a perforated edge, struck solid in
  navy, carrying a cream serif "P" and the ruled lines of a written letter.
  Drawn as SVG so it stays crisp at every size and inherits brand colours.
*/

interface StampPProps {
  /** The stamp body colour. */
  ink?: string;
  /** The colour of the paper the perforations bite out of. */
  paper?: string;
  className?: string;
  /** Unique suffix so multiple instances don't share ids. */
  uid?: string;
  /** Placement when nested inside another SVG. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export function StampP({
  ink = "var(--color-navy)",
  paper = "var(--color-paper)",
  className = "",
  uid = "p",
  x: sx,
  y: sy,
  width,
  height,
}: StampPProps) {
  // stamp body geometry inside a 0 0 100 124 box
  const x = 6;
  const y = 6;
  const w = 88;
  const h = 112;
  const perfR = 3.4;
  const perfGapX = w / 9;
  const perfGapY = h / 11;

  return (
    <svg
      viewBox="0 0 100 124"
      className={className}
      aria-hidden="true"
      {...(sx !== undefined ? { x: sx, y: sy, width, height } : {})}
    >
      {/* the stamp body */}
      <rect x={x} y={y} width={w} height={h} fill={ink} />

      {/* perforations bitten out along all four edges */}
      <g fill={paper}>
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={`t${i}`} cx={x + i * perfGapX} cy={y} r={perfR} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={`b${i}`} cx={x + i * perfGapX} cy={y + h} r={perfR} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={`l${i}`} cx={x} cy={y + i * perfGapY} r={perfR} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={`r${i}`} cx={x + w} cy={y + i * perfGapY} r={perfR} />
        ))}
      </g>

      {/* the inner rule of the stamp face */}
      <rect
        x={x + 8}
        y={y + 9}
        width={w - 16}
        height={h - 18}
        fill="none"
        stroke={paper}
        strokeWidth="2.2"
      />

      {/* the serif P, drawn as type */}
      <text
        x="44"
        y="86"
        textAnchor="middle"
        fill={paper}
        fontFamily="var(--font-serif)"
        fontSize="62"
        fontWeight="700"
      >
        P
      </text>

      {/* the ruled lines of a letter, beside the stem */}
      <g stroke={paper} strokeWidth="2.2" strokeLinecap="round">
        <line x1="52" y1="66" x2="76" y2="66" />
        <line x1="52" y1="74" x2="76" y2="74" />
        <line x1="52" y1="82" x2="72" y2="82" />
      </g>
    </svg>
  );
}

/** The rust cancellation waves that fly off the seal. */
export function CancelWaves({
  className = "",
  color = "var(--color-rust)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 70"
      className={className}
      aria-hidden="true"
      style={{ color }}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      {[0, 15, 30, 45].map((dy) => (
        <path key={dy} d={`M4 ${12 + dy} Q 42 ${0 + dy} 80 ${12 + dy} T 156 ${10 + dy}`} />
      ))}
    </svg>
  );
}
