import { fetchReviews, updateReviews } from '../service/reviews.js'

export async function getReviews(req, res) {
  try {
    const { appId } = req.params
    const reviews = await fetchReviews(appId)

    res.json({ reviews });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ reviews: [] });
    } else {
      res.status(500).json({ error: 'Unable to fetch reviews' });
    }
  }
}

export async function refreshReviews(req, res) {
  try {
    const { appId } = req.params;

    await updateReviews(appId);

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to refresh reviews' });
  }
}
