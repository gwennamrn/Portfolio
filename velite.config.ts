import { defineConfig, s } from "velite";

const LUCIDE_ICON_NAMES = [
  "Brain",
  "Heart",
  "Zap",
  "Target",
  "Lightbulb",
  "MessageCircle",
  "MousePointer",
  "Eye",
  "Users",
  "Sparkles",
  "TrendingUp",
  "Award",
  "Megaphone",
  "Palette",
  "Image",
  "Video",
  "Rocket",
  "Smile",
  "Star",
  "BookOpen",
  "ThumbsUp",
  "Handshake",
  "ShoppingBag",
] as const;

const brief = s.object({
  context: s.string(),
  mission: s.string(),
  result: s.string(),
  hook: s.string().optional(),
  slogan: s.string().optional(),
  supports: s.string().optional(),
  constraints: s.string().optional(),
  problematic: s.string().optional(),
});

const copyStrategy = s.object({
  promesse: s.string(),
  messageCle: s.string(),
  ton: s.string(),
  concept: s.string(),
});

const objective = s.object({
  type: s.string(),
  icon: s.enum(LUCIDE_ICON_NAMES),
  desc: s.string(),
});

const target = s.object({
  type: s.string(),
  desc: s.string(),
  channels: s.string().optional(),
});

const galleryItem = s.object({
  image: s.image(),
  description: s.string(),
  extraImages: s
    .array(
      s.object({
        image: s.image(),
        description: s.string(),
      }),
    )
    .optional(),
});

const videoEmbed = s.object({
  url: s.string(),
  description: s.string(),
});

const galleryFolders = s.object({
  reseauxSociaux: s.array(galleryItem).default([]),
  videos: s.array(videoEmbed).default([]),
  print: s.array(galleryItem).default([]),
  plus: s.array(galleryItem).default([]),
  preuves: s.array(galleryItem).optional(),
  moodboard: s.array(galleryItem).optional(),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/content",
    base: "/content/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    projects: {
      name: "Project",
      pattern: "projects/**/index.mdx",
      schema: s
        .object({
          id: s.number(),
          slug: s.string(),
          title: s.string(),
          subtitle: s.string(),
          category: s.enum(["formation", "entreprise", "perso"]),
          year: s.string(),
          order: s.number().default(100),
          image: s.image(),
          brief,
          copyStrategy: copyStrategy.optional(),
          objectives: s.array(objective),
          targets: s.array(target),
          gallery: s.array(s.image()).default([]),
          galleryFolders: galleryFolders.optional(),
          metadata: s.metadata(),
          body: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          url: `/projects/${data.slug}`,
        })),
    },
  },
});
