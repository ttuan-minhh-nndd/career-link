// ============================================
// FILE: src/routes/tag.routes.ts (NEW)
// ============================================
import { Router } from 'express';
import { getAllTagsController } from '../controllers/tag.controller';

const tagRoutes = Router();

// @route   GET /api/v1/tags
// @desc    Get all expertise tags
// @access  Public
tagRoutes.get('/', getAllTagsController);

export default tagRoutes;