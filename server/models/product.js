const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String
  },
  description: String,
  image: {
    type: String
  },
  price: Number,
  stock: Number

}, { timestamps: true })



module.exports = model('Product', productSchema)
