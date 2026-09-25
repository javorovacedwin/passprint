import type { VoteCountry } from "./types";

/*
  Candidate countries for next month's edition. The vote is binding, not
  advisory. PassPrint travels country by country — eventually every country
  in the world — so the ballot names countries only, never cities.
  Ids are stored in votes.region_id (lib/db/schema.sql).
*/

export const voteCountries: VoteCountry[] = [
  {
    id: "italy",
    name: "Italy",
    reason: "Frescoed walls, cypress lines and a coastline that changes colour every hundred kilometres.",
    coordinates: "42.8 N, 12.8 E",
  },
  {
    id: "japan",
    name: "Japan",
    reason: "The country that taught Europe the woodblock print — a natural home for an edition.",
    coordinates: "36.2 N, 138.3 E",
  },
  {
    id: "portugal",
    name: "Portugal",
    reason: "Blue-and-white azulejo tiles, Atlantic light and whitewashed hills.",
    coordinates: "39.6 N, 8.0 W",
  },
  {
    id: "greece",
    name: "Greece",
    reason: "Marble, olive groves and islands scattered across two seas.",
    coordinates: "39.1 N, 21.8 E",
  },
  {
    id: "iceland",
    name: "Iceland",
    reason: "Black sand, glaciers and midnight sun — a landscape drawn almost in two inks already.",
    coordinates: "64.9 N, 19.0 W",
  },
  {
    id: "morocco",
    name: "Morocco",
    reason: "Zellige patterns, the Atlas mountains and the edge of the Sahara.",
    coordinates: "31.8 N, 7.1 W",
  },
];
