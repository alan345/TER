import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { utils } from "../utils";
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
          id: utils.randomString(10),
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
  getAuth: publicProcedure.query((opts) => {
    const cookies = opts.ctx.req.cookies;
    console.log("cookies", cookies[cookieName]);
    const token = cookies[cookieName];

    let res = {
      id: "",
      name: "",
      exp: 0,
    };
    if (!token) return res;
    // if (cookies[cookieName]) return cookies[cookieName] as string;

    let decoded = jwt.verify(token, secret);
    console.log(decoded);

    if (decoded) {
      res = {
        id: decoded.id,
        name: decoded.name,
        exp: decoded.exp,
      };
    }
    return res;
  }),
});
