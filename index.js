const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./models')

const app = express()
const port = 4000

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`
const resolvers = {
  Query: {
    sayHello: () => 'Hello GraphQL!'
  }
}

async function startApolloServer (typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers, context: { models } })
  await server.start()
  server.applyMiddleware({ app, cors: true })
  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
}

startApolloServer(typeDefs, resolvers)
