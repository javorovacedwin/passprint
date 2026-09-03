import type { CSSProperties, ReactNode } from "react";

/*
  The stamp die.

  A real passport or postal stamp: a cut die (round, octagonal, hexagonal,
  scalloped, oval or rectangular), a double rule just inside it, lettering
  arced along the top and bottom, small stars on the axis, and an engraved
  emblem in the middle — all struck through an ink-distress filter so the
  edges wobble and the ink breaks up, the way rubber on paper actually does.
*/

export type StampShape =
  | "circle"
  | "octagon"
  | "hexagon"
  | "scallop"
  | "oval"
  | "rect";

export type StampInk =
  | "vermilion"
  | "cobalt"
  | "verde"
  | "marigold"
  | "rosa"
  | "sepia"
  | "violet"
  | "ink"
  | "paper";

const inkVar: Record<StampInk, string> = {
  vermilion: "var(--color-vermilion)",
  cobalt: "var(--color-cobalt)",
  verde: "var(--color-verde)",
  marigold: "var(--color-marigold-deep)",
  rosa: "var(--color-rosa)",
  sepia: "var(--color-sepia)",
  violet: "var(--color-violet)",
  ink: "var(--color-ink)",
  paper: "var(--color-paper)",
};

/** Die outlines, all drawn inside a 0 0 120 120 box. */
function diePath(shape: StampShape, inset = 0): string {
  const c = 60;
  const r = 54 - inset;
  switch (shape) {
    case "circle":
      return `M ${c} ${c - r} A ${r} ${r} 0 1 1 ${c - 0.01} ${c - r} Z`;
    case "oval": {
      const rx = r;
      const ry = r * 0.74;
      return `M ${c} ${c - ry} A ${rx} ${ry} 0 1 1 ${c - 0.01} ${c - ry} Z`;
    }
    case "octagon":
    case "hexagon": {
      const n = shape === "octagon" ? 8 : 6;
      const rot = shape === "octagon" ? Math.PI / 8 : Math.PI / 6;
      return (
        Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 + rot;
          return `${i === 0 ? "M" : "L"} ${(c + Math.cos(a) * r).toFixed(2)} ${(c + Math.sin(a) * r).toFixed(2)}`;
        }).join(" ") + " Z"
      );
    }
    case "scallop": {
      // a circle bitten by small arcs — the classic airport stamp edge
      const teeth = 22;
      const pts: string[] = [];
      for (let i = 0; i < teeth; i++) {
        const a0 = (i / teeth) * Math.PI * 2;
        const a1 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a2 = ((i + 1) / teeth) * Math.PI * 2;
        const ro = r;
        const ri = r - 4.5;
        const p = (ang: number, rad: number) =>
          `${(c + Math.cos(ang) * rad).toFixed(2)} ${(c + Math.sin(ang) * rad).toFixed(2)}`;
        if (i === 0) pts.push(`M ${p(a0, ro)}`);
        pts.push(`Q ${p(a1, ri)} ${p(a2, ro)}`);
      }
      return pts.join(" ") + " Z";
    }
    case "rect": {
      const w = r * 1.92;
      const h = r * 1.24;
      const x = c - w / 2;
      const y = c - h / 2;
      return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
    }
  }
}

interface StampProps {
  topText?: string;
  bottomText?: string;
  /** Small line above the emblem, e.g. a date. */
  centerTop?: string;
  /** Small line below the emblem. */
  centerBottom?: string;
  shape?: StampShape;
  ink?: StampInk;
  size?: number;
  className?: string;
  /** Rotation in degrees — stamps are never struck perfectly straight. */
  rotate?: number;
  /** An engraved emblem drawn in the middle of the die. */
  emblem?: ReactNode;
  /** Unique-ish id so multiple stamps don't share filter/text paths. */
  idPrefix?: string;
  title?: string;
}

