// ============================================
// FILE: src/services/validation.service.ts
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Simple email validation
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate registration data
 */
export const validateRegistration = (data: {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email is invalid' });
  }

  if (!data.password || data.password.length < 6) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 6 characters',
    });
  }

  if (!data.role || !['mentee', 'mentor'].includes(data.role)) {
    errors.push({ field: 'role', message: 'Role must be mentee or mentor' });
  }

  return errors;
};

/**
 * Validate login data
 */
export const validateLogin = (data: {
  email?: string;
  password?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate profile update data
 * @fields  name, email, avatarUrl (all optional)
 */
export const validateProfileUpdate = (data: {
  name?: string;
  email?: string;
  avatarUrl?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // If 'name' is provided, it must not be empty
  if (data.name !== undefined && data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name cannot be empty' });
  }

  // If 'email' is provided, it must be valid
  if (data.email !== undefined) {
    if (data.email.trim().length === 0) {
      errors.push({ field: 'email', message: 'Email cannot be empty' });
    } else if (!isValidEmail(data.email)) {
      errors.push({ field: 'email', message: 'Email is invalid' });
    }
  }
  
  // A simple check for avatarUrl. You could make this more robust.
  if (data.avatarUrl !== undefined && data.avatarUrl.trim().length > 0) {
    try {
      new URL(data.avatarUrl);
    } catch (error) {
      errors.push({ field: 'avatarUrl', message: 'Avatar URL is not valid' });
    }
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate password change data
 * @fields  oldPassword, newPassword
 */
export const validatePasswordChange = (data: {
  oldPassword?: string;
  newPassword?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.oldPassword || data.oldPassword.trim().length === 0) {
    errors.push({ field: 'oldPassword', message: 'Old password is required' });
  }

  if (!data.newPassword || data.newPassword.length < 6) {
    errors.push({
      field: 'newPassword',
      message: 'New password must be at least 6 characters',
    });
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate mentor profile update data
 * @fields  bio, jobTitle, hourlyRate (all optional)
 */
export const validateMentorProfileUpdate = (data: {
  bio?: string;
  jobTitle?: string;
  hourlyRate?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // If 'bio' is provided, it should be a string
  if (data.bio !== undefined && typeof data.bio !== 'string') {
    errors.push({ field: 'bio', message: 'Bio must be a string' });
  }

  // If 'jobTitle' is provided, it should be a string
  if (data.jobTitle !== undefined && typeof data.jobTitle !== 'string') {
    errors.push({ field: 'jobTitle', message: 'Job title must be a string' });
  }

  // If 'hourlyRate' is provided, it must be a valid positive number
  if (data.hourlyRate !== undefined) {
    const rate = parseFloat(data.hourlyRate);
    if (isNaN(rate) || rate < 0) {
      errors.push({
        field: 'hourlyRate',
        message: 'Hourly rate must be a positive number (e.g., "50.00")',
      });
    }
  }

  return errors;
};