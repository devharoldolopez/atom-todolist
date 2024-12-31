export interface ServiceResponse {
  status: number;
  data: {
    message: string,
    payload: {
      id: string;
      username: string;
      email: string;
    }
  };
}