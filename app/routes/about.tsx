import { motion } from "motion/react";
import { Link } from "react-router";
import { Cherry } from "~/components/cherry/Cherry";
import { Timeline } from "~/components/about/Timeline";
import {
  AboutQualities,
  AboutPassions,
  AboutSkills,
} from "~/components/about/AboutSections";
import { Picture } from "~/components/ui/Picture";
import { COLORS } from "~/lib/colors";

export function meta() {
  return [
    { title: "À propos — Gwennaëlle" },
    {
      name: "description",
      content:
        "Gwennaëlle, étudiante en BTS Communication. Créative, rigoureuse, autonome. Découvrez son parcours et ses compétences.",
    },
  ];
}

export default function About() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-[120px]">
      <header className="mb-24 flex flex-wrap items-center justify-between gap-14">
        <div className="min-w-[300px] flex-1">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-5 font-serif font-normal tracking-[-0.01em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: COLORS.cherry }}
          >
            À propos de moi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-[500px] text-xl font-normal leading-[1.7]"
            style={{ color: COLORS.text }}
          >
            Étudiante en BTS Communication, passionnée par le design et la
            création de contenus visuels. Je développe des projets qui allient
            esthétique et stratégie de communication.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="relative h-[300px] w-[400px] overflow-hidden rounded-[20px]">
            <Picture
              src="/about-photo.png"
              width={400}
              height={300}
              alt="Photo de Gwennaëlle"
              className="h-full w-full object-cover"
              pictureClassName="block h-full w-full"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: COLORS.cherry, opacity: 0.08 }}
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            aria-hidden="true"
            className="absolute -bottom-5 -right-8"
          >
            <Cherry size={80} color={COLORS.red} />
          </motion.div>
        </motion.div>
      </header>

      <AboutQualities />
      <AboutPassions />
      <AboutSkills />
      <Timeline />

      <div className="text-center">
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="inline-block">
          <Link
            to="/projects"
            viewTransition
            className="inline-block rounded-[50px] px-12 py-5 text-xl font-bold no-underline shadow-[0_10px_30px_rgba(107,15,26,0.3)]"
            style={{ backgroundColor: COLORS.red, color: COLORS.white }}
          >
            Voir mes réalisations
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
