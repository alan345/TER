import { deviceTable } from "@fsb/drizzle"
import * as schema from "@fsb/drizzle"
import { drizzleOrm } from "@fsb/drizzle"
const { eq, and, inArray } = drizzleOrm

import { NodePgDatabase } from "@fsb/drizzle"

const manageDevice = {
  getDeviceFromCookieString: async (
    db: NodePgDatabase<typeof schema>,
    userId: string,
    deviceIdsFromCookieString: string
  ) => {
    const deviceIds = manageDevice.getDeviceIdsFromCookieString(deviceIdsFromCookieString)
    const device = await db.query.deviceTable.findFirst({
      where: and(eq(deviceTable.userId, userId), inArray(deviceTable.id, deviceIds)),
    })
    return device
  },
  getAndUpdateDevice: async (
    db: NodePgDatabase<typeof schema>,
    userId: string,
    userAgent: string,
    ip: string,
    deviceIdsFromCookieString: string
  ) => {
    const lastLoginAt = new Date()
    const deviceIds = manageDevice.getDeviceIdsFromCookieString(deviceIdsFromCookieString)
    if (!deviceIds) {
      const newDevice = await db
        .insert(deviceTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: deviceTable.id })

      return Array.from(new Set([...deviceIds, newDevice[0].id]))
    }

    const device = await db.query.deviceTable.findFirst({
      where: and(eq(deviceTable.userId, userId), inArray(deviceTable.id, deviceIds)),
    })

    if (!device) {
      const newDevice = await db
        .insert(deviceTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: deviceTable.id })
      return Array.from(new Set([...deviceIds, newDevice[0].id]))
    }

    const newDevice = await db
      .update(deviceTable)
      .set({ lastLoginAt, ip })
      .where(eq(deviceTable.id, device.id))
      .returning({ id: deviceTable.id })
    return Array.from(new Set([...deviceIds, newDevice[0].id]))
  },
  getDeviceIdsFromCookieString: (deviceIdsFromCookieString: string) => {
    let deviceIds: string[] = []
    try {
      deviceIds = JSON.parse(deviceIdsFromCookieString)
    } catch {
      deviceIds = []
    }
    return deviceIds
  },
}
export default manageDevice
