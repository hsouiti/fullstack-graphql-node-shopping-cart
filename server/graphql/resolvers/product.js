const { UserInputError } = require('apollo-server-express')
const Product = require('../../models/product')

module.exports = {
  Query: {
    getProduct: async (_, { id }, { req }) => {
      return Product.findById(id)
    },
    getProducts: async (_, args) => {
      try {
        return await Product.find({}).sort({ createdAt: -1 })
      } catch (err) {
        throw new UserInputError(err)
      }
    }
  },
  Mutation: {
    addProduct: async (_, { productFields }, { req }) => {
      const product = await Product.create({ ...productFields })
      return product
    }/* ,
    updateProduct: async (_, { id }) => {

    },
    deleteProduct: async (_, { id }) => {

    } */
  }
}