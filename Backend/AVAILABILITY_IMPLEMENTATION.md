# CareerLink - Availability Management Implementation

## Overview
Successfully implemented the action to allow mentors to create multiple availability slots for the CareerLink platform.

## API Endpoint
- **Method**: POST
- **Path**: `/api/v1/availabilities/bulk`
- **Auth**: Required (Mentor role)

## Files Created/Modified

### 1. **Service Layer** - `src/services/availability.service.ts` (NEW)
Handles business logic for availability management:
- `verifyMentorExists()`: Validates that mentor profile exists
- `createBulkAvailabilities()`: Creates multiple availability slots with comprehensive validation

**Key Features:**
- Transaction support for atomic operations
- Timestamp validation (ISO 8601 format)
- Time range validation (endTime must be after startTime)
- Returns created count and detailed slot information

### 2. **Controller Layer** - `src/controllers/availability.controller.ts` (NEW)
Handles HTTP request/response for availability endpoints:
- `createBulkAvailabilities()`: Entry point for the bulk create endpoint

**Key Features:**
- Input validation through validation service
- Mentor verification
- Comprehensive error handling with specific error messages
- Returns 201 Created on success

### 3. **Routes Layer** - `src/routes/availability.routes.ts` (NEW)
Defines availability API endpoints:
- POST `/bulk`: Protected route (requires authentication and mentor role)

### 4. **Validation Service** - `src/services/validation.service.ts` (MODIFIED)
Added validation function:
- `validateBulkAvailabilities()`: Validates request body structure and data

**Validation Checks:**
- slots array existence and non-empty requirement
- Each slot has startTime and endTime
- Timestamps are valid ISO 8601 format
- endTime is after startTime for each slot

### 5. **App Configuration** - `src/app.ts` (MODIFIED)
Integrated availability routes into the Express app:
- Imported availabilityRoutes
- Registered route at `/api/v1/availabilities`

## Request/Response Format

### Request Body
```json
{
  "slots": [
    {
      "startTime": "2025-12-01T14:00:00Z",
      "endTime": "2025-12-01T15:00:00Z"
    },
    {
      "startTime": "2025-12-01T15:00:00Z",
      "endTime": "2025-12-01T16:00:00Z"
    }
  ]
}
```

### Success Response (201 Created)
```json
{
  "created": 2,
  "slots": [
    {
      "id": 1,
      "mentorId": 1,
      "startTime": "2025-12-01T14:00:00.000Z",
      "endTime": "2025-12-01T15:00:00.000Z",
      "isBooked": false,
      "createdAt": "2025-11-16T...",
      "updatedAt": "2025-11-16T..."
    },
    {
      "id": 2,
      "mentorId": 1,
      "startTime": "2025-12-01T15:00:00.000Z",
      "endTime": "2025-12-01T16:00:00.000Z",
      "isBooked": false,
      "createdAt": "2025-11-16T...",
      "updatedAt": "2025-11-16T..."
    }
  ]
}
```

### Error Responses

**401 Unauthorized** - Missing or invalid token
```json
{
  "message": "Not authorized, no token"
}
```

**403 Forbidden** - User is not a mentor
```json
{
  "message": "Forbidden: This action is only available to mentors."
}
```

**404 Not Found** - Mentor profile not found
```json
{
  "message": "Mentor profile not found"
}
```

**400 Bad Request** - Invalid slots data
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "slots[0]",
      "message": "endTime must be after startTime"
    }
  ]
}
```

## Security Features
- ✅ Authentication required (Bearer token via JWT)
- ✅ Mentor role verification
- ✅ Mentor can only create slots for their own profile
- ✅ Comprehensive input validation
- ✅ Transaction support to ensure data consistency

## Database Schema Usage
The implementation uses the existing `availabilities` table:
```sql
- id: serial (primary key)
- mentorId: integer (references mentor_profiles.userId)
- startTime: timestamp with timezone
- endTime: timestamp with timezone
- isBooked: boolean (default: false)
- createdAt: timestamp with timezone (auto)
- updatedAt: timestamp with timezone (auto)
```

## Next Steps
To complete the availability management feature, you'll need to implement:
1. **Update Availability** - PUT `/api/v1/availabilities/:id`
2. **Delete Availability** - DELETE `/api/v1/availabilities/:id`
3. **Get Mentor's Availabilities** - GET `/api/v1/availabilities/mentor/mine`
4. **Get Available Slots** - GET `/api/v1/availabilities/mentor/:mentorId` (public endpoint)
5. **Conflict Detection** - Prevent overlapping availability slots
