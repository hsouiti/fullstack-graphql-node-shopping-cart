const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getCategory(id: ID!): Category
    getCategories: [Category!]!
  }

  extend type Mutation {
    addCategory(categoryFields: CategoryFields): Category!
    updateCategory(id: ID!, categoryFields: CategoryFields): Category!
    deleteCategory(id: ID!): String
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  input CategoryFields {
    name: String!
  }
`