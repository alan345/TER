import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { randomDataApi } from "../api/randomDataApi";

export const userRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      let data = await randomDataApi.getUsers(input.size);

      return data;
    }),
});
