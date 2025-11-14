// ============================================
// FILE: src/services/token.service.ts
// ============================================
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: number;
}

/**
 * Helper function 
 * Generate a JWT token for a user
 * We could imagine this like a "wristband generator" :)
 */
export const generateToken = (userId: number): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables (.env).');
  }

  return jwt.sign(
    { id: userId } as TokenPayload,
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

/**
 * Verify a JWT token and return the decoded payload
 */
export const verifyToken = (token: string): TokenPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables (.env).');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('INVALID_TOKEN');
  }
};