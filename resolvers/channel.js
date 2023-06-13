module.exports = {
  Query: {
    async channels (parent, args, { models }) {
      return models.Channel.findAll()
    }
  }
}
