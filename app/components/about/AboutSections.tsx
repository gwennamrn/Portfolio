import { memo, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Cherry } from "~/components/cherry/Cherry";
import { COLORS } from "~/lib/colors";

const QUALITIES = [
  {
    title: "Créative",
    content: "Transformer des idées en communication visuelle cohérente et expressive.",
  },
  {
    title: "Rigoureuse",
    content: "Structurer et organiser méthodiquement chaque étape d'un projet de communication.",
  },
  {
    title: "Autonome",
    content: "Prendre des initiatives et mener à bien les projets de manière indépendante.",
  },
] as const;

export const AboutQualities = memo(function AboutQualities() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section aria-labelledby="qualities-heading" className="mb-24">
      <h2
        id="qualities-heading"
        className="mb-14 text-center font-serif font-semibold"
        style={{ fontSize: 40, color: COLORS.cherry }}
      >
        Mes qualités
      </h2>
      <div
        className="mx-auto grid max-w-[900px] gap-8"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        {QUALITIES.map((q, i) => {
          const isHovered = hovered === i;
          return (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-8 transition-all duration-300"
              style={{
                aspectRatio: "1",
                backgroundColor: isHovered ? COLORS.cherry : COLORS.white,
                border: `3px solid ${COLORS.cherry}`,
                boxShadow: isHovered
                  ? "0 12px 30px rgba(107, 15, 26, 0.25)"
                  : "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="m-0 text-center font-serif font-semibold leading-[1.2] transition-all duration-300"
                style={{
                  fontSize: 32,
                  color: isHovered ? COLORS.white : COLORS.cherry,
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? "translateY(-10px)" : "translateY(0)",
                }}
              >
                {q.title}
              </h3>
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <p className="m-0 text-center text-base leading-[1.6]" style={{ color: COLORS.white }}>
                  {q.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

const PASSIONS = [
  "Explorer de nouvelles tendances",
  "Jouer avec les couleurs",
  "Expérimenter des formats innovants",
  "Créer des visuels impactants",
  "Développer des stratégies créatives",
] as const;

export const AboutPassions = memo(function AboutPassions() {
  return (
    <section aria-labelledby="passions-heading" className="mb-24">
      <h2
        id="passions-heading"
        className="mb-14 text-center font-serif font-semibold"
        style={{ fontSize: 40, color: COLORS.cherry }}
      >
        Ce que j'aime
      </h2>
      <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-5">
        {PASSIONS.map((passion, i) => (
          <motion.div
            key={passion}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[17px] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            style={{ color: COLORS.text }}
          >
            <Heart size={20} color={COLORS.cherry} fill={COLORS.cherry} />
            <span>{passion}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

const SKILLS = [
  {
    title: "Gestion et conception de projets de communication",
    description:
      "Comprendre les besoins d'un projet, définir des objectifs et organiser les étapes.",
  },
  {
    title: "Création de contenus visuels et digitaux",
    description:
      "Concevoir des supports attractifs et adaptés aux différents canaux (print, réseaux sociaux, web).",
  },
  {
    title: "Stratégie de communication et identité de marque",
    description:
      "Réfléchir à la cohérence d'un projet pour transmettre un message clair et renforcer l'image d'une marque.",
  },
  {
    title: "Maîtrise des outils de création graphique",
    description:
      "Utilisation d'outils professionnels comme la suite Adobe (Photoshop, Illustrator, InDesign) et Canva.",
  },
] as const;

export const AboutSkills = memo(function AboutSkills() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section aria-labelledby="skills-heading" className="mb-24">
      <h2
        id="skills-heading"
        className="mb-14 text-center font-serif font-semibold"
        style={{ fontSize: 40, color: COLORS.cherry }}
      >
        Mes compétences
      </h2>

      <div className="mx-auto grid max-w-[900px] gap-6 sm:grid-cols-2">
        {SKILLS.map((skill, i) => {
          const isHovered = hovered === i;
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-[20px] p-8 transition-all duration-300"
              style={{
                aspectRatio: "1",
                backgroundColor: isHovered ? COLORS.cherry : COLORS.white,
                border: `3px solid ${COLORS.cherry}`,
                boxShadow: isHovered
                  ? "0 12px 30px rgba(107, 15, 26, 0.25)"
                  : "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                className="m-0 text-center font-serif font-semibold leading-[1.2] transition-all duration-300"
                style={{
                  fontSize: 28,
                  color: isHovered ? COLORS.white : COLORS.cherry,
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? "translateY(-10px)" : "translateY(0)",
                }}
              >
                {skill.title}
              </h3>
              <div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <Cherry size={35} color={COLORS.white} />
                <div
                  className="h-[2px] w-12 rounded-[1px]"
                  style={{ backgroundColor: COLORS.white }}
                />
                <p
                  className="m-0 text-center text-base leading-[1.6]"
                  style={{ color: COLORS.white }}
                >
                  {skill.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});
