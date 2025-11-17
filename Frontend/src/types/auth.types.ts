import { SuccessResponse } from "./response.types";
import { User } from "./user.types";

export type AuthResponse = SuccessResponse<{
  user: User;
  token: string;
}>;

export interface MessageOnly {
  message: string;
}
