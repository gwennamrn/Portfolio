import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, Link } from "react-router";
import { Star } from "lucide-react";
import type { Route } from "./+types/projects";
import { projects } from "#content/index.js";
import { COLORS, FILTER_OPTIONS, type FilterId } from "~/lib/colors";
import { ProjectCard } from "~/components/project/ProjectCard";

export function meta() {
  return [
    { title: "Mes réalisations — Gwennaëlle" },
    {
      name: "description",
      content:
        "Parcourez l'ensemble des projets de Gwennaëlle : formation, entreprise et personnels.",
    },
  ];
}

export function loader() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  return { projects: sorted };
}

export default function ProjectsList({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter: FilterId = (searchParams.get("cat") as FilterId) ?? "all";

  const filtered = useMemo(() => {
    if (currentFilter === "all") return loaderData.projects;
    return loaderData.projects.filter((p) => p.category === currentFilter);
  }, [currentFilter, loaderData.projects]);

  const handleFilter = (id: FilterId) => {
    if (id === "all") {
      setSearchParams({}, { replace: true, preventScrollReset: true });
    } else {
      setSearchParams({ cat: id }, { replace: true, preventScrollReset: true });
    }
  };

  return (
    <div className="pt-20">
      <header className="mx-auto max-w-[900px] px-5 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-4 font-serif font-normal text-[var(--color-ink)]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Mes Réalisations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg leading-relaxed text-[var(--color-ink)]/70"
        >
          Découvrez mes projets réalisés en formation, en entreprise et de manière personnelle.
        </motion.p>
      </header>

      <div
        role="tablist"
        aria-label="Filtrer les projets par catégorie"
        className="mb-16 flex flex-wrap justify-center gap-4 px-5"
      >
        {FILTER_OPTIONS.map((cat) => {
          const active = currentFilter === cat.id;
          return (
            <motion.button
              key={cat.id}
              role="tab"
              aria-selected={active}
              onClick={() => handleFilter(cat.id as FilterId)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="rounded-full border-0 px-7 py-3.5 text-base font-semibold"
              style={{
                backgroundColor: active ? COLORS.red : COLORS.white,
                color: active ? COLORS.white : COLORS.text,
                boxShadow: active
                  ? "0 8px 20px rgba(107, 15, 26, 0.3)"
                  : "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mb-24 max-w-[1280px] px-5">
        <motion.div
          layout
          className="grid justify-center gap-[30px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 400px))" }}
        >
          <AnimatePresence>
            {filtered.map((p) => (
              <ProjectCard
                key={p.slug}
                project={{
                  slug: p.slug,
                  title: p.title,
                  category: p.category,
                  image: p.image,
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <section
        aria-label="Projets coups de coeur"
        className="overflow-hidden bg-white py-20"
      >
        <div className="mx-auto mb-10 flex max-w-[1280px] items-center gap-4 px-5">
          <Star size={28} fill={COLORS.red} color={COLORS.red} />
          <h2 className="font-serif text-3xl text-[var(--color-ink)]">Projets coups de coeur</h2>
        </div>
        <div className="flex gap-[30px] pl-5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex w-max gap-[30px]"
          >
            {[...loaderData.projects, ...loaderData.projects].map((p, i) => (
              <Link
                key={`carousel-${p.slug}-${i}`}
                to={`/projects/${p.slug}`}
                viewTransition
                aria-label={`Voir le projet ${p.title}`}
                className="relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-[20px] no-underline"
              >
                <img
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <h4 className="text-lg text-white">{p.title}</h4>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-5 my-20 rounded-[40px] px-10 py-16 text-center shadow-[0_20px_50px_rgba(107,15,26,0.3)]"
        style={{ backgroundColor: COLORS.red, color: COLORS.white }}
      >
        <p
          className="font-semibold leading-[1.4]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          « Chaque projet reflète une intention et une démarche précise : stratégie, créativité et impact. »
        </p>
      </motion.div>
    </div>
  );
}
