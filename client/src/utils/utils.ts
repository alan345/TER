const utils = {
  sanitizePage: (page: string | null) => {
    if (!page) return 1
    const pageNumber = parseInt(page)
    if (isNaN(pageNumber)) return 1
    if (pageNumber < 1) return 1
    return pageNumber
  },

  getDeviceName: (userAgent: string) => {
    if (/iPhone/i.test(userAgent)) return "iPhone"
    if (/iPad/i.test(userAgent)) return "iPad"
    if (/Android/i.test(userAgent)) return "Android Device"
    if (/Windows/i.test(userAgent)) return "Windows PC"
    if (/Macintosh|MacIntel/i.test(userAgent)) return "Mac"
    if (/Linux/i.test(userAgent)) return "Linux PC"
    if (/CrOS/i.test(userAgent)) return "Chromebook"

    return ""
  },
}
export default utils
