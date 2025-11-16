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
  try {
    // 1. Get user ID from the 'protect' middleware
    const userId = req.user!.id;

    // 2. Call the new service to get the full profile
    const userProfile = await userService.getFullUserProfile(userId);

    // 3. Send response
    res.status(200).json(userProfile);
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
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
    console.log("dataToUpdate.name: ", dataToUpdate.name);
    console.log("dataToUpdate.email: ", dataToUpdate.email);
    console.log("dataToUpdate.avatarUrl: ", dataToUpdate.avatarUrl);            

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

// --- NEW ---
/**
 * @desc    Update the *mentor-specific* profile
 * @route   PUT /api/v1/users/me/mentor-profile
 * @access  Private (Mentors Only)
 */
export const updateMyMentorProfile = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationErrors =
      validationService.validateMentorProfileUpdate(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get user ID from 'protect' middleware
    const userId = req.user!.id;
    const { bio, jobTitle, hourlyRate } = req.body;

    // 3. Call service to update mentor profile
    const updatedMentorProfile = await userService.updateMentorProfile(userId, {
      bio,
      jobTitle,
      hourlyRate,
    });

    // 4. Send response
    res.status(200).json(updatedMentorProfile);
  } catch (error: any) {
    if (error.message === 'NO_DATA_TO_UPDATE') {
      return res.status(400).json({ message: 'No update data provided' });
    }
    if (error.message === 'MENTOR_PROFILE_NOT_FOUND') {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }
    console.error('Update mentor profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// --- NEW ---
/**
 * @desc    Add an expertise tag to the current mentor's profile
 * @route   POST /api/v1/users/me/expertise
 * @access  Private (Mentors Only)
 */
export const addMyExpertise = async (req: Request, res: Response) => {
  try {
    // 1. Validate input body
    const validationErrors = validationService.validateAddExpertise(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // 2. Get user ID (mentorId) from 'protect' middleware
    const userId = req.user!.id;
    const { tagId } = req.body;

    // 3. Call the service to add the tag
    const newLink = await userService.addExpertiseToMentor(userId, tagId);

    // 4. Send success response
    res.status(201).json({
      message: 'Expertise added successfully',
      link: newLink,
    });
  } catch (error: any) {
    // 5. Handle specific errors from the service
    if (error.message === 'TAG_NOT_FOUND') {
      return res
        .status(404)
        .json({ message: 'Tag with the provided tagId not found' });
    }
    if (error.message === 'EXPERTISE_EXISTS') {
      return res
        .status(409)
        .json({ message: 'You already have this expertise tag' });
    }
    // 6. Handle general errors
    console.error('Add expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- NEW ---
/**
 * @desc    Remove an expertise tag from the current mentor's profile
 * @route   DELETE /api/v1/users/me/expertise/:tagId
 * @access  Private (Mentors Only)
 */
export const removeMyExpertise = async (req: Request, res: Response) => {
  try {
    // 1. Get user ID (mentorId) from 'protect' middleware
    const userId = req.user!.id;

    // 2. Get tagId from URL parameters and validate it
    const tagId = parseInt(req.params.tagId, 10);
    if (isNaN(tagId) || tagId <= 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [{ field: 'tagId', message: 'tagId must be a positive integer' }],
      });
    }

    // 3. Call the service to remove the tag
    await userService.removeExpertiseFromMentor(userId, tagId);

    // 4. Send success response (204 No Content)
    res.status(204).send();
  } catch (error: any) {
    // 5. Handle specific errors from the service
    if (error.message === 'LINK_NOT_FOUND') {
      return res.status(404).json({
        message: 'Expertise tag not found on your profile',
      });
    }
    // 6. Handle general errors
    console.error('Remove expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};