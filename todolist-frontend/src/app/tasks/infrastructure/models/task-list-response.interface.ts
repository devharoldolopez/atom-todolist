import { Task } from "../../domain/entities/task";

export interface TaskListResponse {
  status: number;
  data: Array<Task>;
}