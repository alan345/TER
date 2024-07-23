import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { dummyApi } from "../api/dummyapi";

export const movieRouter = router({
  getMovies: publicProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      let data = await dummyApi.getMovies(input.size);
      return data;
    }),
});
