const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: string
  }
}, { timestamps: true })

module.exports = model('Category', categorySchema)