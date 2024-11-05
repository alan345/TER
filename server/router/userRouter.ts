import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { usersTable } from "@ter/drizzle/src/db/schema"
import { eq, count } from "drizzle-orm"

export const userRouter = router({
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const user = await db
        .update(usersTable)
        .set({ name: opts.input.name })
        .where(eq(usersTable.id, opts.input.id))
        .returning()

      return user
    }),

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
      const totalData = await db.select({ count: count() }).from(usersTable)
      const total = totalData[0].count

      return { users, page, limit, total }
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
