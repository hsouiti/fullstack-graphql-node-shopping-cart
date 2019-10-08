const { UserInputError } = require('apollo-server-express')
const Product = require('../../models/product')
const Category = require('../../models/category')


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
    addProduct: async (_, { productFields }) => {
      const product = await Product.create({ ...productFields })
      await Category.findOneAndUpdate(
        { _id: product.category },
        { "$addToSet": { products: product._id } },
        (err, model) => {
          if (err) console.log(err.message)
          return model
        }
      )
      return product
    }/* ,

    updateProduct: async (_, { id }) => {
      const product = await Product.findById(id)
      console.log(product)
      return product
    },

    deleteProduct: async (_, { id }) => {
      const product = await Product.findByIdAndRemove(id, err => {
        if (err) console.log(err)
      })
    } */
  }
}