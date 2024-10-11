import { protectedProcedure, publicProcedure, router } from "../trpc"
import { z } from "zod"
import { randomDataApi } from "../api/randomDataApi"
import { database } from "../database/database"

export const userRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size")

      let data = await randomDataApi.getUsers(input.size)

      return data
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

      // if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      // let data = await randomDataApi.getUsers(input.size);
      // let data = {}
      return user
    }),
})
