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
};

export default nextConfig;
