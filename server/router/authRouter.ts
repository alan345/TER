import { publicProcedure, router } from "../trpc"
import bcrypt from "bcrypt"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { usersTable } from "@ter/drizzle"
import { eq } from "drizzle-orm"
import { zod } from "@ter/shared"
import { utils } from "../utils"
import { timeSession } from "../configTer"

export const authRouter = router({
  login: publicProcedure.input(zod.zodLogin).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt, cookieName },
    } = opts.ctx

    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.email, opts.input.email) })

    if (!user) throw new Error("Incorrect login")

    const isPasswordCorrect = await bcrypt.compare(opts.input.password, user.password)

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password")
    }

    const token = jwt.sign({ id: user.id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieName, token, {
      maxAge: timeSession * 1000,
      httpOnly: true,
    })
    return true
  }),
  refreshToken: publicProcedure.mutation(async (opts) => {
    const {
      config: { secretJwt, cookieName },
    } = opts.ctx

    const me = opts.ctx.user
    if (!me) throw new Error("User not found")

    const token = jwt.sign({ id: me.id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieName, token, {
      maxAge: timeSession * 1000,
      httpOnly: true,
    })
    return true
  }),
  signup: publicProcedure.input(zod.zodSignup).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt, cookieName },
    } = opts.ctx

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

    const token = jwt.sign({ id: newUsers[0].id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieName, token, {
      maxAge: timeSession * 1000,
      httpOnly: true,
    })
    return true
  }),
  logout: publicProcedure.mutation(async (opts) => {
    const {
      config: { cookieName },
    } = opts.ctx
    opts.ctx.res.clearCookie(cookieName)
    return true
  }),
  getAuth: publicProcedure.query((opts) => {
    if (!opts.ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" })
    return {
      user: {
        id: opts.ctx.user.id,
        name: opts.ctx.user.name,
        image: opts.ctx.user.image,
      },
      decoded: opts.ctx.decoded,
    }
  }),
})
