const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Context, getUserId, APP_SECRET } = require('../utils')
var emailGenerator = require('../emailGenerator.js');
const crypto = require('crypto')

// resolve the `AuthPayload` type
const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  }
}


// query the currently logged in user
async function me (parent, args, ctx, info) {
  const id = getUserId(ctx)
  return ctx.db.query.user({ where: { id } }, info)
}

// register a new user
async function signup (parent, args, ctx, info) {
  const password = await bcrypt.hash(args.password, 10)

  const role = args.admin ? 'ADMIN' : 'CUSTOMER'
  const resetPasswordToken = crypto.randomBytes(64).toString('hex')
  const validateEmailToken = crypto.randomBytes(64).toString('hex')
  console.log('validateEmailToken', validateEmailToken)
  const { admin, ...data } = args

  const user = await ctx.db.mutation.createUser({
    data: { ...data, role, resetPasswordToken, validateEmailToken, password }
  })

  emailGenerator.sendWelcomeEmail(user, ctx)
  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}
async function sendLinkValidateEmail (parent, args, ctx, info) {
  const id = getUserId(ctx)
  let userMe = await ctx.db.query.user({ where: { id } })
  return emailGenerator.sendWelcomeEmail(userMe, ctx)
    .then(data => {
      return userMe
    })
    .catch(data => {
      throw new Error(`Error. cannot send email to: ${userMe.email}`)
    })
}

async function resetPassword (parent, args, ctx, info) {
  const userCheck = await ctx.db.query.user({
    where: { resetPasswordToken: args.resetPasswordToken }
  })
  if (!userCheck) {
    throw new Error(`Link is not valid`)
  } else {
    if (userCheck.resetPasswordExpires < new Date().getTime()) {
      throw new Error(`Link expired`)
    }
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.updateUser({
      where: { resetPasswordToken: args.resetPasswordToken },
      data: {
        password: password,
        resetPasswordExpires: new Date().getTime()
      }
    })
    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET),
      user
    }
  }
}

async function validateEmail (parent, args, ctx, info) {
  const userCheck = await ctx.db.query.user({
    where: {
      validateEmailToken: args.validateEmailToken
    }
  })
  if (!userCheck) {
    throw new Error(`No such user found.`)
  } else {
    if (userCheck.emailvalidated) {
      throw new Error(`User Already validated`)
    }
  }

  // try {
  const user = await ctx.db.mutation.updateUser({
    // Must check resetPasswordExpires
    where: { validateEmailToken: args.validateEmailToken },
    data: {
      emailvalidated: true
    }
  })
  // return user
  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
}

// log in an existing user
async function login (parent, { email, password }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
}
// log in an existing user
async function forgetPassword (parent, { email }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }
  try {
    let uniqueId = crypto.randomBytes(64).toString('hex')
    await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        resetPasswordExpires: new Date().getTime() + 1000 * 60 * 60 * 5, // 5 hours
        resetPasswordToken: uniqueId
      }
    })
    emailGenerator.sendForgetPassword(uniqueId, email, ctx)
  } catch (e) {
    return e
  }
  return user
}

// update the password of an existing user
async function updatePassword (parent, { oldPassword, newPassword }, ctx, info) {
  let userId = getUserId(ctx)
  console.log(userId)
  const user = await ctx.db.query.user({ where: { id: userId } })
  const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)
  if (!oldPasswordValid) {
    console.log('old Password not Valid')
    throw new Error('Old password is wrong, please try again.')
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  try {
    await ctx.db.mutation.updateUser({
      where: { id: userId },
      data: { password: newPasswordHash }
    })
  } catch (e) {
    return e
  }
  return user
}

module.exports = {
  me,
  signup,
  validateEmail,
  resetPassword,
  login,
  updatePassword,
  sendLinkValidateEmail,
  forgetPassword,
  AuthPayload
}
