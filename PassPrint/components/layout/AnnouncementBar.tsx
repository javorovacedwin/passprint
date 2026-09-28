"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * A single running line above the header. The text is laid out twice and
 * the track slides by half its width, so the loop never shows a seam.
 * Under reduced motion it simply stands still.
 */
export function AnnouncementBar() {
  const { t } = useLocale();
  const items = Array.from({ length: 8 }, (_, i) => i);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <li key={i} className="flex items-center gap-10 pr-10">
          <span>{t.common.announcement}</span>
          <span aria-hidden="true" className="text-[0.5rem] text-paper/50">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden bg-ink py-2.5 text-paper">
      <div className="ticker-track flex w-max font-sans text-[0.66rem] font-normal uppercase tracking-[0.28em]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
