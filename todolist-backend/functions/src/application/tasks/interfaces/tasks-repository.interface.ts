import { Task } from "../../../domain/tasks/tasks.entity";

export interface TasksRepository {
  getTasksByUser(userId:string): Promise<Task[]>;
  insertTask(userId:string, task: Task): Promise<Task>
  updateTask(task: Task): Promise<Task>;
  deleteTask(taskId:string): Promise<void>;
}