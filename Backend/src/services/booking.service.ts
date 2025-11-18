// ============================================
// FILE: src/services/booking.service.ts
// ============================================
import { db } from '../config/db';
import { bookings, availabilities, mentorProfiles, users } from '../models/schema';
import { eq, and } from 'drizzle-orm';

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
  startTime: string;
  endTime: string;
  mentorName: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a booking for a mentee
 * Uses transaction to prevent double-booking
 */
export const createBooking = async (
  menteeId: number,
  request: CreateBookingRequest
): Promise<BookingResponse> => {
  const { availabilityId } = request;

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

    // 5. Create the booking
    const newBooking = await tx
      .insert(bookings)
      .values({
        menteeId,
        mentorId: availability.mentorId,
        availabilityId,
        status: 'pending',
        sessionPrice: hourlyRate,
      })
      .returning({
        id: bookings.id,
        menteeId: bookings.menteeId,
        mentorId: bookings.mentorId,
        availabilityId: bookings.availabilityId,
        status: bookings.status,
        sessionPrice: bookings.sessionPrice,
        createdAt: bookings.createdAt,
        updatedAt: bookings.updatedAt,
      });

    // 6. Mark availability as booked
    await tx
      .update(availabilities)
      .set({ isBooked: true })
      .where(eq(availabilities.id, availabilityId));

    return {
      booking: newBooking[0],
      startTime: availability.startTime,
      endTime: availability.endTime,
      mentorName,
    };
  });

  // 7. Format and return response
  const { booking, startTime, endTime, mentorName } = bookingResult;

  return {
    id: booking.id,
    menteeId: booking.menteeId,
    mentorId: booking.mentorId,
    availabilityId: booking.availabilityId,
    status: booking.status,
    sessionPrice: booking.sessionPrice,
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
  };
};
