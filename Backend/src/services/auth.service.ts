// ============================================
// FILE: src/services/auth.service.ts
// ============================================
import bcrypt from 'bcryptjs';
import { db } from '../config/db';
import { users } from '../models/schema';
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
}

/**
 * Check if a user with the given email already exists
 */
export const findUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(users)
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

  // Insert the new user
  const newUser = await db
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
    });

  return newUser[0];
};

/**
 * Verify user credentials (email and password)
 */
export const verifyUserCredentials = async (
  loginData: LoginUserData
): Promise<UserResponse | null> => {
  const { email, password } = loginData;

  // Find user by email
  const user = await findUserByEmail(email);
  
  if (!user) {
    return null;
  }

  // Check if user has a password (not OAuth user)
  if (!user.passwordHash) {
    throw new Error('OAUTH_USER');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  
  if (!isMatch) {
    return null;
  }

  // Return user without sensitive data
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
