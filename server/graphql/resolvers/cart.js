const { UserInputError } = require('apollo-server-express')

const Cart = require('../../models/cart')
const Product = require('../../models/product')
const User = require('../../models/user')

const { isLoggedIn } = require('../../utils/auth')

const handleTotalprice = (items) => {
  const total = items.reduce((acc, item) => {
    return acc + (parseInt(item.quantity) * parseFloat(item.price))
  }, 0)
  return total
}

module.exports = {
  Query: {
    getCart: async (_, { userId }, { req }) => {
      return await Cart.findOne({ userId: userId })
    }
  },
  Cart: {
    items: async (root) => await root.items,
    user: async (root) => await User.findOne({ _id: root.userId }),
    totalPrice: async (root) => await handleTotalprice(root.items)
  },
  itemCart: {
    product: async (root) => {
      try {
        return await Product.findOne({ _id: root.productId })
      } catch (err) {
        throw new UserInputError(err)
      }
    }
  },
  Mutation: {
    AddToCart: async (_, { cartItems }, { req }) => {
      try {
        const cart = await Cart.findOne({ userId: cartItems.userId })
        if (cart) {
          const product = cart.items.find(item => JSON.stringify(item.productId) === JSON.stringify(cartItems.productId))

          if (product) {
            product.quantity += cartItems.quantity
            cart.save()
          } else {
            cart.items.push({
              productId: cartItems.productId,
              quantity: cartItems.quantity,
              price: cartItems.price
            })
            cart.save()
          }
          return cart
        } else {
          newCart = new Cart({
            userId: cartItems.userId,
            items: {
              productId: cartItems.productId,
              quantity: cartItems.quantity,
              price: cartItems.price
            }
          })
          await newCart.save()
          return newCart
        }

      } catch (err) {
        throw new UserInputError(err)
      }
    },
    /* removeFromCart: async (_, { cartItems }, { req }) => {
    } */
  }
}