const {forwardTo} = require('prisma-binding')
const {
  signup, login,
  updatePassword,
  forgetPassword,
  resetPassword,
  validateEmail,
  sendLinkValidateEmail
} = require('./auth')
const { getUserId } = require('../utils')

async function publish (parent, { id }, ctx, info) {
  return ctx.db.mutation.updatePost(
    {
      where: { id },
      data: { isPublished: true }
    },
    info
  )
}

async function deleteUser (parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const userExists = await ctx.db.exists.User({
    id
  })
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN'
  })

  if (!userExists && !requestingUserIsAdmin) {
    throw new Error(`Post not found or you don't have access rights to delete it.`)
  }

  return ctx.db.mutation.deleteUser({ where: { id } })
}

async function deleteCar (parent, args, ctx, info) {
  console.log('****ISSUE*****')
  const userId = getUserId(ctx)
  const user = await ctx.db.query.user({ where: { id: userId } })
  console.log('user', user)

  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'CUSTOMER'
  })
  console.log('requestingUserIsAdmin', requestingUserIsAdmin)

  const carExists = await ctx.db.exists.Car({
    id: args.id
  })

  if (!carExists && !requestingUserIsAdmin) {
    throw new Error(`Car not found or you don't have access rights to delete it.`)
  }
  return forwardTo('db')(parent, args, ctx, info)
  // return ctx.db.mutation.deleteCar({ where: { id } })
}

async function createPost (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  args.data.isPublished = false
  args.data.author = {
    connect: {
      id: userId
    }
  }
  return forwardTo('db')(parent, args, ctx, info)
}

async function createChat (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  args.data.author = {
    connect: {
      id: userId
    }
  }
  return forwardTo('db')(parent, args, ctx, info)
}

async function deletePost (parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const postExists = await ctx.db.exists.Post({
    id,
    author: { id: userId }
  })

  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN'
  })

  if (!postExists && !requestingUserIsAdmin) {
    throw new Error(`Post not found or you don't have access rights to delete it.`)
  }

  return ctx.db.mutation.deletePost({ where: { id } })
}

const Mutation = {

  signup,
  resetPassword,
  validateEmail,
  login,
  updatePassword,
  forgetPassword,
  deletePost,
  deleteUser,
  sendLinkValidateEmail,
  updateUser: (parent, args, ctx, info) => {
    // getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  },
  publish,
  createCar: forwardTo('db'),
  createUser: forwardTo('db'),
  createChat,
  deleteCar: deleteCar,
  updateCar: forwardTo('db'),
  createPost
}

module.exports = {
  Mutation
}
