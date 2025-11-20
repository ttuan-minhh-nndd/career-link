// ============================================
// FILE: src/services/mentor.service.ts
// ============================================
import { db } from '../config/db';
import { users, mentorProfiles, mentorExpertise, tags, availabilities } from '../models/schema';
import { eq, and, desc } from 'drizzle-orm';

export interface MentorListItem {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
  expertiseTags: string[];
}

export interface MentorDetailResponse {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
  expertiseTags: Array<{ id: number; name: string }>;
  availableSlots: Array<{
    id: number;
    startTime: string;
    endTime: string;
  }>;
}

/**
 * Get all mentor profiles (for home page listing)
 * @returns List of mentors with basic info and expertise tags, sorted by newest first
 */
export const getAllMentorProfiles = async (): Promise<MentorListItem[]> => {
  // 1. Get all mentors with their user info, sorted by creation time (newest first)
  const mentors = await db
    .select({
      userId: mentorProfiles.userId,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      bio: mentorProfiles.bio,
      jobTitle: mentorProfiles.jobTitle,
      hourlyRate: mentorProfiles.hourlyRate,
      averageRating: mentorProfiles.averageRating,
      totalReviews: mentorProfiles.totalReviews,
    })
    .from(mentorProfiles)
    .innerJoin(users, eq(mentorProfiles.userId, users.id))
    .orderBy(desc(users.createdAt));

  // 2. For each mentor, get their expertise tags
  const mentorsWithTags = await Promise.all(
    mentors.map(async (mentor) => {
      const expertise = await db
        .select({
          tagName: tags.name,
        })
        .from(mentorExpertise)
        .innerJoin(tags, eq(mentorExpertise.tagId, tags.id))
        .where(eq(mentorExpertise.mentorId, mentor.userId));

      return {
        ...mentor,
        expertiseTags: expertise.map((e) => e.tagName),
      };
    })
  );

  return mentorsWithTags;
};

/**
 * Get detailed mentor profile with expertise and available slots
 * @param mentorId The user ID of the mentor
 * @returns Mentor profile with tags and unbooked availability slots
 */
export const getMentorProfileWithDetails = async (
  mentorId: number
): Promise<MentorDetailResponse> => {
  // 1. Get mentor profile with user info
  const mentorData = await db
    .select({
      userId: mentorProfiles.userId,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
      bio: mentorProfiles.bio,
      jobTitle: mentorProfiles.jobTitle,
      hourlyRate: mentorProfiles.hourlyRate,
      averageRating: mentorProfiles.averageRating,
      totalReviews: mentorProfiles.totalReviews,
    })
    .from(mentorProfiles)
    .innerJoin(users, eq(mentorProfiles.userId, users.id))
    .where(eq(mentorProfiles.userId, mentorId));

  if (mentorData.length === 0) {
    throw new Error('MENTOR_NOT_FOUND');
  }

  const mentor = mentorData[0];

  // 2. Get expertise tags
  const expertise = await db
    .select({
      id: tags.id,
      name: tags.name,
    })
    .from(mentorExpertise)
    .innerJoin(tags, eq(mentorExpertise.tagId, tags.id))
    .where(eq(mentorExpertise.mentorId, mentorId));

  // 3. Get available (unbooked) slots
  const slots = await db
    .select({
      id: availabilities.id,
      startTime: availabilities.startTime,
      endTime: availabilities.endTime,
    })
    .from(availabilities)
    .where(
      and(
        eq(availabilities.mentorId, mentorId),
        eq(availabilities.isBooked, false)
      )
    );

  return {
    ...mentor,
    expertiseTags: expertise,
    availableSlots: slots.map((slot) => ({
      id: slot.id,
      startTime:
        slot.startTime instanceof Date
          ? slot.startTime.toISOString()
          : String(slot.startTime),
      endTime:
        slot.endTime instanceof Date
          ? slot.endTime.toISOString()
          : String(slot.endTime),
    })),
  };
};
