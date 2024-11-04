import { protectedProcedure, router } from "../trpc"
import { z } from "zod"
import { usersTable } from "../../drizzle/src/db/schema"
import { eq } from "drizzle-orm"

export const userRouter = router({
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const db = opts.ctx.db
      const user = await db
        .update(usersTable)
        .set({ name: opts.input.name })
        .where(eq(usersTable.id, opts.input.id))
        .returning()

      // mutation.usersTable.({ where: eq(usersTable.email, opts.input.email) })
      // console.log("Getting all users from the database: ", user)

      // if (!user) throw new Error("Incorrect login")

      // const isPasswordCorrect = await bcrypt.compare(opts.input.password, user.password)

      // if (!isPasswordCorrect) {
      //   throw new Error("Incorrect password")
      // }
      // const token = jwt.sign(
      //   {
      //     id: user.id,
      //     exp: Math.floor(Date.now() / 1000) + 60 * 60,
      //   },
      //   secretJwt
      // )

      // opts.ctx.res.cookie(cookieName, token, {
      //   maxAge: 900000,
      //   httpOnly: true,
      // })
      return user
    }),

  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async (opts) => {
      const page = opts.input.page
      const limit = 5
      const db = opts.ctx.db
      const users = await db.query.usersTable.findMany({
        limit,
        offset: page * limit,
      })
      return { users, page, limit }
    }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      const id = opts.input.id
      const db = opts.ctx.db
      const user = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) })

      if (!user) throw new Error("User not found")

      return user
    }),
})
