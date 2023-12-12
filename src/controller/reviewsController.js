import { fetchReviews, updateReviews } from '../service/reviews.js'
import { paginate } from './pagination.js'

export async function getReviews (req, res) {
  try {
    const { appId } = req.params
    const { sinceHours = 48 } = req.query

    const allReviews = await fetchReviews(appId)

    const hoursAgo = new Date().getTime() - (sinceHours * 60 * 60 * 1000)
    const reviewsSinceHours = allReviews.filter(
      (review) => new Date(review.updatedAt).getTime() > hoursAgo
    )

    const { paginatedReviews: reviews, pagination } = paginate(req, reviewsSinceHours)

    res.json({ reviews, pagination })
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ reviews: [] })
    } else {
      res.status(400).json({ error: 'Unable to fetch reviews' })
    }
  }
}

export async function refreshReviews (req, res) {
  try {
    const { appId } = req.params

    await updateReviews(appId)

    res.status(200).send()
  } catch (error) {
    res.status(400).json({ error: 'Unable to refresh reviews' })
  }
}
