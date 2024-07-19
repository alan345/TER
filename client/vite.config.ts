import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
