import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { PostWaves } from "@/components/ui/Ornaments";

/** One line and one field: hear about new paintings before the shop does. */
export function HomeNewsletter() {
  return (
    <section className="security-tint border-y border-ink/25 py-20">
      <div className="mx-auto flex max-w-[var(--container-measure)] flex-col items-center px-gutter text-center">
        <PostWaves className="h-8 w-40 text-rust" />
        <h2 className="font-serif-display mt-6 text-[clamp(1.9rem,4vw,2.8rem)]">
          First to hear about new work
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          New paintings and each month&apos;s edition reach the list before
          they reach the shop. One letter a month, no more.
        </p>
        <div className="mt-8 flex w-full justify-center">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
