import { protectedProcedure, publicProcedure, router } from "../trpc"
import { z } from "zod"
import { database } from "../database/database"

export const userRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async ({ input }) => {
      return database
    }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const id = input.id
      const user = database.find((u) => u.id === id)
      if (!user) throw new Error("User not found")

      return user
    }),
})
