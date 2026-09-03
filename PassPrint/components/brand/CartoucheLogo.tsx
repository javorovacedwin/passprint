/*
  The PassPrint cartouche — the full ceremonial mark.

  An ornate stepped-corner label with perforated stamp edges, an engraved
  globe, the PassPrint wordmark in the display serif, hexagon badges holding
  an aeroplane and a compass rose, the P roundel, and the collection's
  coordinates struck along the foot. Used large: the hero, the about page,
  the story cards.
*/

interface CartoucheLogoProps {
  className?: string;
  ink?: string;
  accent?: string;
  paper?: string;
  /** Coordinates struck along the bottom edge. */
  coordinates?: string;
  distress?: boolean;
  uid?: string;
  title?: string;
}

/** The ornate stepped-corner outline, drawn in a 0 0 640 470 box. */
const CARTOUCHE_PATH = `
  M 96 74
  H 168 V 52 H 236 V 40
  C 300 22, 340 22, 404 40
  V 52 H 472 V 74 H 544
  V 132 H 566 V 176
  C 594 216, 594 254, 566 294
  V 338 H 544 V 396
  H 472 V 418 H 404 V 430
  C 340 448, 300 448, 236 430
  V 418 H 168 V 396 H 96
  V 338 H 74 V 294
  C 46 254, 46 216, 74 176
  V 132 H 96 Z
`;

