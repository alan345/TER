import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import { authRouter, cookieName } from "./router/authRouter"
import { userRouter } from "./router/userRouter"
import { healthRouter } from "./router/healthRouter"
import { albumRouter } from "./router/albumRouter"
import { beerRouter } from "./router/beerRouter"
import { t } from "./trpc"
import { secretJwt } from "./env"
import { DATABASE_URL } from "../drizzle/env"
import { movieRouter } from "./router/movieRouter"
import { photoRouter } from "./router/photoRouter"
import { employeeRouter } from "./router/employeeRouter"
import { factRouter } from "./router/factRouter"
import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { usersTable } from "../drizzle/src/db/schema"
import * as schema from "../drizzle/src/db/schema"
import { eq } from "drizzle-orm"

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
}

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const cookies = req.cookies
  const token = cookies[cookieName]
  // const db = drizzle(process.env.DATABASE_URL!, { schema })
  const db = drizzle(DATABASE_URL, { schema })

  if (token) {
    let decoded = jwt.verify(token, secretJwt) as UserIDJwtPayload
    if (decoded) {
      console.log("decoded", decoded.id)
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, decoded.id) })

      console.log("user ctx", user)
      // const user = database.find((u) => u.id === decoded.id)
      return { req, res, user, db }
    }
  }

  return { req, res, db }
}

export const mergeRouters = t.mergeRouters

const appRouter = mergeRouters(
  authRouter,
  userRouter,
  healthRouter,
  albumRouter,
  photoRouter,
  employeeRouter,
  factRouter,
  beerRouter,
  movieRouter
)
export type AppRouter = typeof appRouter

const app = express()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)
app.listen(2022)
