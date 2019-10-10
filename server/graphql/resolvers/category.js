const { UserInputError } = require('apollo-server-express')
const Category = require('../../models/category')
const Product = require('../../models/product')

const { isLoggedIn } = require('../../utils/auth')

module.exports = {
  Query: {
    getCategory: async (root, { id }, { req }) => {
      return await Category.findById(id)
    },
    getCategories: async (_, args) => {
      try {
        return await Category.find({}).sort({ createdAt: -1 })
      } catch (err) {
        throw new UserInputError(err)
      }
    }
  },
  Category: {
    products: async (root, __, { req }) => {
      try {
        return await Product.find({ categoryId: root._id })
      } catch (err) {
        throw new UserInputError(err)
      }
    },
  },
  Mutation: {
    addCategory: async (_, { categoryFields }, { req }) => {
      // Check if user authenticated
      await isLoggedIn(req)

      const category = await Category.create({ ...categoryFields })
      return category
    },
    updateCategory: async (_, { id, categoryFields }, { req }) => {
      // Check if user authenticated
      await isLoggedIn(req)
      try {
        const category = await Category.findById(id)
        if (category) {
          category.name = categoryFields.name
          return await category.save()
        }
      } catch (err) {
        throw new UserInputError(err)
      }
    },
    deleteCategory: async (_, { id }, { req }) => {
      // TODO: Check first if the category is empty 
      // not assigned to any product before delete it

      // Check if user authenticated
      await isLoggedIn(req)
      try {
        await Category.findByIdAndRemove(id)
      } catch (err) {
        throw new UserInputError(err)
      }
    }
  }
}