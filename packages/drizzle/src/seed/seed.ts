import "dotenv/config"
import { initUsersData } from "./initUsersData"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "../db/schema"
import { config } from "dotenv"
config({ path: "../../.env" })
const databaseUrl = process.env.DATABASE_URL!

async function main() {
  const db = drizzle(databaseUrl)
  await db.delete(usersTable)
  let data = await db.insert(usersTable).values(initUsersData)
  console.log("Getting all users from the database: ", data)
}
console.log("main")
main()
