import config from './config'
import * as jwt from 'jsonwebtoken'
import { Context, Decoded } from './model/appInterface'

const utils = {
  getUserId: (ctx: Context) => {
    const { authorization } = ctx.req.headers
    const token = authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, config.APP_SECRET)
    if (!decoded) throw new Error('Not auth')
    const userId = (decoded as Decoded).userId
    return userId
  },
  hasLowerCase(str: string) {
    return str.toUpperCase() !== str
  },
  hasUpperCase(str: string) {
    return str.toLowerCase() !== str
  },
  hasNumber(string: string) {
    return /\d/.test(string)
  },

  hasSpecialChar(str: string) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    if (format.test(str)) {
      return true
    } else {
      return false
    }
  },

  isPasswordLongEnough(password: string) {
    if (password.length >= 6) {
      return true
    }

    return false
  },

  isPasswordSafe: (password: string) => {
    if (
      // utils.isPasswordLongEnough(password) &&
      // utils.hasSpecialChar(password) &&
      // utils.hasNumber(password) &&
      // utils.hasUpperCase(password) &&
      utils.hasLowerCase(password)
    ) {
      return true
    }
    throw new Error('Password not valid')
  },
}
export default utils
