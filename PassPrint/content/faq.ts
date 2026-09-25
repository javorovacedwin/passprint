import type { FaqEntry } from "./types";

export const faqEntries: FaqEntry[] = [
  {
    group: "The prints",
    question: "What exactly arrives each month?",
    answer:
      "One main print (A5, 14.8 × 21 cm) and one smaller companion print (A6, 10.5 × 14.8 cm), both on premium heavyweight uncoated stock, plus a two-sided story card about the place and the artist. Everything comes flat in a stiffened envelope that fits through a letterbox.",
  },
  {
    group: "The prints",
    question: "Are the editions really limited?",
    answer:
      "Yes, and verifiably. We close the order list on the 20th of each month, print what is needed plus a small overrun, number every copy by hand on the back, and never reprint. The edition size is stated on each edition page.",
  },
  {
    group: "The prints",
    question: "Can I buy a single edition without subscribing?",
    answer:
      "The current edition can be bought on its own while its order window is open. Past editions are only available if overrun copies remain — most sell out.",
  },
  {
    group: "The prints",
    question: "Is the quality the same every month, and in future collections?",
    answer:
      "Yes. Every edition and every future collection uses the same paper, the same print quality, the same finish and the same packaging. Only the artwork, the place, the story and the envelope colour change. The production never gets cheaper as we grow.",
  },
  {
    group: "The subscription",
    question: "Can I cancel or pause?",
    answer:
      "Cancel any time before the 20th of the month with one click — no email, no retention call. You can also pause for one month, up to twice a year.",
  },
  {
    group: "The subscription",
    question: "When am I charged?",
    answer:
      "You choose one month, six months or a year. One month is charged every month; six months and a year are paid up front, at a lower price per envelope, and renew for the same term unless you cancel. Any term can be sent as a gift to someone else's address.",
  },
  {
    group: "Shipping",
    question: "When does the envelope ship?",
    answer:
      "We close the edition on the 20th, print and number around the 24th, and post around the 28th. Delivery takes two to five working days in Belgium and the Netherlands, up to ten elsewhere in Europe.",
  },
  {
    group: "Shipping",
    question: "What if it arrives damaged?",
    answer:
      "Send us one photo and we send a replacement from the overrun — no return, no discussion. We plan the overrun precisely for this.",
  },
  {
    group: "Shipping",
    question: "Do you ship outside Europe?",
    answer:
      "Not yet. We start where we can promise the envelope arrives flat and on time. Leave your address on the contact page and we will tell you when your country is added.",
  },
  {
    group: "The artists",
    question: "Who makes the work?",
    answer:
      "Every edition of Atlas is made by one artist, Bakir C., a painter from Novi Pazar. Future collections are made by artists with the same kind of real connection to their place. Every name, country and technique is printed on the story card.",
  },
  {
    group: "The artists",
    question: "Who checks the stories?",
    answer:
      "Every story card is read before printing by someone from the place it describes, and that reader is credited on the card. If we cannot find a reader, we do not make the edition.",
  },
];

export const faqGroups = [...new Set(faqEntries.map((f) => f.group))];
