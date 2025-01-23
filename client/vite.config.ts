import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import dotenv from "dotenv"
dotenv.config({ path: "./client.env" })

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
})
