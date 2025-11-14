// ============================================
// FILE: src/services/user.service.ts (NEW)
// ============================================
import bcrypt from 'bcryptjs';
import { db } from '../config/db';
import { users } from '../models/schema';
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
    .set(data)
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