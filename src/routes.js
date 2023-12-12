import express from 'express';
import { getReviews, refreshReviews } from './controller/reviewsController.js';
import { authenticateToken } from './middlewar/authMiddleware.js';

const router = express.Router();

router.get('/:appId/reviews', authenticateToken, getReviews);
router.get('/:appId/reviews/refresh', authenticateToken, refreshReviews);

export default router;