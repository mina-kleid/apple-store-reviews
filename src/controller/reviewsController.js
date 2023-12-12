import { fetchReviews, updateReviews } from '../service/reviews.js'

export async function getReviews (req, res) {
  try {
    const { appId } = req.params
    const allReviews = await fetchReviews(appId)
    const { page = 1, limit = 10 } = req.query

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const reviews = allReviews.slice(startIndex, endIndex)
    const totalItems = allReviews.length
    const totalPages = Math.ceil(totalItems / limit)

    const pagination = {
      totalItems,
      itemsPerPage: reviews.length,
      currentPage: parseInt(page),
      totalPages
    }

    res.json({ reviews, pagination })
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ reviews: [] })
    } else {
      res.status(500).json({ error: 'Unable to fetch reviews' })
    }
  }
}

export async function refreshReviews (req, res) {
  try {
    const { appId } = req.params

    await updateReviews(appId)

    res.status(200).send()
  } catch (error) {
    res.status(500).json({ error: 'Unable to refresh reviews' })
  }
}
