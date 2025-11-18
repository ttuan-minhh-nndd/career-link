// ============================================
// FILE: src/routes/booking.routes.ts
// ============================================
import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller';
import { protect } from '../middleware/auth.middleware';

const bookingRoutes = Router();

// @route   POST /api/v1/bookings
// @desc    Create a booking for an availability slot
// @access  Private (authenticated users, typically mentees)
bookingRoutes.post('/', protect, createBooking);

export default bookingRoutes;
