// ============================================
// FILE: src/routes/availability.routes.ts
// ============================================
import { Router } from 'express';
import { createBulkAvailabilities, getMyAvailabilities, updateAvailability, deleteAvailability } from '../controllers/availability.controller';
import { protect, isMentor } from '../middleware/auth.middleware';

const availabilityRoutes = Router();

// @route   GET /api/v1/availabilities/mentor/mine
// @desc    Get all availability slots for current mentor
// @access  Private (Mentor Only)
availabilityRoutes.get('/mentor/mine', protect, isMentor, getMyAvailabilities);

// @route   POST /api/v1/availabilities/bulk
// @desc    Create multiple availability slots for the current mentor
// @access  Private (Mentor Only)
availabilityRoutes.post('/bulk', protect, isMentor, createBulkAvailabilities);

// @route   PUT /api/v1/availabilities/:id
// @desc    Update an availability slot owned by current mentor
// @access  Private (Mentor Only)
availabilityRoutes.put('/:id', protect, isMentor, updateAvailability);

// @route   DELETE /api/v1/availabilities/:id
// @desc    Delete an availability slot owned by current mentor
// @access  Private (Mentor Only)
availabilityRoutes.delete('/:id', protect, isMentor, deleteAvailability);

export default availabilityRoutes;
