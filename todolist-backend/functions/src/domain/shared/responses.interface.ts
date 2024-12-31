export interface SuccessResponse<T> {
  status: string;
  data: {
    message: string;
    payload: T;
  };
}

export interface ErrorResponse {
  status: string;
  details: {
    internalCode: number;
    message: string;
  };
}
