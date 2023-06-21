const { ForbiddenError } = require('apollo-server-express')

module.exports = {
  Mutation: {
    async createReply (parent, { threadId, content }, { models, authUser }) {
      const thread = await models.Thread.findByPk(threadId)

      const reply = await models.Reply.create({
        threadId,
        content,
        userId: authUser.id
      })

      await thread.update({ lastRepliedAt: new Date() })

      return reply
    },
    async markAsFavorite (parent, { id }, { models, authUser }) {
      const [favorite] = await models.Favorite.findOrCreate({
        where: { replyId: id, userId: authUser.id }
      })

      return favorite
    },
    async unmarkAsFavorite (parent, { id }, { models, authUser }) {
      const favorite = await models.Favorite.findOne({
        where: { replyId: id, userId: authUser.id }
      })

      await favorite.destroy()

      return true
    },
    async markAsBestAnswer (parent, { id }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id)
      const thread = await reply.getThread()

      if (authUser.id !== thread.userId) {
        throw new ForbiddenError(
          'You can only mark a reply as best answer on your own threads.'
        )
      }

      await reply.update({ isBestAnswer: true })
      await thread.update({ isResolved: true })

      return reply
    },
    async unmarkAsBestAnswer (parent, { id }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id)
      const thread = await reply.getThread()

      if (authUser.id !== thread.userId) {
        throw new ForbiddenError(
          'You can only unmark a reply as best answer on your own threads.'
        )
      }

      await reply.update({ isBestAnswer: false })
      await thread.update({ isResolved: false })

      return reply
    },
    async updateReply (parent, { id, content }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id)

      if (authUser.id !== reply.userId) {
        throw new ForbiddenError('You can only edit your own replies.')
      }

      await reply.update({ content })

      return reply
    },
    async deleteReply (parent, { id }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id)

      if (authUser.id !== reply.userId) {
        throw new ForbiddenError('You can only delete your own replies.')
      }

      await reply.destroy()

      return true
    }
  },
  Reply: {
    favorites (reply, args, { models }) {
      return models.Favorite.findAll({ where: { replyId: reply.id } })
    },
    user (reply) {
      return reply.getUser()
    }
  }
}
