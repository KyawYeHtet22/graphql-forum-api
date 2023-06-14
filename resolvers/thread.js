const { ApolloError, ForbiddenError } = require('apollo-server-express')

module.exports = {
  Query: {
    async thread (parent, { id }, { models }) {
      const thread = await models.Thread.findByPk(id)

      if (!thread) {
        throw new ApolloError('No thread found.')
      }

      return thread
    },
    async threads (parent, args, { models }) {
      return models.Thread.findAll()
    }
  },
  Mutation: {
    createThread (parent, args, { models, authUser }) {
      return models.Thread.create({
        ...args,
        userId: authUser.id,
        lastRepliedAt: new Date()
      })
    },
    async updateThread (
      parent,
      { id, title, content, channelId },
      { models, authUser }
    ) {
      const thread = await models.Thread.findByPk(id)

      if (authUser.id !== thread.userId) {
        throw new ForbiddenError('You can only edit your own threads.')
      }

      await thread.update({ title, content, channelId })

      return thread
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
