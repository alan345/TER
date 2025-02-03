import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { deviceTable } from "@fsb/drizzle"
import { drizzleOrm } from "@fsb/drizzle"
const { count, desc, eq } = drizzleOrm

const deviceRouter = router({
  deleteDevice: protectedProcedure
    .input(
      z.object({
        deviceId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      await db.delete(deviceTable).where(eq(deviceTable.id, opts.input.deviceId))

      return true
    }),

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
      const devices = await db.query.deviceTable.findMany({
        limit,
        offset: (page - 1) * limit,
        orderBy: [desc(deviceTable.lastLoginAt)],
        columns: { id: true, createdAt: true, lastLoginAt: true, userAgent: true, ip: true },
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },

        where: opts.input.userId ? eq(deviceTable.userId, opts.input.userId) : undefined,
      })
      const totalData = await db.select({ count: count() }).from(deviceTable)
      // .where(opts.input.search ? ilike(devicesTable.name, `%${opts.input.search}%`) : undefined)
      const total = totalData[0].count

      return { devices, page, limit, total }
    }),
})

export default deviceRouter
