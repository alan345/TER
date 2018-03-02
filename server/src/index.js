const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { getUserId } = require('./utils')
// const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
// const { Prisma } = require('prisma-binding')
const { me, signup, login, updatePassword, AuthPayload } = require('./auth')
const { user } = require('./users')



async function drafts(parent, args, ctx, info) {
  const id = getUserId(ctx)

  const where = {
    isPublished: false,
    author: {
      id
    }
  }

  return ctx.db.query.posts({ where }, info)
}
async function users(parent, args, ctx, info) {
  return ctx.db.query.users({}, info)
}
async function feed(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: true } }, info)
}
async function createDraft(parent, { title, text }, ctx, info) {

  // ici nico, ma relation avec author: {id: userId}}

  const userId = getUserId(ctx)
  await ctx.db.mutation.createPost(
    { data: {title, text, isPublished: false, author: {connect: {id: userId}}} },
    info,
  )

  // return ctx.db.mutation.createPost(
  //   { data: {title, text, isPublished: false} },
  //   info,
  // )

}
async function post(parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const requestingUserIsAuthor = await ctx.db.exists.Post({
    id,
    author: {
      id: userId,
    },
  })
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN',
  })

  if (requestingUserIsAdmin || requestingUserIsAuthor) {
    return ctx.db.query.post({ where: { id } }, info)
  }
  throw new Error(
    'Invalid permissions, you must be an admin or the author of this post to retrieve it.',
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
async function publish(parent, { id }, ctx, info) {
  return ctx.db.mutation.updatePost(
    {
      where: { id },
      data: { isPublished: true },
    },
    info,
  )
}

const resolvers = {
  Query: {
    me,
    user,
    users,
    feed,
    drafts,
    post,
  },
  Mutation: {
    signup,
    login,
    updatePassword,
    createDraft,
    deletePost,
    publish,
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/my-app/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
