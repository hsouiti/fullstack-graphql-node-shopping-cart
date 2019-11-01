const { UserInputError } = require('apollo-server-express')
const Product = require('../../models/product')
const Category = require('../../models/category')

const { isLoggedIn } = require('../../utils/auth')


module.exports = {
    Query: {
        getProduct: async (_, { id }, { req }) => {
            return Product.findById(id)
        },
        getProducts: async (_, { first, skip }, { req }) => {
            try {
                return await Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(first)
            } catch (err) {
                throw new UserInputError(err)
            }
        }
    },
    Product: {
        category: async (root) => {
            return await Category.findById(root.categoryId)
        }
    },
    Mutation: {
        addProduct: async (_, { productFields }, { req }) => {
            // Check if user authenticated
            await isLoggedIn(req)
            const product = await Product.create({ ...productFields })
            await Category.findOneAndUpdate(
                { _id: product.categoryId },
                { "$addToSet": { products: product._id } },
                (err, model) => {
                    if (err) throw new UserInputError(err)
                    return model
                }
            )
            return product
        },
        updateProduct: async (_, { id, productFields }, { req }) => {
            // Check if user authenticated
            await isLoggedIn(req)
            try {
                const product = await Product.findById(id)
                if (product) {
                    product.name = productFields.name
                    product.description = productFields.description
                    product.price = productFields.price
                    product.image = productFields.image
                    product.categoryId = productFields.categoryId
                    return await product.save()
                }
            } catch (err) {
                throw new UserInputError(err)
            }
        },
        deleteProduct: async (_, { id }, { req }) => {
            // TODO: Delete the product from category first
            // delete product from cart if exist
            // Check if user authenticated
            await isLoggedIn(req)
            try {
                await Product.findByIdAndRemove(id)
            } catch (err) {
                throw new UserInputError(err)
            }
        }
    }
}