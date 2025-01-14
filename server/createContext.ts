import * as trpcExpress from "@trpc/server/adapters/express"
import jwt from "jsonwebtoken"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "@ter/drizzle"
import * as schema from "@ter/drizzle"
import { eq } from "drizzle-orm"
import { cookieNameAuth, cookieNameDeviceIds } from "./configTer"
import { config } from "dotenv"
import manageDevice from "./helper/manageDevice"
config({ path: "../.env" })

const secretJwt = process.env.JWT_SECRET
const databaseUrl = process.env.DATABASE_URL

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
  exp: number
  iat: number
}

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  if (!secretJwt) throw new Error("JWT_SECRET is not defined")
  if (!databaseUrl) throw new Error("DATABASE_URL is not defined")
  const config = { secretJwt, databaseUrl }
  const cookies = req.cookies
  const authToken = cookies[cookieNameAuth]
  const db = drizzle(databaseUrl, { schema })

  if (authToken) {
    try {
      let decoded = jwt.verify(authToken, secretJwt) as UserIDJwtPayload
      if (decoded) {
        const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, decoded.id) })
        if (!user) throw new Error("User not found")

        const cookies = req.cookies
        const deviceIdsFromCookieString: string = cookies[cookieNameDeviceIds]
        const device = await manageDevice.getDeviceFromCookieString(db, user.id, deviceIdsFromCookieString)

        if (!device) throw new Error("Device not found")
        return { req, res, user, db, config, decoded, device }
      }
    } catch (error) {
      console.log("error", error)
      res.clearCookie(cookieNameAuth)
    }
  }
  return { req, res, db, config }
}
