const { gql } = require('apollo-server-express')

module.exports = gql`

  extend type Query {
    getCart(userId:ID!): Cart!
  }

  extend type Mutation {
    AddToCart(cartItems: CartItems): Cart!
  }

  type Cart {
    id: ID!
    user: User!
    items: [itemCart!]!
    totalPrice: Float!
    createdAt: String!
    updatedAt: String!
  }

  type itemCart {
    product: Product!
    quantity: Int!
  }

  input CartItems {
    userId: ID!
    productId: ID!
    quantity: Int!
    price: Float!
  }
`