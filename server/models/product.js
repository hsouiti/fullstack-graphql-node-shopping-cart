const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }

}, { timestamps: true })


module.exports = model('Product', productSchema)
