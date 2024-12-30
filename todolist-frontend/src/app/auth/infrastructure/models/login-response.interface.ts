export interface LoginResponse {
  status: number;
  data: {
    id: string;
    username: string;
    email: string;
  };
}