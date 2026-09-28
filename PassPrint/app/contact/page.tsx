import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageTitle } from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the studio of Bakir C. about a print, a painting or a commission.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[var(--container-page)] px-gutter py-20 md:py-28">
      <PageTitle label="Correspondence" title="Write to the studio">
        About a print, a painting or a commission. You hear back within two working days.
      </PageTitle>

      <div className="mx-auto mt-16 max-w-xl">
        <ContactForm />
        {/* TODO: real mailbox */}
        <p className="mono-label mt-12 text-center">post@passprint.example</p>
      </div>
    </div>
  );
}
