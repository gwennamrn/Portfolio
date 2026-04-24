import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    const { projects } = await import("./.velite/index.js").catch(() => ({ projects: [] as Array<{ slug: string }> }));
    return [
      "/",
      "/projects",
      "/about",
      "/contact",
      ...projects.map((p) => `/projects/${p.slug}`),
    ];
  },
} satisfies Config;
