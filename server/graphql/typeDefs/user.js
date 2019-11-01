const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getUser(id: ID!): User
    getUsers(first: Int, skip: Int): [User!]!
  }

  extend type Mutation {
    signUp(signupFields: SignupFields): AuthPayload!
    signIn(email: String! password:String!): AuthPayload!
    signOut: Boolean
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  input SignupFields {
    email: String!
    name: String!
    username: String!
    password: String!
    confirmPassword: String!
    role: String!
  }
   
`