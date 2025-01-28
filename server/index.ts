import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify"
import Fastify, { FastifyRequest, FastifyReply } from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import jwt from "jsonwebtoken"
import authRouter from "./router/authRouter"
import userRouter from "./router/userRouter"
import deviceRouter from "./router/deviceRouter"
import healthRouter from "./router/healthRouter"
import beerRouter from "./router/beerRouter"
import t from "./trpc"
import dotenv from "dotenv"
dotenv.config({ path: "../server.env" })
import createContext from "./context"

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string
  exp: number
  iat: number
}

export const mergeRouters = t.mergeRouters

const appRouter = mergeRouters(authRouter, userRouter, deviceRouter, healthRouter, beerRouter)
export type AppRouter = typeof appRouter

const fastify = Fastify({
  maxParamLength: 5000,
  logger: true,
})

async function main() {
  try {
    await fastify.register(fastifyCors, {
      credentials: true,
      origin: process.env.CLIENT_URL,
    })

    await fastify.register(fastifyCookie)

    fastify.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ message: "Hello, TER!" })
    })

    await fastify.register(fastifyTRPCPlugin, {
      prefix: "/",
      trpcOptions: {
        router: appRouter,
        createContext,
      } as FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
    })

    await fastify.listen({ port: 2022 })
    console.log("Server is running on port 2022")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
