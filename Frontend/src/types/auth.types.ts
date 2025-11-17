import { SuccessResponse } from "./response.types";
import { User } from "./user.types";

export type GetMeResponse = SuccessResponse<User>;

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
