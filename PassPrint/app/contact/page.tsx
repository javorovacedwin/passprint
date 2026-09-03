import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to PassPrint. A person answers within two working days.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-16">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mono-label">Correspondence</p>
          <h1 className="font-serif-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">
            Write to us
          </h1>
          <p className="mt-6 max-w-[var(--container-measure)] text-[1.05rem] leading-relaxed text-ink-soft">
            Questions about an edition, a damaged envelope, a place you think
            we should visit, or an artist we should meet — all of it welcome.
            A person answers within two working days.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:pt-28">
          <dl className="space-y-6 border-t border-hairline pt-6 font-mono text-[0.8rem]">
            <div>
              <dt className="mono-label">Email</dt>
              {/* TODO: real mailbox */}
              <dd className="mt-1 text-ink">post@passprint.example</dd>
            </div>
            <div>
              <dt className="mono-label">Postal address</dt>
              <dd className="mt-1 leading-relaxed text-ink">
                PassPrint
                <br />
                [Street and number]
                <br />
                Antwerpen, Belgium
              </dd>
            </div>
            <div>
              <dt className="mono-label">Damaged print?</dt>
              <dd className="mt-1 leading-relaxed text-ink-soft">
                Attach one photo. A replacement ships from the overrun — no
                return needed.
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
