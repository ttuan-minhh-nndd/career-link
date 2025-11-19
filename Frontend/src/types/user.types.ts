export interface User {
  id: number;
  name: string;
  email: string;
  role: "mentor" | "mentee";
  avatarUrl: string | null;
  mentorProfile?: MentorProfile; // ← make optional
}

export interface MentorProfile {
  bio: string;
  jobTitle: string;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
}
