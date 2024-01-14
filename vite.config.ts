import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import ogPlugin, { Options } from "vite-plugin-open-graph";

const openGraphOptions: Options = {
  basic: {
    title: "Sanzio 30",
    description: "Sanzio fa 30 anni",
    url: "https://auguri.sanziomonti.com",
    type: "website",
    image: "https://auguri.sanziomonti.com/images/sanzio_wavy.webp",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    vitePluginFaviconsInject("./src/assets/favicon.png"),
    ogPlugin(openGraphOptions),
  ],
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    port: 3000,
  },
});
