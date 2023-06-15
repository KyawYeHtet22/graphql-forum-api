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
    }
  }
}
