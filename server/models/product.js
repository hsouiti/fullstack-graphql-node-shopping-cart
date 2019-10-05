const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: name => Product.isUnique({ name }),
      message: 'Product already exists'
    }
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


productSchema.statics.isUnique = async function (value) {
  return await this.where(value).countDocuments() === 0
}

const Product = model('Product', productSchema)
module.exports = Product
