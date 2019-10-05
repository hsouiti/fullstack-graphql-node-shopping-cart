const { UserInputError } = require('apollo-server-express')
const Category = require('../../models/category')

module.exports = {
  Query: {
    getCategory: async (_, { id }, { req }) => {
      return Category.findById(id)
    },
    getCategories: async (_, args) => {
      try {
        return await Category.find({}).sort({ createdAt: -1 })
      } catch (err) {
        throw new UserInputError(err)
      }
    }
  },
  Mutation: {
    addCategory: async (_, { categoryFields }, { req }) => {
      const category = await Category.create({ ...categoryFields })
      return category
    }

  }
}