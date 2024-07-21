import { initTRPC, TRPCError } from "@trpc/server";
export const t = initTRPC.context<Context>().create();
import { createContext } from "./index";

type Context = Awaited<ReturnType<typeof createContext>>;

export const publicProcedure = t.procedure;
export const router = t.router;

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  });
});
