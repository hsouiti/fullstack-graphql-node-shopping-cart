const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getCategory(id: ID!): Category
    getCategories: [Category!]!
  }

  extend type Mutation {
    addCategory(categoryFields: CategoryFields): Category!
  }

  type Category {
    id: ID!
    name: String!
  }

  input CategoryFields {
    name: String!
  }
`