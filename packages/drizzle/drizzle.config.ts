import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"
dotenv.config({ path: "../../server.env" })
const databaseUrl = process.env.DATABASE_URL!

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
})
