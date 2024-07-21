import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
let jwt = require("jsonwebtoken");

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const cookies = req.cookies;
  const token = cookies[cookieName];

  if (token) {
    let decoded = jwt.verify(token, secretJwt);
    if (decoded) {
      const user = database.find((u) => u.id === decoded.id);
      return { req, res, user };
    }
  }

  return { req, res };
};

export const mergeRouters = t.mergeRouters;
import { authRouter, cookieName } from "./router/authRouter";
import { userRouter } from "./router/userRouter";
import { healthRouter } from "./router/healthRouter";
import { beerRouter } from "./router/beerRouter";
import { t } from "./trpc";
import { secretJwt } from "./env";
import { database } from "./database/database";

const appRouter = mergeRouters(
  authRouter,
  userRouter,
  healthRouter,
  beerRouter
);
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
