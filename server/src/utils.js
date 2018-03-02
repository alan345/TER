const jwt = require('jsonwebtoken')
const { Prisma } = require('prisma-binding')

const APP_SECRET = 'appsecret321'

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new AuthError()
}
// function isLoggedIn (ctx) {
//   const Authorization = ctx.request.get('Authorization')
//   if (Authorization) {
//     const token = Authorization.replace('Bearer ', '')
//     if (token === 'null') {
//       return false
//     }
//     const { userId } = jwt.verify(token, APP_SECRET)
//     if (userId) {
//       return true
//     } else {
//       return false
//     }
//   }
// }

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
  APP_SECRET,
  // isLoggedIn,
}
