// ============================================
// FILE: src/routes/mentor.routes.ts
// ============================================
import { Router } from 'express';
import { getAllMentors, getMentorDetails } from '../controllers/mentor.controller';

const mentorRoutes = Router();

// @route   GET /api/v1/mentors
// @desc    Get all mentor profiles with basic info and expertise tags
// @access  Public
mentorRoutes.get('/', getAllMentors);

// @route   GET /api/v1/mentors/:id
// @desc    Get detailed mentor profile with expertise and available slots
// @access  Public
mentorRoutes.get('/:id', getMentorDetails);

export default mentorRoutes;
