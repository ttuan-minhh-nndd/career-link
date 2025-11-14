// ============================================
// FILE: src/routes/auth.routes.ts (UPDATED)
// ============================================
import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const authRoutes = Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
authRoutes.post('/register', register);

// @route   POST /api/v1/auth/login
// @desc    Log in a user
// @access  Public
authRoutes.post('/login', login);

// @route   POST /api/v1/auth/logout
// @desc    Log out a user
// @access  Private
authRoutes.post('/logout', protect, logout);

export default authRoutes;