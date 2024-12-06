import { devicesTable } from "@ter/drizzle"
import { eq } from "drizzle-orm"

import { NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres"

const manageDevice = {
  getAndUpdateDevice: async (
    db: NodePgDatabase<typeof import("@ter/drizzle")> & {
      $client: NodePgClient
    },
    userId: string,
    userAgent: string,
    ip: string,
    deviceId?: string
  ) => {
    const lastLoginAt = new Date()
    if (!deviceId) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: devicesTable.id })
      return newDevice[0]
    }
    const device = await db.query.devicesTable.findFirst({ where: eq(devicesTable.id, deviceId) })

    if (!device) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt, userId, ip })
        .returning({ id: devicesTable.id })
      return newDevice[0]
    }

    const deviceUpdated = await db
      .update(devicesTable)
      .set({ lastLoginAt, ip })
      .where(eq(devicesTable.id, device.id))
      .returning({ id: devicesTable.id })
    return deviceUpdated[0]
  },
}
export default manageDevice
