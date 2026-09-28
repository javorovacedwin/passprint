import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /*
    A production build writes to the same .next directory the dev server is
    serving from, which corrupts a running `npm run dev` mid-session.
    `npm run verify` sets BUILD_DIR so the type-check/build runs into its own
    folder and leaves the dev server alone.
  */
  distDir: process.env.BUILD_DIR || ".next",
  /*
    The monthly edition (PassPrint) is not open yet, so its pages are gone
    for now; old links land somewhere useful instead of a 404.
  */
  async redirects() {
    return [
      { source: "/artists", destination: "/artist", permanent: true },
      { source: "/collection", destination: "/prints", permanent: false },
      { source: "/about", destination: "/artist", permanent: false },
      ...["/subscribe", "/how-it-works", "/vote", "/faq"].map((source) => ({
        source,
        destination: "/",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
