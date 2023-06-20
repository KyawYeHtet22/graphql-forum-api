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
