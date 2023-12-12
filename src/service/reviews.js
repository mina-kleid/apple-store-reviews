import axios from 'axios'
import fs from 'fs/promises'
import {
  MAXIMUM_REVIEW_DEPTH,
  FILE_NAME,
  TO_DATE,
  FILE_PATH
} from './configuration.js'

export async function fetchReviews (appId) {
  const fileName = `${FILE_PATH}/${appId}-${FILE_NAME}`
  const fileContent = await fs.readFile(fileName, 'utf8')
  const reviews = JSON.parse(fileContent)

  return reviews
}

export async function updateReviews (appId) {
  const baseUrl = `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/sortBy=mostRecent`

  let pageNumber = 1
  let reviews = []

  try {
    while (pageNumber <= MAXIMUM_REVIEW_DEPTH) {
      const url = `${baseUrl}/page=${pageNumber}/json`
      const response = await axios.get(url)
      const reviewEntries = response.data.feed.entry

      if (!reviewEntries || reviewEntries.length === 0) {
        break
      }

      reviews = [...reviews, ...reviewEntries]
      const lastReviewDate = new Date(reviewEntries[reviewEntries.length - 1].updated.label)

      if (lastReviewDate < TO_DATE) {
        break
      }

      pageNumber++
    }

    if (reviews.length > 0) {
      persistReviews(appId, reviews)
    }
  } catch (error) {
    console.error('Error fetching reviews:', error.message)

    throw error
  }
}

async function persistReviews (appId, reviews) {
  const cleanedReviews = reviews.map((review) => {
    return {
      author: review.author.name.label,
      updatedAt: review.updated.label,
      rating: review['im:rating'].label,
      content: review.content.label
    }
  })
  const fileName = `${FILE_PATH}/${appId}-${FILE_NAME}`

  try {
    const exist = await isExists(FILE_PATH)
    if (!exist) {
      await fs.mkdir(FILE_PATH, { recursive: true })
    }
    fs.writeFile(fileName, JSON.stringify(cleanedReviews, null, 2), 'utf8')
  } catch (error) {
    console.error('Error appending reviews to file:', error.message)
  }
}

async function isExists (path) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
};
