import { CookieOptions } from "express"
import { timeSessionCookie } from "./configTer"

export const utils = {
  randomString: (len: number) => {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var randomString = ""
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length)
      randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
  },
  getNewExp: () => {
    return Math.floor(Date.now() / 1000) + timeSessionCookie / 1000
  },
  getParamsCookies: (maxAge: number): CookieOptions => {
    return {
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? undefined : "lax",
      domain: process.env.NODE_ENV === "development" ? "localhost" : ".onrender.com",
    }
  },
}
