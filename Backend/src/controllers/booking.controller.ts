// ============================================
// FILE: src/controllers/booking.controller.ts
// ============================================
import { Request, Response } from 'express';
import * as validationService from '../services/validation.service';
import * as bookingService from '../services/booking.service';

/**
 * @desc    Create a booking for an availability slot
 * @route   POST /api/v1/bookings
 * @access  Private (Mentee)
 */
export const createBooking = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors = validationService.validateCreateBooking(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get mentee ID from authenticated user
    const menteeId = req.user!.id;

    // 3. Call service to create booking
    const booking = await bookingService.createBooking(menteeId, req.body);

    // 4. Return success response
    res.status(201).json(booking);
  } catch (error: any) {
    // 5. Handle specific errors
    if (error.message === 'AVAILABILITY_NOT_FOUND') {
      return res.status(404).json({
        message: 'Availability slot not found',
      });
    }
    if (error.message === 'SLOT_ALREADY_BOOKED') {
      return res.status(409).json({
        message: 'This slot has already been booked',
      });
    }
    if (error.message === 'CANNOT_BOOK_OWN_SLOT') {
      return res.status(403).json({
        message: 'You cannot book your own availability slot',
      });
    }
    if (error.message === 'MENTOR_NOT_FOUND') {
      return res.status(404).json({
        message: 'Mentor profile not found',
      });
    }
    if (error.message === 'MOMO_WALLET_NOT_CONFIGURED') {
      return res.status(500).json({
        message: 'Payment system not configured',
      });
    }
    // 6. Handle general errors
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Confirm payment for a booking (manual verification)
 * @route   PUT /api/v1/bookings/:id/confirm-payment
 * @access  Private (Any authenticated user - for competition, later add admin role)
 */
export const confirmBookingPayment = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        message: 'Invalid booking ID',
      });
    }

    await bookingService.confirmPayment(bookingId);

    res.status(200).json({
      message: 'Payment confirmed successfully',
    });
  } catch (error: any) {
    if (error.message === 'BOOKING_NOT_FOUND') {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }
    if (error.message === 'BOOKING_NOT_PENDING') {
      return res.status(400).json({
        message: 'Booking is not in pending status',
      });
    }
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Cancel a booking
 * @route   PUT /api/v1/bookings/:id/cancel
 * @access  Private (Booking owner)
 */
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        message: 'Invalid booking ID',
      });
    }

    const userId = req.user!.id;

    await bookingService.cancelBooking(bookingId, userId);

    res.status(200).json({
      message: 'Booking cancelled successfully',
    });
  } catch (error: any) {
    if (error.message === 'BOOKING_NOT_FOUND') {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }
    if (error.message === 'FORBIDDEN') {
      return res.status(403).json({
        message: 'You do not have permission to cancel this booking',
      });
    }
    if (error.message === 'BOOKING_ALREADY_CANCELLED') {
      return res.status(400).json({
        message: 'Booking is already cancelled',
      });
    }
    if (error.message === 'CANNOT_CANCEL_CONFIRMED_BOOKING') {
      return res.status(400).json({
        message: 'Cannot cancel a confirmed or completed booking',
      });
    }
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
