const utils = {
  sanitizePage: (page: string | null) => {
    if (!page) return 1
    const pageNumber = parseInt(page)
    if (isNaN(pageNumber)) return 1
    if (pageNumber < 1) return 1
    return pageNumber
  },
}
export default utils
