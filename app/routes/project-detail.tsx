import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Info, Target, Users, Users2 } from "lucide-react";
import type { Route } from "./+types/project-detail";
import { projects } from "#content/index.js";
import { COLORS } from "~/lib/colors";
import { getIcon } from "~/lib/icons";
import { useState } from "react";
import {
  FolderCard,
  FolderImagesGrid,
  FolderVideosGrid,
  FolderMoodboardGrid,
  FolderPreuvesGrid,
} from "~/components/project/FolderCard";
import { Picture } from "~/components/ui/Picture";

type FolderKey =
  | "reseauxSociaux"
  | "videos"
  | "print"
  | "plus"
  | "preuves"
  | "moodboard";

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
  const folders = p.galleryFolders;
  const isSoleia = p.slug === "soleia";
  const isLGM = p.slug === "lgm";

  const [selectedFolder, setSelectedFolder] = useState<FolderKey | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFolder = (key: FolderKey) =>
    setSelectedFolder((prev) => (prev === key ? null : key));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative overflow-hidden pb-[100px]"
    >
      {/* Header */}
      <header className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-[60px] pt-[120px] text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-[15px] font-serif font-bold leading-[1.1]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: COLORS.text,
            viewTransitionName: `project-title-${p.slug}`,
          } as React.CSSProperties}
        >
          {p.title}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 font-normal"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: COLORS.text,
          }}
        >
          {p.subtitle}
        </motion.h2>
      </header>

      {/* Brief */}
      <section
        aria-labelledby="brief-heading"
        className="mx-auto mb-[100px] max-w-[1000px] px-5"
      >
        <div
          className="relative rounded-[30px] px-10 py-[60px] shadow-[0_10px_30px_rgba(107,15,26,0.2)]"
          style={{ backgroundColor: COLORS.red }}
        >
          <div
            className="absolute -top-6 left-10 rounded-full p-[15px] shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: COLORS.white, color: COLORS.red }}
            aria-hidden="true"
          >
            <Info size={24} />
          </div>
          <h3
            id="brief-heading"
            className="mb-[30px] text-[28px]"
            style={{ color: COLORS.white }}
          >
            Brief & Contexte
          </h3>
          <div
            className="text-base leading-[1.7]"
            style={{ color: COLORS.white }}
          >
            <p className="mb-[15px]">
              <strong>Contexte :</strong> {p.brief.context}
            </p>
            {p.brief.hook && (
              <p
                className="mb-[15px] pl-[15px] text-lg italic"
                style={{ borderLeft: `3px solid ${COLORS.white}` }}
              >
                {p.brief.hook}
              </p>
            )}
            <p className="mb-[15px]">
              <strong>Mission / Création :</strong> {p.brief.mission}
            </p>
            {p.brief.slogan && (
              <p className="mb-[15px]">
                <strong>Slogan principal :</strong> {p.brief.slogan}
              </p>
            )}
            {p.brief.supports && (
              <p className="mb-[15px]">
                <strong>Supports réalisés :</strong> {p.brief.supports}
              </p>
            )}
            <p className="my-5">
              <strong>Impact attendu :</strong> {p.brief.result}
            </p>
            {p.brief.constraints && !p.brief.hook && (
              <>
                <p className="mb-[15px]">
                  <strong>Contraintes :</strong> {p.brief.constraints}
                </p>
                {p.brief.problematic && (
                  <p className="mb-[15px]">
                    <strong>Problématique :</strong> {p.brief.problematic}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Copy stratégie */}
      {p.copyStrategy && (
        <section className="mx-auto mb-[100px] max-w-[800px] px-5">
          <div className="flex flex-col gap-10">
            {(
              [
                { label: "Promesse", value: p.copyStrategy.promesse, delay: 0 },
                { label: "Message clé", value: p.copyStrategy.messageCle, delay: 0.15 },
                { label: "Ton", value: p.copyStrategy.ton, delay: 0.3 },
                { label: "Concept", value: p.copyStrategy.concept, delay: 0.45 },
              ] as const
            ).map((block) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: block.delay, duration: 0.8 }}
              >
                <h4
                  className="mb-[15px] text-xl font-bold"
                  style={{ color: COLORS.red }}
                >
                  {block.label}
                </h4>
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(107,15,26,0.15)" }}
                  className="rounded-[20px] px-[25px] py-[30px] shadow-[0_4px_20px_rgba(107,15,26,0.1)]"
                  style={{ backgroundColor: COLORS.red }}
                >
                  <p
                    className="m-0 leading-[1.6]"
                    style={{ color: COLORS.white }}
                  >
                    {block.value}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Objectifs */}
      <section
        aria-labelledby="objectives-heading"
        className="mx-auto mb-[100px] max-w-[1200px] px-5"
      >
        <div className="mb-[50px] text-center">
          <h3
            id="objectives-heading"
            className="mb-[15px] text-[32px]"
            style={{ color: COLORS.text }}
          >
            Objectifs de communication
          </h3>
          <div
            aria-hidden="true"
            className="mx-auto h-[3px] w-[60px]"
            style={{ backgroundColor: COLORS.red }}
          />
        </div>
        <div
          className="grid gap-[30px]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {p.objectives.map((obj, index) => {
            const Icon = getIcon(obj.icon);
            return (
              <motion.div
                key={obj.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(107,15,26,0.15)" }}
                className="rounded-3xl px-[30px] py-10 shadow-[0_4px_20px_rgba(107,15,26,0.1)]"
                style={{ backgroundColor: COLORS.red }}
              >
                <div
                  className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full"
                  style={{ backgroundColor: COLORS.white, color: COLORS.red }}
                >
                  <Icon size={24} />
                </div>
                <h4
                  className="mb-[10px] text-xl"
                  style={{ color: COLORS.white }}
                >
                  Objectif {obj.type}
                </h4>
                <p className="leading-[1.6]" style={{ color: COLORS.white }}>
                  {obj.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Cibles */}
      <section
        aria-labelledby="targets-heading"
        className="mx-auto mb-[100px] max-w-[1200px] px-5"
      >
        <div className="mb-[50px] text-center">
          <h3
            id="targets-heading"
            className="mb-[15px] text-[32px]"
            style={{ color: COLORS.text }}
          >
            Coeur de cible
          </h3>
          <div
            aria-hidden="true"
            className="mx-auto h-[3px] w-[60px]"
            style={{ backgroundColor: COLORS.red }}
          />
        </div>

        {isSoleia ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-20 px-5 py-[60px]"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative flex-shrink-0"
              style={{
                width: 420,
                height: 420,
                maxWidth: "90vw",
                maxHeight: "90vw",
              }}
            >
              <svg viewBox="0 0 420 420" className="h-full w-full">
                <circle cx="210" cy="210" r="200" fill="none" stroke={COLORS.red} strokeWidth="6" opacity="0.25" />
                <circle cx="210" cy="210" r="130" fill="none" stroke={COLORS.red} strokeWidth="9" />
                <line x1="210" y1="10" x2="210" y2="70" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="210" y1="350" x2="210" y2="410" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="10" y1="210" x2="70" y2="210" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="350" y1="210" x2="410" y2="210" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
              </svg>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <p
                  className="m-0 font-bold leading-none tracking-[2px]"
                  style={{
                    fontSize: "clamp(36px, 6vw, 52px)",
                    color: COLORS.red,
                  }}
                >
                  18-35 ans
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mt-10 flex-shrink-0"
              style={{
                width: 300,
                height: 300,
                maxWidth: "75vw",
                maxHeight: "75vw",
              }}
            >
              <svg viewBox="0 0 300 300" className="h-full w-full">
                <circle cx="150" cy="150" r="140" fill="none" stroke={COLORS.red} strokeWidth="5" opacity="0.25" />
                <circle cx="150" cy="150" r="90" fill="none" stroke={COLORS.red} strokeWidth="7" />
                <line x1="150" y1="10" x2="150" y2="55" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="150" y1="245" x2="150" y2="290" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="10" y1="150" x2="55" y2="150" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="245" y1="150" x2="290" y2="150" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
              </svg>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 w-[160px] -translate-x-1/2 -translate-y-1/2 px-[10px] text-center"
              >
                <p
                  className="m-0 font-semibold leading-[1.4]"
                  style={{
                    fontSize: "clamp(12px, 2.2vw, 14px)",
                    color: COLORS.red,
                  }}
                >
                  Jeunes adultes intéressés par le développement personnel, la créativité et les expériences bien-être
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div
            className="grid gap-10"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
          >
            {p.targets.map((target, index) => {
              const TargetIcon = index === 0 ? Target : index === 1 ? Users : Users2;
              return (
                <motion.div
                  key={target.type}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                  className="rounded-3xl p-10 text-center shadow-[0_4px_15px_rgba(107,15,26,0.1)]"
                  style={{ backgroundColor: COLORS.red }}
                >
                  <div
                    className="mb-5 flex justify-center"
                    style={{ color: COLORS.white }}
                  >
                    <TargetIcon size={40} />
                  </div>
                  <h4
                    className="mb-[10px] text-[22px]"
                    style={{ color: COLORS.white }}
                  >
                    {target.type}
                  </h4>
                  <p
                    className="mb-[15px] leading-[1.6]"
                    style={{ color: COLORS.white }}
                  >
                    {target.desc}
                  </p>
                  {target.channels && (
                    <p
                      className="mt-[15px] pt-[15px] text-sm leading-[1.6]"
                      style={{
                        color: COLORS.white,
                        borderTop: "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      <strong>Canaux :</strong> {target.channels}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Galerie */}
      <section
        aria-labelledby="gallery-heading"
        className="mx-auto mb-[100px] max-w-[1200px] px-5"
      >
        <div className="mb-[50px] text-center">
          <h3
            id="gallery-heading"
            className="mb-[15px] text-[32px]"
            style={{ color: COLORS.text }}
          >
            Galerie du projet
          </h3>
          <div
            aria-hidden="true"
            className="mx-auto mb-5 h-[3px] w-[60px]"
            style={{ backgroundColor: COLORS.red }}
          />
        </div>

        {isLGM && (
          <div className="mb-[30px] text-center">
            <a
              href="https://www.figma.com/design/bQeMrKmKKL5Q19P3C5YkUz/Untitled?node-id=0-1&p=f&t=6zQtN0chzWFBubBZ-0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[25px] px-[30px] py-[15px] text-sm font-semibold tracking-[0.5px] no-underline shadow-[0_4px_15px_rgba(107,15,26,0.3)]"
              style={{ backgroundColor: COLORS.red, color: COLORS.white }}
            >
              APPLICATION MOBILE PROTOTYPE
            </a>
          </div>
        )}

        {folders ? (
          <>
            <div
              className="mb-[50px] grid justify-center gap-[25px]"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 220px))" }}
            >
              {folders.reseauxSociaux.length > 0 && (
                <FolderCard
                  title="Réseaux Sociaux"
                  isSelected={selectedFolder === "reseauxSociaux"}
                  onClick={() => toggleFolder("reseauxSociaux")}
                />
              )}
              {folders.videos.length > 0 && (
                <FolderCard
                  title="Vidéos"
                  isSelected={selectedFolder === "videos"}
                  onClick={() => toggleFolder("videos")}
                />
              )}
              {folders.print.length > 0 && (
                <FolderCard
                  title="Print"
                  isSelected={selectedFolder === "print"}
                  onClick={() => toggleFolder("print")}
                />
              )}
              {folders.plus.length > 0 && (
                <FolderCard
                  title="Plus"
                  isSelected={selectedFolder === "plus"}
                  onClick={() => toggleFolder("plus")}
                />
              )}
              {folders.preuves && folders.preuves.length > 0 && (
                <FolderCard
                  title="Preuves"
                  isSelected={selectedFolder === "preuves"}
                  onClick={() => toggleFolder("preuves")}
                />
              )}
              {folders.moodboard && folders.moodboard.length > 0 && (
                <FolderCard
                  title="Moodboard"
                  isSelected={selectedFolder === "moodboard"}
                  onClick={() => toggleFolder("moodboard")}
                />
              )}
            </div>

            {selectedFolder === "reseauxSociaux" && (
              <FolderImagesGrid items={folders.reseauxSociaux} />
            )}
            {selectedFolder === "videos" && (
              <FolderVideosGrid items={folders.videos} />
            )}
            {selectedFolder === "print" && (
              <FolderImagesGrid items={folders.print} />
            )}
            {selectedFolder === "plus" && (
              <FolderImagesGrid items={folders.plus} />
            )}
            {selectedFolder === "preuves" && folders.preuves && (
              <FolderPreuvesGrid items={folders.preuves} />
            )}
            {selectedFolder === "moodboard" && folders.moodboard && (
              <FolderMoodboardGrid items={folders.moodboard} />
            )}
          </>
        ) : p.video ? (
          <div className="mx-auto max-w-[900px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <div className="relative aspect-video">
              <iframe
                src={p.video.url}
                title={p.video.description}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            {p.video.description && (
              <div
                className="flex items-center gap-2 px-5 py-3"
                style={{ backgroundColor: COLORS.red }}
              >
                <p className="m-0 text-sm leading-[1.5]" style={{ color: COLORS.beige }}>
                  {p.video.description}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className="grid gap-[30px]"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}
          >
            {p.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ boxShadow: `0 0 0 3px ${COLORS.red}` }}
                transition={{ duration: 0.5 }}
                className="h-[350px] cursor-pointer overflow-hidden rounded-[20px] bg-white"
              >
                <Picture
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={`${p.title} - Image ${i + 1}`}
                  loading="lazy"
                  className="block h-full w-full object-contain"
                  pictureClassName="block h-full w-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Bouton retour */}
      <div className="px-5 text-center">
        <Link
          to="/projects"
          viewTransition
          className="inline-flex items-center gap-[10px] rounded-[40px] px-10 py-[18px] text-lg font-semibold no-underline shadow-[0_10px_30px_rgba(107,15,26,0.3)]"
          style={{ backgroundColor: COLORS.red, color: COLORS.white }}
        >
          <ArrowLeft size={20} /> Retour aux réalisations
        </Link>
      </div>
    </motion.div>
  );
}
