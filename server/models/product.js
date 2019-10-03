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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }

}, { timestamps: true })


module.exports = model('Product', productSchema)
