/*
  The cultural introduction to Mostar — used on the homepage, the collection
  page and the about page for the launch edition of Yugo.
  Written to make a visitor curious about the place, not to teach a history
  lesson. Facts are grounded and respectful; no "hidden gem", no dwelling on
  the 1990s war beyond what explains the bridge itself.

  TODO: this text should be read before launch by someone from Mostar, and
  that reader credited by name — the same rule we apply to every story card.
  As later editions (Sarajevo, Beograd, …) are cast, their own place files
  follow this shape.
*/

export const mostarStory = {
  /** One line for mastheads. */
  standfirst: "A city rebuilt around the bridge that gave it its name.",

  /** Short intro, homepage length. */
  short: [
    "Mostar sits where the Neretva cuts a narrow green gorge through Herzegovina, and takes its name from the mostari — the bridge-keepers who once guarded the crossing.",
    "Its old town is small enough to cross on foot in minutes, and built almost entirely around a single arch of stone that was destroyed in 1993 and rebuilt, exactly, eleven years later.",
  ],

  /** Fuller introduction, for the collection and about pages. */
  full: [
    "Mostar grew up in the fifteenth century around a ford on the Neretva, on the road linking the Adriatic coast to the interior of the Ottoman Balkans. A wooden suspension bridge gave way in 1566 to Stari Most — the Old Bridge — a single stone arch built by the Ottoman architect Mimar Hajruddin, high enough that a boat could pass beneath it and famous, for four centuries, for the young men who dived from its parapet into the river below.",
    "The old town that grew along both banks — Kujundžiluk's coppersmiths' row on one side, the mosques and merchant houses climbing the slope on the other — is built at the scale of the bridge itself: close, stepped, and made of the same pale stone the Neretva has been cutting through for millennia.",
    "In November 1993, during the war in Bosnia and Herzegovina, Stari Most was destroyed by shelling. It was rebuilt using the original quarrying techniques and much of the recovered stone, and reopened in 2004; UNESCO inscribed the bridge and the old town the following year. The divers returned with it — the Mostari diving club is older than the rebuilt bridge itself.",
    "That is what makes Mostar the place PassPrint begins: not a skyline, but one structure that a whole town organised itself around, lost, and physically remade. It is also, still, a working town — a market street, not a monument — which is exactly the kind of place this collection was made for.",
  ],

  /** A handful of grounded facts, shown as an archive block. */
  facts: [
    { label: "Region", value: "Herzegovina, Bosnia and Herzegovina" },
    { label: "River", value: "The Neretva" },
    { label: "Built", value: "1566, rebuilt 2004 after 1993" },
    { label: "Status", value: "UNESCO World Heritage Site, 2005" },
    { label: "Known for", value: "Stari Most, Kujundžiluk, the Mostari divers" },
  ],
};
