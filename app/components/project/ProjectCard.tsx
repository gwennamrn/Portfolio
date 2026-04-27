import { memo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Picture } from "~/components/ui/Picture";
import { COLORS, CATEGORY_CONFIG, type Category } from "~/lib/colors";

export interface ProjectCardData {
  slug: string;
  title: string;
  category: Category;
  image: { src: string; width: number; height: number };
}

const LABELS: Record<Category, string> = {
  formation: "Projet en formation",
  entreprise: "Projet en entreprise",
  perso: "Projet personnel",
};

export const ProjectCard = memo(function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      className="relative h-[420px] w-[400px] overflow-hidden rounded-[30px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
    >
      <Link
        to={`/projects/${project.slug}`}
        viewTransition
        aria-label={`Voir le projet ${project.title}`}
        className="block h-full w-full"
      >
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.8 }}
          className="h-full w-full"
        >
          <Picture
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={`Aperçu du projet ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-center"
            style={{ viewTransitionName: `project-image-${project.slug}` } as React.CSSProperties}
            pictureClassName="block h-full w-full"
          />
        </motion.div>

        <div
          className="absolute left-5 top-5 z-[2] whitespace-nowrap rounded-[50px] px-4 py-2 text-[13px] font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          style={{ backgroundColor: COLORS.red, color: COLORS.beige }}
        >
          {LABELS[project.category]}
        </div>

        <motion.div
          variants={{ hover: { opacity: 0.4 } }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ backgroundColor: COLORS.red }}
        />

        <motion.div
          variants={{ hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <div
            className="whitespace-nowrap rounded-[30px] px-8 py-4 text-base font-semibold shadow-[0_8px_24px_rgba(107,15,26,0.4)]"
            style={{ backgroundColor: COLORS.red, color: COLORS.white }}
          >
            Voir le projet
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
});

export { CATEGORY_CONFIG };
