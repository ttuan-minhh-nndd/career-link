import { AuthResponse } from "../types/auth.types";
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

const usersApi = {
  registerAccount: (body: RegisterRequest) => {
    return http.post<AuthResponse>("/api/v1/auth/register", body);
  },
  loginAccount: (body: LoginRequest) => {
    return http.post<AuthResponse>("/api/v1/auth/register", body);
  },
  logout: () => {
    return http.post("/api/v1/auth/logout");
  },
  getMe: () => {
    return http.get<AuthResponse>("/api/v1/users/me");
  },
};

export default usersApi;
