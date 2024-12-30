import { Observable } from "rxjs";
import { Task } from "../entities/task";

export abstract class TaskGateway {
  abstract fetchTasks(email:string): Observable<Task[]>;
  abstract createTask(task: Task): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(taskId: number): Observable<void>;
}