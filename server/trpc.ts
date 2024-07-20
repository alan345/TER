import { initTRPC } from "@trpc/server";
export const t = initTRPC.context<Context>().create();
import { createContext } from "./index";

type Context = Awaited<ReturnType<typeof createContext>>;

export const publicProcedure = t.procedure;
export const router = t.router;
