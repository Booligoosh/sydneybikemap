import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    enhancedImages(),
    SvelteKitPWA({
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
        globPatterns: ["**/*.{js,css,html}", "/lib/assets/**/*"],
        maximumFileSizeToCacheInBytes: 2097152 * 2,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
});
