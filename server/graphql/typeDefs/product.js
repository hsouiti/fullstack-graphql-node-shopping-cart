const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    getProduct(id: ID!): Product
    getProducts: [Product!]   
  }   


  type Product {
    id: ID!
    title: String!
    description: String!
    price: Int!
    image: String
    
  }
`