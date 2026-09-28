/** The quiet head of a page: a small label, a large Garamond title, one line at most. */
export function PageTitle({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {label && <p className="mono-label">{label}</p>}
      <h1 className="font-serif-display mt-4 text-[clamp(2.8rem,6vw,4.4rem)]">{title}</h1>
      {children && (
        <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-ink-soft">{children}</p>
      )}
    </header>
  );
}
