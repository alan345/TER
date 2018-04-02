const jwt = require('jsonwebtoken')
const { Prisma } = require('prisma-binding')

const APP_SECRET = 'appsecret321'

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  // console.log(Authorization)
  if (Authorization && Authorization !== 'null') {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  } else {
    throw new AuthError()
  }
}


class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
  APP_SECRET,
}
