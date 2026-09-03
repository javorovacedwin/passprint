"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion policy: honour the user's reduced-motion preference.
 * With reducedMotion="user", Motion disables transform animations for
 * those users while keeping SSR output deterministic — components must
 * NOT branch their `initial` props on useReducedMotion(), or hydration
 * will mismatch.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
