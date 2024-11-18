import { timeSession } from "./configTer"

export const utils = {
  randomString: (len: number) => {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var randomString = ""
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length)
      randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
  },
  getNewExp: () => {
    return Math.floor(Date.now() / 1000) + timeSession
  },
}
