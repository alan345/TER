import { protectedProcedure, publicProcedure, router } from "../trpc"
import { z } from "zod"
import { database } from "../database/database"
// import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "../../drizzle/src/db/schema"
// import * as schema from "../../drizzle/src/db/schema"
import { eq } from "drizzle-orm"

export const userRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async ({ input }) => {
      return database
    }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const id = opts.input.id
      const db = opts.ctx.db
      // const db = drizzle(process.env.DATABASE_URL!, { schema })
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) })

      // const user = database.find((u) => u.id === id)
      if (!user) throw new Error("User not found")

      return user
    }),
})
