import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { devicesTable } from "@ter/drizzle"
import { count, desc, eq } from "drizzle-orm"

export const deviceRouter = router({
  getDevices: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        search: z.string().optional(),
        userId: z.string().optional(),
      })
    )
    .query(async (opts) => {
      const page = opts.input.page
      const limit = 12
      const db = opts.ctx.db
      const devices = await db.query.devicesTable.findMany({
        limit,
        offset: (page - 1) * limit,
        orderBy: [desc(devicesTable.createdAt)],
        columns: { id: true, createdAt: true, lastLoginAt: true, userAgent: true },
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },

        where: opts.input.userId ? eq(devicesTable.userId, opts.input.userId) : undefined,
      })
      const totalData = await db.select({ count: count() }).from(devicesTable)
      // .where(opts.input.search ? ilike(devicesTable.name, `%${opts.input.search}%`) : undefined)
      const total = totalData[0].count

      return { devices, page, limit, total }
    }),
})
