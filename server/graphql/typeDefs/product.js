const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getProduct(id: ID!): Product
    getProducts: [Product!]!   
  }   

  extend type Mutation {
    addProduct(productFields: ProductFields): Product!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String    
    createdAt: String!
    updatedAt: String!
  }

  input ProductFields {
    name: String!
    description: String!
    price: Float!
    image: String    
    category: ID!
  }

`