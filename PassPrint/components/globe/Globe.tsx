"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GlobeFallback } from "./GlobeFallback";

/*
  Loads the Three.js scene only on the client, only after mount, so the
  first paint never waits for WebGL. Falls back to the static SVG when
  WebGL is unavailable. Mobile gets a simplified geometry.
*/

const PaperGlobe = dynamic(() => import("./PaperGlobe"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Globe() {
  const [state, setState] = useState<"pending" | "webgl" | "fallback">("pending");
  const [simple, setSimple] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setState(supportsWebGL() ? "webgl" : "fallback");
    setSimple(window.matchMedia("(max-width: 768px)").matches);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (state !== "webgl") return <GlobeFallback />;
  return <PaperGlobe simple={simple} reduceMotion={reduceMotion} />;
}
