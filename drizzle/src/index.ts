import "dotenv/config"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/connect"
import { usersTable } from "./db/schema"
async function main() {
  const db = await drizzle("node-postgres", process.env.DATABASE_URL!)
  // const user: typeof usersTable.$inferInsert = {
  //   name: "John",
  //   password: "123456",
  //   // age: 30,

  //   email: "johna@example.com",
  // }
  // await db.insert(usersTable).values(user)
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
