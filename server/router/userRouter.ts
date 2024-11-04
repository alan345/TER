import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { usersTable } from "../../drizzle/src/db/schema"
import { eq } from "drizzle-orm"

export const userRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async (opts) => {
      const page = opts.input.page
      const limit = 5
      const db = opts.ctx.db
      const users = await db.query.usersTable.findMany({
        limit,
        offset: page * limit,
      })
      return { users, page, limit }
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
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) })

      if (!user) throw new Error("User not found")

      return user
    }),
})
