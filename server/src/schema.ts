import { Context, Decoded } from './model/appInterface'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import utils from './utils'
import email from './email'
import { PrismaClient, Prisma } from '@prisma/client'
import config from './config'

export const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
}

type Post {
  author: User
  content: String
  id: ID!
  published: Boolean!
  title: String!
}

type Query {
  usersPagination(page: Float!, where: UserWhereInput): UsersPagination!
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(where: PostWhereUniqueInput!): Post
  me: User!
}

input UserWhereInput {
  search: String
  name: SearchObj
}
input SearchObj {
  contains: String
}
type UsersPagination {
  users: [User!]!
  count: Float!
  take: Float!
}

type Mutation {
  createDraft(authorEmail: String, content: String, title: String!): Post!
  deleteOnePost(where: PostWhereUniqueInput!): Post
  publish(id: ID): Post
  signupUser(name: String!, email: String!, password: String!): AuthPayload!
  loginUser( email: String!, password: String!): AuthPayload!
  forgetPassword( email: String!): Boolean!
  resetPassword( password: String!, resetPasswordToken: String!): AuthPayload!
  deleteUser( userId: String!): User!
}

type AuthPayload {
  token: String!
  user: User!
}

input PostWhereUniqueInput {
  id: ID
}

input UserCreateInput {
  email: String!
  password: String!
  name: String
}

input PostCreateManyWithoutPostsInput {
  connect: [PostWhereUniqueInput!]
  create: [PostCreateWithoutAuthorInput!]
}

input PostCreateWithoutAuthorInput {
  content: String
  id: ID
  published: Boolean
  title: String!
}
`

export const resolvers = {
  Query: {
    me: (parent, args, ctx: Context) => {
      const { authorization } = ctx.req.headers
      const token = authorization.replace('Bearer ', '')
      const decoded = jwt.verify(token, config.APP_SECRET)
      const userId = (decoded as Decoded).userId

      if (userId) {
        return ctx.prisma.user.findUnique({ where: { id: Number(userId) } })
      }
      throw new Error('Not loggedin')
    },
    feed: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    usersPagination: async (parent, args, ctx: Context) => {
      utils.getUserId(ctx)
      const take = 10
      const skip = (args.page - 1) * take
      const where: Prisma.UserWhereInput = {
        OR: args.where.search
          ? [
              { name: { contains: args.where.search } },
              { email: { contains: args.where.search } },
            ]
          : undefined,
      }

      const users = await ctx.prisma.user.findMany({
        where,
        take,
        skip,
      })
      const count = await ctx.prisma.user.count({ where })
      return { users, count, take }
    },
    filterPosts: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    deleteOnePost: (parent, args, ctx: Context) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    deleteUser: (parent, args, ctx: Context) => {
      return ctx.prisma.user.delete({
        where: { id: Number(args.userId) },
      })
    },
    publish: (parent, args, ctx: Context) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },

    forgetPassword: async (parent, args, ctx: Context) => {
      let user = await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      })

      if (!user) {
        throw new Error('Email unknown')
      }
      const resetPasswordToken = crypto.randomBytes(64).toString('hex')
      user = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken,
          dateResetPasswordRequest: new Date(),
        },
      })
      email.sendForgetPassword(ctx, user)

      return true
    },
    resetPassword: async (parent, args, ctx: Context) => {
      if (!args.resetPasswordToken) {
        throw new Error('Error. No token')
      }
      let user = await ctx.prisma.user.findFirst({
        where: {
          resetPasswordToken: args.resetPasswordToken,
        },
      })

      if (!user) {
        throw new Error('Link not valide!')
      }

      if (!user.dateResetPasswordRequest) {
        throw new Error('User never requested a link')
      }
      if (!user.resetPasswordToken) {
        throw new Error('User never requested a link.')
      }

      let t = new Date(user.dateResetPasswordRequest)
      t.setSeconds(t.getSeconds() + 360)

      if (new Date(t).getTime() < new Date().getTime()) {
        throw new Error('Link is out of date ')
      }
      user = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetPasswordToken: '',
          dateResetPasswordRequest: null,
        },
      })
      return {
        user,
        token: jwt.sign({ userId: user.id }, config.APP_SECRET, {
          expiresIn: '2d',
        }),
      }
    },
    signupUser: async (parent, args, ctx: Context) => {
      const userTest = await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      })
      if (userTest) {
        throw new Error('User Already exists')
      }
      utils.isPasswordSafe(args.password)
      const password = await bcrypt.hash(args.password, 10)

      const validateEmailToken = crypto.randomBytes(64).toString('hex')
      const user = await ctx.prisma.user.create({
        data: {
          name: args.name,
          password: password,
          email: args.email,
          resetPasswordToken: '',
          validateEmailToken,
          isEmailValidated: false,
        },
      })
      return {
        user,
        token: jwt.sign({ userId: user.id }, config.APP_SECRET, {
          expiresIn: '2d',
        }),
      }
    },
    loginUser: async (parent, args, ctx: Context) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      })
      if (!user) {
        throw new Error('No user')
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      return {
        user,
        token: jwt.sign({ userId: user.id }, config.APP_SECRET, {
          expiresIn: '2d',
        }),
      }
    },
  },
  User: {
    posts: (parent, args, ctx: Context) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args, ctx: Context) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}
