import { publicProcedure, protectedProcedure, router } from "../trpc"
import bcrypt from "bcrypt"
import { TRPCError } from "@trpc/server"
import jwt from "jsonwebtoken"
import { userTable, userCredentialTable } from "@fsb/drizzle"
import { drizzleOrm } from "@fsb/drizzle"
import { zod } from "@fsb/shared"
import { utils } from "../utils"
import { timeSessionCookie, cookieNameAuth, cookieNameDeviceIds, timeDeviceCookie } from "../configTer"
import manageDevice from "../helper/manageDevice"

const { eq } = drizzleOrm

const authRouter = router({
  login: publicProcedure.input(zod.zodLogin).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt },
    } = opts.ctx

    const lastLoginAt = new Date()

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, opts.input.email),
      with: {
        userCredentials: true,
      },
    })

    if (!user) throw new Error("Incorrect login")
    const userCredential = await db.query.userCredentialTable.findFirst({
      where: eq(userCredentialTable.userId, user.id),
    })

    if (!userCredential) throw new Error("Incorrect login")

    const isPasswordCorrect = await bcrypt.compare(opts.input.password, userCredential.passwordHash)

    if (!isPasswordCorrect) throw new Error("Incorrect password")

    const userId = user.id
    const token = jwt.sign({ id: userId, exp: utils.getNewExp() }, secretJwt)

    await db.update(userTable).set({ lastLoginAt }).where(eq(userTable.id, userId)).returning()
    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSessionCookie))

    const userAgent = opts.ctx.req.headers["user-agent"] || ""
    let ip = opts.ctx.req.ip || ""
    const cookies = opts.ctx.req.cookies
    const deviceIdsFromCookieString = cookies[cookieNameDeviceIds] || ""

    const uniqueIds = await manageDevice.getAndUpdateDevice(db, userId, userAgent, ip, deviceIdsFromCookieString)

    opts.ctx.res.cookie(cookieNameDeviceIds, JSON.stringify(uniqueIds), utils.getParamsCookies(timeDeviceCookie))
    return true
  }),
  refreshToken: protectedProcedure.mutation(async (opts) => {
    const {
      config: { secretJwt },
    } = opts.ctx

    const me = opts.ctx.user

    const token = jwt.sign({ id: me.id, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSessionCookie))
    return true
  }),
  updateUserPassord: protectedProcedure.input(zod.zodUpdatePassword).mutation(async (opts) => {
    const me = opts.ctx.user
    const db = opts.ctx.db
    await db
      .update(userCredentialTable)
      .set({ passwordHash: await bcrypt.hash(opts.input.password, 10) })
      .where(eq(userCredentialTable.userId, me.id))

    return me
  }),

  signup: publicProcedure.input(zod.zodSignup).mutation(async (opts) => {
    const {
      db,
      config: { secretJwt },
    } = opts.ctx

    const user = await db.query.userTable.findFirst({ where: eq(userTable.email, opts.input.email) })
    if (user) throw new Error("User already exists")

    const newUsers = await db
      .insert(userTable)
      .values({
        name: opts.input.name,
        email: opts.input.email,
        lastLoginAt: new Date(),
        // password: await bcrypt.hash(opts.input.password, 10),
      })
      .returning({ id: userTable.id })
    const userId = newUsers[0].id

    await db.insert(userCredentialTable).values({
      userId,
      passwordHash: await bcrypt.hash(opts.input.password, 10),
    })

    const token = jwt.sign({ id: userId, exp: utils.getNewExp() }, secretJwt)

    opts.ctx.res.cookie(cookieNameAuth, token, utils.getParamsCookies(timeSessionCookie))

    const userAgent = opts.ctx.req.headers["user-agent"] || ""
    let ip = opts.ctx.req.ip || ""
    const cookies = opts.ctx.req.cookies
    const deviceIdsFromCookieString = cookies[cookieNameDeviceIds] || ""

    const uniqueIds = await manageDevice.getAndUpdateDevice(db, userId, userAgent, ip, deviceIdsFromCookieString)

    opts.ctx.res.cookie(cookieNameDeviceIds, JSON.stringify(uniqueIds), utils.getParamsCookies(timeDeviceCookie))

    return true
  }),
  logout: publicProcedure.mutation(async (opts) => {
    opts.ctx.res.clearCookie(cookieNameAuth, utils.getParamsCookies(timeSessionCookie))
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
      deviceid: opts.ctx.device.id,
      decoded: opts.ctx.decoded,
    }
  }),
})

export default authRouter
