import type { VoteRegion } from "./types";

/*
  Candidate regions for Collection 02. The vote is binding, not advisory.
  Votes are stored locally for now; see components/voting/VoteModule.tsx
  for the seam where Supabase replaces localStorage.
*/

export const voteRegions: VoteRegion[] = [
  {
    id: "benelux",
    name: "Benelux",
    samplePlaces: ["Gent", "Maastricht", "Esch-sur-Alzette"],
    reason: "Closest to our printers — the easiest collection to research in person.",
    coordinates: "50.8 N, 4.4 E",
  },
  {
    id: "scandinavia",
    name: "Scandinavia",
    samplePlaces: ["Bergen", "Aarhus", "Luleå"],
    reason: "Strong printmaking tradition; we already know three artists there.",
    coordinates: "60.4 N, 8.5 E",
  },
  {
    id: "north-africa",
    name: "North Africa",
    samplePlaces: ["Tanger", "Oran", "Kairouan"],
    reason: "A reader network exists through the diaspora communities we ship to.",
    coordinates: "34.0 N, 3.0 E",
  },
  {
    id: "mediterranean",
    name: "The Mediterranean",
    samplePlaces: ["Palermo", "Marseille", "Thessaloníki"],
    reason: "Port cities share stories across the water — a natural twelve-month arc.",
    coordinates: "38.0 N, 15.0 E",
  },
];
