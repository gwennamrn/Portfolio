import { memo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { CATEGORY_CONFIG, COLORS, type Category } from "~/lib/colors";

export interface ProjectPreviewItem {
  slug: string;
  title: string;
  category: Category;
}

interface ProjectPreviewProps {
  projects: ProjectPreviewItem[];
}

export const ProjectPreview = memo(function ProjectPreview({ projects }: ProjectPreviewProps) {
  return (
    <section
      aria-label="Avant-goût des projets"
      className="mx-auto max-w-[900px] bg-[var(--color-bg)] px-5 py-[120px]"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-20 text-center font-serif font-bold tracking-[-0.01em] text-[var(--color-ink)]"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        Avant-goût
      </motion.h2>

      <div className="flex flex-col items-center gap-6">
        {projects.map((project, index) => {
          const config = CATEGORY_CONFIG[project.category];
          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="w-full max-w-[850px]"
            >
              <Link
                to={`/projects/${project.slug}`}
                viewTransition
                aria-label={`Voir le projet ${project.title}`}
                className="group relative flex w-full items-center rounded-[16px] border-4 px-10 py-[50px] text-left no-underline transition-all duration-300 hover:border-[var(--color-red)]"
                style={{
                  backgroundColor: COLORS.bg,
                  borderColor: COLORS.cherry,
                  boxShadow: `0 8px 24px ${COLORS.text}12, inset 0 0 0 3px ${COLORS.bg}, inset 0 0 0 8px ${COLORS.cherry}`,
                }}
              >
                <Corner position="tl" />
                <Corner position="tr" />
                <Corner position="bl" />
                <Corner position="br" />

                <span
                  className="flex-1 pr-[230px] font-sans font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--color-ink)]"
                  style={{
                    fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                    viewTransitionName: `project-title-${project.slug}`,
                  } as React.CSSProperties}
                >
                  {project.title}
                </span>

                <div
                  className="absolute right-[210px] top-[25px] bottom-[25px] w-[3px]"
                  style={{
                    backgroundImage: `linear-gradient(${COLORS.cherry} 50%, transparent 50%)`,
                    backgroundSize: "3px 10px",
                    backgroundRepeat: "repeat-y",
                  }}
                />

                <div className="absolute right-[60px] flex w-[130px] items-center justify-center">
                  <span
                    className="text-center text-sm font-bold uppercase leading-[1.5] tracking-[0.08em]"
                    style={{ color: COLORS.cherry }}
                  >
                    {config.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute h-8 w-8";
  const placement: Record<string, string> = {
    tl: "-top-[2px] -left-[2px] rounded-tl-[16px] border-l-4 border-t-4",
    tr: "-top-[2px] -right-[2px] rounded-tr-[16px] border-r-4 border-t-4",
    bl: "-bottom-[2px] -left-[2px] rounded-bl-[16px] border-b-4 border-l-4",
    br: "-bottom-[2px] -right-[2px] rounded-br-[16px] border-b-4 border-r-4",
  };
  return <div className={`${base} ${placement[position]}`} style={{ borderColor: COLORS.cherry }} />;
}
