import {
  AuthResponse,
  BookingDetail,
  CreateMentorsAvailabilityResponse,
  GetMentorsAvailabilityResponse,
  GetMentorsResponse,
  GetMeResponse,
  ScheduleSlot,
} from "../types/auth";
import http from "../http";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MentorAvailabilitySlotBody {
  startTime: string;
  endTime: string;
}

export interface CreateMentorAvailabilitySlotBody {
  slots: MentorAvailabilitySlotBody[];
}

const usersApi = {
  registerAccount: (body: RegisterRequest) => {
    return http.post<AuthResponse>("/api/v1/auth/register", body);
  },
  loginAccount: (body: LoginRequest) => {
    return http.post<AuthResponse>("/api/v1/auth/login", body);
  },
  logout: () => {
    return http.post("/api/v1/auth/logout");
  },
  getMe: () => {
    return http.get<GetMeResponse>("/api/v1/users/me");
  },
  getMentors: () => {
    return http.get<GetMentorsResponse>("/api/v1/mentors");
  },
  getMentorsAvailability: () => {
    return http.get<GetMentorsAvailabilityResponse>(
      "/api/v1/availabilities/mentor/mine"
    );
  },
  createMultipleAvailabilitySlots: (body: CreateMentorAvailabilitySlotBody) => {
    return http.post<CreateMentorsAvailabilityResponse>(
      "api/v1/availabilities/bulk",
      body
    );
  },
  updateMentorAvailabilityById: (
    id: number,
    body: MentorAvailabilitySlotBody
  ) => {
    return http.put<ScheduleSlot>(`/api/v1/availabilities/${id}`, body);
  },
  deleteMentorAvailabilityById: (id: number) => {
    return http.delete(`/api/v1/availabilities/${id}`);
  },
  getMentorDetails: (id: number) => {
    return http.get(`/api/v1/mentors/${id}`);
  },
  booking: (availabilityId: number) => {
    return http.post<BookingDetail>(`/api/v1/bookings`, { availabilityId });
  },
};

export default usersApi;
