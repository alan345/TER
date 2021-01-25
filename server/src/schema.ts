import { Context } from './model/appInterface'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import utils from './utils'
import email from './email'
import { Prisma } from '@prisma/client'
import config from './config'

export const resolvers = {
  Query: {
    user: (parent, args, ctx: Context) => {
      const userId = utils.getUserId(ctx)

      return ctx.prisma.user.findUnique({ where: { id: userId } })
    },
    me: (parent, args, ctx: Context) => {
      const userId = utils.getUserId(ctx)

      if (userId) {
        return ctx.prisma.user.findUnique({ where: { id: userId } })
      }
      throw new Error('Not loggedin')
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
  },
  Mutation: {
    deleteUser: (parent, args, ctx: Context) => {
      return ctx.prisma.user.delete({
        where: { id: args.userId },
      })
    },
    updateUser: async (parent, args, ctx: Context) => {
      const userId = utils.getUserId(ctx)
      const me = await ctx.prisma.user.findUnique({ where: { id: userId } })
      if (!me) throw new Error('Not Auth')

      return ctx.prisma.user.update({
        where: { id: args.userId },
        data: {
          name: args.data.name,
          role: me.role === 'ADMIN' ? args.data.role : undefined,
        },
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
          role: 'USER',
          email: args.email,
          resetPasswordToken: '',
          lastLogin: new Date(),
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
      let user = await ctx.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      })
      if (!user) {
        throw new Error('No user')
      }

      user = await ctx.prisma.user.update({
        data: { lastLogin: new Date() },
        where: {
          id: user.id,
        },
      })
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
}
