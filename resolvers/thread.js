const { ApolloError } = require('apollo-server-express')

module.exports = {
  Query: {
    async thread (parent, { id }, { models }) {
      const thread = await models.Thread.findByPk(id)

      if (!thread) {
        throw new ApolloError('No thread found.')
      }

      return thread
    }
  },
  Mutation: {
    createThread (parent, args, { models, authUser }) {
      return models.Thread.create({
        ...args,
        userId: authUser.id,
        lastRepliedAt: new Date()
      })
    }
  },
  Thread: {
    creator (thread) {
      return thread.getUser()
    },
    channel (thread) {
      return thread.getChannel()
    }
  }
}
