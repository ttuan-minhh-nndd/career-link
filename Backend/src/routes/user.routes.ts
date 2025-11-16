// ============================================
// FILE: src/routes/user.routes.ts (NEW)
// ============================================
import { Router } from 'express';
import {
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
  updateMyMentorProfile,
  addMyExpertise,
  removeMyExpertise
} from '../controllers/user.controller';
import { protect, isMentor } from '../middleware/auth.middleware';

const userRoutes = Router();

// --- SHARED ROUTES (for all roles) ---

// @route   GET /api/v1/users/me
// @desc    Get current user's full profile (smart)
// @access  Private
userRoutes.get('/me', protect, getMyProfile);

// @route   PUT /api/v1/users/me
// @desc    Update current user's base profile (name, email, avatar)
// @access  Private
userRoutes.put('/me', protect, updateMyProfile);

// @route   PUT /api/v1/users/me/password
// @desc    Update current user's password
// @access  Private
userRoutes.put('/me/password', protect, updateMyPassword);

// --- MENTOR-ONLY ROUTE ---

// @route   PUT /api/v1/users/me/mentor-profile
// @desc    Update current mentor's specific profile (bio, job, rate)
// @access  Private (Mentor Only)
userRoutes.put('/me/mentor-profile', protect, isMentor, updateMyMentorProfile);

// @route   POST /api/v1/users/me/expertise
// @desc    Add an expertise tag to current mentor's profile
// @access  Private (Mentor Only)
userRoutes.post('/me/expertise', protect, isMentor, addMyExpertise); // --- NEW ---

// @route   DELETE /api/v1/users/me/expertise/:tagId
// @desc    Remove an expertise tag from current mentor's profile
// @access  Private (Mentor Only)
userRoutes.delete(
  '/me/expertise/:tagId',
  protect,
  isMentor,
  removeMyExpertise
); // --- NEW ---


export default userRoutes;