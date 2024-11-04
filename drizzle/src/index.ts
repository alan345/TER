import "dotenv/config"
import { eq } from "drizzle-orm"
import { database } from "../../server/database/database"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "./db/schema"
async function main() {
  const db = drizzle(process.env.DATABASE_URL!)

  const databaseNoId = database.map((u) => {
    const { id, ...rest } = u
    return rest
  })
  await db.delete(usersTable)
  // .where(eq(usersTable.email, user.email))
  await db.insert(usersTable).values(databaseNoId)
  // console.log("New user created!")
  const users = await db.select().from(usersTable)
  console.log("Getting all users from the database: ", users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
  // await db
  //   .update(usersTable)
  //   .set({
  //     name: "henry",
  //   })
  //   .where(eq(usersTable.email, user.email))
  // console.log("User info updated!")
  // await db.delete(usersTable).where(eq(usersTable.email, user.email))
  // console.log("User deleted!")
}
console.log("main")
main()
