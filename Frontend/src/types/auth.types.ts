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

export type AuthResponse = {
  user: {
    name: string;
    email: string;
    password: string;
    role: string;
  };
  token: string;
};

export interface MessageOnly {
  message: string;
}
