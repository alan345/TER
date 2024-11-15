import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"
config({ path: "../.env" })
const databaseUrl = process.env.DATABASE_URL

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl!,
  },
})
