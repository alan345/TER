import { devicesTable, usersTable } from "@ter/drizzle"
import { eq } from "drizzle-orm"
import { zod } from "@ter/shared"
import { utils } from "../utils"
import { NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres"

const manageDevice = {
  getAndUpdateDevice: async (
    db: NodePgDatabase<typeof import("/Users/alan/Documents/apps/TER/packages/drizzle/index")> & {
      $client: NodePgClient
    },
    userId: string,
    userAgent: string,
    deviceId?: string
  ) => {
    const lastLoginAt = new Date()
    // const forHundredDaysInMs = 400 * 24 * 60 * 60 * 1000 // https://developer.chrome.com/blog/cookie-max-age-expires/
    if (!deviceId) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId })
        .returning({ id: devicesTable.id })
      //   opts.ctx.res.cookie(cookieNameDevice, newDevice[0].id, utils.getParamsCookies(forHundredDaysInMs))
      return newDevice[0]
    }
    const device = await db.query.devicesTable.findFirst({ where: eq(devicesTable.id, deviceId) })

    if (!device) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId })
        .returning({ id: devicesTable.id })
      //   opts.ctx.res.cookie(cookieNameDevice, newDevice[0].id, utils.getParamsCookies(forHundredDaysInMs))
      return newDevice[0]
    }

    const deviceUpdated = await db
      .update(devicesTable)
      .set({ lastLoginAt })
      .where(eq(devicesTable.id, device.id))
      .returning({ id: devicesTable.id })
    return deviceUpdated[0]
    // opts.ctx.res.cookie(cookieNameDevice, deviceUpdated[0].id, utils.getParamsCookies(forHundredDaysInMs))
  },
}
export default manageDevice
