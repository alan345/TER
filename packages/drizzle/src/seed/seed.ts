import { initUsersData } from "./initUsersData"
import { drizzle } from "drizzle-orm/node-postgres"
import { userTable, deviceTable } from "../db/schema"
import dotenv from "dotenv"
dotenv.config({ path: "../../server.env" })
const databaseUrl = process.env.DATABASE_URL!

async function main() {
  console.log(`Seeding ${databaseUrl}...`)
  const db = drizzle(databaseUrl)
  await db.delete(userTable)
  await db.delete(deviceTable)
  let data = await db.insert(userTable).values(initUsersData)

  console.log(`Done! ${data.rowCount} rows inserted`)
  process.exit(0)
}
main()
