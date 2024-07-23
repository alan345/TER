import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { catFactNinja } from "../api/catFactNinja";

export const factRouter = router({
  getFacts: publicProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      let data = await catFactNinja.getFacts(input.size);
      return data;
    }),
});
