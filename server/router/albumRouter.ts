import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { jsonPlaceholderApi } from "../api/jsonplaceholderApi";

export const albumRouter = router({
  getAlbums: publicProcedure
    .input(
      z.object({
        size: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (input.size > 100 || input.size < 2) throw new Error("Invalid size");

      let data = await jsonPlaceholderApi.getAlbums(input.size);

      return data;
    }),
});
