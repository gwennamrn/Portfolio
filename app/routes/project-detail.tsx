import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { Route } from "./+types/project-detail";
import { projects } from "#content/index.js";
import { COLORS, CATEGORY_CONFIG } from "~/lib/colors";
import { getIcon } from "~/lib/icons";
import { ProjectGallery } from "~/components/project/ProjectGallery";
import { FolderImagesGrid, FolderVideosGrid } from "~/components/project/FolderCard";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.project) {
    return [{ title: "Projet introuvable" }];
  }
  const p = data.project;
  return [
    { title: `${p.title} — Gwennaëlle` },
    { name: "description", content: p.subtitle },
    { property: "og:title", content: p.title },
    { property: "og:description", content: p.subtitle },
    { property: "og:image", content: p.image.src },
    { property: "og:type", content: "article" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  return { project };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const p = loaderData.project;
  const cat = CATEGORY_CONFIG[p.category];
  const folders = p.galleryFolders;

  return (
    <article className="pb-24 pt-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <Link
          to="/projects"
          viewTransition
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-cherry)] no-underline"
        >
          <ArrowLeft size={16} /> Retour aux projets
        </Link>
      </div>

      <header className="mx-auto mb-16 max-w-[1280px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em]"
              style={{ backgroundColor: cat.color + "22", color: cat.color }}
            >
              {cat.label} · {p.year}
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 font-serif font-normal leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                viewTransitionName: `project-title-${p.slug}`,
              } as React.CSSProperties}
            >
              {p.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-light italic opacity-80"
            >
              {p.subtitle}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overflow-hidden rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            style={{ viewTransitionName: `project-image-${p.slug}` } as React.CSSProperties}
          >
            <img
              src={p.image.src}
              width={p.image.width}
              height={p.image.height}
              alt={`Cover du projet ${p.title}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </header>

      <section className="mx-auto mb-20 max-w-[900px] px-6">
        <SectionTitle>Brief</SectionTitle>
        <BriefBlock label="Contexte" value={p.brief.context} />
        {p.brief.hook && <BriefBlock label="Accroche" value={p.brief.hook} tone="cherry" />}
        <BriefBlock label="Mission" value={p.brief.mission} />
        {p.brief.constraints && <BriefBlock label="Contraintes" value={p.brief.constraints} />}
        {p.brief.problematic && <BriefBlock label="Problématique" value={p.brief.problematic} />}
        {p.brief.slogan && <BriefBlock label="Slogan" value={p.brief.slogan} tone="cherry" />}
        {p.brief.supports && <BriefBlock label="Supports" value={p.brief.supports} />}
        <BriefBlock label="Résultat attendu" value={p.brief.result} />
      </section>

      {p.copyStrategy && (
        <section className="mx-auto mb-20 max-w-[900px] px-6">
          <SectionTitle>Copy strategy</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <BriefBlock label="Promesse" value={p.copyStrategy.promesse} />
            <BriefBlock label="Message clé" value={p.copyStrategy.messageCle} />
            <BriefBlock label="Ton" value={p.copyStrategy.ton} />
            <BriefBlock label="Concept" value={p.copyStrategy.concept} />
          </div>
        </section>
      )}

      <section className="mx-auto mb-20 max-w-[1100px] px-6">
        <SectionTitle>Objectifs</SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {p.objectives.map((o) => {
            const Icon = getIcon(o.icon);
            return (
              <motion.div
                key={o.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: COLORS.cherry + "18", color: COLORS.cherry }}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 font-serif text-xl" style={{ color: COLORS.cherry }}>
                  {o.type}
                </h3>
                <p className="text-sm leading-relaxed opacity-80">{o.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-[1100px] px-6">
        <SectionTitle>Cibles</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {p.targets.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: COLORS.beige, border: `2px solid ${COLORS.cherry}22` }}
            >
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.1em]"
                style={{ color: COLORS.cherry }}
              >
                {t.type}
              </h3>
              <p className="text-sm leading-relaxed">{t.desc}</p>
              {t.channels && (
                <p className="mt-3 text-xs italic opacity-70">Canaux : {t.channels}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section className="mx-auto mb-20 px-6">
          <div className="mx-auto max-w-[1100px]">
            <SectionTitle>Galerie</SectionTitle>
          </div>
          <ProjectGallery images={p.gallery} alt={p.title} />
        </section>
      )}

      {folders && (
        <section className="mx-auto mb-24 max-w-[1100px] px-6">
          <SectionTitle>Supports</SectionTitle>
          <div className="space-y-12">
            {folders.reseauxSociaux.length > 0 && (
              <FolderSection title="Réseaux sociaux">
                <FolderImagesGrid items={folders.reseauxSociaux} />
              </FolderSection>
            )}
            {folders.videos.length > 0 && (
              <FolderSection title="Vidéos">
                <FolderVideosGrid items={folders.videos} />
              </FolderSection>
            )}
            {folders.print.length > 0 && (
              <FolderSection title="Print">
                <FolderImagesGrid items={folders.print} />
              </FolderSection>
            )}
            {folders.plus.length > 0 && (
              <FolderSection title="Plus">
                <FolderImagesGrid items={folders.plus} />
              </FolderSection>
            )}
            {folders.preuves && folders.preuves.length > 0 && (
              <FolderSection title="Preuves">
                <FolderImagesGrid items={folders.preuves} />
              </FolderSection>
            )}
            {folders.moodboard && folders.moodboard.length > 0 && (
              <FolderSection title="Moodboard">
                <FolderImagesGrid items={folders.moodboard} />
              </FolderSection>
            )}
          </div>
        </section>
      )}
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-10 font-serif font-semibold"
      style={{ color: COLORS.cherry, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
    >
      {children}
    </h2>
  );
}

function BriefBlock({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "cherry";
}) {
  return (
    <div
      className="mb-5 rounded-2xl p-6"
      style={{
        backgroundColor: tone === "cherry" ? COLORS.cherry + "10" : COLORS.white,
        borderLeft: `4px solid ${tone === "cherry" ? COLORS.cherry : COLORS.red}`,
      }}
    >
      <h3
        className="mb-2 text-xs font-bold uppercase tracking-[0.1em]"
        style={{ color: tone === "cherry" ? COLORS.cherry : COLORS.red }}
      >
        {label}
      </h3>
      <p className="text-base leading-relaxed">{value}</p>
    </div>
  );
}

function FolderSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="mb-6 font-serif text-2xl font-semibold"
        style={{ color: COLORS.cherry }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
