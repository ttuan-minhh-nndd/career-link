// ============================================
// FILE: src/controllers/user.controller.ts (NEW)
// ============================================
import { Request, Response } from 'express';
import * as validationService from '../services/validation.service';
import * as userService from '../services/user.service';

/**
 * @desc    Get the profile of the currently logged-in user
 * @route   GET /api/v1/users/me
 * @access  Private
 */
export const getMyProfile = async (req: Request, res: Response) => {
  // The 'protect' middleware already fetched the user and attached it to req.user.
  // We just need to return it.
  // req.user contains { id, name, email, role } from the middleware.
  // If you need more data (like avatar_url), you could re-fetch or add it in the middleware.
  // For simplicity, let's just return what the middleware provides.
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // The user from `protect` middleware is good enough for a profile summary
  res.status(200).json(req.user);
};

/**
 * @desc    Update the profile of the currently logged-in user
 * @route   PUT /api/v1/users/me
 * @access  Private
 */
export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors = validationService.validateProfileUpdate(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get user ID from the 'protect' middleware
    const userId = req.user!.id;

    // 3. Build the update object with only the fields provided
    const { name, email, avatarUrl } = req.body;
    const dataToUpdate: userService.UserProfileUpdateData = {};

    // Fill data from req.body (name, email, avatarUrl) into the dataToUpdate.fields
    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (avatarUrl !== undefined) dataToUpdate.avatarUrl = avatarUrl;

    // Check if there is anything to update
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    // 4. Call the service to update the profile
    const updatedUser = await userService.updateUserProfile(userId, dataToUpdate);

    // 5. Send response
    res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error.message === 'EMAIL_IN_USE') {
      return res.status(409).json({ message: 'Email is already in use' });
    }
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

/**
 * @desc    Update the password of the currently logged-in user
 * @route   PUT /api/v1/users/me/password
 * @access  Private
 */
export const updateMyPassword = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors = validationService.validatePasswordChange(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get user ID from the 'protect' middleware
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    // 3. Call the service to update the password
    await userService.updateUserPassword(userId, oldPassword, newPassword);

    // 4. Send response
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error: any) {
    if (error.message === 'INVALID_OLD_PASSWORD') {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    if (
      error.message === 'CANNOT_UPDATE_PASSWORD' ||
      error.message === 'USER_NOT_FOUND'
    ) {
      return res
        .status(400)
        .json({ message: 'Cannot update password for this account' });
    }
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error during password update' });
  }
};