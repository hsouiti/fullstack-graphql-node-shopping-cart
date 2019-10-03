const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      qte: {
        type: Number,
        default: 1
      },
      price: {
        type: Number,
        default: 0
      }
    }
  ]

}, { timestamps: true })


module.exports = model('Cart', cartSchema)
