"use client";

import { useReducedMotion, motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArtworkPlaceholder } from "@/components/artwork/ArtworkPlaceholder";
import { StampMark } from "@/components/ui/StampMark";
import { currentEdition } from "@/content/collections";

/**
 * The physical envelope, built from layered HTML/SVG with CSS perspective —
 * no GLTF. Two prints sit inside; scrolling past the hero slides them
 * further out, handing the motion to the next section. Pointer movement
 * tilts the paper a few degrees, like a sheet held in the hand.
 */
export function HeroEnvelope() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.15", "end start"],
  });
  const printRise = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -72]),
    { stiffness: 120, damping: 24 }
  );
  const smallPrintRise = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -44]),
    { stiffness: 120, damping: 26 }
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -4, y: px * 5 });
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[440px] select-none"
      style={{ perspective: "1100px" }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      aria-label={`The monthly envelope for ${currentEdition.code} — ${currentEdition.subject}, ${currentEdition.city}, containing two prints`}
      role="img"
    >
      <motion.div
        className="relative aspect-[10/7]"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* prints inside, rising out of the envelope */}
        <motion.div
          className="absolute left-[10%] top-[-12%] w-[52%] rotate-[-4deg] border border-hairline bg-paper shadow-[var(--shadow-paper)]"
          style={{ y: printRise }}
        >
          <ArtworkPlaceholder
            seedKey={currentEdition.code}
            title={`Main print — ${currentEdition.subject}, ${currentEdition.city}`}
            className="block aspect-[148/210] w-full"
          />
          <p className="border-t border-hairline-soft px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.08em] text-pencil">
            {currentEdition.code} · {currentEdition.subject}
          </p>
        </motion.div>
        <motion.div
          className="absolute right-[12%] top-[4%] w-[30%] rotate-[3deg] border border-hairline bg-paper shadow-[var(--shadow-paper)]"
          style={{ y: smallPrintRise }}
        >
          <ArtworkPlaceholder
            seedKey={`${currentEdition.code}-companion`}
            title="Companion print"
            className="block aspect-[105/148] w-full"
          />
        </motion.div>

        {/* envelope body */}
        <div className="absolute inset-x-0 bottom-0 top-[34%] bg-kraft shadow-[var(--shadow-paper-lifted)]">
          {/* inside shadow along the mouth */}
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-ink/25 to-transparent" />
          {/* address lines */}
          <div className="absolute right-[8%] top-[30%] w-[46%] space-y-3">
            <div className="h-px bg-ink/35" />
            <div className="h-px bg-ink/35" />
            <div className="h-px w-3/4 bg-ink/35" />
          </div>
          {/* postage frame */}
          <div className="absolute right-[6%] top-[8%] flex h-12 w-10 items-center justify-center border border-ink/40">
            <span className="font-mono text-[0.5rem] uppercase tracking-widest text-ink/60">
              Prio
            </span>
          </div>
          <div className="absolute left-[6%] top-[10%]">
            <StampMark legend={currentEdition.city.toUpperCase()} size={84} className="stamp-in" />
          </div>
          <p className="absolute bottom-[7%] left-[6%] font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink/60">
            {currentEdition.code} · {currentEdition.city} · {currentEdition.monthCode}
          </p>
          {/* fold line */}
          <div className="absolute inset-x-0 bottom-[18%] h-px bg-ink/10" />
        </div>
      </motion.div>
    </div>
  );
}
