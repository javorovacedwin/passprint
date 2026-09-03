"use client";

import { useEffect, useState } from "react";
import type { Edition } from "@/content/types";

/**
 * A sticky index of edition codes that navigates between catalogue records
 * and highlights the one currently in view. Progressive: the anchor links
 * work with or without JavaScript; the highlight is the only enhancement.
 */
export function CatalogueIndex({ editions }: { editions: Edition[] }) {
  const [active, setActive] = useState<string>(editions[0]?.code ?? "");

  useEffect(() => {
    const targets = editions
      .map((e) => document.getElementById(e.code))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [editions]);

  return (
    <nav
      aria-label="Catalogue index"
      className="sticky top-20 hidden max-h-[70vh] overflow-y-auto lg:block"
    >
      <p className="mono-label mb-3">Plates</p>
      <ol className="space-y-1">
        {editions.map((e) => {
          const isActive = active === e.code;
          return (
            <li key={e.code}>
              <a
                href={`#${e.code}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-baseline gap-3 border-l-2 py-1 pl-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] transition-colors duration-[var(--duration-ui)] ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-pencil hover:text-ink"
                }`}
              >
                <span className="tabular-nums">{String(e.number).padStart(2, "0")}</span>
                <span className="truncate">
                  {e.subject === "To be revealed" ? "———" : e.status === "sealed" ? "sealed" : e.subject}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
