export interface SuccessResponse<Data> {
  message: string;
  result: Data;
}
export interface ErrorResponse<Data = unknown> {
  message: string;
  errors?: Data;
}

export interface ValidationErrorResponse {
  field: string;
  message: string;
}

export type ValidationErrorList = ValidationErrorResponse[];
