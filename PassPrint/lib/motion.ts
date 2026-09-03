/*
  Shared motion vocabulary. Everything moves like paper or ink:
  slide, tilt, stamp. Never fade-float, bounce or glow.
*/

export const easeInk = [0.2, 0.7, 0.3, 1] as const;

export const slideUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: easeInk },
};

export const slideFromEnvelope = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: easeInk },
});
