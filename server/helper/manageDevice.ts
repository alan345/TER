import { devicesTable } from "@ter/drizzle"
import * as schema from "@ter/drizzle"
import { eq, and, or, inArray } from "drizzle-orm"

import { NodePgDatabase } from "drizzle-orm/node-postgres"

const manageDevice = {
  getAndUpdateDevice: async (
    db: NodePgDatabase<typeof schema>,
    userId: string,
    userAgent: string,
    ip: string,
    deviceIdsFromCookieString: string
  ) => {
    let deviceIds: string[] = []
    try {
      deviceIds = JSON.parse(deviceIdsFromCookieString)
    } catch {
      deviceIds = []
    }

    const lastLoginAt = new Date()
    if (!deviceIds) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: devicesTable.id })

      return Array.from(new Set([...deviceIds, newDevice[0].id]))
    }

    const device = await db.query.devicesTable.findFirst({
      where: and(eq(devicesTable.userId, userId), inArray(devicesTable.id, deviceIds)),
    })

    if (!device) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: devicesTable.id })
      return Array.from(new Set([...deviceIds, newDevice[0].id]))
    }

    const newDevice = await db
      .update(devicesTable)
      .set({ lastLoginAt, ip })
      .where(eq(devicesTable.id, device.id))
      .returning({ id: devicesTable.id })
    return Array.from(new Set([...deviceIds, newDevice[0].id]))
  },
}
export default manageDevice
