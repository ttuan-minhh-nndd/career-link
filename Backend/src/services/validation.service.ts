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
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Email is invalid" });
  }

  if (!data.password || data.password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  if (!data.role || !["mentee", "mentor"].includes(data.role)) {
    errors.push({ field: "role", message: "Role must be mentee or mentor" });
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
    errors.push({ field: "email", message: "Email is required" });
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.push({ field: "password", message: "Password is required" });
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
    errors.push({ field: "name", message: "Name cannot be empty" });
  }

  // If 'email' is provided, it must be valid
  if (data.email !== undefined) {
    if (data.email.trim().length === 0) {
      errors.push({ field: "email", message: "Email cannot be empty" });
    } else if (!isValidEmail(data.email)) {
      errors.push({ field: "email", message: "Email is invalid" });
    }
  }

  // A simple check for avatarUrl. You could make this more robust.
  if (data.avatarUrl !== undefined && data.avatarUrl.trim().length > 0) {
    try {
      new URL(data.avatarUrl);
    } catch (error) {
      errors.push({ field: "avatarUrl", message: "Avatar URL is not valid" });
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
    errors.push({ field: "oldPassword", message: "Old password is required" });
  }

  if (!data.newPassword || data.newPassword.length < 6) {
    errors.push({
      field: "newPassword",
      message: "New password must be at least 6 characters",
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
  if (data.bio !== undefined && typeof data.bio !== "string") {
    errors.push({ field: "bio", message: "Bio must be a string" });
  }

  // If 'jobTitle' is provided, it should be a string
  if (data.jobTitle !== undefined && typeof data.jobTitle !== "string") {
    errors.push({ field: "jobTitle", message: "Job title must be a string" });
  }

  // If 'hourlyRate' is provided, it must be a valid positive number
  if (data.hourlyRate !== undefined) {
    const rate = parseFloat(data.hourlyRate);
    if (isNaN(rate) || rate < 0) {
      errors.push({
        field: "hourlyRate",
        message: 'Hourly rate must be a positive number (e.g., "50.00")',
      });
    }
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate the body for adding an expertise tag
 * @fields  tagId
 */
export const validateAddExpertise = (data: {
  tagId?: number;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.tagId) {
    errors.push({ field: "tagId", message: "tagId is required" });
  } else if (
    typeof data.tagId !== "number" ||
    !Number.isInteger(data.tagId) ||
    data.tagId <= 0
  ) {
    errors.push({
      field: "tagId",
      message: "tagId must be a positive integer",
    });
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate update availability body (PUT)
 * @fields  startTime, endTime (both required, ISO strings)
 */
export const validateUpdateAvailability = (data: {
  startTime?: string;
  endTime?: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.startTime) {
    errors.push({ field: "startTime", message: "startTime is required" });
  } else {
    const d = new Date(data.startTime);
    if (isNaN(d.getTime())) {
      errors.push({
        field: "startTime",
        message: "startTime must be a valid ISO 8601 timestamp",
      });
    }
  }

  if (!data.endTime) {
    errors.push({ field: "endTime", message: "endTime is required" });
  } else {
    const d = new Date(data.endTime);
    if (isNaN(d.getTime())) {
      errors.push({
        field: "endTime",
        message: "endTime must be a valid ISO 8601 timestamp",
      });
    }
  }

  // Only check time ordering if both valid strings were supplied
  if (data.startTime && data.endTime) {
    const s = new Date(data.startTime);
    const e = new Date(data.endTime);
    if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e <= s) {
      errors.push({
        field: "endTime",
        message: "endTime must be after startTime",
      });
    }
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate bulk availability creation data
 * @fields  slots (array of {startTime, endTime})
 */
export const validateBulkAvailabilities = (data: {
  slots?: Array<{
    startTime?: string;
    endTime?: string;
  }>;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check if slots is provided
  if (!data.slots) {
    errors.push({ field: "slots", message: "slots array is required" });
    return errors;
  }

  // Check if slots is an array
  if (!Array.isArray(data.slots)) {
    errors.push({ field: "slots", message: "slots must be an array" });
    return errors;
  }

  // Check if slots is not empty
  if (data.slots.length === 0) {
    errors.push({
      field: "slots",
      message: "slots array must contain at least one slot",
    });
    return errors;
  }

  // Validate each slot
  for (let i = 0; i < data.slots.length; i++) {
    const slot = data.slots[i];

    if (!slot.startTime) {
      errors.push({
        field: `slots[${i}].startTime`,
        message: "startTime is required",
      });
    } else if (typeof slot.startTime !== "string") {
      errors.push({
        field: `slots[${i}].startTime`,
        message: "startTime must be a string",
      });
    } else {
      const startDate = new Date(slot.startTime);
      if (isNaN(startDate.getTime())) {
        errors.push({
          field: `slots[${i}].startTime`,
          message:
            "startTime must be a valid ISO 8601 timestamp (e.g., 2025-12-01T14:00:00Z)",
        });
      }
    }

    if (!slot.endTime) {
      errors.push({
        field: `slots[${i}].endTime`,
        message: "endTime is required",
      });
    } else if (typeof slot.endTime !== "string") {
      errors.push({
        field: `slots[${i}].endTime`,
        message: "endTime must be a string",
      });
    } else {
      const endDate = new Date(slot.endTime);
      if (isNaN(endDate.getTime())) {
        errors.push({
          field: `slots[${i}].endTime`,
          message:
            "endTime must be a valid ISO 8601 timestamp (e.g., 2025-12-01T15:00:00Z)",
        });
      }
    }

    // If both timestamps are valid, check that endTime is after startTime
    if (
      slot.startTime &&
      typeof slot.startTime === "string" &&
      slot.endTime &&
      typeof slot.endTime === "string"
    ) {
      const startDate = new Date(slot.startTime);
      const endDate = new Date(slot.endTime);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        if (endDate <= startDate) {
          errors.push({
            field: `slots[${i}]`,
            message: "endTime must be after startTime",
          });
        }
      }
    }
  }

  return errors;
};

// --- NEW ---
/**
 * @desc    Validate create booking request
 * @fields  availabilityId (required, positive integer)
 */
export const validateCreateBooking = (data: {
  availabilityId?: number;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.availabilityId) {
    errors.push({
      field: 'availabilityId',
      message: 'availabilityId is required',
    });
  } else if (
    typeof data.availabilityId !== 'number' ||
    !Number.isInteger(data.availabilityId) ||
    data.availabilityId <= 0
  ) {
    errors.push({
      field: 'availabilityId',
      message: 'availabilityId must be a positive integer',
    });
  }

  return errors;
};
