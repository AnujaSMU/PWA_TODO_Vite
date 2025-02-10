import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "PWA with React",
        short_name: "react-pwa",
        icons: [
          {
            src: "/smu-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/smu-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          }
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#E0EBAF",
        theme_color: "#71D94E",
        description: "PWA app created with React and Vite for MCDA5550",
      },
    }),
  ],
});
