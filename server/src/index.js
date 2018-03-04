const { GraphQLServer } = require('graphql-yoga')
const { Prisma, forwardTo } = require('prisma-binding')
const { getUserId } = require('./utils')
const { importSchema } = require('graphql-import')
const { me, signup, login, updatePassword, AuthPayload } = require('./auth')
const { user } = require('./users')
const { request } = require('graphql-request')

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

async function createDraft(parent, { title, text, nameFile }, ctx, info) {
  const userId = getUserId(ctx)
  await ctx.db.mutation.createPost(
    { data: {title, text, nameFile, isPublished: false, author: {connect: {id: userId}}} },
    info,
  )
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

async function getUser(parent, { id }, ctx, info) {
  return ctx.db.query.user({ where: { id } }, info)
  // const userId = getUserId(ctx)
  // const requestingUserIsAuthor = await ctx.db.exists.User({
  //   id,
  // })
  // const requestingUserIsAdmin = await ctx.db.exists.User({
  //   id: userId,
  //   role: 'ADMIN',
  // })
  //
  // if (requestingUserIsAdmin || requestingUserIsAuthor) {
  //   return ctx.db.query.user({ where: { id } }, info)
  // }
  // throw new Error(
  //   'Invalid permissions, you must be an admin or the author of this post to retrieve it.',
  // )

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
    getUser,
    users,
    feed,
    drafts,
    post,
    cars: forwardTo('db')
  },
  Mutation: {
    signup,
    login,
    updatePassword,
    createDraft,
    deletePost,
    deleteUser,
    publish,
    createCar: forwardTo('db'),
    deleteCar: forwardTo('db'),
    updateCar: forwardTo('db')
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

server.start(() => {

  console.log('Server is running on http://localhost:4000')


/* -----  Exemple de query sur node  -------------*/

/*

let query = `
    mutation {
      signup (email: "sdfsdfdsds@sdfsd", password: "nico", name: "dfd") {
        user{
          id
        }
      }
    }`

  request('http://localhost:4000', query).then(data => console.log('example query on the server', data))

*/

})
