/* global describe,it,beforeEach */
import * as reviewsService from '../../src/service/reviews'
import { getReviews } from '../../src/controller/reviewsController'
import { expect, jest } from '@jest/globals'

jest.mock('../../src/service/reviews')

describe('Review Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return an empty array of reviews when there are no reviews', async () => {
    reviewsService.fetchReviews.mockResolvedValue([])

    const mockReq = { params: { appId: 'appId' }, query: {} }
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes)
    }
    await getReviews(mockReq, mockRes)

    expect(mockRes.json).toHaveBeenCalledWith({ reviews: [], pagination: { currentPage: 1, itemsPerPage: 0, totalItems: 0, totalPages: 0 } })
  })

  it('should handle an exception and return a 400 status code', async () => {
    reviewsService.fetchReviews.mockRejectedValue(new Error('Test Error'))

    const mockReq = { params: { appId: 'appId' }, query: {} }
    const mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes)
    }

    await getReviews(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unable to fetch reviews' })
  })
})
