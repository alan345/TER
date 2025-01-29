import { initUsersData } from "./initUsersData"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable, devicesTable } from "../db/schema"
import dotenv from "dotenv"
dotenv.config({ path: "../../server.env" })
const databaseUrl = process.env.DATABASE_URL!

async function main() {
  console.log(`Seeding ${databaseUrl}...`)
  const db = drizzle(databaseUrl)
  await db.delete(usersTable)
  await db.delete(devicesTable)
  let data = await db.insert(usersTable).values(initUsersData)

  console.log(`Done! ${data.rowCount} rows inserted`)
  process.exit(0)
}
main()
