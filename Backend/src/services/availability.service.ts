// ============================================
// FILE: src/services/availability.service.ts
// ============================================
import { db } from '../config/db';
import { availabilities, mentorProfiles } from '../models/schema';
import { eq } from 'drizzle-orm';

export interface AvailabilitySlot {
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
}

export interface BulkAvailabilityRequest {
  slots: AvailabilitySlot[];
}

export interface AvailabilityResponse {
  id: number;
  mentorId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BulkCreateResponse {
  created: number;
  slots: AvailabilityResponse[];
}

export interface UpdateAvailabilityRequest {
  startTime: string;
  endTime: string;
}

/**
 * Verify that the mentor exists and has a profile
 */
export const verifyMentorExists = async (mentorId: number): Promise<boolean> => {
  const mentor = await db
    .select()
    .from(mentorProfiles)
    .where(eq(mentorProfiles.userId, mentorId));

  return mentor.length > 0;
};

/**
 * Create multiple availability slots for a mentor
 * @param mentorId The ID of the mentor (user.id)
 * @param request The bulk availability request with slots
 * @returns The created availability slots
 */
export const createBulkAvailabilities = async (
  mentorId: number,
  request: BulkAvailabilityRequest
): Promise<BulkCreateResponse> => {
  // 1. Verify mentor exists
  const mentorExists = await verifyMentorExists(mentorId);
  if (!mentorExists) {
    throw new Error('MENTOR_NOT_FOUND');
  }

  // 2. Validate and process slots
  if (!Array.isArray(request.slots) || request.slots.length === 0) {
    throw new Error('INVALID_SLOTS_ARRAY');
  }

  const processedSlots: Array<{
    startTime: Date;
    endTime: Date;
  }> = [];

  for (const slot of request.slots) {
    // Parse and validate timestamps
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);

    // Check if dates are valid
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new Error('INVALID_TIMESTAMP_FORMAT');
    }

    // Validate that endTime is after startTime
    if (endTime <= startTime) {
      throw new Error('INVALID_TIME_RANGE');
    }

    processedSlots.push({
      startTime,
      endTime,
    });
  }

  // 3. Use a transaction to insert all slots

  const createdSlots = await db.transaction(async (tx) => {
    const slots: AvailabilityResponse[] = [];

    for (const slot of processedSlots) {
      const result = await tx
        .insert(availabilities)
        .values({
          mentorId,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false,
        })
        .returning({
          id: availabilities.id,
          mentorId: availabilities.mentorId,
          startTime: availabilities.startTime,
          endTime: availabilities.endTime,
          isBooked: availabilities.isBooked,
          createdAt: availabilities.createdAt,
          updatedAt: availabilities.updatedAt,
        });

      // Convert Date fields to ISO strings for API response
      const slotRow = result[0];
      slots.push({
        ...slotRow,
        startTime: slotRow.startTime instanceof Date ? slotRow.startTime.toISOString() : String(slotRow.startTime),
        endTime: slotRow.endTime instanceof Date ? slotRow.endTime.toISOString() : String(slotRow.endTime),
        createdAt: slotRow.createdAt instanceof Date ? slotRow.createdAt.toISOString() : String(slotRow.createdAt),
        updatedAt: slotRow.updatedAt instanceof Date ? slotRow.updatedAt.toISOString() : String(slotRow.updatedAt),
      });
    }

    return slots;
  });

  // 4. Return response
  return {
    created: createdSlots.length,
    slots: createdSlots,
  };
};

/**
 * Get all availabilities for the current mentor (mentor view)
 */
export const getMyAvailabilities = async (
  mentorId: number
): Promise<AvailabilityResponse[]> => {
  const rows = await db
    .select({
      id: availabilities.id,
      mentorId: availabilities.mentorId,
      startTime: availabilities.startTime,
      endTime: availabilities.endTime,
      isBooked: availabilities.isBooked,
      createdAt: availabilities.createdAt,
      updatedAt: availabilities.updatedAt,
    })
    .from(availabilities)
    .where(eq(availabilities.mentorId, mentorId));

  return rows.map((r) => ({
    ...r,
    startTime: r.startTime instanceof Date ? r.startTime.toISOString() : String(r.startTime),
    endTime: r.endTime instanceof Date ? r.endTime.toISOString() : String(r.endTime),
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt),
  }));
};

/**
 * Update an availability slot owned by the mentor
 */
export const updateAvailability = async (
  mentorId: number,
  availabilityId: number,
  body: UpdateAvailabilityRequest
): Promise<AvailabilityResponse> => {
  // Validate timestamps
  const start = new Date(body.startTime);
  const end = new Date(body.endTime);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('INVALID_TIMESTAMP_FORMAT');
  }
  if (end <= start) {
    throw new Error('INVALID_TIME_RANGE');
  }

  // Ensure the slot exists and belongs to mentor
  const existing = await db
    .select({
      id: availabilities.id,
      mentorId: availabilities.mentorId,
      isBooked: availabilities.isBooked,
    })
    .from(availabilities)
    .where(eq(availabilities.id, availabilityId));

  if (existing.length === 0) {
    throw new Error('AVAILABILITY_NOT_FOUND');
  }
  if (existing[0].mentorId !== mentorId) {
    throw new Error('FORBIDDEN');
  }
  if (existing[0].isBooked) {
    throw new Error('CANNOT_UPDATE_BOOKED');
  }

  const updated = await db
    .update(availabilities)
    .set({ startTime: start, endTime: end })
    .where(eq(availabilities.id, availabilityId))
    .returning({
      id: availabilities.id,
      mentorId: availabilities.mentorId,
      startTime: availabilities.startTime,
      endTime: availabilities.endTime,
      isBooked: availabilities.isBooked,
      createdAt: availabilities.createdAt,
      updatedAt: availabilities.updatedAt,
    });

  const row = updated[0];
  return {
    ...row,
    startTime: row.startTime instanceof Date ? row.startTime.toISOString() : String(row.startTime),
    endTime: row.endTime instanceof Date ? row.endTime.toISOString() : String(row.endTime),
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : String(row.updatedAt),
  };
};

/**
 * Delete an availability slot owned by the mentor
 */
export const deleteAvailability = async (
  mentorId: number,
  availabilityId: number
): Promise<void> => {
  // Ensure the slot exists and belongs to mentor
  const existing = await db
    .select({
      id: availabilities.id,
      mentorId: availabilities.mentorId,
      isBooked: availabilities.isBooked,
    })
    .from(availabilities)
    .where(eq(availabilities.id, availabilityId));

  if (existing.length === 0) {
    throw new Error('AVAILABILITY_NOT_FOUND');
  }
  if (existing[0].mentorId !== mentorId) {
    throw new Error('FORBIDDEN');
  }
  if (existing[0].isBooked) {
    throw new Error('CANNOT_DELETE_BOOKED');
  }

  await db.delete(availabilities).where(eq(availabilities.id, availabilityId));
};
