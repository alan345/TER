import { publicProcedure, protectedProcedure, router } from "../trpc"
import bcrypt from "bcrypt"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { devicesTable, usersTable } from "@ter/drizzle"
import { eq } from "drizzle-orm"
import { zod } from "@ter/shared"
import { utils } from "../utils"
import { timeSession, cookieNameAuth, cookieNameDevice } from "../configTer"

export const authRouter = router({
  login: publicProcedure.input(zod.zodLogin).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt },
    } = opts.ctx

    const lastLoginAt = new Date()
    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.email, opts.input.email) })

    if (!user) throw new Error("Incorrect login")

    const isPasswordCorrect = await bcrypt.compare(opts.input.password, user.password)

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password")
    }

    const token = jwt.sign({ id: user.id, exp: utils.getNewExp() }, secretJwt)

    await db.update(usersTable).set({ lastLoginAt }).where(eq(usersTable.id, user.id)).returning()
    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSession * 1000))

    const cookies = opts.ctx.req.cookies

    const userAgent = opts.ctx.req.headers["user-agent"]
    const deviceId = cookies[cookieNameDevice]
    console.log("deviceId", deviceId)
    if (!deviceId) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt })
        .returning({ id: devicesTable.id })
      opts.ctx.res.cookie(cookieNameDevice, newDevice[0].id, utils.getParamsCookies(400 * 24 * 60 * 60 * 1000))
      return true
    }
    const device = await db.query.devicesTable.findFirst({ where: eq(devicesTable.id, deviceId) })

    if (!device) {
      const newDevice = await db
        .insert(devicesTable)
        .values({ userAgent, lastLoginAt })
        .returning({ id: devicesTable.id })
      opts.ctx.res.cookie(cookieNameDevice, newDevice[0].id, utils.getParamsCookies(400 * 24 * 60 * 60 * 1000))
      return true
    }

    const deviceUpdated = await db
      .update(devicesTable)
      .set({ lastLoginAt })
      .where(eq(devicesTable.id, device.id))
      .returning({ id: devicesTable.id })

    opts.ctx.res.cookie(cookieNameDevice, deviceUpdated[0].id, utils.getParamsCookies(400 * 24 * 60 * 60 * 1000))
    return true
  }),
  refreshToken: protectedProcedure.mutation(async (opts) => {
    const {
      config: { secretJwt },
    } = opts.ctx

    const me = opts.ctx.user

    const token = jwt.sign({ id: me.id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSession * 1000))
    return true
  }),
  updateUserPassord: protectedProcedure.input(zod.zodUpdatePassword).mutation(async (opts) => {
    const me = opts.ctx.user
    const db = opts.ctx.db
    const user = await db
      .update(usersTable)
      .set({ password: await bcrypt.hash(opts.input.password, 10) })
      .where(eq(usersTable.id, me.id))
      .returning()

    return user
  }),

  signup: publicProcedure.input(zod.zodSignup).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt },
    } = opts.ctx

    const user = await db.query.usersTable.findFirst({ where: eq(usersTable.email, opts.input.email) })
    if (user) throw new Error("User already exists")

    const newUsers = await db
      .insert(usersTable)
      .values({
        name: opts.input.name,
        email: opts.input.email,
        lastLoginAt: new Date(),
        password: await bcrypt.hash(opts.input.password, 10),
      })
      .returning({ id: usersTable.id })

    const token = jwt.sign({ id: newUsers[0].id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSession * 1000))
    return true
  }),
  logout: publicProcedure.mutation(async (opts) => {
    opts.ctx.res.clearCookie(cookieNameAuth, utils.getParamsCookies(timeSession * 1000))
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
