export function paginate ({ query }, reviews) {
  const { page = 1, limit = 10 } = query

  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedReviews = reviews.slice(startIndex, endIndex)
  const totalItems = reviews.length
  const totalPages = Math.ceil(totalItems / limit)

  return {
    paginatedReviews,
    pagination: {
      totalItems,
      itemsPerPage: paginatedReviews.length,
      currentPage: parseInt(page),
      totalPages
    }
  }
}
