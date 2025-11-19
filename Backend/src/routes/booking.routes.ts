// ============================================
// FILE: src/routes/booking.routes.ts
// ============================================
import { Router } from 'express';
import {
  createBooking,
  confirmBookingPayment,
  cancelBooking,
} from '../controllers/booking.controller';
import { protect } from '../middleware/auth.middleware';

const bookingRoutes = Router();

// @route   POST /api/v1/bookings
// @desc    Create a booking for an availability slot
// @access  Private (authenticated users, typically mentees)
bookingRoutes.post('/', protect, createBooking);

// @route   PUT /api/v1/bookings/:id/confirm-payment
// @desc    Confirm payment for a booking (manual verification)
// @access  Private (authenticated users - for competition)
bookingRoutes.put('/:id/confirm-payment', protect, confirmBookingPayment);

// @route   PUT /api/v1/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private (booking owner)
bookingRoutes.put('/:id/cancel', protect, cancelBooking);

export default bookingRoutes;
