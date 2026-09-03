import { StampP } from "./StampP";

/*
  The PassPrint seal — the primary mark.

  A double-ruled circular stamp: PASSPRINT arced above, PRINTED MEMORIES
  arced below, EST. and 2026 struck in rust on the axis, and the perforated
  postage stamp with the P at its centre. Everything is struck through an
  ink-distress filter so the ring breaks up the way a rubber die does.
*/

interface SealLogoProps {
  size?: number;
  className?: string;
  /** Primary ink for the ring and lettering. */
  ink?: string;
  /** Accent ink for EST. / 2026. */
  accent?: string;
  /** The ground the perforations bite out of. */
  paper?: string;
  /** Distress the ink (off for tiny sizes, where it muddies). */
  distress?: boolean;
  uid?: string;
  title?: string;
}

export function SealLogo({
  size,
  className = "",
  ink = "var(--color-navy)",
  accent = "var(--color-rust)",
  paper = "var(--color-paper)",
  distress = true,
  uid = "seal",
  title = "PassPrint — Printed Memories, est. 2026",
}: SealLogoProps) {
  const fid = `seal-ink-${uid}`;
  const topArc = `seal-top-${uid}`;
  const botArc = `seal-bot-${uid}`;

  return (
    <svg
      {...(size !== undefined ? { width: size, height: size } : {})}
      viewBox="0 0 200 200"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <filter id={fid} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="9" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="2" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="4" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.3 0 0 0 -0.66" result="b" />
          <feComposite in="d" in2="b" operator="out" />
        </filter>

        {/* arcs for the lettering */}
        <path id={topArc} d="M100 100 m -74 0 a 74 74 0 0 1 148 0" fill="none" />
        <path id={botArc} d="M100 100 m -72 0 a 72 72 0 0 0 144 0" fill="none" />
      </defs>

      <g filter={distress ? `url(#${fid})` : undefined}>
        {/* the double ring */}
        <g fill="none" stroke={ink}>
          <circle cx="100" cy="100" r="95" strokeWidth="1.6" />
          <circle cx="100" cy="100" r="88" strokeWidth="5" />
          <circle cx="100" cy="100" r="80.5" strokeWidth="1.2" />
        </g>

        {/* arced lettering */}
        <g fill={ink} fontFamily="var(--font-serif)" fontWeight="700">
          <text fontSize="21" letterSpacing="3.4">
            <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
              PASSPRINT
            </textPath>
          </text>
          <text fontSize="14.5" letterSpacing="4.2">
            <textPath href={`#${botArc}`} startOffset="50%" textAnchor="middle">
              PRINTED MEMORIES
            </textPath>
          </text>
        </g>

        {/* EST. and 2026 on the axis, in rust */}
        <g fill={accent} fontFamily="var(--font-serif)" fontWeight="700" fontSize="13.5" letterSpacing="2.2">
          <text x="40" y="103" textAnchor="middle">EST.</text>
          <text x="160" y="118" textAnchor="middle">2026</text>
        </g>
        <circle cx="42" cy="121" r="3.4" fill={accent} />

        {/* the postage stamp with the P */}
        <StampP ink={ink} paper={paper} uid={uid} x={65} y={44} width={70} height={87} />
      </g>
    </svg>
  );
}
