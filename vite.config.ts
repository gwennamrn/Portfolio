import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "velite-build",
      async buildStart() {
        const { build } = await import("velite");
        await build({ watch: this.meta.watchMode, clean: false });
      },
    },
    {
      name: "optimize-images",
      async buildStart() {
        const { run } = await import("./scripts/optimize-images.mjs");
        await run();
      },
    },
    tailwindcss(),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "react-router", "motion", "motion/react"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router", "motion/react"],
  },
  ssr: {
    noExternal: ["motion"],
  },
  server: {
    port: 5173,
  },
});
