import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { usersTable } from "@ter/drizzle"
import { eq, count, desc } from "drizzle-orm"

export const userRouter = router({
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        age: z.number().min(2, "Age must be at least 2").max(120, "Age must be at max 120").optional(),
      })
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const user = await db
        .update(usersTable)
        .set({ name: opts.input.name, age: opts.input.age })
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
      const limit = 12
      const db = opts.ctx.db
      const users = await db.query.usersTable.findMany({
        limit,
        offset: (page - 1) * limit,
        orderBy: [desc(usersTable.createdAt)],
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
      const user = await db.query.usersTable.findFirst({
        columns: { id: true, name: true, age: true, email: true, image: true, createdAt: true, lastLoginAt: true },
        where: eq(usersTable.id, id),
      })

      if (!user) throw new Error("User not found")

      return user
    }),
})
