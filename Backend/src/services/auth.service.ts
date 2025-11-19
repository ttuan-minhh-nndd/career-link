// ============================================
// FILE: src/services/auth.service.ts
// ============================================
import bcrypt from 'bcryptjs';
import { db } from '../config/db';
import { users, mentorProfiles } from '../models/schema';
import { eq } from 'drizzle-orm';

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: 'mentee' | 'mentor';
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  mentorProfile?: {
    bio: string | null;
    jobTitle: string | null;
    hourlyRate: string | null;
    averageRating: string | null;
    totalReviews: number;
  } | null;
}

/**
 * Check if a user with the given email already exists
 */
export const findUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(users)
    .leftJoin(mentorProfiles, eq(users.id, mentorProfiles.userId))
    .where(eq(users.email, email));
  
  return existingUser.length > 0 ? existingUser[0] : null;
};

/**
 * Create a new user in the database
 */
export const createUser = async (userData: RegisterUserData): Promise<UserResponse> => {
  const { name, email, password, role } = userData;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // --- MODIFICATION: Use a transaction ---
  // A transaction ensures that BOTH the user and the mentor profile are
  // created successfully, or neither is.
  const newUser = await db.transaction(async (tx) => {
    // 1. Insert the new user
    const newUserResult = await tx
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
        role,
        authProvider: 'email',
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    const user = newUserResult[0];

    // 2. --- NEW --- If the user is a mentor, create their profile
    let mentorProfileData = null;
    if (user.role === 'mentor') {
      const newMentorProfile = await tx
        .insert(mentorProfiles)
        .values({
          userId: user.id,
          // All other fields have defaults or are nullable
        })
        .returning();
      
      mentorProfileData = newMentorProfile[0];
    }

    // 3. Return complete user profile
    return {
      ...user,
      mentorProfile: mentorProfileData
        ? {
            bio: mentorProfileData.bio,
            jobTitle: mentorProfileData.jobTitle,
            hourlyRate: mentorProfileData.hourlyRate,
            averageRating: mentorProfileData.averageRating,
            totalReviews: mentorProfileData.totalReviews,
          }
        : null,
    };
  });

  return newUser;
};


/**
 * Verify user credentials (email and password)
 */
export const verifyUserCredentials = async (
  loginData: LoginUserData
): Promise<UserResponse | null> => {
  const { email, password } = loginData;

  // Find user by email (with mentor profile if exists)
  const userResult = await findUserByEmail(email);
  
  if (!userResult) {
    return null;
  }

  // Extract users and mentor_profiles from the join result
  const { users: baseUser, mentor_profiles: mentorProfile } = userResult;

  // Check if user has a password (not OAuth user)
  if (!baseUser.passwordHash) {
    throw new Error('OAUTH_USER');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, baseUser.passwordHash);
  
  if (!isMatch) {
    return null;
  }

  // Construct and return the complete user profile
  const userProfile: UserResponse = {
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
