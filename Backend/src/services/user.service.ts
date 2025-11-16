// ============================================
// FILE: src/services/user.service.ts (NEW)
// ============================================
import bcrypt from 'bcryptjs';
import { db } from '../config/db';
import { users, mentorProfiles, mentorExpertise, tags } from '../models/schema';
import { eq, and, ne } from 'drizzle-orm';
import { findUserByEmail } from './auth.service'; // Re-use existing service

export interface UserProfileUpdateData {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null; // Added avatarUrl
}

// --- NEW ---
export interface MentorProfileUpdateData {
  bio?: string;
  jobTitle?: string;
  hourlyRate?: string;
}

// --- NEW ---
/**
 * @desc    Get the full profile for a user (base user + mentor profile if applicable)
 * @param   userId - The ID of the user
 * @returns The complete user profile object
 */
export const getFullUserProfile = async (userId: number) => {
  // Use a Left Join to get user data AND mentor data (if it exists)
  const userResult = await db
    .select()
    .from(users)
    .leftJoin(mentorProfiles, eq(users.id, mentorProfiles.userId))
    .where(eq(users.id, userId));

  if (userResult.length === 0) {
    throw new Error('USER_NOT_FOUND');
  }

  const { users: baseUser, mentor_profiles: mentorProfile } = userResult[0];

  // Construct the response object
  const userProfile: any = {
    id: baseUser.id,
    name: baseUser.name,
    email: baseUser.email,
    role: baseUser.role,
    avatarUrl: baseUser.avatarUrl,
    createdAt: baseUser.createdAt,
    updatedAt: baseUser.updatedAt,
    // Add mentor-specific data if it exists
    mentorProfile:
      baseUser.role === 'mentor' && mentorProfile
        ? {
            bio: mentorProfile.bio,
            jobTitle: mentorProfile.jobTitle,
            hourlyRate: mentorProfile.hourlyRate,
            averageRating: mentorProfile.averageRating,
            totalReviews: mentorProfile.totalReviews,
          }
        : null,
  };

  return userProfile;
};

/**
 * @desc    Update a user's profile information
 * @param   userId - The ID of the user to update
 * @param   data - An object with optional name, email, avatarUrl
 * @returns The updated user object (without sensitive data)
 */
export const updateUserProfile = async (
  userId: number,
  data: UserProfileUpdateData
): Promise<UserResponse> => {
  // 1. Check for email conflict
  if (data.email) {
    // Check if another user (not this user) already has the new email
    const existingUser = await db
      .select()
      .from(users)
      .where(and(eq(users.email, data.email), ne(users.id, userId)));

    if (existingUser.length > 0) {
      throw new Error('EMAIL_IN_USE');
    }
  }

  // 2. Update the user in the database
  const updatedUser = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      avatarUrl: users.avatarUrl,
    });

  if (updatedUser.length === 0) {
    throw new Error('USER_NOT_FOUND');
  }

  return updatedUser[0];
};

/**
 * @desc    Update a user's password
 * @param   userId - The ID of the user
 * @param   oldPassword - The user's current password
 * @param   newPassword - The user's new password
 */
export const updateUserPassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  // 1. Get the user's current password hash
  const userResult = await db
    .select({
      passwordHash: users.passwordHash,
      authProvider: users.authProvider,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (userResult.length === 0) {
    throw new Error('USER_NOT_FOUND');
  }

  const user = userResult[0];

  // 2. Check if user uses password (not OAuth)
  if (!user.passwordHash || user.authProvider !== 'email') {
    throw new Error('CANNOT_UPDATE_PASSWORD');
  }

  // 3. Verify the old password
  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) {
    throw new Error('INVALID_OLD_PASSWORD');
  }

  // 4. Hash the new password
  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(newPassword, salt);

  // 5. Update the user's password hash in the database
  await db
    .update(users)
    .set({ passwordHash: newPasswordHash, updatedAt: new Date() })
    .where(eq(users.id, userId));
};

// --- NEW ---
/**
 * @desc    Update a mentor's specific profile (mentor_profiles table)
 * @param   userId - The ID of the mentor
 * @param   data - An object with optional bio, jobTitle, hourlyRate
 * @returns The updated mentor profile object
 */
