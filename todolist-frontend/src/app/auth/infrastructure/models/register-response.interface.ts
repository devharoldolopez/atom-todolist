export interface RegisterResponse {
  status: number;
  data: {
    id: string;
    username: string;
    email: string;
  };
}