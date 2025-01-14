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
import { config } from "dotenv"
import { createContext } from "./createContext"
config({ path: "../.env" })

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
  exp: number
  iat: number
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
