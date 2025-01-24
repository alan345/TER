import { publicProcedure, router } from "../trpc"

const healthRouter = router({
  health: publicProcedure.query(() => {
    return { message: "ok" }
  }),
})
export default healthRouter
