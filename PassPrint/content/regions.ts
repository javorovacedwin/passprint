import type { VoteRegion } from "./types";

/*
  Candidate regions for Collection 02. The vote is binding, not advisory.
  Votes are stored locally for now; see components/voting/VoteModule.tsx
  for the seam where Supabase replaces localStorage.
*/

export const voteRegions: VoteRegion[] = [
  {
    id: "italy",
    name: "Italy",
    samplePlaces: ["Napoli", "Palermo", "Cinque Terre"],
    reason: "Coastlines and courtyards Bakir has painted for years — the natural next chapter.",
    coordinates: "41.9 N, 12.5 E",
  },
  {
    id: "greece",
    name: "Greece",
    samplePlaces: ["Náfplio", "Chaniá", "Thessaloníki"],
    reason: "Whitewashed streets and island light — a reader favourite since the first survey.",
    coordinates: "39.0 N, 21.8 E",
  },
  {
    id: "portugal",
    name: "Portugal",
    samplePlaces: ["Porto", "Sintra", "Óbidos"],
    reason: "Azulejo tiles and Atlantic light — a whole new palette after the Balkans.",
    coordinates: "39.4 N, 8.2 E",
  },
  {
    id: "france",
    name: "France",
    samplePlaces: ["Annecy", "Colmar", "Aix-en-Provence"],
    reason: "Postcard towns most readers already dream about — an easy first spin-off.",
    coordinates: "46.6 N, 2.2 E",
  },
];
