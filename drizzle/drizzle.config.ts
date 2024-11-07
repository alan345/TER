import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { DATABASE_URL } from "@ter/shared/env"
// console.log("DATABASE_URL", process.env.DATABASE_URL)
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,
    url: DATABASE_URL,
  },
})
