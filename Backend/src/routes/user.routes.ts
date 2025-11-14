// ============================================
// FILE: src/routes/user.routes.ts (NEW)
// ============================================
import { Router } from 'express';
import {
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
} from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const userRoutes = Router();

// @route   GET /api/v1/users/me
// @desc    Get current user's profile
// @access  Private
userRoutes.get('/me', protect, getMyProfile);

// @route   PUT /api/v1/users/me
// @desc    Update current user's profile (name, email, avatar)
// @access  Private
userRoutes.put('/me', protect, updateMyProfile);

// @route   PUT /api/v1/users/me/password
// @desc    Update current user's password
// @access  Private
userRoutes.put('/me/password', protect, updateMyPassword);

export default userRoutes;