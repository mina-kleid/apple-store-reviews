import express from 'express';
import { getReviews } from './controller/reviewsController.js';
import { authenticateToken } from './middlewar/authMiddleware.js';

const router = express.Router();

router.get('/:appId/reviews', authenticateToken, getReviews);

export default router;