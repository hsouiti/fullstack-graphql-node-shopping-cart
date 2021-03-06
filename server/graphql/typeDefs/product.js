const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getProduct(id: ID!): Product!
    getProducts( first: Int, skip: Int): [Product!]!   
  }   

  extend type Mutation {
    addProduct(productFields: ProductFields): Product!
    updateProduct(id: ID!, productFields: ProductFields): Product!
    deleteProduct(id: ID!): String
  }
  
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String    
    category: Category
    createdAt: String!
    updatedAt: String!
  }

  input ProductFields {
    name: String!
    description: String!
    price: Float!
    image: String    
    categoryId: ID!
  }
`