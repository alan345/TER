const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { isLoggedIn } = require('./utils')
// const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
// const { Prisma } = require('prisma-binding')
const { me, signup, login, updatePassword, AuthPayload } = require('./auth')
const { user } = require('./users')
const resolvers = {
  Query: {
    me,
    user,
    feed (parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts (parent, args, ctx, info) {
      // if (isLoggedIn(ctx)) {
        return ctx.db.query.posts({ where: { isPublished: false } }, info)
      // }
      // return {
      //   "data": null,
      //   "errors": [
      //     {
      //       "message": "No rights",
      //
      //     }
      //   ]
      // }
    },
    post (parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id: id } }, info)
    },
  },
  Mutation: {
    signup,
    login,
    updatePassword,
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        { data: { title, text, isPublished: false } },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({where: { id } }, info)
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
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
