export interface User {
  id: number;
  name: string;
  email: string;
  role: "mentee" | "mentor";
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMentor {
  id: number;
  name: string;
  email: string;
  role: "mentee" | "mentor";
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  mentorProfile: {
    bio: string;
    jobTitle: string;
    hourlyRate: string;
    averageRating: string;
    totalReviews: number;
  };
}
