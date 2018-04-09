const {forwardTo} = require('prisma-binding')
const {signup, login, updatePassword, forgetPassword, resetPassword} = require('./auth')
const { getUserId } = require('../utils')



async function updateUser(parent, { id, name, email, role }, ctx, info) {
   // console.log( id, name, email)
  await ctx.db.mutation.updateUser({
    where: { id: id },
    data: {name: name, email: email, role: role},
  })

}

async function publish(parent, { id }, ctx, info) {
  return ctx.db.mutation.updatePost(
    {
      where: { id },
      data: { isPublished: true },
    },
    info,
  )
}

async function deleteUser(parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const userExists = await ctx.db.exists.User({
    id
  })

  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN',
  })

  if (!userExists && !requestingUserIsAdmin) {
    throw new Error(`Post not found or you don't have access rights to delete it.`)
  }

  return ctx.db.mutation.deleteUser({ where: { id } })
}

async function createDraft(parent, { title, text, nameFile }, ctx, info) {
  const userId = getUserId(ctx)
  await ctx.db.mutation.createPost(
    {
      data: {
        title,
        text,
        nameFile,
        isPublished: false,
        author: {
          connect: {
            id: userId
          }
        }
      }
    },
    info,
  )
}

async function deletePost(parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const postExists = await ctx.db.exists.Post({
    id,
    author: { id: userId },
  })

  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN',
  })

  if (!postExists && !requestingUserIsAdmin) {
    throw new Error(`Post not found or you don't have access rights to delete it.`)
  }

  return ctx.db.mutation.deletePost({ where: { id } })
}

const Mutation = {

  signup,
  resetPassword,
  login,
  updatePassword,
  forgetPassword,
  createDraft,
  deletePost,
  deleteUser,
  updateUser,
  publish,
  createCar: forwardTo('db'),
  deleteCar: forwardTo('db'),
  updateCar: forwardTo('db')

}

module.exports = {
  Mutation
}
