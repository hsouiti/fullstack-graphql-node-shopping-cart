const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.isUnique({ email }),
      message: 'Email already exit!'
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.isUnique({ username }),
      message: 'Username already exit!'
    }
  },
  name: {
    type: String,
    default: 'user'
  },
  address: String,
  password: String,
  role: String
}, { timestamps: true }
)

userSchema.statics.isUnique = async function (option) {
  return await this.where(option).countDocuments() === 0
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)
module.exports = User

