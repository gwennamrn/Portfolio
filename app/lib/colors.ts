export const COLORS = {
  bg: "#F6F1EE",
  beige: "#F6F1EE",
  text: "#0E0E0E",
  red: "#6B0F1A",
  cherry: "#8E1B2C",
  bordeaux: "#800020",
  bordeauxLight: "#A8304A",
  white: "#FFFFFF",
} as const;

export const CATEGORY_CONFIG = {
  formation: { label: "Projet d'école", color: "#2E5C8A" },
  entreprise: { label: "Projet d'entreprise", color: "#4A7C59" },
  perso: { label: "Projet personnel", color: "#8B5A8E" },
} as const;

export const FILTER_OPTIONS = [
  { id: "all", label: "Tout afficher" },
  { id: "formation", label: "En formation" },
  { id: "entreprise", label: "En entreprise" },
  { id: "perso", label: "Projets personnels" },
] as const;

export type Category = keyof typeof CATEGORY_CONFIG;
export type FilterId = (typeof FILTER_OPTIONS)[number]["id"];
