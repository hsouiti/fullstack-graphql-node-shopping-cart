const http = require('http')
const express = require('express')
const { ApolloServer, gql, PubSub } = require('apollo-server-express')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');
const pubsub = new PubSub()

process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_CONNECTION = process.env.MONGODB_LOCAL
  : process.env.MONGODB_CONNECTION = process.env.MONGODB_URI;
const PORT = process.env.ENV_PORT;

(async () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res, pubsub })
    })

    const app = express();
    server.applyMiddleware({ app })

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}${server.graphqlPath}`)
    })
  } catch (err) {
    console.log("Failed to connect :", err.message)
  }
})()













