import { publicProcedure, router } from "../trpc";

export const healthRouter = router({
  health: publicProcedure.query(() => {
    return { message: "ok" };
  }),
});
