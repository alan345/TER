const utils = {
  hasLowerCase(str: string) {
    return str.toUpperCase() !== str
  },
  hasUpperCase(str: string) {
    return str.toLowerCase() !== str
  },
  hasNumber(string: string) {
    return /\d/.test(string)
  },

  hasSpecialChar(str: string) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    if (format.test(str)) {
      return true
    } else {
      return false
    }
  },

  isPasswordLongEnough(password: string) {
    if (password.length >= 6) {
      return true
    }

    return false
  },

  isPasswordSafe: (password: string) => {
    if (
      // utils.isPasswordLongEnough(password) &&
      // utils.hasSpecialChar(password) &&
      // utils.hasNumber(password) &&
      // utils.hasUpperCase(password) &&
      utils.hasLowerCase(password)
    ) {
      return true
    }
    throw new Error('Password not valid')
  },
}
export default utils
