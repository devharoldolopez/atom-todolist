import { Task } from "../../domain/entities/task";

export interface TaskListResponse {
  status: number;
  data: {
    message: string,
    payload: Array<Task>
  };
}