export function Stamp({
  topText = "PASSPRINT",
  bottomText,
  centerTop,
  centerBottom,
  shape = "circle",
  ink = "cobalt",
  size = 128,
  className = "",
  rotate = -7,
  emblem,
  idPrefix,
  title,
}: StampProps) {
  const uid = idPrefix ?? `${shape}-${ink}-${(topText + (bottomText ?? "")).replace(/\W+/g, "").slice(0, 12)}`;
  const filterId = `ink-${uid}`;
  const topArcId = `arc-t-${uid}`;
  const botArcId = `arc-b-${uid}`;
  const color = inkVar[ink];

  // `--stamp-rotate` carries this angle into the `.stamp-in` strike
  // animation, which also drives `transform` — without it the animation
  // would snap every stamp back to its default tilt.
  const stampStyle = {
    color,
    transform: `rotate(${rotate}deg)`,
    "--stamp-rotate": `${rotate}deg`,
  } as CSSProperties;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title ?? `${topText}${bottomText ? ` — ${bottomText}` : ""}`}
      className={className}
      style={stampStyle}
    >
      <defs>
        {/* the ink-distress: wobble the die, then bite gaps out of the ink */}
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="7" result="wob" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="wob"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="wobbled"
          />
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="3" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.62"
            result="bite"
          />
          <feComposite in="wobbled" in2="bite" operator="out" />
        </filter>

        <path id={topArcId} d="M 60 60 m -41 0 a 41 41 0 0 1 82 0" fill="none" />
        <path id={botArcId} d="M 60 60 m -40 0 a 40 40 0 0 0 80 0" fill="none" />
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* the cut die: outer rule, then a finer inner rule */}
        <path d={diePath(shape)} fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path d={diePath(shape, 5)} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />

        {/* arced lettering */}
        <g fill="currentColor" fontFamily="var(--font-mono)" fontWeight="600">
          {topText && (
            <text fontSize="9.6" letterSpacing="2.4">
              <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
                {topText}
              </textPath>
            </text>
          )}
          {bottomText && (
            <text fontSize="7.6" letterSpacing="1.9">
              <textPath href={`#${botArcId}`} startOffset="50%" textAnchor="middle">
                {bottomText}
              </textPath>
            </text>
          )}
        </g>

        {/* stars on the horizontal axis, the way real dies separate the arcs */}
        <g fill="currentColor">
          {[-1, 1].map((s) => (
            <path
              key={s}
              transform={`translate(${60 + s * 44} 60) scale(0.09)`}
              d="M0 -46 L11 -14 L44 -14 L18 6 L28 38 L0 19 L-28 38 L-18 6 L-44 -14 L-11 -14 Z"
            />
          ))}
        </g>

        {/* the middle: date lines and an engraved emblem */}
        {centerTop && (
          <text
            x="60"
            y={emblem ? 40 : 55}
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="7.4"
            fontWeight="600"
            letterSpacing="1.2"
          >
            {centerTop}
          </text>
        )}
        {emblem && <g transform="translate(60 62)">{emblem}</g>}
        {centerBottom && (
          <text
            x="60"
            y={emblem ? 84 : 68}
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="6.8"
            fontWeight="600"
            letterSpacing="1.1"
          >
            {centerBottom}
          </text>
        )}
      </g>
    </svg>
  );
}

/* ── engraved emblems ─────────────────────────────────────────────────── */

/** The PassPrint mark: a fortress arch over a sheet — the house emblem. */
export function ArchEmblem() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      {/* the arch / gate */}
      <path d="M-13 12 V-4 a13 13 0 0 1 26 0 V12" />
      <path d="M-6.5 12 V-3 a6.5 6.5 0 0 1 13 0 V12" strokeWidth="1.4" />
      {/* the ground line and a sheet of paper leaning at its foot */}
      <path d="M-19 12 H19" strokeWidth="2.6" />
      <path d="M-9 12 V19 h18 V12" strokeWidth="1.2" />
    </g>
  );
}

/** A tiny engraved aeroplane, for transit marks. */
export function PlaneEmblem() {
  return (
    <g fill="currentColor">
      <path d="M-16 2 L16 -6 L20 -2 L-2 10 L-8 10 L-4 2 L-12 3 L-15 6 L-18 5 Z" />
    </g>
  );
}
