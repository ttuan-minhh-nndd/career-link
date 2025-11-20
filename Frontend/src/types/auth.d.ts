export interface MentorProfile {
  bio: string;
  jobTitle: string;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
}

export interface GetMeResponse {
  id: number;
  name: string;
  email: string;
  role: "mentor" | "mentee";
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;

  // Only exists if role === "mentor"
  mentorProfile?: MentorProfile;
}

export interface GetMentorResponse {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
  expertiseTags: number[];
}
export type GetMentorsResponse = GetMentorResponse[];

export type AuthResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    role: "mentor" | "mentee";
    password: string;
    avatarUrl: string | null;
    mentorProfile?: MentorProfile;
  };
  token: string;
};

export interface MessageOnly {
  message: string;
}

export interface ScheduleSlot {
  id: number;
  mentorId: number;
  startTime: string; // ISO datetime string
  endTime: string; // ISO datetime string
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetMentorsAvailabilityResponse = ScheduleSlot[];
