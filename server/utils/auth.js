const { AuthenticationError } = require('apollo-server-express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const APP_SECRET = process.env.APP_SECRET


module.exports.validateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, APP_SECRET)
  return token
}


module.exports.generateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  },
    APP_SECRET,
    { expiresIn: '1h' }
  );

  return token
}


module.exports.cryptPassword = (password) => bcrypt.hash(password, 12)


module.exports.matchesPassword = (password, confirmPassword) => password === confirmPassword


module.exports.isLoggedIn = (req) => {
  if (req.headers.autorization) {
    const token = req.headers.autorization.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, APP_SECRET)
        return user
      } catch (err) {
        throw new AuthenticationError('Invalid / Epired Token')
      }
    }
  } else {
    throw new Error('You must sign In!')
  }
}


module.exports.loggedIn = async ({ email, password }) => {
  const errMessage = 'Incorrect email or password!'

  // Search for user
  const user = await User.findOne({ email })

  if (!user) {
    throw new AuthenticationError(errMessage)
  }

  if (!user.comparePassword(password)) {
    throw new AuthenticationError(errMessage)
  }
  return user
}
