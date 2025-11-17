// ============================================
// FILE: src/controllers/mentor.controller.ts
// ============================================
import { Request, Response } from 'express';
import * as mentorService from '../services/mentor.service';

/**
 * @desc    Get all mentor profiles with basic info and expertise tags
 * @route   GET /api/v1/mentors
 * @access  Public
 */
export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const mentors = await mentorService.getAllMentorProfiles();
    res.status(200).json(mentors);
  } catch (error) {
    console.error('Get all mentors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get detailed mentor profile with expertise and available slots
 * @route   GET /api/v1/mentors/:id
 * @access  Public
 */
export const getMentorDetails = async (req: Request, res: Response) => {
  try {
    const mentorId = parseInt(req.params.id, 10);
    if (isNaN(mentorId) || mentorId <= 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [{ field: 'id', message: 'id must be a positive integer' }],
      });
    }

    const mentorDetails = await mentorService.getMentorProfileWithDetails(mentorId);
    res.status(200).json(mentorDetails);
  } catch (error: any) {
    if (error.message === 'MENTOR_NOT_FOUND') {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    console.error('Get mentor details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
