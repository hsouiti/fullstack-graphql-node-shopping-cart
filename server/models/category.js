const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name Catgeory is required'],
    validate: {
      validator: name => Category.isUnique({ name }),
      message: 'Category already exist'
    }
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, { timestamps: true })


categorySchema.statics.isUnique = async function (value) {
  return await this.where(value).countDocuments() === 0
}

const Category = model('Category', categorySchema)
module.exports = Category