// const {forwardTo} = require('prisma-binding')
// const { getUserId } = require('../utils')

const Subscription = {

  chat: {
    subscribe: async (parent, args, ctx, info) =>
      ctx.db.subscription.chat({}, info)
  }
}

module.exports = {
  Subscription
}
