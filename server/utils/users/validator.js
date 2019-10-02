const { UserInputError } = require('apollo-server-express')

const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

module.exports.signUpValidators = (values) => {
  const errors = {}
  const { email, username, password, confirmPassword, role } = values
  if (!email) {
    errors.email = 'Email is required!'
  } else {
    if (!email.match(regEx)) {
      errors.email = 'Email invalid!'
    }
  }

  if (!username) {
    errors.username = 'Username is required!'
  }

  if (!password) {
    errors.password = 'Password is required!'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'ConfirmPassword is required!'
  }

  if (!role) {
    errors.role = 'Role is required!'
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}



module.exports.signInValidators = (values) => {
  const errors = {}
  const { email, password } = values

  if (!email) {
    errors.email = 'Email is required!'
  } else {
    if (!email.match(regEx)) {
      errors.email = 'Email invalid!'
    }
  }
  if (!password) {
    errors.password = 'Password is required!'
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  }
}