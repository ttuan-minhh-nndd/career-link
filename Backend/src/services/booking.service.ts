// ============================================
// FILE: src/services/booking.service.ts
// ============================================
import { db } from '../config/db';
import { bookings, availabilities, mentorProfiles, users, transactions } from '../models/schema';
import { eq, and } from 'drizzle-orm';
import * as paymentService from './payment.service';

export interface CreateBookingRequest {
  availabilityId: number;
}

export interface BookingResponse {
  id: number;
  menteeId: number;
  mentorId: number;
  availabilityId: number | null;
  status: string;
  sessionPrice: string;
  expiresAt: string | null;
  startTime: string;
  endTime: string;
  mentorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithPaymentResponse extends BookingResponse {
  payment: {
    orderId: string;
    qrImage: string;
    momoPhone: string;
    note: string;
  };
}

/**
 * Create a booking for a mentee
 * Uses transaction to prevent double-booking and creates payment transaction
 */
export const createBooking = async (
  menteeId: number,
  request: CreateBookingRequest
): Promise<BookingWithPaymentResponse> => {
  const { availabilityId } = request;

  // Get booking hold time from environment (default 15 minutes)
  const holdMinutes = parseInt(process.env.BOOKING_HOLD_MINUTES || '15', 10);

  // Use transaction to ensure atomicity
  const bookingResult = await db.transaction(async (tx) => {
    // 1. Lock and fetch the availability slot
    const availabilityData = await tx
      .select({
        id: availabilities.id,
        mentorId: availabilities.mentorId,
        startTime: availabilities.startTime,
        endTime: availabilities.endTime,
        isBooked: availabilities.isBooked,
      })
      .from(availabilities)
      .where(eq(availabilities.id, availabilityId))
      .for('update'); // Row-level lock

    if (availabilityData.length === 0) {
      throw new Error('AVAILABILITY_NOT_FOUND');
    }

    const availability = availabilityData[0];

    // 2. Check if already booked
    if (availability.isBooked) {
      throw new Error('SLOT_ALREADY_BOOKED');
    }

    // 3. Prevent self-booking (if mentee is also a mentor)
    if (availability.mentorId === menteeId) {
      throw new Error('CANNOT_BOOK_OWN_SLOT');
    }

    // 4. Get mentor's hourly rate for session price
    const mentorData = await tx
      .select({
        hourlyRate: mentorProfiles.hourlyRate,
        mentorName: users.name,
      })
      .from(mentorProfiles)
      .innerJoin(users, eq(mentorProfiles.userId, users.id))
      .where(eq(mentorProfiles.userId, availability.mentorId));

    if (mentorData.length === 0) {
      throw new Error('MENTOR_NOT_FOUND');
    }

    const { hourlyRate, mentorName } = mentorData[0];

    // 5. Calculate expiration time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + holdMinutes);

    // 6. Create the booking
    const newBooking = await tx
      .insert(bookings)
      .values({
        menteeId,
        mentorId: availability.mentorId,
        availabilityId,
        status: 'pending',
        sessionPrice: hourlyRate,
        expiresAt,
      })
      .returning({
        id: bookings.id,
        menteeId: bookings.menteeId,
        mentorId: bookings.mentorId,
        availabilityId: bookings.availabilityId,
        status: bookings.status,
        sessionPrice: bookings.sessionPrice,
        expiresAt: bookings.expiresAt,
        createdAt: bookings.createdAt,
        updatedAt: bookings.updatedAt,
      });

    // 7. Mark availability as booked
    await tx
      .update(availabilities)
      .set({ isBooked: true })
      .where(eq(availabilities.id, availabilityId));

    // 8. Generate order ID and create transaction record
    const orderId = paymentService.generateOrderId();
    await tx.insert(transactions).values({
      bookingId: newBooking[0].id,
      momoRequestId: orderId,
      amount: hourlyRate,
      status: 'pending',
    });

    return {
      booking: newBooking[0],
      startTime: availability.startTime,
      endTime: availability.endTime,
      mentorName,
      orderId,
      amount: hourlyRate,
    };
  });

  // 9. Generate MoMo QR code
  const qrData = await paymentService.generateMomoQR({
    bookingId: bookingResult.booking.id,
    amount: bookingResult.amount,
  });

  // 10. Format and return response
  const { booking, startTime, endTime, mentorName } = bookingResult;

  return {
    id: booking.id,
    menteeId: booking.menteeId,
    mentorId: booking.mentorId,
    availabilityId: booking.availabilityId,
    status: booking.status,
    sessionPrice: booking.sessionPrice,
    expiresAt:
      booking.expiresAt instanceof Date
        ? booking.expiresAt.toISOString()
        : booking.expiresAt
        ? String(booking.expiresAt)
        : null,
    startTime:
      startTime instanceof Date ? startTime.toISOString() : String(startTime),
    endTime: endTime instanceof Date ? endTime.toISOString() : String(endTime),
    mentorName,
    createdAt:
      booking.createdAt instanceof Date
        ? booking.createdAt.toISOString()
        : String(booking.createdAt),
    updatedAt:
      booking.updatedAt instanceof Date
        ? booking.updatedAt.toISOString()
        : String(booking.updatedAt),
    payment: {
      orderId: qrData.orderId,
      qrImage: qrData.qrImage,
      momoPhone: qrData.momoPhone,
      note: qrData.note,
    },
  };
};

/**
 * Confirm payment for a booking (manual verification)
 * Updates booking status to confirmed and transaction status to successful
 */
export const confirmPayment = async (bookingId: number): Promise<void> => {
  await db.transaction(async (tx) => {
    // 1. Get booking details
    const bookingData = await tx
      .select({
        id: bookings.id,
        status: bookings.status,
      })
      .from(bookings)
      .where(eq(bookings.id, bookingId));

    if (bookingData.length === 0) {
      throw new Error('BOOKING_NOT_FOUND');
    }

    const booking = bookingData[0];

    if (booking.status !== 'pending') {
      throw new Error('BOOKING_NOT_PENDING');
    }

    // 2. Update booking status to confirmed
    await tx
      .update(bookings)
      .set({ status: 'confirmed' })
      .where(eq(bookings.id, bookingId));

    // 3. Update transaction status to successful
    await tx
      .update(transactions)
      .set({ status: 'successful' })
      .where(eq(transactions.bookingId, bookingId));
  });
};

/**
 * Cancel a booking
 * Updates booking status to cancelled, transaction to failed, and frees the availability slot
 */
export const cancelBooking = async (
  bookingId: number,
  userId: number
): Promise<void> => {
  await db.transaction(async (tx) => {
    // 1. Get booking details
    const bookingData = await tx
      .select({
        id: bookings.id,
        menteeId: bookings.menteeId,
        availabilityId: bookings.availabilityId,
        status: bookings.status,
      })
      .from(bookings)
      .where(eq(bookings.id, bookingId));

    if (bookingData.length === 0) {
      throw new Error('BOOKING_NOT_FOUND');
    }

    const booking = bookingData[0];

    // 2. Verify user owns this booking (mentee can cancel their own booking)
    if (booking.menteeId !== userId) {
      throw new Error('FORBIDDEN');
    }

    if (booking.status === 'cancelled') {
      throw new Error('BOOKING_ALREADY_CANCELLED');
    }

    if (booking.status === 'confirmed' || booking.status === 'completed') {
      throw new Error('CANNOT_CANCEL_CONFIRMED_BOOKING');
    }

    // 3. Update booking status to cancelled
    await tx
      .update(bookings)
      .set({ status: 'cancelled' })
      .where(eq(bookings.id, bookingId));

    // 4. Update transaction status to failed
    await tx
      .update(transactions)
      .set({ status: 'failed' })
      .where(eq(transactions.bookingId, bookingId));

    // 5. Free the availability slot if it exists
    if (booking.availabilityId) {
      await tx
        .update(availabilities)
        .set({ isBooked: false })
        .where(eq(availabilities.id, booking.availabilityId));
    }
  });
};
