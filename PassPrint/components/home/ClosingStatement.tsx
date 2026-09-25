"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { CartoucheLogo } from "@/components/brand/CartoucheLogo";
import { currentEdition } from "@/content/collections";

/**
 * The sign-off. The ceremonial mark does the closing rather than a shouted
 * call to action — it lands once, in paper ink on deep navy, the way a
 * publisher's device closes a book.
 */
export function ClosingStatement() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper">
      <div className="relative mx-auto max-w-[var(--container-page)] px-gutter">
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
          className="mx-auto w-full max-w-[38rem]"
        >
          <CartoucheLogo
            ink="var(--color-paper)"
            accent="var(--color-marigold)"
            paper="var(--color-ink)"
            coordinates={currentEdition.coordinates
              .replace(" N,", "° N,")
              .replace(" E", "° E")}
            uid="closing"
            className="w-full"
          />
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="font-serif-display max-w-2xl text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15]">
            One country a month.
            <br />
            <span className="text-marigold">Begin with {currentEdition.country}.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <ButtonLink href="/subscribe" variant="vermilion">
              Join the first collection
            </ButtonLink>
            <ButtonLink
              href="/how-it-works"
              variant="text"
              className="!text-paper !decoration-marigold hover:!text-marigold"
            >
              How the months work →
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
