export interface SuccessResponse<T> {
  status: string;
  data: {
    message: string;
    payload: T;
  };
}

export interface ErrorResponse {
  status: string;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}