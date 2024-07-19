import { publicProcedure, router } from "../trpc";
import { z } from "zod";
let jwt = require("jsonwebtoken");
const secret = "shhhhh"; //should be in an env variable

const cookieName = "naperg-auth";
export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        login: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          name: "Alan Szternberg",
        },
        secret
      );

      opts.ctx.res.cookie(cookieName, token, {
        maxAge: 900000,
        httpOnly: true,
      });
      return true;
    }),
  logout: publicProcedure.mutation(async (opts) => {
    opts.ctx.res.clearCookie(cookieName);
    return true;
  }),
  getAuthId: publicProcedure.query((opts) => {
    const cookies = opts.ctx.req.cookies;
    console.log("cookies", cookies[cookieName]);
    if (cookies[cookieName]) return cookies[cookieName] as string;

    return "";
  }),
});
