// import { initTRPC } from "@trpc/server";
// const t = initTRPC.context<Context>().create();
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

require("dotenv").config();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // console.log(req.cookies);
  return { req, res };
};

// type Context = Awaited<ReturnType<typeof createContext>>;

// export const publicProcedure = t.procedure;
// export const router = t.router;
export const mergeRouters = t.mergeRouters;
import { authRouter } from "./router/authRouter";
import { workerRouter } from "./router/workerRouter";
import { healthRouter } from "./router/healthRouter";
import { t } from "./trpc";

const appRouter = mergeRouters(authRouter, workerRouter, healthRouter);
export type AppRouter = typeof appRouter;

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(2022);
