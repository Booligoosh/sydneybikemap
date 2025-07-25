import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import postcss from "./postcss.config.cjs";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    imagetools(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        id: "bikemap",
        name: "SydneyBikeMap",
        short_name: "SydneyBikeMap",
        display: "standalone",
        start_url: "/?utm_source=web_app_manifest&utm_medium=start_url",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        description: "Your guide to Sydney’s cycle network 🚲️",
        categories: ["navigation", "transportation"],
        icons: [
          {
            src: "/logo/logo-non-maskable-prod.png?v=1",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo/logo-maskable-prod.png?v=1",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}", "assets/**/*"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss,
  },
  build: {
    sourcemap: true,
  },
});
