import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { dummyRestAPIExample } from "../api/dummyRestAPIExample";

export const employeeRouter = router({
  getEmployees: publicProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      let data = await dummyRestAPIExample.getEmployees(input.size);

      return data;
    }),
});
