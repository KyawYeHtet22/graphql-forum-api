const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./models')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()
const port = 4000

async function startApolloServer (typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers, context: { models } })
  await server.start()
  server.applyMiddleware({ app, cors: true })
  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

startApolloServer(typeDefs, resolvers)
