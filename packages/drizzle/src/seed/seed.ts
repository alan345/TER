import { initUsersData } from "./initUsersData"
import { drizzle } from "drizzle-orm/node-postgres"
import { userTable, deviceTable, userCredentialTable } from "../db/schema"
import dotenv from "dotenv"
dotenv.config({ path: "../../server.env" })
const databaseUrl = process.env.DATABASE_URL!

async function main() {
  console.log(`Seeding ${databaseUrl}...`)
  const db = drizzle(databaseUrl)
  await db.delete(deviceTable)
  await db.delete(userTable)
  for (const user of initUsersData) {
    let users = await db.insert(userTable).values(user).returning({ id: userTable.id })
    await db.insert(userCredentialTable).values({
      userId: users[0].id,
      passwordHash: user.password,
    })
  }

  console.log(`Done!`)
  process.exit(0)
}
main()
