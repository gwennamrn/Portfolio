import { memo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Cherry } from "~/components/cherry/Cherry";
import { COLORS } from "~/lib/colors";

const CHERRY_ROW_COUNT = 3;
const CHERRIES_PER_ROW = 20;

export const HeroSection = memo(function HeroSection() {
  return (
    <>
      <section
        aria-label="Présentation"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[20%] h-[60%] w-full overflow-hidden opacity-[0.08] motion-reduce:hidden"
        >
          {Array.from({ length: CHERRY_ROW_COUNT }).map((_, rowIndex) => (
            <motion.div
              key={`cherry-row-${rowIndex}`}
              className="absolute left-0 flex w-[300%] gap-[120px]"
              style={{ top: `${rowIndex * 140}px` }}
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 40 + rowIndex * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {Array.from({ length: CHERRIES_PER_ROW }).map((_, i) => (
                <Cherry key={`cherry-${rowIndex}-${i}`} size={60} color={COLORS.cherry} />
              ))}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-[900px] px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif font-bold leading-[0.95] tracking-[-0.015em] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", marginBottom: 40 }}
          >
            Gwennaëlle
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            aria-hidden="true"
            className="mx-auto mb-10 flex items-center justify-center gap-5"
          >
            <div
              className="h-px w-20"
              style={{ backgroundColor: COLORS.cherry, opacity: 0.4 }}
            />
            <Cherry size={35} color={COLORS.cherry} opacity={0.6} />
            <div
              className="h-px w-20"
              style={{ backgroundColor: COLORS.cherry, opacity: 0.4 }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-sans text-[clamp(1.5rem,4vw,2.5rem)] font-light uppercase tracking-[0.15em] text-[var(--color-ink)]"
          >
            Penser. Créer. Impacter.
          </motion.h2>
        </div>
      </section>

      <motion.section
        aria-label="Appel à l'action"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative mx-5 mb-20 overflow-hidden rounded-[40px] px-5 py-20 text-center"
        style={{ backgroundColor: COLORS.cherry }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2
            className="mb-5 font-serif font-bold tracking-[-0.01em] text-[var(--color-bg)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Découvrez la stratégie derrière chaque création.
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="inline-block">
            <Link
              to="/projects"
              viewTransition
              className="mt-5 inline-block rounded-[40px] px-11 py-[18px] text-lg font-semibold tracking-[0.03em] no-underline"
              style={{ backgroundColor: COLORS.white, color: COLORS.cherry }}
            >
              Explorer les projets
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
});
