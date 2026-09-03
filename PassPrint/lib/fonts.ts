import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

/*
  Two visual voices plus one mono, self-hosted by next/font at build time.
  latin-ext is mandatory: place names carry č ć š ž đ.

  Newsreader now loads its heavy display weights too — the site's voice is
  a loud, joyful poster serif, not a whisper.
*/

export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});
