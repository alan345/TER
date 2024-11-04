import { publicProcedure, router } from "../trpc"
import { z } from "zod"
import bcrypt from "bcrypt"
import { secretJwt } from "../env"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { usersTable } from "../../drizzle/src/db/schema"
import { eq } from "drizzle-orm"
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
      const db = opts.ctx.db
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.email, opts.input.email) })
      console.log("Getting all users from the database: ", user)

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
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.email, opts.input.email) })
      if (user) throw new Error("User already exists")

      const newUsers = await db
        .insert(usersTable)
        .values({
          name: opts.input.name,
          email: opts.input.email,
          password: await bcrypt.hash(opts.input.password, 10),
        })
        .returning({ id: usersTable.id })

      // const isPasswordCorrect = await bcrypt.compare(opts.input.password, user.password)

      // if (!isPasswordCorrect) {
      //   throw new Error("Incorrect password")
      // }
      const token = jwt.sign(
        {
          id: newUsers[0].id,
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