export function CartoucheLogo({
  className = "",
  ink = "var(--color-navy)",
  accent = "var(--color-rust)",
  paper = "var(--color-paper)",
  coordinates = "43.1367° N, 20.5122° E",
  distress = true,
  uid = "cart",
  title = "PassPrint — Journeys Marked. Printed Memories, Stamped Stories.",
}: CartoucheLogoProps) {
  const fid = `cart-ink-${uid}`;
  const topArc = `cart-top-${uid}`;
  const botArc = `cart-bot-${uid}`;

  return (
    <svg
      viewBox="0 0 640 470"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <filter id={fid} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="11" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" seed="6" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.3 0 0 0 -0.68" result="b" />
          <feComposite in="d" in2="b" operator="out" />
        </filter>
        <path id={topArc} d="M320 250 m -168 0 a 168 168 0 0 1 336 0" fill="none" />
        <path id={botArc} d="M320 236 m -186 0 a 186 186 0 0 0 372 0" fill="none" />
      </defs>

      <g filter={distress ? `url(#${fid})` : undefined}>
        {/* the ornate frame: outer rule, inner hairline */}
        <path d={CARTOUCHE_PATH} fill="none" stroke={ink} strokeWidth="7" strokeLinejoin="round" />
        <path
          d={CARTOUCHE_PATH}
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinejoin="round"
          transform="translate(320 235) scale(0.955) translate(-320 -235)"
        />

        {/* perforated stamp edges, left and right */}
        <g fill={ink}>
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={`pl${i}`} cx="52" cy={150 + i * 21} r="5" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={`pr${i}`} cx="588" cy={150 + i * 21} r="5" />
          ))}
        </g>

        {/* JOURNEYS · MARKED, arced above the globe */}
        <text
          fill={ink}
          fontFamily="var(--font-serif)"
          fontWeight="700"
          fontSize="21"
          letterSpacing="5"
        >
          <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
            JOURNEYS · MARKED
          </textPath>
        </text>

        {/* the engraved globe */}
        <g transform="translate(320 148)" fill="none" stroke={ink} strokeWidth="2">
          <circle r="38" strokeWidth="2.6" />
          <ellipse rx="38" ry="13" />
          <ellipse rx="38" ry="26" />
          <ellipse rx="13" ry="38" />
          <ellipse rx="26" ry="38" />
          <line x1="-38" y1="0" x2="38" y2="0" />
          {/* a suggestion of landmass, engraved not mapped */}
          <path
            d="M-22 -14 q 9 -7 17 -2 t 13 5 q -6 8 -15 6 t -15 -9 Z M-6 10 q 10 -4 15 3 t 3 13 q -11 3 -16 -5 t -2 -11 Z"
            fill={ink}
            stroke="none"
            opacity="0.85"
          />
        </g>

        {/* EST. and 2026 flanking the globe */}
        <g fill={accent} fontFamily="var(--font-serif)" fontWeight="700" fontSize="20" letterSpacing="3">
          <text x="228" y="150" textAnchor="middle">EST.</text>
          <text x="416" y="150" textAnchor="middle">2026</text>
        </g>
        <path d="M252 178 l7 6 -7 6 -7 -6 Z" fill={ink} />
        {/* rust cancellation waves flying off to the right of the globe */}
        <g transform="translate(430 150) scale(0.62)">
          <g fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round">
            {[0, 15, 30, 45].map((dy) => (
              <path key={dy} d={`M4 ${12 + dy} Q 42 ${dy} 80 ${12 + dy} T 156 ${10 + dy}`} />
            ))}
          </g>
        </g>

        {/* the wordmark */}
        <text
          x="320"
          y="270"
          textAnchor="middle"
          fill={ink}
          fontFamily="var(--font-serif)"
          fontWeight="700"
          fontSize="74"
          letterSpacing="0.5"
        >
          PassPrint
        </text>

        {/* rules flanking the roundel */}
        <g stroke={ink} strokeWidth="2.2">
          <line x1="118" y1="298" x2="264" y2="298" />
          <line x1="376" y1="298" x2="522" y2="298" />
        </g>

        {/* hexagon badges: aeroplane and compass rose */}
        <g stroke={accent} strokeWidth="2.6" fill="none">
          <path d="M96 232 l26 -15 26 15 v30 l-26 15 -26 -15 Z" />
          <path d="M492 232 l26 -15 26 15 v30 l-26 15 -26 -15 Z" />
        </g>
        <g fill={accent}>
          <path transform="translate(122 247) scale(0.5)" d="M-22 3 L22 -8 L28 -2 L-2 14 L-11 14 L-6 3 L-16 4 L-20 8 L-24 7 Z" />
          <path transform="translate(518 247) scale(0.055)" d="M0 -180 L38 -46 L170 -8 L38 30 L0 164 L-38 30 L-170 -8 L-38 -46 Z" />
        </g>

        {/* PRINTED MEMORIES · roundel · STAMPED STORIES */}
        <g fill={ink} fontFamily="var(--font-serif)" fontWeight="700" fontSize="14.5" letterSpacing="1.9">
          <text x="172" y="336" textAnchor="middle">PRINTED MEMORIES</text>
          <text x="468" y="336" textAnchor="middle">STAMPED STORIES</text>
        </g>

        {/* the P roundel, scalloped like a bottle cap, in rust */}
        <g transform="translate(320 330)">
          <g fill={accent}>
            {/* rounded: raw floats serialise differently on server and
                client, which trips React's hydration check */}
            {Array.from({ length: 26 }, (_, i) => {
              const a = (i / 26) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={(Math.cos(a) * 33).toFixed(2)}
                  cy={(Math.sin(a) * 33).toFixed(2)}
                  r="4.2"
                />
              );
            })}
          </g>
          <circle r="31" fill="none" stroke={accent} strokeWidth="3" />
          <circle r="26" fill="none" stroke={accent} strokeWidth="1.2" />
          <text
            y="14"
            textAnchor="middle"
            fill={accent}
            fontFamily="var(--font-serif)"
            fontWeight="700"
            fontSize="42"
          >
            P
          </text>
          <g stroke={accent} strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="4" />
            <line x1="4" y1="11" x2="18" y2="11" />
          </g>
        </g>

        {/* small lozenges beside the roundel */}
        <g fill={accent}>
          <path d="M262 331 l6 5 -6 5 -6 -5 Z" />
          <path d="M378 331 l6 5 -6 5 -6 -5 Z" />
        </g>

        {/* coordinates arced along the foot */}
        <text
          fill={ink}
          fontFamily="var(--font-mono)"
          fontWeight="600"
          fontSize="19"
          letterSpacing="2.6"
        >
          <textPath href={`#${botArc}`} startOffset="50%" textAnchor="middle">
            {coordinates}
          </textPath>
        </text>
      </g>
    </svg>
  );
}
