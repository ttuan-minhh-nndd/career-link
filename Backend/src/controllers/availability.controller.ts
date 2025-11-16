// ============================================
// FILE: src/controllers/availability.controller.ts
// ============================================
import { Request, Response } from 'express';
import * as validationService from '../services/validation.service';
import * as availabilityService from '../services/availability.service';

/**
 * @desc    Create multiple availability slots for the current mentor
 * @route   POST /api/v1/availabilities/bulk
 * @access  Private (Mentor Only)
 */
export const createBulkAvailabilities = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors =
      validationService.validateBulkAvailabilities(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get mentor ID from 'protect' middleware
    const mentorId = req.user!.id;

    // 3. Call the service to create the availability slots
    const result = await availabilityService.createBulkAvailabilities(
      mentorId,
      req.body
    );

    // 4. Send success response (201 Created)
    res.status(201).json(result);
  } catch (error: any) {
    // 5. Handle specific errors from the service
    if (error.message === 'MENTOR_NOT_FOUND') {
      return res.status(404).json({
        message: 'Mentor profile not found',
      });
    }
    if (error.message === 'INVALID_SLOTS_ARRAY') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          {
            field: 'slots',
            message: 'slots must be a non-empty array',
          },
        ],
      });
    }
    if (error.message === 'INVALID_TIMESTAMP_FORMAT') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          {
            field: 'slots',
            message:
              'Invalid timestamp format. Please use ISO 8601 format (e.g., 2025-12-01T14:00:00Z)',
          },
        ],
      });
    }
    if (error.message === 'INVALID_TIME_RANGE') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          {
            field: 'slots',
            message: 'endTime must be after startTime for each slot',
          },
        ],
      });
    }
    // 6. Handle general errors
    console.error('Create bulk availabilities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- NEW ---
/**
 * @desc    Get all availability slots for the current mentor
 * @route   GET /api/v1/availabilities/mentor/mine
 * @access  Private (Mentor Only)
 */
export const getMyAvailabilities = async (req: Request, res: Response) => {
  try {
    const mentorId = req.user!.id;
    const slots = await availabilityService.getMyAvailabilities(mentorId);
    res.status(200).json(slots);
  } catch (error) {
    console.error('Get my availabilities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- NEW ---
/**
 * @desc    Update an availability slot (owned by current mentor)
 * @route   PUT /api/v1/availabilities/:id
 * @access  Private (Mentor Only)
 */
export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const mentorId = req.user!.id;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          { field: 'id', message: 'id must be a positive integer' },
        ],
      });
    }

    const errors = validationService.validateUpdateAvailability(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const updated = await availabilityService.updateAvailability(
      mentorId,
      id,
      req.body
    );
    res.status(200).json(updated);
  } catch (error: any) {
    if (error.message === 'INVALID_TIMESTAMP_FORMAT') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          {
            field: 'startTime/endTime',
            message:
              'Invalid timestamp format. Use ISO 8601 (e.g., 2025-12-01T14:00:00Z)'
          }
        ],
      });
    }
    if (error.message === 'INVALID_TIME_RANGE') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          { field: 'endTime', message: 'endTime must be after startTime' },
        ],
      });
    }
    if (error.message === 'AVAILABILITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Availability not found' });
    }
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({ message: 'You do not own this slot' });
    }
    if (error.message === 'CANNOT_UPDATE_BOOKED') {
      return res
        .status(409)
        .json({ message: 'Cannot update a booked availability slot' });
    }
    console.error('Update availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- NEW ---
/**
 * @desc    Delete an availability slot (owned by current mentor)
 * @route   DELETE /api/v1/availabilities/:id
 * @access  Private (Mentor Only)
 */
export const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const mentorId = req.user!.id;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          { field: 'id', message: 'id must be a positive integer' },
        ],
      });
    }

    await availabilityService.deleteAvailability(mentorId, id);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === 'AVAILABILITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Availability not found' });
    }
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({ message: 'You do not own this slot' });
    }
    if (error.message === 'CANNOT_DELETE_BOOKED') {
      return res
        .status(409)
        .json({ message: 'Cannot delete a booked availability slot' });
    }
    console.error('Delete availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
