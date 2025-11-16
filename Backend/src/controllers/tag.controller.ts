// ============================================
// FILE: src/controllers/tag.controller.ts (NEW)
// ============================================
import { Request, Response } from 'express';
import * as tagService from '../services/tag.service';

/**
 * @desc    Get all available expertise tags
 * @route   GET /api/v1/tags
 * @access  Public
 */
export const getAllTagsController = async (req: Request, res: Response) => {
  try {
    // 1. Call the service to get all tags
    const allTags = await tagService.getAllTags();

    // 2. Send the successful response
    res.status(200).json({ tags: allTags });
  } catch (error) {
    // 3. Handle any errors
    console.error('getAllTagsController error:', error);
    res.status(500).json({ message: 'Server error retrieving tags' });
  }
};

