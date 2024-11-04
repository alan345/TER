import "dotenv/config"
import { initUsersData } from "./initUsersData"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "../db/schema"
import { DATABASE_URL } from "../../env"
async function main() {
  // const db = drizzle(process.env.DATABASE_URL!)
  const db = drizzle(DATABASE_URL)

  await db.delete(usersTable)
  // .where(eq(usersTable.email, user.email))
  await db.insert(usersTable).values(initUsersData)
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
