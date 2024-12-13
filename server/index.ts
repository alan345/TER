import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import { authRouter } from "./router/authRouter"
import { userRouter } from "./router/userRouter"
import { deviceRouter } from "./router/deviceRouter"
import { healthRouter } from "./router/healthRouter"
import { beerRouter } from "./router/beerRouter"
import { t } from "./trpc"
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

export const mergeRouters = t.mergeRouters

const appRouter = mergeRouters(authRouter, userRouter, deviceRouter, healthRouter, beerRouter)
export type AppRouter = typeof appRouter

const app = express()
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())
app.get("/", (_req, res) => {
  res.json({ message: "Hello, TER!" })
})
app.set("trust proxy", true)
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)
app.listen(2022)
