import { database } from "../database/database"
import { publicProcedure, router } from "../trpc"
import { z } from "zod"
import bcrypt from "bcrypt"
import { secretJwt } from "../env"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { drizzle } from "drizzle-orm/connect"
import { usersTable } from "../../drizzle/src/db/schema"

// import { drizzle } from ""
// import { usersTable } from ""

export const cookieName = "ter-auth"

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      // const db = await drizzle("node-postgres", process.env.DATABASE_URL!)
      console.log(process.env.DATABASE_URL)
      const db = await drizzle("node-postgres", process.env.DATABASE_URL!)
      const users = await db.select().from(usersTable)
      console.log("Getting all users from the database: ", users)

      const user = database.find((u) => u.email === opts.input.email)
      if (!user) throw new Error("Incorrect login")

      const isPasswordCorrect = await bcrypt.compare(opts.input.password, user.password)

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password")
      }
      const token = jwt.sign(
        {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secretJwt
      )

      opts.ctx.res.cookie(cookieName, token, {
        maxAge: 900000,
        httpOnly: true,
      })
      return true
    }),
  logout: publicProcedure.mutation(async (opts) => {
    opts.ctx.res.clearCookie(cookieName)
    return true
  }),
  getAuth: publicProcedure.query((opts) => {
    if (!opts.ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" })
    return {
      id: opts.ctx.user.id,
      name: opts.ctx.user.name,
      image: opts.ctx.user.image,
    }
  }),
})
