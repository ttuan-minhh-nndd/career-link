export interface User {
  id: number;
  name: string;
  email: string;
  role: "mentor" | "mentee";
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  mentorProfile?: MentorProfile; // ← make optional
}

export interface MentorProfile {
  bio: string;
  jobTitle: string;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
}