export const updateMentorProfile = async (
  userId: number,
  data: MentorProfileUpdateData
) => {
  // Build the object with only the fields provided
  const dataToUpdate: { [key: string]: any } = {};
  if (data.bio !== undefined) dataToUpdate.bio = data.bio;
  if (data.jobTitle !== undefined) dataToUpdate.jobTitle = data.jobTitle;
  if (data.hourlyRate !== undefined) dataToUpdate.hourlyRate = data.hourlyRate; // Drizzle handles string-to-decimal

  if (Object.keys(dataToUpdate).length === 0) {
    throw new Error('NO_DATA_TO_UPDATE');
  }

  // --- Use a transaction to update both tables ---
  const updatedProfile = await db.transaction(async (tx) => {
    // Step 1: Update the mentor_profiles table
    const updatedProfileResult = await tx
      .update(mentorProfiles)
      .set({ ...dataToUpdate, updatedAt: new Date() })
      .where(eq(mentorProfiles.userId, userId))
      .returning();

    if (updatedProfileResult.length === 0) {
      // This should not happen if registration logic is correct
      throw new Error('MENTOR_PROFILE_NOT_FOUND');
    }

    // Step 2: Update the parent 'users' table's updatedAt timestamp
    await tx
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, userId)); // --- THIS IS THE FIX ---

    return updatedProfileResult[0]; // Return the updated mentor profile
  });

    return updatedProfile;
};

// --- NEW ---
/**
 * @desc    Add an expertise tag to a mentor's profile
 * @param   userId - The mentor's user ID
 * @param   tagId - The ID of the tag to add
 * @returns The new mentorExpertise link
 */
export const addExpertiseToMentor = async (userId: number, tagId: number) => {
  // The mentorId for the 'mentorExpertise' table is the 'userId'
  const mentorId = userId;

  // 1. Check if the tagId is valid (for 404 error)
  const tag = await db.select().from(tags).where(eq(tags.id, tagId));
  if (tag.length === 0) {
    throw new Error('TAG_NOT_FOUND');
  }

  // 2. Check if the mentor already has this tag (for 409 error)
  const existingLink = await db
    .select()
    .from(mentorExpertise)
    .where(
      and(
        eq(mentorExpertise.mentorId, mentorId),
        eq(mentorExpertise.tagId, tagId)
      )
    );

  if (existingLink.length > 0) {
    throw new Error('EXPERTISE_EXISTS');
  }

  // 3. Create the new link in the mentorExpertise table
  const newLink = await db
    .insert(mentorExpertise)
    .values({
      mentorId: mentorId,
      tagId: tagId,
      // createdAt and updatedAt will use defaultNow()
    })
    .returning({
      mentorId: mentorExpertise.mentorId,
      tagId: mentorExpertise.tagId,
    });

  // Also update the parent user's `updatedAt` timestamp
  await db
    .update(users)
    .set({ updatedAt: new Date() })
    .where(eq(users.id, userId));

  return newLink[0];
};

// --- NEW ---
/**
 * @desc    Remove an expertise tag from a mentor's profile
 * @param   userId - The mentor's user ID
 * @param   tagId - The ID of the tag to remove
 * @returns Nothing
 */
export const removeExpertiseFromMentor = async (
  userId: number,
  tagId: number
): Promise<void> => {
  const mentorId = userId;

  // Use a transaction to delete the link and update the user's timestamp
  await db.transaction(async (tx) => {
    // 1. Attempt to delete the link
    const deletedLink = await tx
      .delete(mentorExpertise)
      .where(
        and(
          eq(mentorExpertise.mentorId, mentorId),
          eq(mentorExpertise.tagId, tagId)
        )
      )
      .returning(); // Ask Drizzle to return the row that was deleted

    // 2. Check if anything was actually deleted
    if (deletedLink.length === 0) {
      // If the array is empty, no row matched the WHERE clause
      throw new Error('LINK_NOT_FOUND');
    }

    // 3. If deletion was successful, update the parent user's timestamp
    await tx
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, userId));
  });
};