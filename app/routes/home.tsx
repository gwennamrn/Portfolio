import type { Route } from "./+types/home";
import { projects } from "#content/index.js";
import { FallingCherries } from "~/components/cherry/FallingCherries";
import { HeroSection } from "~/components/hero/HeroSection";
import { ProjectPreview, type ProjectPreviewItem } from "~/components/project/ProjectPreview";

export function meta() {
  return [
    { title: "Gwennaëlle — Portfolio BTS Communication" },
    {
      name: "description",
      content:
        "Portfolio de Gwennaëlle, étudiante en BTS Communication. Projets créatifs, stratégies de marque, direction artistique.",
    },
  ];
}

const FEATURED_SLUGS = ["soleia", "glowringa", "lgm"] as const;

export function loader() {
  const featured: ProjectPreviewItem[] = FEATURED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ slug: p.slug, title: p.title, category: p.category }));
  return { featured };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <FallingCherries />
      <HeroSection />
      <ProjectPreview projects={loaderData.featured} />
    </>
  );
}
