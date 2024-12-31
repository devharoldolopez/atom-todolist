import { Task } from "../../../tasks/domain/entities/task";

export interface GeneralResponse {
  status: string;
  data: {
    message: string,
    payload: Array<Task>
  };
}