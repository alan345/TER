import { initTRPC } from "@trpc/server";
export const t = initTRPC.context<Context>().create();
import * as trpcExpress from "@trpc/server/adapters/express";

require("dotenv").config();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

type Context = Awaited<ReturnType<typeof createContext>>;

export const publicProcedure = t.procedure;
export const router = t.router;
