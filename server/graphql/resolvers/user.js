const { AuthenticationError, UserInputError } = require('apollo-server-express')
const User = require('../../models/user')
const { generateToken, validateToken, cryptPassword, matchesPassword, isLoggedIn, loggedIn } = require('../../utils/auth')
const { signUpValidators, signInValidators } = require('../../utils/users/validator')

module.exports = {
  Query: {
    getUser: async (_, { id }, { req }) => {
      await isLoggedIn(req)
      return User.findById(id)
    },
    getUsers: async (_, args, { req }) => {
      // Check if user authenticated
      await isLoggedIn(req)

      try {
        return await User.find({}).sort({ createdAt: -1 })
      } catch (err) {
        console.log(err)
      }
    }
  },

  Mutation: {
    signUp: async (root, { signupFields }, context) => {

      // Validation (
      // empty fields
      // valid email
      // unique email and username 
      // matches password 
      //)

      // empty fields  - // valid email
      const { isValid, errors } = await signUpValidators({ ...signupFields })
      if (!isValid) {
        throw new UserInputError('Errors', { errors })
      }

      // Verify matches passwords
      if (!matchesPassword(signupFields.password, signupFields.confirmPassword)) {
        throw new Error('Passwords must matches!')
      }

      // Hash password , save the record 
      const hashedPassword = await cryptPassword(signupFields.password)
      const user = await User.create({ ...signupFields, password: hashedPassword })

      //generate auth token
      const token = generateToken(user)
      return { token, user }

    },

    signIn: async (_, { email, password }, context) => {
      // empty fields  - // valid email

      const { isValid, errors } = await signInValidators({ email, password })
      if (!isValid) {
        throw new UserInputError('Errors', { errors })
      }

      // check Login information
      const user = await loggedIn({ email, password })

      const token = validateToken(user)
      return { token, user }

    },

    signOut: (_, __, context) => {
      // Check if the user is signedIn

    }
  }
}
