"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface CollectionTab {
  id: string;
  label: string;
  /** Small mono note under the label, e.g. "7 works". */
  note: string;
  panel: ReactNode;
}

/**
 * Three index tabs, cut like the tabs of a card file: the open one joins
 * the page below it, the others sit back on the deeper paper.
 *
 * The open tab is kept in the URL hash (#originals, #prints, #passprint) so
 * other pages can link straight to one, and back/forward moves between them.
 * Arrow keys move along the tabs, as a WAI-ARIA tablist expects.
 */
export function CollectionTabs({ tabs }: { tabs: CollectionTab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === hash)) setActive(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const open = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + tabs.length) % tabs.length;
    open(tabs[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Collection" className="flex gap-1 border-b-2 border-ink sm:gap-2">
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => open(tab.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`-mb-[2px] flex flex-1 flex-col items-start border-2 px-3 pb-3 pt-3 text-left transition-colors duration-[var(--duration-ui)] sm:flex-none sm:px-6 ${
                selected
                  ? "border-ink border-b-paper bg-paper"
                  : "border-ink/30 border-b-ink bg-paper-deep text-ink-soft hover:bg-paper-shade/60"
              }`}
            >
              <span className={`font-serif-display text-[clamp(1.2rem,3vw,1.9rem)] ${selected ? "text-ink" : ""}`}>
                {tab.label}
              </span>
              <span className={`mt-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${selected ? "text-vermilion" : "text-pencil"}`}>
                {tab.note}
              </span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="pt-12"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
