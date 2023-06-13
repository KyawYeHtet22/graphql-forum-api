module.exports = {
  Query: {
    async allChannels (parent, args, { models }) {
      return models.Channel.findAll()
    }
  }
}
