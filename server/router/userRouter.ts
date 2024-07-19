import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { randomDataApi } from "../api/randomDataApi";

export const userRouter = router({
  getUsers: publicProcedure
    .input(
      z.object({
        page: z.number(),
      })
    )
    .query(async ({ input }) => {
      let data = await randomDataApi.getWorkers(input.page);

      return data;
    }),
});
