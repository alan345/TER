import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"
import jwt from "jsonwebtoken"
import { drizzleOrm_NodePostgres } from "@fsb/drizzle"
import { drizzleOrm } from "@fsb/drizzle"
const { eq } = drizzleOrm
const { drizzle } = drizzleOrm_NodePostgres
import { userTable } from "@fsb/drizzle"
import * as schema from "@fsb/drizzle"
import { cookieNameAuth, cookieNameDeviceIds } from "./configTer"
import dotenv from "dotenv"
dotenv.config({ path: "../server.env" })
import manageDevice from "./helper/manageDevice"

const secretJwt = process.env.JWT_SECRET
const databaseUrl = process.env.DATABASE_URL

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
  exp: number
  iat: number
}

const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
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
        const user = await db.query.userTable.findFirst({ where: eq(userTable.id, decoded.id) })
        if (!user) throw new Error("User not found")

        const cookies = req.cookies
        const deviceIdsFromCookieString = cookies[cookieNameDeviceIds]
        if (!deviceIdsFromCookieString) {
          throw new Error("Device cookie not found")
        }
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

export default createContext
