const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');

process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_CONNECTION = process.env.MONGODB_LOCAL
  : process.env.MONGODB_CONNECTION = process.env.MONGODB_URI;

(async () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req })
    })

    const app = express()
    server.applyMiddleware({ app })

    app.listen({ port: 3000 },
      () => console.log(`server running at http://localhost:3000${server.graphqlPath}`)
    )
  } catch (err) {
    console.log("Setting up failed to connect", err.message)
  }

})()













