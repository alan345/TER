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
  createWorker: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let data = await randomDataApi.createWorker(input.phone, input.email);
      return data;
    }),
});
