import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { randomDataApi } from "../api/randomDataApi";

export const userRouter = router({
  getUsers: publicProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      let data = await randomDataApi.getUsers(input.size);

      return data;
    }),
});
