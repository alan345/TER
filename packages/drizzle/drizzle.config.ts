import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"
console.log("dotenv.config()")
dotenv.config({ path: "../../server.env" })
const databaseUrl = process.env.DATABASE_URL!

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined. Make sure .env is loaded.")
}

console.log("process.env)", process.env)
console.log("databaseUrl", databaseUrl)
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
})
