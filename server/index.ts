import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import { authRouter } from "./router/authRouter"
import { userRouter } from "./router/userRouter"
import { healthRouter } from "./router/healthRouter"
import { beerRouter } from "./router/beerRouter"
import { t } from "./trpc"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "@ter/drizzle"
import * as schema from "@ter/drizzle"
import { eq } from "drizzle-orm"
import { cookieName } from "./configTer"
import { config } from "dotenv"
config({ path: "../.env.local" })
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
  const config = { secretJwt, databaseUrl, cookieName }
  const cookies = req.cookies
  const token = cookies[cookieName]
  const db = drizzle(databaseUrl, { schema })

  if (token) {
    try {
      let decoded = jwt.verify(token, secretJwt) as UserIDJwtPayload
      if (decoded) {
        const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, decoded.id) })
        return { req, res, user, db, config, decoded }
      }
    } catch (error) {
      console.log("error", error)
      res.clearCookie(cookieName)
    }
  }
  return { req, res, db, config }
}

export const mergeRouters = t.mergeRouters

const appRouter = mergeRouters(authRouter, userRouter, healthRouter, beerRouter)
export type AppRouter = typeof appRouter

console.log(process.env)
const app = express()
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())
app.get("/", (req, res) => {
  res.json({ message: "Hello, TER!" })
})
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)
app.listen(2022)
