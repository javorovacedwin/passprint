import { ArchEmblem, Stamp, type StampInk, type StampShape } from "./Stamp";

interface StampMarkProps {
  /** Text along the lower arc — usually an edition code or place. */
  legend?: string;
  size?: number;
  className?: string;
  /** Ink colour; accepts a stamp ink name or a raw CSS colour. */
  color?: string;
  shape?: StampShape;
  rotate?: number;
}

/** Map the older raw-colour API onto the stamp inks. */
function resolveInk(color?: string): StampInk {
  if (!color) return "cobalt";
  if (color.includes("paper")) return "paper";
  if (color.includes("cobalt")) return "cobalt";
  if (color.includes("verde")) return "verde";
  if (color.includes("marigold")) return "marigold";
  if (color.includes("rosa")) return "rosa";
  if (color.includes("sepia")) return "sepia";
  if (color === "var(--color-ink)") return "ink";
  return "vermilion";
}

/**
 * The house mark: a struck passport stamp. PASSPRINT arced above, the
 * edition legend below, stars on the axis, and the fortress-arch emblem in
 * the middle — worn at the edges the way a rubber die always prints.
 */
export function StampMark({
  legend = "COLLECTION 01",
  size = 128,
  className = "",
  color,
  shape = "circle",
  rotate = -7,
}: StampMarkProps) {
  return (
    <Stamp
      topText="PASSPRINT"
      bottomText={legend}
      shape={shape}
      ink={resolveInk(color)}
      size={size}
      className={className}
      rotate={rotate}
      emblem={<ArchEmblem />}
      idPrefix={`mark-${legend.replace(/\W+/g, "").slice(0, 10)}-${shape}`}
      title={`PassPrint stamp — ${legend}`}
    />
  );
}
