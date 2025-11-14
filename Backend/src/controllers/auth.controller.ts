// (Authentication): This file's job is to DO things. It handles the "authentication" process.

import { Request, Response } from 'express';
import * as authService from '../services/auth.service'; 
import * as tokenService from '../services/token.service';
import * as validationService from '../services/validation.service';

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req: Request, res: Response) => {
 try {
    // 1. Validate input
    const validationErrors = validationService.validateRegistration(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    const { name, email, password, role } = req.body;

    // 2. Check if user already exists
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 3. Create new user
    const user = await authService.createUser({
      name,
      email,
      password,
      role,
    });

    // 4. Generate token
    const token = tokenService.generateToken(user.id);

    // 5. Send response
    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * @desc    Log in a user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors = validationService.validateLogin(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    const { email, password } = req.body;

    // 2. Verify credentials
    try {
      const user = await authService.verifyUserCredentials({ email, password });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 3. Generate token
      const token = tokenService.generateToken(user.id);

      // 4. Send response
      res.status(200).json({
        user,
        token,
      });
    } catch (error: any) {
      if (error.message === 'OAUTH_USER') {
        return res.status(401).json({
          message: 'This account uses OAuth. Please log in with your OAuth provider (Google or LinkedIn).',
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * @desc    Log out a user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = (req: Request, res: Response) => {
  // The 'protect' middleware already verified the user.
  // A true logout is handled on the CLIENT-SIDE by deleting the token.
  // This endpoint is just a good-practice way for the client to say "I'm done."
  // This endpoint can be used for token blocklisting in the future.
  res.status(200).json({ message: 'Logged out successfully' });
};